export const Elasticsearch = {
    main_function: [
        {
            key: 'Schema Migration',
            desc: 'If the target index does not exist, BladePipe will create the index mapping in the target based on the source metadata and mapping rules.'
        },
        {
            key: 'Full Data Migration',
            desc: 'Migrate data by sequentially scanning data in tables and writing it in batches to the target database.'
        },
        {
            key: 'Incremental Data Sync',
            desc: 'Sync of common DML like <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> is supported.  <br /> UPDATE and DELETE for tables without primary keys are not synced.'
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
            key: 'Index Name Mapping',
            desc: 'Support the mapping rules, namely, <b>concatenation with underscores (dataJobName_DB_SCHEMA_table)</b>, <b>keeping the name the same as that in Source</b>, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>, <b>truncating the name by "_digit" suffix</b>.'
        },
        {
            key: 'DDL Sync',
            desc: 'PostgreSQL DDL sync is realized by triggers. The user should have the permissions on triggers and tables. For more information, see [Permissions Required for PostgreSQL](../datasource_func/PostgreSQL/privs_for_pg)'
        },
        {
            key: 'Metadata Retrieval',
            desc: 'Retrieve the target metadata with filtering conditions or target primary keys set from the source table.'
        }
    ],
    master_function: [
        {
            key: 'Optional Fields in Indexing',
            desc: 'By default, all fields are indexed. Specific fields can be excluded from indexing.'
        },
        {
            key: 'Field-level Analyzers',
            desc: 'Allow selecting analyzers for string fields that are indexed. Support STANDARD (default), SIMPLE, and other common analyzers, with the option to specify custom analyzers.'
        },
        {
            key: 'Setting Index _id Field',
            desc: 'By default, the _id field is a concatenation of the source primary key values. It can be changed to other field values.'
        },
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
        }
    ],
    notice: [],
    examples: [],
    faq: []
}
