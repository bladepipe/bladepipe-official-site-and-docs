export const OceanBase = {
    notice: [
        {
            key: 'OceanBase Version',
            desc: 'Currently only OceanBase for MySQL is supported.'
        },
        {
            key: 'OceanBase Data Types',
            desc: 'Geospatial data is not supported.'
        }
    ],
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'SELECT, INSERT, DELETE, UPDATE, and common DDL permissions.'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the OceanBase port (e.g., 3306).'
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
            key: 'writeStrategy',
            desc: 'Target write strategies include:' +
                '\n- <b>ROW (single row, default)</b>' +
                '\n- <b>MULTI_SQL (multiple statements)</b>' +
                '\n- <b>BATCH (batch)</b>'
        }
    ],
    examples: [
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
            key: 'Highly Concurrent Row-Level Write',
            desc: 'It has the distributed database characteristics. A highly concurrent row-level write strategy (ROW) is adopted by default.'
        },
        {
            key: 'Incremental Data Write Conflict Resolution Rule',
            desc: '<b>IGNORE</b>: Ignore primary key conflicts (skip writing), <b>REPLACE</b>: Replace the entire row in case of primary key conflicts.'
        }
    ]
}
