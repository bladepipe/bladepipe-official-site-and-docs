export const OceanBase = {
    main_function: [
        {
            key: 'Schema Migration',
            desc: 'Automatically generates destination creation statements based on source metadata and mappings if the selected table does not exist at the target.'
        },
        {
            key: 'Full Data Migration',
            desc: 'Logical migration that sequentially scans table data and writes it in batches to the target database.'
        },
        {
            key: 'Incremental Real-time Sync',
            desc: 'Supports common DML sync operations such as <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b>. <br />Tables without primary keys will not sync UPDATE or DELETE operations (manual selection required).'
        },
        {
            key: 'Data Verification and Correction',
            desc: 'Performs full data verification and optionally corrects differential data based on verification results. Supports scheduled tasks. Documentation: [Create Scheduled Verification and Correction Job](../../operation/job_manage/create_job/create_verification_correction_job)'
        },
        {
            key: 'Modify Subscription',
            desc: 'Add, delete, or modify subscription tables, supporting historical data migration. Documentation: [Modify Subscription](../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: 'Reset Position',
            desc: 'Backtracks the position by <b>timestamp</b> or <b>Scn</b>, reprocessing Oracle Redo Log data from a past period.'
        },
        {
            key: 'Table Name Mapping',
            desc: 'Supports <b>consistent with the source</b>, <b>lowercase conversion</b>, <b>uppercase conversion</b>, <b>suffix truncation with \'_number\'</b>.'
        },
        {
            key: 'DDL Sync',
            desc: '\n- ALTER TABLE ADD, MODIFY, DROP COLUMN \n- TRUNCATE TABLE \n- ALTER TABLE RENAME TO \n- CREATE TABLE (full database sync) \n- DROP TABLE (full database sync)'
        },
        {
            key: 'Metadata Retrieval',
            desc: 'Retrieves metadata from the source table to the destination, querying with set filtering conditions.'
        },
    ],
    master_function: [
        {
            key: 'Scheduled Full Data Migration',
            desc: 'Documentation 1: [Create Scheduled Full Data Job](../../operation/job_manage/create_job/create_period_full_job) <br /> Documentation 2: [Scheduled Full Data for Incremental Data Migration](../../bestPractice/time_schedule_full)'
        },
        {
            key: 'Custom Code',
            desc: 'Documentation 1: [Create Custom Code Job](../../operation/job_manage/create_job/create_process_job) <br /> Documentation 2: [Debug Custom Code Job](../../operation/job_manage/job_op/debug_customer_code) <br /> Documentation 3: [Logging in Custom Code](../../operation/job_manage/job_op/log_in_customer_code)'
        },
        {
            key: 'Data Filtering Conditions',
            desc: 'Supports data filtering with WHERE conditions using SQL 92 subset. Documentation: [Create Data Filtering Job](../../operation/job_manage/create_job/create_data_filter_job)'
        },
        {
            key: 'Set Target Primary Key',
            desc: 'Change the primary key to another field for easier data aggregation and other operations.'
        },
        {
            key: 'Add Virtual Columns',
            desc: 'Supports adding custom virtual columns with fixed values, such as region, ID, etc.'
        },
    ],
    notice: [],
    faq: [],
    mapping: []
}
