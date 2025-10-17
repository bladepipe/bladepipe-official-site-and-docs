export const OpenGauss = {
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
            key: 'Table Name Mapping',
            desc: 'Support the mapping rules, namely, <b>keeping the name the same as that in Source</b>, <b>converting the text to lowercase</b>, <b>converting the text to uppercase</b>, <b>truncating the name by "_digit" suffix</b>.'
        },
        {
            key: 'Metadata Retrieval',
            desc: 'Retrieve the target metadata with filtering conditions from the source table.'
        }
    ],
    master_function: [
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
            desc: 'Change the primary key to another field to facilitate data aggregation and other operations.'
        }
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: [
        {
            source: 'SMALLSERIAL',
            target: 'SMALLSERIAL'
        },
        {
            source: 'SERIAL',
            target: 'SERIAL'
        },
        {
            source: 'BIGSERIAL',
            target: 'BIGSERIAL'
        },
        {
            source: 'SMALLINT',
            target: 'SMALLINT'
        },
        {
            source: 'INTEGER',
            target: 'INTEGER'
        },
        {
            source: 'BIGINT',
            target: 'BIGINT'
        },
        {
            source: 'OID',
            target: 'OID'
        },
        {
            source: 'NUMERIC',
            target: 'NUMERIC'
        },
        {
            source: 'REAL',
            target: 'REAL'
        },
        {
            source: 'DOUBLE_PRECISION',
            target: 'DOUBLE_PRECISION'
        },
        {
            source: 'MONEY',
            target: 'MONEY'
        },
        {
            source: 'CHARACTER',
            target: 'CHARACTER'
        },
        {
            source: 'BPCHAR',
            target: 'BPCHAR'
        },
        {
            source: 'CHARACTER_VARYING',
            target: 'CHARACTER_VARYING'
        },
        {
            source: 'TEXT',
            target: 'TEXT'
        },
        {
            source: 'NAME',
            target: 'NAME'
        },
        {
            source: 'TIMESTAMP_WITHOUT_TIME_ZONE',
            target: 'TIMESTAMP_WITHOUT_TIME_ZONE'
        },
        {
            source: 'TIMESTAMP_WITH_TIME_ZONE',
            target: 'TIMESTAMP_WITH_TIME_ZONE'
        },
        {
            source: 'TIME_WITHOUT_TIME_ZONE',
            target: 'TIME_WITHOUT_TIME_ZONE'
        },
        {
            source: 'TIME_WITH_TIME_ZONE',
            target: 'TIME_WITH_TIME_ZONE'
        },
        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'INTERVAL',
            target: 'INTERVAL'
        },
        {
            source: 'BOOLEAN',
            target: 'BOOLEAN'
        },
        {
            source: 'XML',
            target: 'XML'
        },
        {
            source: 'BYTEA',
            target: 'BYTEA'
        },
        {
            source: 'REF_CURSOR',
            target: 'REF_CURSOR'
        },
        {
            source: 'POINT',
            target: 'POINT'
        },
        {
            source: 'LINE',
            target: 'LINE'
        },
        {
            source: 'LSEG',
            target: 'LSEG'
        },
        {
            source: 'BOX',
            target: 'BOX'
        },
        {
            source: 'PATH',
            target: 'PATH'
        },
        {
            source: 'POLYGON',
            target: 'POLYGON'
        },
        {
            source: 'CIRCLE',
            target: 'CIRCLE'
        },
        {
            source: 'GEOMETRY',
            target: 'GEOMETRY'
        },
        {
            source: 'GEOGRAPHY',
            target: 'GEOGRAPHY'
        },
        {
            source: 'CIDR',
            target: 'CIDR'
        },
        {
            source: 'INET',
            target: 'INET'
        },
        {
            source: 'MACADDR',
            target: 'MACADDR'
        },
        {
            source: 'MACADDR8',
            target: 'MACADDR8'
        },
        {
            source: 'HSTORE',
            target: 'HSTORE'
        },
        {
            source: 'CITEXT',
            target: 'CITEXT'
        },
        {
            source: 'TSVECTOR',
            target: 'TSVECTOR'
        },
        {
            source: 'TSQUERY',
            target: 'TSQUERY'
        },
        {
            source: 'UUID',
            target: 'UUID'
        },
        {
            source: 'JSON',
            target: 'JSON'
        },
        {
            source: 'JSONB',
            target: 'JSONB'
        },
        {
            source: 'INT4RANGE',
            target: 'INT4RANGE'
        },
        {
            source: 'INT8RANGE',
            target: 'INT8RANGE'
        },
        {
            source: 'NUMRANGE',
            target: 'NUMRANGE'
        },
        {
            source: 'TSRANGE',
            target: 'TSRANGE'
        },
        {
            source: 'TSTZRANGE',
            target: 'TSTZRANGE'
        },
        {
            source: 'DATERANGE',
            target: 'DATERANGE'
        },
        {
            source: 'TXID_SNAPSHOT',
            target: 'TXID_SNAPSHOT'
        },
        {
            source: 'PG_LSN',
            target: 'PG_LSN'
        },
        {
            source: 'PG_NODE_TREE',
            target: 'PG_NODE_TREE'
        }
    ]
}
