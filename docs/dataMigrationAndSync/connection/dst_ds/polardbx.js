export const PolarDbX = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'SELECT, INSERT, DELETE, UPDATE, and common DDL permissions.'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the PolarDB-X port (e.g., 3306).'
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
        }
    ],
    master_function: [
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
