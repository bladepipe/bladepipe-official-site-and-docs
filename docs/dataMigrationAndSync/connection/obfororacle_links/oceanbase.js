export const OceanBase = {
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
            desc: 'Sync of common DML like <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> is supported.  <br /> UPDATE and DELETE for tables without primary keys are not synced by default (manual selection required).'
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
            desc: 'Reset positions by timestamp. Allow re-consumption of incremental data logs in a past period.' 
        },
        {
            key: 'Table Name Mapping',
            desc: 'Support the mapping rules, namely, <b>keeping the name the same as that in Source</b>, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>, <b>truncating the name by "_digit" suffix</b>.'
        },
        {
            key: 'DDL Sync',
            desc: '\n- ALTER TABLE ADD , MODIFY , DROP COLUMN \n- TRUNCATE TABLE \n- ALTER TABLE RENAME TO \n- CREATE TABLE (Whole database sync) \n- DROP TABLE (Whole database sync)'
        },
        {
            key: 'Metadata Retrieval',
            desc: 'Retrieve the target metadata with filtering conditions set from the source table.'
        }
    ],
    master_function: [
        {
            key: 'Custom Code',
            desc: 'For more information, see [Custom Code Processing](../../../operation/job_manage/create_job/create_process_job), [Debug Custom Code](../../../operation/job_manage/job_op/debug_customer_code) and [Logging in Custom Code](../../../operation/job_manage/job_op/log_in_customer_code).'
        },
        {
            key: 'Data Filtering Conditions',
            desc: 'Support data filtering using WHERE conditions, with SQL-92 as the SQL language. For more information, see [Data Filtering](../../../operation/job_manage/create_job/create_data_filter_job).'
        }
    ],
    notice: [],
    faq: [],
    mapping: [
        {
            source: 'CHAR',
            target: 'CHAR'
        },
        {
            source: 'NCHAR',
            target: 'CHAR'
        },
        {
            source: 'VARCHAR2',
            target: 'VARCHAR'
        },
        {
            source: 'NVARCHAR',
            target: 'VARCHAR'
        },
        {
            source: 'NVARCHAR2',
            target: 'VARCHAR'
        },
        {
            source: 'NUMBER_BIGINT',
            target: 'BIGINT'
        },
        {
            source: 'NUMBER_DECIMAL',
            target: 'DECIMAL'
        },
        {
            source: 'FLOAT',
            target: 'FLOAT'
        },
        {
            source: 'BINARY_FLOAT',
            target: 'FLOAT'
        },
        {
            source: 'BINARY_DOUBLE',
            target: 'DOUBLE'
        },
        {
            source: 'CLOB',
            target: 'TEXT'
        },
        {
            source: 'DATE',
            target: 'DATETIME'
        },
        {
            source: 'TIMESTAMP',
            target: 'TIMESTAMP'
        },
        {
            source: 'TIMESTAMP_WITH_TIME_ZONE',
            target: 'TIMESTAMP'
        },
        {
            source: 'TIMESTAMP_WITH_LOCAL_TIME_ZONE',
            target: 'TIMESTAMP'
        },
        {
            source: 'INTERVAL_YEAR_TO_MONTH',
            target: 'VARCHAR'
        },
        {
            source: 'INTERVAL_DAY_TO_SECOND',
            target: 'VARCHAR'
        },
        {
            source: 'ROWID',
            target: 'VARCHAR'
        },
        {
            source: 'XMLTYPE',
            target: 'VARCHAR'
        },
        {
            source: 'HTTPURITYPE',
            target: 'VARCHAR'
        }
    ]
}
