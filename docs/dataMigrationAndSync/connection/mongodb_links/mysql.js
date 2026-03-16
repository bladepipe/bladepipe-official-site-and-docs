const MySQL = {
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
            key: 'Data Verification and Correction',
            desc: 'Verify all existing data. Optionally, you can correct the inconsistent data based on verification results. Scheduled DataTasks are supported. <br /> For more information, see [Create Verification and Correction DataJob](../../../operation/job_manage/create_job/create_period_verification_correction_job).'
        },
        {
            key: 'Subscription Modification',
            desc: 'Add, delete, or modify the subscribed tables with support for historical data migration. For more information, see [Modify Subscription](../../../operation/job_manage/job_op/edit_job).'
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
    master_function: [],
    notice: [],
    examples: [],
    faq: []
}

const MariaDB = MySQL;
const AuroraForMySQL = MySQL;

export {
    MySQL,
    MariaDB,
    AuroraForMySQL
}
