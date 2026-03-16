const SQLServer = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'See [Permissions Required for SQL Server](../../datasource_func/SqlServer/privs_for_sqlserver)'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the SQL Server port (e.g., 1433).'
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
            desc: 'Target SQL Server timezone, e.g., +08:00 Asia/Shanghai America/New_York.'
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
            desc: 'Strategy of writing data to the Target, including:' +
                '<ul>' +
                '  <li><b>ROW</b> (single row)</li>' +
                '  <li><b>MULTI_SQL</b> (multiple statements)</li>' +
                '  <li><b>BATCH</b> (by default, write data in batches)</li>' +
                '</ul>'
        }
    ],
    master_function: [
        {
            key: 'Removal of Target Data before Full Data Migration',
            desc: 'Remove the existing data in the Target before running the Full Data Migration, applicable for DataJobs reruning and scheduled Full Data migrations.'
        },
        {
            key: 'Recreating Target Table',
            desc: 'Recreate target tables before running the Full Data Migration, applicable for DataJobs reruning and scheduled Full Data migrations.'
        },
        {
            key: 'Incremental Data Write Conflict Resolution Rule',
            desc: '<b>IGNORE</b>: Ignore primary key conflicts (skip writing), <b>REPLACE</b>: Replace the entire row in case of primary key conflicts.'
        },
        {
            key: 'Handling of Zero Value for Time',
            desc: 'Allow setting zero value for time to different data types to prevent errors when writing to the Target.'
        }
    ]
}

export {
    SQLServer
}
