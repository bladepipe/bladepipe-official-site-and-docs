export const Redis = {
    main_function: [
        {
            key: 'Full Data Migration',
            desc: 'Migrate data by sequentially scanning data in tables and writing it in batches to the target database. The default data format is JSON.'
        },
        {
            key: 'Incremental Data Sync',
            desc: 'Sync of common DML like <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> is supported.'
        },
        {
            key: 'Data Verification and Correction',
            desc: 'Verify all existing data. Optionally, you can correct the inconsistent data based on verification results. Scheduled DataTasks are supported. <br /> For more information, see [Create Verification and Correction DataJob](../../../operation/job_manage/create_job/create_period_verification_correction_job). This function is not applicable to tables without primary keys.'
        },
        {
            key: 'Subscription Modification',
            desc: 'Add, delete, or modify the subscribed tables with support for historical data migration. For more information, see [Modify Subscription](../../../operation/job_manage/job_op/edit_job).'
        },
        {
            key: 'Position Resetting',
            desc: 'Reset positions by file position or timestamp. Allow re-consumption of incremental data logs in a past period or since a specific Binlog file and position.' 
        },
    ],
    master_function: [
        {
            key: 'Concatenated Key',
            desc: 'Form the target cache key by concatenating source <b>database</b>, <b>table</b>, and <b>primary key value</b> with colons.'
        },
        {
            key: 'JSON Data Format',
            desc: 'Serialize structured source data into JSON format. Allow field name conversion based on the rules, such as <b>keeping the name the same as that in Source</b>, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>, or <b>camel case</b>.'
        },
    ],
    notice: [],
    examples: [
        {
            key: 'Data Migration and Synchronization from MySQL to Redis',
            desc: 'See [Data Migration and Synchronization from MySQL to Redis](../../blog/tech_share/mysql_redis_sync)'
        }
    ],
    faq: [],
    mapping: []
}
