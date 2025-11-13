export const StarRocks = {
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
            desc: 'Verify all existing data. Optionally, you can correct the inconsistent data based on verification results. Scheduled DataTasks are supported. <br /> For more information, see [Create Verification and Correction DataJob](../../operation/job_manage/create_job/create_period_verification_correction_job).'
        },
        {
            key: 'Subscription Modification',
            desc: 'Add, delete, or modify the subscribed tables with support for historical data migration. For more information, see [Modify Subscription](../../operation/job_manage/job_op/edit_job).'
        },
        {
            key: 'Position Resetting',
            desc: 'Reset the position by <b>timestamp</b> to consume Oracle Redo Log in a past period again.'
        },
        {
            key: 'Table Name Mapping',
            desc: 'Support the mapping rules, namely, <b>keeping the name the same as that in Source</b>, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>, <b>truncating the name by "_digit" suffix</b>.'
        },
        {
            key: 'DDL Sync',
            desc: '- ALTER TABLE ADD , MODIFY , DROP COLUMN \n- TRUNCATE TABLE \n- ALTER TABLE RENAME TO \n- CREATE TABLE (sync for entire database)'
        },
        {
            key: 'Metadata Retrieval',
            desc: 'Retrieve the target metadata with filtering conditions from the source table.'
        }
    ],
    master_function: [
        {
            key: 'Custom Table Properties',
            desc: 'Include settings for properties such as bucket count and replica count.'
        },
        {
            ey: 'Setting Data Partitions',
            desc: 'When creating a DataJob, specify partition definitions at the table level (static or dynamic). Automatically add these partition definitions during schema migration.'
        },
        // {
        //     key: 'Whole Database Sync',
        //     desc: 'Support sync of DDLs to create, delete, and modify tables as well as the data. For more information, see [Sync Whole Database](../../operation/job_manage/create_job/create_db_sync_job).'
        // },
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
    examples: [
    ],
    faq: [
    ]
}
