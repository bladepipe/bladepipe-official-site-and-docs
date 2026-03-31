export const RagApi = {
    main_function: [
        {
            key: 'Full Data Migration',
            desc: 'Migrate data by sequentially scanning data in tables and writing it in batches to the target database. Supported _id types: <b>ObjectId</b>, <b>Long</b>, <b>Integer</b>.'
        },
        {
            key: 'Incremental Data Sync',
            desc: 'Sync of <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> is supported.'
        },
        {
            key: 'Subscription Modification',
            desc: 'Add, delete, or modify the subscribed tables with support for historical data migration. For more information, see [Modify Subscription](../../operation/job_manage/job_op/edit_job).'
        },
        {
            key: 'Position Resetting',
            desc: 'Reset positions by timestamp to consume the oplog in a past period again.'
        },
        {
            key: 'Supported Deployment',
            desc: 'Support <b>master-slave</b>, <b>replica set</b>, <b>sharded cluster</b>.'
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
        }
    ],
    notice: [],
    examples: [],
    faq: []
}
