export const TiDB = {
    notice: [
        {
            key: 'TiDB Data Types',
            desc: 'Geospatial data is not supported.'
        },
    ],
    prepare: [
        {
            key: 'Permissions for Account',
            desc: '**INSERT**, **UPDATE**, **DELETE**, and **DDL** permissions.'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the TiDB port (e.g., port 4000).'
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
            key: 'writeStrategy',
            desc: 'Strategy of writing data to the Target, including:' +
                '\n- <b>ROW (Single row, default option)</b>' +
                '\n- <b>MULTI_SQL (Multiple statements)</b>'
        },
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
