const Pulsar = {
    main_function: [
        {
            key: 'Schema Migration',
            desc: 'If the specified Topic after mapping does not exist in the Target, BladePipe will automatically create the Topic, allowing setting the number of partitions.'
        },
        {
            key: 'Full Data Migration',
            desc: 'Migrate data by sequentially scanning data in tables and writing it in batches to the message-oriented middleware.'
        },
        {
             key: 'Incremental Data Sync',
            desc: 'Sync of common DML like <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> is supported. '
        },
        {
            key: 'Subscription Modification',
            desc: 'Add, delete, or modify the subscribed tables with support for historical data migration. For more information, see [Modify Subscription](../../operation/job_manage/job_op/edit_job).'
        },
        {
            key: 'Position Resetting',
            desc: 'Reset positions by file position or timestamp. Allow re-consumption of incremental data logs in a past period or since a specific Binlog file and position.' 
        },
        {   
            key: 'Metadata Retrieval',
            desc: 'Retrieve the target metadata with filtering conditions or target primary keys set from the source table.'
        }
    ],
    master_function: [
        {
            key: 'Topic Mapping Rules',
            desc: 'By default, Topic is mapped the same as that in the Source. Also, BladePipe supports the mapping rules, namely, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>, <b>truncating the name by "_digit" suffix</b>, <b>truncating the name by "_digit" suffix</b>. <b>concatenate in the format of SCHEMA_TABLE (metadata mirroring)</b>、<b>concatenate in the format of SCHEMA_TABLE (converting metadata to uppercase)</b>、<b>concatenate in the format of SCHEMA_TABLE (converting metadata to lowercase)</b>.'
        },
        {
            key: 'Table-level Topic',
            desc: 'Create Topics corresponding to the tables in the Source, and the table partitions can be obtained automatically.'
        },
        // {
        //     key: 'Whole Database Sync',
        //     desc: 'Support sync of DDLs to create, delete, and modify tables as well as the data. For more information, see [Sync Whole Database](../../operation/job_manage/create_job/create_db_sync_job).'
        // },
        {
            key: 'Scheduled Full Data Migration',
            desc: 'For more information, see [Create Scheduled Full Data DataJob](../../operation/job_manage/create_job/create_period_full_job).'
        },
        {
            key: 'Custom Code',
            desc: 'For more information, see [Custom Code Processing](../../operation/job_manage/create_job/create_process_job), [Debug Custom Code](../../operation/job_manage/job_op/debug_customer_code) and [Logging in Custom Code](../../operation/job_manage/job_op/log_in_customer_code).'
        },
        {
            key: 'Data Filtering Conditions',
            desc: 'Support data filtering using WHERE conditions, with SQL-92 as the SQL language. For more information, see [Data Filtering](../../operation/job_manage/create_job/create_data_filter_job).'
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

export {
    Pulsar
}
