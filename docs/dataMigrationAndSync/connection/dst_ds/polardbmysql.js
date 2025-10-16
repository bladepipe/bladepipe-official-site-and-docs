export const PolarDbForMySQL = {
    notice: [
        {
            key: 'Character Set',
            desc: 'Support <b>utf8</b>, <b>utf8mb4</b>, <b>latin1</b>. Other encodings have not been tested.'
        }
    ],
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'A <b>privileged account</b> or a normal account with read and write permissions of PolarDbMySQL.'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the PolarDbMySQL port (e.g., 3306).'
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
            key: 'mergeMaxInsertSize',
            desc: 'When the parallel strategy mergeMaxInsertSize is set to <b>TABLE_IMPORT_OPTIMIZE</b>, it defines the maximum number of rows to merge per batch for the same table (improve parallelism).'
        }
    ],
    master_function: [
        {
            key: 'Incremental Data Write Conflict Resolution Rule',
            desc: '<b>IGNORE</b>: Ignore conflicts (skip writing), <b>REPLACE</b>: Replace the entire row in case of conflicts.'
        },
        {
           key: 'Handling of Zero Value for Time',
            desc: 'Allow setting zero value for time to different data types to prevent errors when writing to the Target.'
        }
    ]
}
