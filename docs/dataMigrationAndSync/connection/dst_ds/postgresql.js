const PostgreSQL = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'Required permissions include <b>SELECT</b>, <b>INSERT</b>, <b>DELETE</b>, <b>UPDATE</b>, and common <b>DDL</b> permissions. <br /> For Aliyun AnalyticDB for PostgreSQL, initial accounts or those with <b>SELECT</b>, <b>INSERT</b>, <b>DELETE</b>, <b>UPDATE</b>, and <b> common DDL permissions</b> are needed.'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (sidecar) to connect to PostgreSQL / Greenplum / AnalyticDB for PostgreSQL / PolarDB for PostgreSQL standard interactive interface (e.g., 5432).'
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
            desc: 'Strategy of writing data to the Target, including:' +
                '\n- <b>ROW (single row)</b>' +
                '\n- <b>MULTI_SQL (multiple statements)</b>' +
                '\n- <b>BATCH (write data in batches, default option)</b>' +
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
            key: 'Handling of Zero Value for Time',
            desc: 'Allow setting zero value for time to different data types to prevent errors when writing to the Target.'
        }
    ]
}

const Greenplum = PostgreSQL;
const AnalyticDbForPg = PostgreSQL;
const AuroraForPg = PostgreSQL;

export {
    PostgreSQL,
    Greenplum,
    AnalyticDbForPg,
    AuroraForPg
}
