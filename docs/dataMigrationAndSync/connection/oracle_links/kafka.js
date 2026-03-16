export const Kafka = {
    main_function: [
        {
            key: 'Full Data Migration',
            desc: 'Migrate data by sequentially scanning data in tables and writing it in batches to the message-oriented middleware.'
        },
        {
            key: 'Incremental Data Sync',
            desc: 'Sync of common DML like <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> is supported.'
        },
        {
            key: 'Subscription Modification',
            desc: 'Add, delete, or modify the subscribed tables with support for historical data migration. For more information, see [Modify Subscription](../../../operation/job_manage/job_op/edit_job).'
        },
        {
            key: 'Position Resetting',
            desc: 'Reset the position by <b>timestamp</b> or <b>Scn</b> to consume Oracle Redo Log in a past period again.'
        },
        {
            key: 'Metadata Retrieval',
            desc: 'Retrieve the target metadata with filtering conditions from the source table.'
        }
    ],
    master_function: [
        {
            key: 'Topic Mapping Rules',
            desc: 'By default, Topic is formed by connecting source <b>instance id</b>, <b>database</b>, and <b>table</b> with . in between (e.g., ora-vgpq6q097174t6t.ORCL.dingtax.app_key). Also, it supports the mapping rules, namely, <b>keeping the name the same as that in Source</b>, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>.'
        },
        {
            key: 'Table-level Topic',
            desc: 'Create Topics corresponding to the tables in the Source, and the table partitions can be obtained automatically.'
        },
        {
            key: 'DDL Dedicated Topic',
            desc: 'Allow specifying a Topic for DDL. If not specified, DDL time is placed in partition 0 of the Topic created from the corresponding table.'
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
            desc: 'Change the primary key to another field.'
        }
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: []
}
