export const Kafka = {
    main_function: [
        {
            key: 'Schema Migration',
            desc: 'If the specified Topic after mapping does not exist in the Target, BladePipe will automatically create the Topic, allowing setting the number of partitions.'
        },
        {
            key: 'Full Data Migration',
            desc: 'Migrate data by sequentially scanning data in tables and writing it in batches to the message middleware.'
        },
        {
             key: 'Incremental Data Sync',
            desc: 'Sync of common DML like <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> is supported. '
        },
        {
            key: 'Subscription Modification',
            desc: 'Add, delete, or modify the subscribed tables with support for historical data migration. For more information, see [Modify Subscription](../../../operation/job_manage/job_op/edit_job).'
        },
        {
            key: 'Position Resetting',
            desc: 'Reset positions by data ID or timestamp. Allow re-consumption of CDC data in a past period.' 
        },
        {
            key: 'Table Name Mapping',
            desc: 'Support the mapping rules, namely, <b>keeping the name the same as that in Source</b>, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>.'
        },
        {
            key: 'Metadata Retrieval',
            desc: 'Retrieve the target metadata with filtering conditions or target primary keys set from the source table.'
        }
    ],
    master_function: [
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
        }
    ],
    notice: [
        {
            key: 'Hana Trigger Recording Data Before Changes',
            desc: 'Considering the efficiency of Hana triggers, in the single CDC table mode, only the primary key data before changes is recorded currently.'
        },
    ],
    examples: [],
    faq: [],
    mapping: []
}
