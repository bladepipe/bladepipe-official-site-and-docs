const MySQLCommon = {
    main_function: [
        {
            key: 'Schema Migration',
            desc: 'If the target schema does not exist, BladePipe will automatically generate and execute CREATE statements based on the source metadata and the mapping rule.'
        },
        {
            key: 'Full Data Migration',
            desc: 'Migrate data by sequentially scanning data in tables and writing it in batches to the target database.'
        },
        {
            key: 'Incremental Data Sync',
            desc: 'Sync of common DML like <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> is supported.'
        },
        {
            key: 'Data Verification and Correction',
            desc: 'Verify all existing data. Optionally, you can correct the inconsistent data based on verification results. Scheduled DataTasks are supported. <br /> For more information, see [Create Verification and Correction DataJob](../../../operation/job_manage/create_job/create_period_verification_correction_job).'
        },
        {
            key: 'Subscription Modification',
            desc: 'Add, delete, or modify the subscribed tables with support for historical data migration. For more information, see [Modify Subscription](../../../operation/job_manage/job_op/edit_job).'
        },
        {
            key: 'Table Name Mapping',
            desc: 'Support the mapping rules, namely, <b>keeping the name the same as that in Source</b>, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>, <b>truncating the name by "_digit" suffix</b>.'
        },
        {
            key: 'DDL Sync',
            desc: 'PostgreSQL DDL sync is realized by triggers. The user should have the permissions on triggers and tables. For more information, see [Permissions Required for PostgreSQL](/docs/dataMigrationAndSync/datasource_func/PostgreSQL/privs_for_pg/)'
        },
        {
            key: 'Metadata Retrieval',
            desc: 'Retrieve the target metadata with filtering conditions from the source table.'
        }
    ],
    master_function: [
        {
            key: 'Scheduled Full Data Migration',
            desc: 'For more information, see [Create Scheduled Full Data DataJob](../../../operation/job_manage/create_job/create_period_full_job).'
        },
        {
            key: 'Custom Code',
            desc: 'For more information, see [Custom Code Processing](../../../operation/job_manage/create_job/create_process_job), [Debug Custom Code](../../../operation/job_manage/job_op/debug_customer_code) and [Logging in Custom Code](../../../operation/job_manage/job_op/log_in_customer_code).'
        },
        {
            key: 'Data Filtering Conditions',
            desc: 'Support data filtering using WHERE conditions, with SQL-92 as the SQL language. For more information, see [Data Filtering](../../../operation/job_manage/create_job/create_data_filter_job).'
        },
        {
            key: 'Setting Target Primary Key',
            desc: 'Change the primary key to another field to facilitate data aggregation and other operations.'
        },
        {
            key: 'Adding Virtual Columns',
            desc: 'Support adding custom virtual columns with fixed values, such as region, ID, etc.'
        }
    ],
    notice: [],
    examples: [],
    faq: []
}

const MySQL = {
    ...MySQLCommon,
    notice: [
        {
            key: 'DDL Sync Limitations',
            desc: [
                '- `CREATE TABLE` (including `CREATE TABLE IF NOT EXISTS`) is filtered out by default.',
                '- `ALTER COLUMN ... TYPE ...`, `SET DATA TYPE` (including changes to length, precision, and scale), `SET NOT NULL`, and `DROP NOT NULL` are not supported.',
                '- Setting, replacing, or clearing column comments with `COMMENT ON COLUMN`, including clearing them with an empty string or `NULL`, is not supported.',
                '- `DROP CONSTRAINT`, adding CHECK constraints, adding foreign keys, `VALIDATE CONSTRAINT`, and `UNIQUE NULLS NOT DISTINCT` are not supported.',
                '- Replacing an existing target primary key with `DROP CONSTRAINT ..., ADD CONSTRAINT ... PRIMARY KEY ...` is not supported.',
                '- `DROP INDEX` (including the `IF EXISTS` and `CONCURRENTLY` forms) is not supported.',
                '- Expression indexes and currently unsupported index sort-order and operator-class options are not supported.',
                '- Synchronizing `USING gin(...)` indexes to MySQL is not supported.',
                '- The `WHERE` predicate of a partial index is not preserved. The index may be converted to a regular index covering all rows.',
                '- `USING` expressions that perform additional data calculations, such as `USING amount::bigint + 100`, are not supported.',
                '- `SET EXPRESSION AS (...)` for generated columns and `RESTART WITH ...` for identity columns are not supported.',
                '- Creating or modifying objects such as FUNCTION, PROCEDURE, and TRIGGER is not captured. Synchronizing comments on functions, indexes, constraints, and similar objects is not supported.',
                '- Synchronizing source-specific attributes such as `ALTER COLUMN ... SET STATISTICS` and table-level `SET (fillfactor=...)` is not supported.',
                '- Subscriptions do not automatically follow renamed tables. Subsequent DDL/DML is not synchronized if the new table name is not subscribed.',
                '- Reliable synchronization is not supported when DDL and `ROLLBACK TO SAVEPOINT` are combined in a single multi-statement request.'
            ].join('\n')
        }
    ]
};

const MariaDB = { ...MySQLCommon };
const AuroraForMySQL = { ...MySQLCommon };

export {
    MySQL,
    MariaDB,
    AuroraForMySQL
}
