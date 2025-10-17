export const AnalyticDbForMySQL = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'A privileged account of AnalyticDB for MySQL, or a normal account with <b>SELECT</b>, <b>INSERT</b>, <b>DELETE</b>, <b>UPDATE</b>, <b> and common DDL permissions</b>.'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the AnalyticDB for MySQL port（e.g., 3306）.'
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
        },
    ]
}