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
            desc: 'Reset positions by data ID or timestamp. Allow re-consumption of CDC data in a past period.' 
        },
        {
            key: 'Table Name Mapping',
            desc: 'Support the mapping rules, namely, <b>keeping the name the same as that in Source</b>, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>, <b>truncating the name by "_digit" suffix</b>.'
        },
        {
            key: 'Metadata Retrieval',
            desc: 'Retrieve the target metadata with filtering conditions or target primary keys set from the source table.'
        }
    ],
    master_function: [
        {
            key: 'Custom Table Properties',
            desc: 'Include settings for properties such as bucket count and replica count.'
        },
        {
            key: 'Setting Data Partitions',
            desc: 'When creating a DataJob, specify partition definitions at the table level (static or dynamic). Automatically add these partition definitions during schema migration.'
        },
        {
            key: 'Scheduled Full Data Migration',
            desc: 'For more information, see [Create Scheduled Full Data DataJob](../../../operation/job_manage/create_job/create_period_full_job).'
        },
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
    examples: [
    ],
    faq: [
    ],
    mapping: [
        {
            source: 'TINYINT',
            target: 'TINYINT'
        },
        {
            source: 'SMALLINT',
            target: 'SMALLINT'
        },
        {
            source: 'INT',
            target: 'INT'
        },
        {
            source: 'BIGINT',
            target: 'BIGINT'
        },
        {
            source: 'DECIMAL',
            target: 'DECIMAL'
        },
        {
            source: 'SMALLDECIMAL',
            target: 'DECIMAL'
        },
        {
            source: 'REAL',
            target: 'DOUBLE'
        },
        {
            source: 'FLOAT',
            target: 'DOUBLE'
        },
        {
            source: 'DOUBLE',
            target: 'DOUBLE'
        },
        {
            source: 'BOOLEAN',
            target: 'BOOLEAN'
        },
        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'SECONDDATE',
            target: 'DATETIME'
        },
        {
            source: 'TIMESTAMP',
            target: 'DATETIME'
        },
        {
            source: 'TIME',
            target: 'STRING'
        },
        {
            source: 'CHAR',
            target: 'VARCHAR'
        },
        {
            source: 'NCHAR',
            target: 'VARCHAR'
        },
        {
            source: 'VARCHAR',
            target: 'VARCHAR'
        },
        {
            source: 'NVARCHAR',
            target: 'VARCHAR'
        },
        {
            source: 'ALPHANUM',
            target: 'VARCHAR'
        },
        {
            source: 'SHORTTEXT',
            target: 'VARCHAR'
        },
        {
            source: 'CLOB',
            target: 'STRING'
        },
        {
            source: 'NCLOB',
            target: 'STRING'
        },
        {
            source: 'TEXT',
            target: 'STRING'
        },
        {
            source: 'BINTEXT',
            target: 'STRING'
        },
        {
            source: 'BLOB',
            target: 'STRING'
        },
        {
            source: 'BINARY',
            target: 'STRING'
        },
        {
            source: 'VARBINARY',
            target: 'STRING'
        },
        {
            source: 'ARRAY',
            target: 'ARRAY'
        },
        {
            source: 'ST_POINT',
            target: 'STRING'
        },
        {
            source: 'ST_GEOMETRY',
            target: 'STRING'
        },
    ]
}
