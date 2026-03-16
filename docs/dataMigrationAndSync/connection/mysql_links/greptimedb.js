const GreptimeDB = {
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
            desc: 'Reset positions by file position or timestamp. Allow re-consumption of incremental data logs in a past period or since a specific Binlog file and position.' 
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
        // {
        //     key: 'Whole Database Sync',
        //     desc: 'Support sync of DDLs to create, delete, and modify tables as well as the data. For more information, see [Sync Whole Database](../../operation/job_manage/create_job/create_db_sync_job).'
        // },
        {
            key: 'Scheduled Full Data Migration',
            desc: 'For more information, see [Create Scheduled Full Data DataJob](../../../operation/job_manage/create_job/create_period_full_job).'
        },
        {
            key: 'Custom Code',
            desc: 'For more information, see [Custom Code Processing](../../../operation/job_manage/create_job/create_process_job), [Debug Custom Code](../../../operation/job_manage/job_op/debug_customer_code) and [Logging in Custom Code](../../../operation/job_manage/job_op/log_in_customer_code).'
        },
        {
            key: 'Setting Target Primary Key',
            desc: 'Change the primary key to another field to facilitate data aggregation and other operations.'
        },
        {
            key: 'Setting Target Time Index',
            desc: 'Set Time Index of target GreptimeDB to facilitate data aggregation and other operations.'
        },
        {
            key: 'Data Filtering Conditions',
            desc: 'Support data filtering using WHERE conditions, with SQL-92 as the SQL language. For more information, see [Data Filtering](../../../operation/job_manage/create_job/create_data_filter_job).'
        }
    ],
    notice: [],
    examples: [
    ],
    faq: [],
    mapping: [
        {
            source: 'BIGINT',
            target: 'INT64'
        },
        {
            source: 'BINARY',
            target: 'BINARY'
        },
        {
            source: 'BIT',
            target: 'BINARY'
        },
        {
            source: 'BLOB',
            target: 'BINARY'
        },
        {
            source: 'CHAR',
            target: 'STRING'
        },
        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'DATETIME',
            target: 'DATETIME'
        },
        {
            source: 'DECIMAL',
            target: 'DECIMAL'
        },
        {
            source: 'DOUBLE',
            target: 'FLOAT64'
        },
        {
            source: 'ENUM',
            target: 'STRING'
        },
        {
            source: 'FLOAT',
            target: 'FLOAT32'
        },
        {
            source: 'GEOMCOLLECTION',
            target: null
        },
        {
            source: 'GEOMETRY',
            target: null
        },
        {
            source: 'GEOMETRYCOLLECTION',
            target: null
        },
        {
            source: 'INT',
            target: 'INT32'
        },
        {
            source: 'JSON',
            target: 'JSON'
        },
        {
            source: 'LINESTRING',
            target: null
        },
        {
            source: 'LONGBLOB',
            target: 'BINARY'
        },
        {
            source: 'LONGTEXT',
            target: 'STRING'
        },
        {
            source: 'MEDIUMBLOB',
            target: 'BINARY'
        },
        {
            source: 'MEDIUMINT',
            target: 'INT32'
        },
        {
            source: 'MEDIUMTEXT',
            target: 'STRING'
        },
        {
            source: 'MULTILINESTRING',
            target: null
        },
        {
            source: 'MULTIPOINT',
            target: null
        },
        {
            source: 'MULTIPOLYGON',
            target: null
        },
        {
            source: 'POINT',
            target: null
        },
        {
            source: 'POLYGON',
            target: null
        },
        {
            source: 'SET',
            target: 'STRING'
        },
        {
            source: 'SMALLINT',
            target: 'INT16'
        },
        {
            source: 'TEXT',
            target: 'STRING'
        },
        {
            source: 'TIME',
            target: null
        },
        {
            source: 'TIMESTAMP',
            target: 'TIMESTAMP_MILLISECOND'
        },
        {
            source: 'TINYBLOB',
            target: 'BINARY'
        },
        {
            source: 'TINYINT',
            target: 'INT8'
        },
        {
            source: 'TINYTEXT',
            target: 'STRING'
        },
        {
            source: 'VARBINARY',
            target: 'BINARY'
        },
        {
            source: 'VARCHAR',
            target: 'STRING'
        },
        {
            source: 'YEAR',
            target: 'INT32'
        }
    ]
}

export {
    GreptimeDB
}
