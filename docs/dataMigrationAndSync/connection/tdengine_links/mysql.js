const MySQL = {
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
            desc: 'Sync of common DML like <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> is supported.  <br /> UPDATE and DELETE for tables without primary keys are not synced by default (manual selection required).'
        },
        {
            key: 'Data Verification and Correction',
            desc: 'Verify all existing data. Optionally, you can correct the inconsistent data based on verification results. Scheduled DataTasks are supported. <br /> For more information, see [Create Verification and Correction DataJob](../../operation/job_manage/create_job/create_period_verification_correction_job).'
        },
        {
            key: 'Subscription Modification',
            desc: 'Add, delete, or modify the subscribed tables with support for historical data migration. For more information, see [Modify Subscription](../../operation/job_manage/job_op/edit_job).'
        },
        {
            key: 'Position Resetting',
            desc: 'Reset positions by offsets. Allow re-consumption of incremental data logs in a past period or since a specific offset.'
        },
        {
            key: 'Table Name Mapping',
            desc: 'Support the mapping rules, namely, <b>keeping the name the same as that in Source</b>, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>, <b>truncating the name by "_digit" suffix</b>.'
        },
        {
            key: 'Metadata Retrieval',
            desc: 'Retrieve the target metadata with filtering conditions or target primary keys set from the source table.'
        }
    ],
    master_function: [
        {
            key: 'Whole Database Sync',
            desc: 'Support sync of DDLs to create, delete, and modify tables as well as the data. For more information, see [Sync Whole Database](../../operation/job_manage/create_job/create_db_sync_job).'
        },
        {
            key: 'Custom Code',
            desc: 'For more information, see [Custom Code Processing](../../operation/job_manage/create_job/create_process_job), [Debug Custom Code](../../operation/job_manage/job_op/debug_customer_code) and [Logging in Custom Code](../../operation/job_manage/job_op/log_in_customer_code).'
        },
        {
            key: 'Setting Target Primary Key',
            desc: 'Change the primary key to another field to facilitate data aggregation and other operations.'
        },
        {
            key: 'Data Filtering Conditions',
            desc: 'Support data filtering using WHERE conditions, with SQL-92 as the SQL language. For more information, see [Data Filtering](../../operation/job_manage/create_job/create_data_filter_job).'
        },
        {
            key: 'Subtable Subscription Filtering Conditions',
            desc: 'For supertable sync, BladePipe supports subtable subscription filtering by WHERE condition. All subtables are subscribed by default. For more information, see [TDengine Query Topic](https://docs.tdengine.com/advanced-features/data-subscription/#query-topic).'
        },
    ],
    notice: [],
    examples: [
        {
            key: 'Sync Data from TDengine to MySQL',
            desc: 'See [Sync Data from TDengine to MySQL](https://www.bladepipe.com/blog/tech_share/tdengine_mysql_sync/)'
        }
    ],
    faq: [],
    mapping: [
        {
            source: 'TINYINT',
            target: 'TINYINT'
        },
        {
            source: 'TINYINT_UNSIGNED',
            target: 'TINYINT'
        },
        {
            source: 'SMALLINT',
            target: 'SMALLINT'
        },
        {
            source: 'SMALLINT_UNSIGNED',
            target: 'SMALLINT'
        },
        {
            source: 'INT',
            target: 'INT'
        },
        {
            source: 'INT_UNSIGNED',
            target: 'INT'
        },
        {
            source: 'BIGINT',
            target: 'BIGINT'
        },
        {
            source: 'BIGINT_UNSIGNED',
            target: 'BIGINT'
        },
        {
            source: 'DOUBLE',
            target: 'DOUBLE'
        },
        {
            source: 'FLOAT',
            target: 'FLOAT'
        },
        {
            source: 'BOOL',
            target: 'BIT'
        },
        {
            source: 'NCHAR',
            target: 'CHAR'
        },
        {
            source: 'VARCHAR',
            target: 'VARCHAR'
        },
        {
            source: 'BINARY',
            target: 'VARCHAR'
        },
        {
            source: 'TIMESTAMP',
            target: 'TIMESTAMP'
        },
        {
            source: 'JSON',
            target: 'JSON'
        },
        {
            source: 'VARBINARY',
            target: 'VARBINARY'
        },
        {
            source: 'GEOMETRY',
            target: 'GEOMETRY'
        }
    ]
}

const MariaDB = {...MySQL};
MariaDB.examples = []

const AuroraForMySQL = {...MySQL}
AuroraForMySQL.examples = []

export {
    MySQL,
    MariaDB,
    AuroraForMySQL
}
