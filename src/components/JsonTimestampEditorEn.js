import React, {useEffect, useMemo, useState} from 'react';
import '../css/JsonTimestampEditor.css'; // Ensure this CSS file exists

// Formats timestamp to YYYY-MM-DDTHH:MM:SS for input and display
const formatTimestampForInput = (msTimestamp) => {
    if (msTimestamp === null || msTimestamp === undefined || msTimestamp === '') {
        if (msTimestamp === 0) { // Explicitly handle timestamp 0
            // Fallthrough to allow new Date(0)
        } else {
            return '';
        }
    }
    try {
        const date = new Date(parseInt(String(msTimestamp), 10));
        if (isNaN(date.getTime())) return '';
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    } catch (e) {
        return '';
    }
};

// Parses datetime-local string to millisecond string
const parseTimestampFromInput = (inputString) => {
    if (!inputString) return null;
    try {
        const date = new Date(inputString);
        if (isNaN(date.getTime())) return null;
        return date.getTime().toString();
    } catch (e) {
        return null;
    }
};

const PRESERVED_FIELDS_LOWERCASE = ['db', 'schema', 'table', 'timestamp'];
const ITEMS_PER_PAGE = 3;

export default function JsonTimestampEditor(options) {
    let preserved_fields_lowercase = PRESERVED_FIELDS_LOWERCASE;
    // Corrected options check
    if (options && options.preserved_fields_lowercase) {
        preserved_fields_lowercase = options.preserved_fields_lowercase;
    }

    const [jsonInput, setJsonInput] = useState('');
    const [data, setData] = useState([]);
    const [initialDataSnapshot, setInitialDataSnapshot] = useState([]);
    const [error, setError] = useState('');
    const [expandedItems, setExpandedItems] = useState({});
    const [displayedSearchTerm, setDisplayedSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isJsonParsed, setIsJsonParsed] = useState(false);
    const [modifiedIndicesInSession, setModifiedIndicesInSession] = useState(new Set());
    const [showChangesTable, setShowChangesTable] = useState(false);
    const [copyStatus, setCopyStatus] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItemInfo, setEditingItemInfo] = useState(null);
    const [pendingModalTimestampValue, setPendingModalTimestampValue] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(displayedSearchTerm);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [displayedSearchTerm]);

    const resetAllStateToInitial = () => {
        setJsonInput('');
        setData([]);
        setInitialDataSnapshot([]);
        setError('');
        setExpandedItems({});
        setDisplayedSearchTerm('');
        setDebouncedSearchTerm('');
        setCurrentPage(1);
        setModifiedIndicesInSession(new Set());
        setShowChangesTable(false);
        setIsJsonParsed(false);
        setCopyStatus('');
        setIsEditModalOpen(false);
        setEditingItemInfo(null);
        setPendingModalTimestampValue('');
    };

    const handleInputChange = (event) => setJsonInput(event.target.value);

    const parseJsonCommon = (jsonDataString) => {
        try {
            const parsed = JSON.parse(jsonDataString);
            const dataArray = Array.isArray(parsed) ? parsed : (typeof parsed === 'object' && parsed !== null ? [parsed] : null);
            if (dataArray === null) throw new Error("JSON content must be a valid object or array of objects.");
            setData(dataArray);
            setInitialDataSnapshot(JSON.parse(JSON.stringify(dataArray)));
            setError('');
            setExpandedItems({});
            setDisplayedSearchTerm('');
            setDebouncedSearchTerm('');
            setCurrentPage(1);
            setModifiedIndicesInSession(new Set());
            setShowChangesTable(false);
            setIsJsonParsed(true);
            setCopyStatus('');
            setIsEditModalOpen(false);
            setEditingItemInfo(null);
        } catch (e) {
            setError(`JSON parsing error: ${e.message}`);
            setData([]);
            setInitialDataSnapshot([]);
            setIsJsonParsed(false);
        }
    };

    const handleParseJsonClick = () => {
        if (!jsonInput.trim()) {
            setError('JSON input cannot be empty.');
            setData([]);
            setInitialDataSnapshot([]);
            setIsJsonParsed(false);
            return;
        }
        parseJsonCommon(jsonInput);
    };

    const toggleExpandItem = (originalIndex) => setExpandedItems(prev => ({
        ...prev,
        [originalIndex]: !prev[originalIndex]
    }));
    const getModifiedJsonOutput = () => JSON.stringify(data, null, 2);

    const openEditModal = (originalIndex, currentTimestampMs, displayIdentifier) => {
        setEditingItemInfo({originalIndex, currentTimestampMs, displayIdentifier});
        setPendingModalTimestampValue(formatTimestampForInput(currentTimestampMs));
        setIsEditModalOpen(true);
    };

    const handleCancelModal = () => {
        setIsEditModalOpen(false);
        setEditingItemInfo(null);
        setPendingModalTimestampValue('');
    };

    const handleConfirmModalEdit = () => {
        if (!editingItemInfo) return;
        const {originalIndex, currentTimestampMs: oldTimestampMsFromModalOpen} = editingItemInfo;

        // If the input field is empty, user wants to clear the timestamp
        if (pendingModalTimestampValue.trim() === '') {
            // Check if it was already effectively null/empty
            const oldIsEmpty = oldTimestampMsFromModalOpen === null || oldTimestampMsFromModalOpen === undefined || String(oldTimestampMsFromModalOpen).trim() === '';
            if (!oldIsEmpty) {
                // It was not null/empty, now it is. This is a change.
                setData(prevData =>
                    prevData.map((item, i) => {
                        if (i === originalIndex) {
                            const updatedItem = {...item};
                            updatedItem.timestamp = null; // Set to null
                            for (const key in updatedItem) {
                                if (Object.hasOwnProperty.call(updatedItem, key) && !preserved_fields_lowercase.includes(key.toLowerCase())) {
                                    updatedItem[key] = null;
                                }
                            }
                            return updatedItem;
                        }
                        return item;
                    })
                );
                setModifiedIndicesInSession(prev => new Set(prev).add(originalIndex));
            }
            // If it was already null/empty, no change, just close.
            handleCancelModal();
            return;
        }

        // User has provided a non-empty value in the datetime-local input.
        // This value is in YYYY-MM-DDTHH:MM:SS format from the input field.
        const newTimestampFromInputFormattedString = pendingModalTimestampValue;

        // Parse it to ensure it's a valid date and to get the millisecond equivalent
        // This millisecond equivalent will have a 000 millisecond part.
        const newTimestampMsEquivalent = parseTimestampFromInput(newTimestampFromInputFormattedString);

        if (newTimestampMsEquivalent === null) { // Check if parsing failed
            alert("The date and time format entered is invalid. Please enter a valid date and time or clear the input box.");
            return;
        }

        // Get the YYYY-MM-DDTHH:MM:SS string representation of the original timestamp.
        // formatTimestampForInput handles null/undefined/empty oldTimestampMsFromModalOpen by returning ''.
        const oldTimestampFormattedString = formatTimestampForInput(oldTimestampMsFromModalOpen);

        // Compare the formatted strings (YYYY-MM-DDTHH:MM:SS).
        // This comparison ignores original milliseconds for determining if a "change" was made by the user
        // to the visible part of the timestamp.
        if (newTimestampFromInputFormattedString !== oldTimestampFormattedString) {
            // A change in YYYY-MM-DDTHH:MM:SS was made by the user.
            // The value to store is the one parsed from the input field (will have 000 ms part).
            setData(prevData =>
                prevData.map((item, i) => {
                    if (i === originalIndex) {
                        const updatedItem = {...item};
                        // Store the new millisecond value (which has 000 ms part due to datetime-local)
                        updatedItem.timestamp = newTimestampMsEquivalent;
                        for (const key in updatedItem) {
                            if (Object.hasOwnProperty.call(updatedItem, key) && !preserved_fields_lowercase.includes(key.toLowerCase())) {
                                updatedItem[key] = null;
                            }
                        }
                        return updatedItem;
                    }
                    return item;
                })
            );
            setModifiedIndicesInSession(prev => new Set(prev).add(originalIndex));
        }
        // If newTimestampFromInputFormattedString === oldTimestampFormattedString,
        // it means the user did not change the YYYY-MM-DDTHH:MM:SS part.
        // In this case, we do nothing to the data; the original timestamp (with its original milliseconds)
        // in `data` remains untouched. No entry in the change log is made for this scenario.

        handleCancelModal();
    };

    const allFilteredResults = useMemo(() => {
        const sourceData = data.map((item, index) => ({...item, originalIndex: index}));
        if (!isJsonParsed) return [];
        if (!debouncedSearchTerm.trim()) return sourceData;
        const searchTermLower = debouncedSearchTerm.toLowerCase();
        return sourceData.filter(itemWithIndex => {
            const item = itemWithIndex;
            const idParts = [];
            for (const key in item) {
                const keyLower = key.toLowerCase();
                if ((keyLower === 'db' || keyLower === 'schema' || keyLower === 'table') && item[key] && typeof item[key] === 'string') {
                    idParts.push(String(item[key]).toLowerCase());
                }
            }
            return idParts.join('.').includes(searchTermLower);
        });
    }, [data, debouncedSearchTerm, isJsonParsed]);

    const paginatedResults = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return allFilteredResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [allFilteredResults, currentPage]);

    const totalPages = Math.ceil(allFilteredResults.length / ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

    const sessionChangesForTable = useMemo(() => {
        if (!initialDataSnapshot.length || !data.length || modifiedIndicesInSession.size === 0) {
            return [];
        }
        const changesOutput = [];
        modifiedIndicesInSession.forEach(originalIndex => {
            const initialRecord = initialDataSnapshot[originalIndex];
            const currentRecord = data[originalIndex];
            if (!initialRecord || !currentRecord) return;
            const recordChangeEntry = {originalIndex, identifier: '', changes: [],};
            const idParts = [];
            for (const key in initialRecord) {
                const keyLower = key.toLowerCase();
                if ((keyLower === 'db' || keyLower === 'schema' || keyLower === 'table') && initialRecord[key] && typeof initialRecord[key] === 'string') {
                    idParts.push(initialRecord[key]);
                }
            }
            recordChangeEntry.identifier = idParts.length > 0 ? idParts.join(' . ') : `Record (Original Index ${originalIndex + 1})`;

            const oldTsStringValue = (initialRecord.timestamp === null || initialRecord.timestamp === undefined) ? "null" : String(initialRecord.timestamp);
            const currentTsStringValue = (currentRecord.timestamp === null || currentRecord.timestamp === undefined) ? "null" : String(currentRecord.timestamp);

            if (oldTsStringValue !== currentTsStringValue) { // Compare actual stored values
                recordChangeEntry.changes.push({
                    fieldName: 'timestamp',
                    valueBefore: initialRecord.timestamp,
                    valueAfter: currentRecord.timestamp
                });
                for (const key in initialRecord) {
                    if (Object.hasOwnProperty.call(initialRecord, key) && !preserved_fields_lowercase.includes(key.toLowerCase())) {
                        if (currentRecord[key] === null && initialRecord[key] !== null) {
                            recordChangeEntry.changes.push({
                                fieldName: key,
                                valueBefore: initialRecord[key],
                                valueAfter: null
                            });
                        }
                    }
                }
            }
            if (recordChangeEntry.changes.length > 0) {
                changesOutput.push(recordChangeEntry);
            }
        });
        return changesOutput;
    }, [data, initialDataSnapshot, modifiedIndicesInSession, preserved_fields_lowercase]);

    const handleCopyOutput = () => {
        const outputJson = getModifiedJsonOutput();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(outputJson).then(() => {
                setCopyStatus('Copied!');
                setTimeout(() => setCopyStatus(''), 2000);
            }).catch(err => {
                setCopyStatus('Copy failed!');
                console.error('JSON copy failed:', err);
                setTimeout(() => setCopyStatus(''), 2000);
            });
        } else {
            setCopyStatus('The browser does not support copying.');
            setTimeout(() => setCopyStatus(''), 2000);
        }
    };

    return (
        <div className="jte-container">
            <h4 className="jte-section-title">Enter the Offset</h4>
            <textarea
                className={`jte-textarea ${isJsonParsed ? 'jte-textarea--disabled' : ''}`}
                value={jsonInput}
                onChange={handleInputChange}
                placeholder="Enter the offset..."
                disabled={isJsonParsed}
            />
            <div className="jte-button-container">
                {!isJsonParsed ? (
                    <button className="jte-button jte-button--primary" onClick={handleParseJsonClick}>Parse</button>
                ) : (
                    <button className="jte-button jte-button--danger" onClick={resetAllStateToInitial}>Reset</button>
                )}
            </div>

            {error && <p className="jte-error">{error}</p>}

            {isEditModalOpen && editingItemInfo && (
                <div className="jte-modal-overlay"
                     onClick={handleCancelModal}>
                    <div className="jte-modal-content" onClick={e => e.stopPropagation()}>
                        <h4 className="jte-modal-title">{editingItemInfo.displayIdentifier}</h4>
                        <label htmlFor="modal-timestamp-input-current"
                               className="jte-modal-current-value-label">Current Value:</label>
                        <span id="modal-timestamp-input-current" className="jte-modal-current-value">
                            {(editingItemInfo.currentTimestampMs !== null && editingItemInfo.currentTimestampMs !== undefined)
                                ? formatTimestampForInput(editingItemInfo.currentTimestampMs)
                                : 'Not set'}
                        </span>

                        <label htmlFor="modal-timestamp-input-new" className="jte-modal-new-value-label">New Value:</label>
                        <input
                            type="datetime-local"
                            id="modal-timestamp-input-new"
                            value={pendingModalTimestampValue}
                            onChange={(e) => setPendingModalTimestampValue(e.target.value)}
                            className="jte-modal-input"
                            step="1"
                        />
                        <div className="jte-modal-actions">
                            <button onClick={handleCancelModal}
                                    className="jte-button jte-button--secondary-action">Cancel
                            </button>
                            <button onClick={handleConfirmModalEdit}
                                    className="jte-button jte-button--primary" disabled={
                                pendingModalTimestampValue === formatTimestampForInput(editingItemInfo.currentTimestampMs)
                            }>OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isJsonParsed && data.length > 0 && (
                <>
                    <h4 className="jte-section-title">Modify the Offset</h4>
                    <div className="jte-results-info">
                        {debouncedSearchTerm.trim() ? `${allFilteredResults.length} records are found to match “${debouncedSearchTerm}”` : `${allFilteredResults.length} records in total.`}
                        {allFilteredResults.length > 0 && `Page ${currentPage} / ${totalPages}`}
                    </div>
                    <div className="jte-search-container">
                        <input type="search" className="jte-search-input"
                               placeholder="Enter db or schema or table to search..."
                               value={displayedSearchTerm} onChange={(e) => {
                            setExpandedItems({});
                            setDisplayedSearchTerm(e.target.value);
                        }}/>
                    </div>
                    {paginatedResults.length > 0 ? (
                        paginatedResults.map((itemWithIndex) => {
                            const {originalIndex, ...item} = itemWithIndex;
                            const isExpanded = !!expandedItems[originalIndex];
                            const idParts = [];
                            for (const key_id in item) {
                                const keyLower = key_id.toLowerCase();
                                if ((keyLower === 'db' || keyLower === 'schema' || keyLower === 'table') && item[key_id] && typeof item[key_id] === 'string') {
                                    idParts.push(item[key_id]);
                                }
                            }
                            const displayIdentifier = idParts.length > 0 ? idParts.join('.') : `Record (Original index ${originalIndex + 1})`;

                            return (
                                <div key={originalIndex} className="jte-item">
                                    <div className="jte-item-header">
                                        <span className="jte-item-title">{displayIdentifier}</span>
                                        <button onClick={() => toggleExpandItem(originalIndex)}
                                                className="jte-details-toggle">
                                            {isExpanded ? 'Less' : 'More'}
                                        </button>
                                    </div>
                                    <div className="jte-field-entry">
                                        <label className="jte-label" style={{minWidth: '0px'}}>timestamp:</label>
                                        <div className="jte-timestamp-display-container">
                                            <span className="jte-value-display">
                                                {(item.timestamp !== null && item.timestamp !== undefined)
                                                    ? formatTimestampForInput(item.timestamp)
                                                    : 'null'}
                                            </span>
                                            <button
                                                className="jte-edit-button"
                                                onClick={() => openEditModal(originalIndex, item.timestamp, displayIdentifier)}
                                                title="Modify Timestamps">
                                                Modify
                                            </button>
                                        </div>
                                    </div>
                                    {isExpanded && (
                                        <div className="jte-item-details-section">
                                            {Object.entries(item).map(([key, value]) => {
                                                if (key.toLowerCase() !== 'timestamp') {
                                                    return (
                                                        <div key={key} className="jte-field-entry">
                                                            <span className="jte-label">{key}:</span>
                                                            <span className="jte-value-display">
                                                                {value === null ? 'null' : typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p className="jte-prompt-text">{debouncedSearchTerm.trim() ? `No record is found to match “${debouncedSearchTerm}”.` : (data.length > 0 ? "The list is empty. Please check the search conditions or JSON." : "No record.")}</p>
                    )}
                    {totalPages > 1 && (
                        <div className="jte-pagination-controls">
                            <button
                                className={`jte-page-button ${currentPage === 1 ? 'jte-page-button--disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous Page
                            </button>
                            <span className="jte-current-page-info">Page {currentPage} / {totalPages}</span>
                            <button
                                className={`jte-page-button ${currentPage === totalPages ? 'jte-page-button--disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}>Next Page
                            </button>
                        </div>
                    )}
                </>
            )}
            {isJsonParsed && data.length === 0 && !error && (
                <p className="jte-prompt-text">The JSON was parsed but the content was empty or did not contain a valid record array.</p>)}
            {!isJsonParsed && !error && (<p className="jte-prompt-text">Please enter the offset first and click "Parse".</p>)}

            {isJsonParsed && modifiedIndicesInSession.size > 0 && (
                <div className="jte-changes-table-container">
                    <div className="jte-changes-table-header">
                        <h4 className="jte-changes-table-title">Modification History
                            ({sessionChangesForTable.length} records are modified)</h4>
                        <button className="jte-button jte-button--secondary-action"
                                onClick={() => setShowChangesTable(prev => !prev)}>
                            {showChangesTable ? 'Hide' : 'Display'}
                        </button>
                    </div>
                    {showChangesTable && sessionChangesForTable.length > 0 && (
                        <table className="jte-changes-table">
                            <thead>
                            <tr>
                                <th className="jte-changes-table-th">Record Identifier</th>
                                <th className="jte-changes-table-th">Field Name</th>
                                <th className="jte-changes-table-th">Before Modification</th>
                                <th className="jte-changes-table-th">After Modification</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sessionChangesForTable.map(recordChange => (
                                <React.Fragment key={recordChange.originalIndex}>
                                    {recordChange.changes.map((change, idx) => (
                                        <tr key={`${recordChange.originalIndex}-${change.fieldName}`}>
                                            {idx === 0 && (
                                                <td className="jte-changes-table-td jte-changes-table-td--identifier"
                                                    rowSpan={recordChange.changes.length}> {recordChange.identifier} </td>)}
                                            <td className="jte-changes-table-td">{change.fieldName}</td>
                                            <td className="jte-changes-table-td"><span
                                                className="jte-changes-table-td-value">{change.valueBefore === null ? 'null' : typeof change.valueBefore === 'object' ? JSON.stringify(change.valueBefore) : String(change.valueBefore)}</span>
                                            </td>
                                            <td className="jte-changes-table-td"><span
                                                className="jte-changes-table-td-value">{change.valueAfter === null ? 'null' : typeof change.valueAfter === 'object' ? JSON.stringify(change.valueAfter) : String(change.valueAfter)}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                            </tbody>
                        </table>
                    )}
                    {showChangesTable && sessionChangesForTable.length === 0 && (<p>No valid changes have been recorded in the current session.</p>)}
                    <textarea className="jte-textarea jte-textarea--output"
                              style={{marginBottom: '0px', marginTop: '15px'}} value={getModifiedJsonOutput()}
                              readOnly/>
                    <div style={{marginTop: '10px', display: 'flex', alignItems: 'center'}}>
                        <button className="jte-button jte-copy-button" onClick={handleCopyOutput}
                                title="Copy the result to the clipboard."> Copy
                        </button>
                        {copyStatus &&
                            <span className="jte-copy-status-text" style={{marginLeft: '10px'}}>{copyStatus}</span>}
                    </div>
                </div>
            )}
        </div>
    );
}