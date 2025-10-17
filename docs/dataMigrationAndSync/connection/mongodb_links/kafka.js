export const Kafka = {
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
            key: 'Table-Level Topic',
            desc: 'Create topics at the source table level. Automatically handles table partitioning.'
        },
        {
            key: 'DDL Dedicated Topic',
            desc: 'Supports specifying a topic for DDL. If not specified, DDL events are placed in partition 0 of the corresponding table topic.'
        }
    ],
    notice: [
        {
            key: 'Target Side Must Pre-Create Topic',
            desc: 'MongoDB to Kafka / AutoMQ does not support automatic topic creation.'
        }
    ],
    examples: [],
    faq: [],
    mapping: []
}
