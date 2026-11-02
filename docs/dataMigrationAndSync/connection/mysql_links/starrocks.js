export const StarRocks = {
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
            key: 'Position Resetting',
            desc: 'Reset positions by file position or timestamp. Allow re-consumption of incremental data logs in a past period or since a specific Binlog file and position.' 
        },
        {
            key: 'Table Name Mapping',
            desc: 'Support the mapping rules, namely, <b>keeping the name the same as that in Source</b>, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>, <b>truncating the name by "_digit" suffix</b>.'
        },
        {
            key: 'DDL Sync',
            desc: '\n- ALTER TABLE ADD COLUMN, MODIFY COLUMN, DROP COLUMN \n- CREATE TABLE (Whole Database Sync) \n- RENAME TABLE (Whole Database Sync) \n- DROP TABLE (Whole Database Sync)'
        },
        {
            key: 'Metadata Retrieval',
            desc: 'Retrieve the target metadata with filtering conditions or target primary keys set from the source table.'
        }
    ],
    master_function: [
        {
            key: 'Online DDL Compatibility',
            desc: 'Support <b>GH-OST</b>, <b>PT-OSC</b>, <b>Aliyun DMS Online DDL</b>, <b>PT_GHOST</b>.'
        },
        {
            key: 'Custom Table Properties',
            desc: 'Include settings for properties such as bucket count and replica count.'
        },
        {
            key: 'Setting Data Partitions',
            desc: 'When creating a DataJob, specify partition definitions at the table level (static or dynamic). Automatically add these partition definitions during schema migration.'
        },
        // {
        //     key: 'Whole Database Sync',
        //     desc: 'Support sync of DDLs to create, delete, and modify tables as well as the data. For more information, see [Sync Whole Database](../../../operation/job_manage/create_job/create_db_sync_job).'
        // },
        {
            key: 'Scheduled Full Data Migration',
            desc: 'For more information, see [Create Scheduled Full Data DataJob](../../../operation/job_manage/create_job/create_period_full_job).'
        },
        {
            key: 'Custom Code',
            desc: 'For more information, see [Custom Code Processing](../../../operation/job_manage/create_job/create_process_job), [Debug Custom Code](../../../operation/job_manage/job_op/debug_customer_code) and [Logging in Custom Code](../../../operation/job_manage/job_op/log_in_customer_code).'
        },
        {
            key: 'Adding Virtual Columns',
            desc: 'Support adding custom virtual columns with fixed values, such as region, ID, etc.'
        },
        {
            key: 'Setting Target Primary Key',
            desc: 'Change the primary key to another field to facilitate data aggregation and other operations.'
        },
        {
            key: 'Data Filtering Conditions',
            desc: 'Support data filtering using WHERE conditions, with SQL-92 as the SQL language. For more information, see [Data Filtering](../../../operation/job_manage/create_job/create_data_filter_job).'
        }
    ],
    notice: [
        {
            key: 'DDL Sync Limitations',
            desc: [
                '- Adding, dropping, and renaming secondary indexes are not synchronized, including regular, unique, and composite indexes. Examples: `ADD INDEX idx_name(name)`, `ADD UNIQUE INDEX uk_code(code)`, `DROP INDEX idx_name`, and `RENAME INDEX idx_name TO idx_name_v2`.',
                '- `ALTER TABLE ... ADD PRIMARY KEY (...)` and `ALTER TABLE ... DROP PRIMARY KEY` are not synchronized.',
                '- Column position options `FIRST` and `AFTER` are ignored. For example, `ADD COLUMN code VARCHAR(32) AFTER id` does not guarantee the same column order on the target.',
                '- Regular non-primary-key columns are mapped as nullable. For example, `MODIFY COLUMN name VARCHAR(100) NOT NULL` does not make a regular target column `NOT NULL`. Target primary key and partition columns have separate constraints.',
                '- Standalone default changes are not synchronized, such as `ALTER TABLE t ALTER COLUMN qty SET DEFAULT 9` and `ALTER TABLE t ALTER COLUMN qty DROP DEFAULT`. Constant defaults in `CREATE TABLE`, `ADD COLUMN`, and `MODIFY COLUMN` are preserved according to the mapping.',
                '- Function defaults are omitted, such as `DEFAULT CURRENT_TIMESTAMP`, `DEFAULT CURRENT_TIMESTAMP(6)`, `DEFAULT NOW()`, and `DEFAULT (UUID_TO_BIN(UUID()))`.',
                '- When a column change returns `Can not change default value` or `Cannot shorten string length` on the target, a warning is logged and that target DDL statement is skipped. Type, length, and other changes in the skipped statement do not take effect.',
                '- Type, length, and precision changes depend on the target version and column usage. Not all conversions can be executed. For example, expanding `VARCHAR(100)` to `VARCHAR(200)` and shortening it to `VARCHAR(50)` may have different results.',
                '- Adding or modifying `MEDIUMBLOB` and `LONGBLOB` columns is filtered out, such as `ADD COLUMN payload MEDIUMBLOB`. `TINYBLOB` and `BLOB` map to `VARBINARY` and require StarRocks 3.0 or later.',
                '- An `ALTER TABLE` with multiple operations may be split into multiple target DDL statements, each executed or filtered separately. Atomic execution of the entire source statement is not guaranteed. Example: `ADD COLUMN enabled BOOLEAN, MODIFY COLUMN name VARCHAR(100), DROP COLUMN obsolete`.'
            ].join('\n')
        }
    ],
    examples: [],
    faq: []
}
