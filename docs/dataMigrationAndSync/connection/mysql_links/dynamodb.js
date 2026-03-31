const DynamoDB = {
    main_function: [
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
        }
    ],
    master_function: [
        {
            key: 'Custom Code',
            desc: 'For more information, see [Custom Code Processing](../../operation/job_manage/create_job/create_process_job), [Debug Custom Code](../../operation/job_manage/job_op/debug_customer_code) and [Logging in Custom Code](../../operation/job_manage/job_op/log_in_customer_code).'
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
    DynamoDB
}
