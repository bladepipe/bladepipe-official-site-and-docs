export const OpenGauss = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: '<b>SELECT</b>, <b>INSERT</b>, <b>DELETE</b>, <b>UPDATE</b> and common <b>DDL</b> permissions. <br />'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the OpenGauss port (e.g., 5432)'
        }
    ],
    params: [
        {
            key: 'keyConflictStrategy',
            desc: 'Strategy for handling primary key conflicts during write in Incremental DataTask:' +
                '<ul>' +
                '  <li><b>IGNORE</b>: Ignore conflicts (default)</li>' +
                '  <li><b>REPLACE</b>: Replace conflicts (optional)</li>' +
                '</ul>'
        },
        {
            key: 'dstWholeReplace',
            desc: 'Convert INSERT and UPDATE operations into full row replacement in the Target.'
        },
        {
            key: 'enableTimeZoneProcess',
            desc: 'Enable time zone conversion to datetime fields.'
        },
        {
            key: 'timezone',
            desc: 'Target time zone, e.g., +08:00, Asia/Shanghai, America/New_York, etc.'
        },
        {
            key: 'defaultZeroDate',
            desc: 'Default value for replacing \'0000-00-00 00:00:00\' / \'0000-00-00\' values. Optional parameters include:' +
                '<ul>' +
                '  <li><b>null</b></li>' +
                '  <li><b>Time (14:23:33)</b></li>' +
                '  <li><b>Date (1970-01-01)</b></li>' +
                '  <li><b>DateTime (1970-01-01 00:00:00)</b></li>' +
                '  <li><b>Timezone Time (14:23:33+08:00 or 1970-01-01 00:00:00+08:00)</b></li>' +
                '</ul>'
        },
        {
            key: 'caseSensitive',
            desc: 'Case sensitivity strategy for SQL statements, including:' +
                '<ul>' +
                '  <li><b>UpperCase:</b> Convert to uppercase</li>' +
                '  <li><b>LowerCase:</b> Convert to lowercase</li>' +
                '  <li><b>Sensitive:</b> Add qualifiers</li>' +
                '  <li><b>NoSpecified:</b> No conversion/No qualifiers</li>' +
                '</ul>'
        },
        {
            key: 'writeStrategy',
            desc: 'Strategy of writing data to the Target, including: ' +
                '\n- <b>ROW (single row)</b>' +
                '\n- <b>MULTI_SQL (multiple statements)</b>' +
                '\n- <b>BATCH (by default, write data in batches)</b>' +
                '\n- <b>COPY (OpenGauss COPY command)</b>'
        },
        {
            key: 'defaultGisSRID',
            desc: 'Setting the SRID for GIS data types.'
        }
    ],
    notice: [],
    master_function: [
        {
            key: 'Handling of Zero Value for Time',
            desc: 'Allow setting zero value for time to different data types to prevent errors when writing to the Target.'
        }
    ]
}
