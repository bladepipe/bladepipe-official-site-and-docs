export const ClickHouse = {
    main_function: [
        {
            key: 'Schema Migration',
            desc: 'If the target does not have the selected table, it will automatically generate and execute the creation statement on the target based on the source metadata and mapping.'
        },
        {
            key: 'Full Data Migration',
            desc: 'Logical migration that sequentially scans the table data and writes it in batches to the target database.'
        },
        {
            key: 'Incremental Real-time Sync',
            desc: 'Supports common DML sync for <b>INSERT</b>, <b>UPDATE</b>, and <b>DELETE</b>.'
        },
        {
            key: 'Data Verification',
            desc: 'Performs full data verification and supports scheduling.'
        },
        {
            key: 'Modify Subscription',
            desc: 'Add, delete, or modify subscription tables, with support for historical data migration. Documentation: [Modify Subscription](../../operation/job_manage/job_op/edit_job).'
        },
        {
            key: 'Reset Position',
            desc: 'Supports rewinding the position based on file position or timestamp, allowing re-consumption of incremental logs from a specified Binlog file and position or a past period.'
        },
        {
            key: 'Table Name Mapping',
            desc: 'Supports <b>keep consistent with the source</b>, <b>convert to lowercase</b>, <b>convert to uppercase</b>, and <b>truncate with \'_number\' suffix</b>.'
        },
        {
            key: 'DDL Sync',
            desc: 'PostgreSQL DDL sync is realized by triggers. The user should have the permissions on triggers and tables. For more information, see [Permissions Required for PostgreSQL](../datasource_func/PostgreSQL/privs_for_pg) \n- ALTER TABLE ADD COLUMN, DROP COLUMN, MODIFY COLUMN, CHANGE COLUMN \n- CREATE TABLE (full database sync)'
        },
        {
            key: 'Metadata Retrieval',
            desc: 'Queries the target from the source table, with support for filter conditions and primary key settings.'
        }
    ],
    master_function: [
        {
            key: 'Scheduled Full Migration',
            desc: 'Documentation 1: [Create Scheduled Full Task](../../operation/job_manage/create_job/create_period_full_job) <br /> Documentation 2: [Use Scheduled Full Migration for Incremental Data](../../bestPractice/time_schedule_full).'
        },
        {
            key: 'Custom Code',
            desc: 'Documentation 1: [Create a Custom Code Task](../../operation/job_manage/create_job/create_process_job) <br /> Documentation 2: [Debug Custom Code Task](../../operation/job_manage/job_op/debug_customer_code) <br /> Documentation 3: [Log in Custom Code](../../operation/job_manage/job_op/log_in_customer_code).'
        },
        {
            key: 'Data Filtering Conditions',
            desc: 'Supports WHERE conditions for data filtering, using SQL 92 subset. Documentation: [Create Data Filter Task](../../operation/job_manage/create_job/create_data_filter_job).'
        },
        {
            key: 'Set Target Primary Key',
            desc: 'Change the primary key to another field for easier data aggregation and operations.'
        },
        {
            key: 'Add Virtual Columns',
            desc: 'Supports adding custom virtual columns with fixed values, such as region or ID.'
        }
    ],
    notice: [],
    examples: [],
    faq: []
}
