const Lindorm = {
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
            desc: 'Verify all existing data. Optionally, you can correct the inconsistent data based on verification results. Scheduled DataTasks are supported.'
        },
        {
            key: 'Subscription Modification',
            desc: 'Add, delete, or modify the subscribed tables with support for historical data migration. For more information, see [Modify Subscription](../../operation/job_manage/job_op/edit_job).'
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
            key: 'Custom Code',
            desc: 'For more information, see [Custom Code Processing](../../operation/job_manage/create_job/create_process_job), [Debug Custom Code](../../operation/job_manage/job_op/debug_customer_code) and [Logging in Custom Code](../../operation/job_manage/job_op/log_in_customer_code).'
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
            desc: 'Support data filtering using WHERE conditions, with SQL-92 as the SQL language. For more information, see [Data Filtering](../../operation/job_manage/create_job/create_data_filter_job).'
        }
    ],
    notice: [],
    examples: [],
    faq: []
}

export {
    Lindorm
}
