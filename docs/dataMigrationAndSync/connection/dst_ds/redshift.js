export const Redshift = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'Must have common <b>SELECT</b>, <b>INSERT</b>, <b>DELETE</b>, <b>UPDATE</b>, and <b>DDL</b> permissions.'
        },
        {
            key: 'Network Preparation',
            desc: 'The sidecar node must be able to connect to the standard interactive interface of Redshift (e.g., 5439).'
        }
    ],
    params: [
        {
            key: 'keyConflictStrategy',
            desc: 'Strategy for handling primary key conflicts during incremental writes:' +
                '<ul>' +
                '  <li><b>IGNORE</b>: Ignore conflicts (default)</li>' +
                '  <li><b>REPLACE</b>: Replace on conflicts (optional)</li>' +
                '</ul>'
        },
        {
            key: 'dstWholeReplace',
            desc: 'Convert INSERT and UPDATE operations into full-row replacement on the target.'
        },
        {
            key: 'enableTimeZoneProcess',
            desc: 'Whether to enable time zone conversion for time fields.'
        },
        {
            key: 'timezone',
            desc: 'Target time zone, e.g., +08:00, Asia/Shanghai, America/New_York.'
        },
        {
            key: 'defaultZeroDate',
            desc: 'Default value for replacing \'0000-00-00 00:00:00\' / \'0000-00-00\' values. Optional values include:' +
                '\n- <b>null (empty)</b>' +
                '\n- <b>Time (14:23:33)</b>' +
                '\n- <b>Date (1970-01-01)</b>' +
                '\n- <b>DateTime (1970-01-01 00:00:00)</b>,' +
                '\n- <b>TimeZone Time (14:23:33+08:00 or 1970-01-01 00:00:00+08:00)</b>'
        },
        {
            key: 'caseSensitive',
            desc: 'Case sensitivity strategy for table names in SQL statements, including:' +
                '\n- <b>UpperCase (Convert to uppercase)</b>' +
                '\n- <b>LowerCase (Convert to lowercase)</b>' +
                '\n- <b>Sensitive (Add qualifiers)</b>' +
                '\n- <b>NoSpecified (No conversion/No qualifiers)</b>'
        },
        {
            key: 'writeStrategy',
            desc: 'Target write strategy, including:' +
                '\n- <b>ROW (Single row)</b>' +
                '\n- <b>MULTI_SQL (Multi-statement SQL)</b>' +
                '\n- <b>BATCH (Batch write, default option)</b>' +
                '\n- <b>COPY (PostgreSQL COPY command)</b>'
        },
        {
            key: 'defaultGisSRID',
            desc: 'Set the SRID for GIS data types.'
        }
    ],
    notice: [
        {
            key: 'Primary Key Conflict Handling',
            desc: 'PostgreSQL <= 9.4 or Greenplum <= 6 does not support conflict skipping or replacement. Performance may be affected when there are a large number of primary key conflicts.'
        }
    ],
    master_function: [
        {
            key: 'Zero-Value Time Handling',
            desc: 'Allow setting zero value for time to different data types to prevent errors when writing to the target.'
        }
    ]
}
