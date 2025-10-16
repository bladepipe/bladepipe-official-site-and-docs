export const OceanBase = {
    main_function: [
        {
            key: '结构迁移',
            desc: '如目标不存在所选表，则自动根据源端元数据，结合映射生成对端创建语句并执行创建'
        },
        {
            key: '全量数据迁移',
            desc: '逻辑迁移，通过顺序扫描表数据，将数据分批写入到对端数据库'
        },
        {
            key: '增量实时同步',
            desc: '支持 <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> 常见 DML 同步 <br /> 无主键表 UPDATE, DELETE 不同步(需手动勾选)'
        },
        {
            key: '数据校验和订正',
            desc: '全量数据校验，并可选根据校验结果订正差异数据，支持定时，文档：[创建定时校验订正任务](../../operation/job_manage/create_job/create_verification_correction_job)'
        },
        {
            key: '修改订阅',
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '重置位点',
            desc: '支持按照文件位点、时间戳 回溯位点，重新消费过去一段时间或指定 Binlog 文件和位点开始的增量日志'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: 'DDL 同步',
            desc: 'PostgreSQL DDL 同步基于 <b>触发器</b> 实现，需具备相应的 <b>触发器</b> 和 <b>表</b> 权限。文档：[PostgreSQL 需要的权限](../datasource_func/PostgreSQL/privs_for_pg) \n- ALTER TABLE ADD COLUMN, DROP COLUMN, MODIFY COLUMN \n- ADD INDEX \n- RENAME TABLE \n- CREATE TABLE（全库同步）'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的，查询设置过对端主键的'
        },
    ],
    master_function: [
        {
            key: '自定义代码',
            desc: '文档1：[创建自定义代码任务](../../operation/job_manage/create_job/create_process_job) <br />文档2：[自定义代码任务 debug](../../operation/job_manage/job_op/debug_customer_code) <br />文档3：[在自定义代码中打日志](../../operation/job_manage/job_op/log_in_customer_code)'
        },
        {
            key: '添加虚拟列',
            desc: '支持添加自定义的虚拟列，指定的值为固定值，如区域、编号等'
        },
        {
            key: '设置目标主键',
            desc: '变更主键为其他字段，方便数据聚合等操作'
        },
    ],
    notice: [],
    faq: [],
    mapping: [
        {
            source: 'SMALLSERIAL',
            target: 'INT'
        },
        {
            source: 'SERIAL',
            target: 'BIGINT'
        },
        {
            source: 'BIGSERIAL',
            target: 'BIGINT'
        },

        {
            source: 'SMALLINT',
            target: 'SMALLINT'
        },
        {
            source: 'INTEGER',
            target: 'INT'
        },
        {
            source: 'BIGINT',
            target: 'BIGINT'
        },

        {
            source: 'OID',
            target: ' null'
        },
        {
            source: 'NUMERIC',
            target: 'DECIMAL'
        },
        {
            source: 'REAL',
            target: 'FLOAT'
        },
        {
            source: 'DOUBLE_PRECISION',
            target: 'DOUBLE'
        },

        {
            source: 'MONEY',
            target: 'DECIMAL'
        },

        {
            source: 'CHARACTER',
            target: 'VARCHAR'
        },
        {
            source: 'BPCHAR',
            target: ' null'
        },
        {
            source: 'CHARACTER_VARYING',
            target: 'VARCHAR'
        },
        {
            source: 'TEXT',
            target: 'TEXT'
        },
        {
            source: 'NAME',
            target: ' null'
        },

        {
            source: 'TIMESTAMP_WITHOUT_TIME_ZONE',
            target: 'DATETIME'
        },
        {
            source: 'TIMESTAMP_WITH_TIME_ZONE',
            target: 'TIMESTAMP'
        },
        {
            source: 'TIME_WITHOUT_TIME_ZONE',
            target: 'DATETIME'
        },
        {
            source: 'TIME_WITH_TIME_ZONE',
            target: 'TIMESTAMP'
        },
        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'INTERVAL',
            target: 'DATE'
        },

        {
            source: 'BIT',
            target: 'BINARY'
        },
        {
            source: 'BIT_VARYING',
            target: 'BINARY'
        },
        {
            source: 'BOOLEAN',
            target: 'SMALLINT'
        },

        {
            source: 'XML',
            target: 'TEXT'
        },
        {
            source: 'BYTEA',
            target: 'BINARY'
        },
        {
            source: 'REF_CURSOR',
            target: ' null'
        },

        {
            source: 'POINT',
            target: ' null'
        },
        {
            source: 'LINE',
            target: ' null'
        },
        {
            source: 'LSEG',
            target: ' null'
        },
        {
            source: 'BOX',
            target: ' null'
        },
        {
            source: 'PATH',
            target: ' null'
        },
        {
            source: 'POLYGON',
            target: ' null'
        },
        {
            source: 'CIRCLE',
            target: ' null'
        },
        {
            source: 'GEOMETRY',
            target: ' null'
        },
        {
            source: 'GEOGRAPHY',
            target: ' null'
        },

        {
            source: 'CIDR',
            target: ' null'
        },
        {
            source: 'INET',
            target: ' null'
        },
        {
            source: 'MACADDR',
            target: ' null'
        },
        {
            source: 'MACADDR8',
            target: ' null'
        },
        {
            source: 'HSTORE',
            target: ' null'
        },
        {
            source: 'CITEXT',
            target: ' null'
        },

        {
            source: 'TSVECTOR',
            target: ' null'
        },
        {
            source: 'TSQUERY',
            target: ' null'
        },

        {
            source: 'UUID',
            target: 'VARCHAR'
        },

        {
            source: 'JSON',
            target: 'LONGTEXT'
        },
        {
            source: 'JSONB',
            target: 'BINARY'
        },

        {
            source: 'INT4RANGE',
            target: ' null'
        },
        {
            source: 'INT8RANGE',
            target: ' null'
        },
        {
            source: 'NUMRANGE',
            target: ' null'
        },
        {
            source: 'TSRANGE',
            target: ' null'
        },
        {
            source: 'TSTZRANGE',
            target: ' null'
        },
        {
            source: 'DATERANGE',
            target: ' null'
        },

        {
            source: 'TXID_SNAPSHOT',
            target: ' null'
        },
        {
            source: 'PG_LSN',
            target: ' null'
        },
        {
            source: 'PG_NODE_TREE',
            target: ' null'
        },

        {
            source: 'SMALLINT_ARRAY',
            target: ' null'
        },
        {
            source: 'INTEGER_ARRAY',
            target: ' null'
        },
        {
            source: 'BIGINT_ARRAY',
            target: ' null'
        },
        {
            source: 'OID_ARRAY',
            target: ' null'
        },
        {
            source: 'NUMERIC_ARRAY',
            target: ' null'
        },
        {
            source: 'REAL_ARRAY',
            target: ' null'
        },
        {
            source: 'DOUBLE_PRECISION_ARRAY',
            target: ' null'
        },

        {
            source: 'MONEY_ARRAY',
            target: ' null'
        },

        {
            source: 'CHARACTER_ARRAY',
            target: ' null'
        },
        {
            source: 'BPCHAR_ARRAY',
            target: ' null'
        },
        {
            source: 'CHARACTER_VARYING_ARRAY',
            target: ' null'
        },
        {
            source: 'TEXT_ARRAY',
            target: ' null'
        },
        {
            source: 'NAME_ARRAY',
            target: ' null'
        },

        {
            source: 'TIMESTAMP_WITHOUT_TIME_ZONE_ARRAY',
            target: ' null'
        },
        {
            source: 'TIMESTAMP_WITH_TIME_ZONE_ARRAY',
            target: ' null'
        },
        {
            source: 'TIME_WITHOUT_TIME_ZONE_ARRAY',
            target: ' null'
        },
        {
            source: 'TIME_WITH_TIME_ZONE_ARRAY',
            target: ' null'
        },
        {
            source: 'DATE_ARRAY',
            target: ' null'
        },
        {
            source: 'INTERVAL_ARRAY',
            target: ' null'
        },

        {
            source: 'BIT_ARRAY',
            target: ' null'
        },
        {
            source: 'BIT_VARYING_ARRAY',
            target: ' null'
        },
        {
            source: 'BOOLEAN_ARRAY',
            target: ' null'
        },

        {
            source: 'XML_ARRAY',
            target: ' null'
        },
        {
            source: 'BYTEA_ARRAY',
            target: ' null'
        },
        {
            source: 'REF_CURSOR_ARRAY',
            target: ' null'
        },

        {
            source: 'POINT_ARRAY',
            target: ' null'
        },
        {
            source: 'LINE_ARRAY',
            target: ' null'
        },
        {
            source: 'LSEG_ARRAY',
            target: ' null'
        },
        {
            source: 'BOX_ARRAY',
            target: ' null'
        },
        {
            source: 'PATH_ARRAY',
            target: ' null'
        },
        {
            source: 'POLYGON_ARRAY',
            target: ' null'
        },
        {
            source: 'CIRCLE_ARRAY',
            target: ' null'
        },
        {
            source: 'CIDR_ARRAY',
            target: ' null'
        },
        {
            source: 'GEOMETRY_ARRAY',
            target: ' null'
        },
        {
            source: 'GEOGRAPHY_ARRAY',
            target: ' null'
        },

        {
            source: 'INET_ARRAY',
            target: ' null'
        },
        {
            source: 'MACADDR_ARRAY',
            target: ' null'
        },
        {
            source: 'MACADDR8_ARRAY',
            target: ' null'
        },
        {
            source: 'HSTORE_ARRAY',
            target: ' null'
        },
        {
            source: 'CITEXT_ARRAY',
            target: ' null'
        },

        {
            source: 'TSVECTOR_ARRAY',
            target: ' null'
        },
        {
            source: 'TSQUERY_ARRAY',
            target: ' null'
        },

        {
            source: 'UUID_ARRAY',
            target: ' null'
        },

        {
            source: 'JSON_ARRAY',
            target: ' null'
        },
        {
            source: 'JSONB_ARRAY',
            target: ' null'
        },

        {
            source: 'INT4RANGE_ARRAY',
            target: ' null'
        },
        {
            source: 'INT8RANGE_ARRAY',
            target: ' null'
        },
        {
            source: 'NUMRANGE_ARRAY',
            target: ' null'
        },
        {
            source: 'TSRANGE_ARRAY',
            target: ' null'
        },
        {
            source: 'TSTZRANGE_ARRAY',
            target: ' null'
        },
        {
            source: 'DATERANGE_ARRAY',
            target: ' null'
        },

        {
            source: 'TXID_SNAPSHOT_ARRAY',
            target: ' null'
        },
        {
            source: 'PG_LSN_ARRAY',
            target: ' null'
        },
        {
            source: 'PG_NODE_TREE_ARRAY',
            target: ' null'
        },
    ]
}
