const MySQL = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'See [Permissions Required for MySQL/MariaDB](../../datasource_func/MySQL/privs_for_mysql).'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the MySQL/MariaDB port (e.g., 3306).'
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
            key: 'deCycle',
            desc: 'Enable filtering in bidirectional sync to filter DML/DDL with specific markers.'
        },
        {
            key: 'specialSqlMode',
            desc: 'Set a specific SQL mode when initializing the connection between databases.'
        },
        {
            key: 'defaultGisSRID',
            desc: 'Set the SRID for GIS data types.'
        },
        {
            key: 'dstTimeZone',
            desc: 'Target time zone, e.g., +08:00, Asia/Shanghai, America/New_York, etc.'
        },
        {
            key: 'increParallelApplyStrategy',
            desc: 'Parallel write strategy for relational databases in the Target:' +
                '<ul>' +
                '  <li><b>KEY</b>: Parallel writing to partitions separated based on primary keys.<br></li>' +
                '  <li><b>TABLE</b>: Parallel writing to partitions separated based on tables.<br></li>' +
                '  <li><b>KEY_UPGRADE_TABLE</b>: Parallel writing to partitions separated based on primary keys. Upgrade the partition to a table if there is an update to the unique key.<br></li>' +
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

const MariaDB = MySQL;
const AuroraForMySQL = MySQL;

export {
    MySQL,
    MariaDB,
    AuroraForMySQL
}
