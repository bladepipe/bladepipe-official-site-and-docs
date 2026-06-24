export const ClickHouse = {
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
            desc: '支持 <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> 常见 DML 同步'
        },
        {
            key: '数据校验',
            desc: '全量数据校验, 并支持定时'
        },
        {
            key: '修改订阅',
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../../operation/job_manage/job_op/edit_job)'
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
            desc: 'PostgreSQL DDL 同步基于 <b>触发器</b> 实现，需具备相应的 <b>触发器</b> 和 <b>表</b> 权限。文档：[PostgreSQL 需要的权限](../datasource_func/PostgreSQL/privs_for_pg) \n- ALTER TABLE ADD COLUMN, DROP COLUMN, MODIFY COLUMN, CHANGE COLUMN \n- CREATE TABLE（全库同步）'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的，查询设置过对端主键的'
        },
    ],
    master_function: [
        {
            key: '定时全量迁移',
            desc: '文档1：[创建定时全量任务](../../../operation/job_manage/create_job/create_period_full_job) <br /> 文档2：[定时全量实现增量数据迁移](../../../bestPractice/time_schedule_full)'
        },
        {
            key: '自定义代码',
            desc: '文档1：[创建自定义代码任务](../../../operation/job_manage/create_job/create_process_job) <br />文档2：[自定义代码任务 debug](../../../operation/job_manage/job_op/debug_customer_code) <br />文档3：[在自定义代码中打日志](../../../operation/job_manage/job_op/log_in_customer_code)'
        },
        {
            key: '数据过滤条件',
            desc: '支持 WHERE 条件进行数据过滤，内容为 SQL 92 子集，文档：[创建数据过滤任务](../../../operation/job_manage/create_job/create_data_filter_job)'
        },
        {
            key: '设置目标主键',
            desc: '变更主键为其他字段，方便数据聚合等操作'
        },
        {
            key: '添加虚拟列',
            desc: '支持添加自定义的虚拟列，指定的值为固定值，如区域、编号等'
        },
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: [
        {
            source: 'SMALLSERIAL',
            target: 'Int16'
        },
        {
            source: 'SERIAL',
            target: 'Int32'
        },
        {
            source: 'BIGSERIAL',
            target: 'Int64'
        },

        {
            source: 'SMALLINT',
            target: 'Int32'
        },
        {
            source: 'INTEGER',
            target: 'Int32'
        },
        {
            source: 'BIGINT',
            target: 'Int64'
        },
        {
            source: 'OID',
            target: 'String'
        },
        {
            source: 'NUMERIC',
            target: 'Decimal'
        },
        {
            source: 'REAL',
            target: 'Float64'
        },
        {
            source: 'DOUBLE_PRECISION',
            target: 'Float64'
        },

        {
            source: 'MONEY',
            target: 'Float64'
        },

        {
            source: 'CHARACTER',
            target: 'String'
        },
        {
            source: 'BPCHAR',
            target: 'String'
        },
        {
            source: 'CHARACTER_VARYING',
            target: 'String'
        },
        {
            source: 'TEXT',
            target: 'String'
        },
        {
            source: 'NAME',
            target: 'String'
        },

        {
            source: 'TIMESTAMP_WITHOUT_TIME_ZONE',
            target: 'DateTime'
        },
        {
            source: 'TIMESTAMP_WITH_TIME_ZONE',
            target: 'DateTime'
        },
        {
            source: 'TIME_WITHOUT_TIME_ZONE',
            target: 'DateTime'
        },
        {
            source: 'TIME_WITH_TIME_ZONE',
            target: 'DateTime'
        },
        {
            source: 'DATE',
            target: 'Date'
        },
        {
            source: 'INTERVAL',
            target: 'DateTime'
        },

        {
            source: 'BIT',
            target: 'String'
        },
        {
            source: 'BIT_VARYING',
            target: 'String'
        },
        {
            source: 'BOOLEAN',
            target: 'Int16'
        },

        {
            source: 'XML',
            target: 'String'
        },
        {
            source: 'BYTEA',
            target: 'String'
        },
        {
            source: 'REF_CURSOR',
            target: 'null'
        },

        {
            source: 'POINT',
            target: 'String'
        }, // ClickHouseTypes.Point is experimental
        {
            source: 'LINE',
            target: 'String'
        },
        {
            source: 'LSEG',
            target: 'String'
        },
        {
            source: 'BOX',
            target: 'String'
        },
        {
            source: 'PATH',
            target: 'String'
        },
        {
            source: 'POLYGON',
            target: 'String'
        }, // ClickHouseTypes.Polygon is experimental
        {
            source: 'CIRCLE',
            target: 'String'
        },
        {
            source: 'GEOMETRY',
            target: 'String'
        },
        {
            source: 'GEOGRAPHY',
            target: 'String'
        },

        {
            source: 'CIDR',
            target: 'String'
        },
        {
            source: 'INET',
            target: 'String'
        },
        {
            source: 'MACADDR',
            target: 'String'
        },
        {
            source: 'MACADDR8',
            target: 'String'
        },
        {
            source: 'HSTORE',
            target: 'String'
        },
        {
            source: 'CITEXT',
            target: 'String'
        },

        {
            source: 'TSVECTOR',
            target: 'null'
        },
        {
            source: 'TSQUERY',
            target: 'null'
        },

        {
            source: 'UUID',
            target: 'String'
        },

        {
            source: 'JSON',
            target: 'String'
        },
        {
            source: 'JSONB',
            target: 'null'
        },

        {
            source: 'INT4RANGE',
            target: 'String'
        },
        {
            source: 'INT8RANGE',
            target: 'String'
        },
        {
            source: 'NUMRANGE',
            target: 'String'
        },
        {
            source: 'TSRANGE',
            target: 'String'
        },
        {
            source: 'TSTZRANGE',
            target: 'String'
        },
        {
            source: 'DATERANGE',
            target: 'String'
        },

        {
            source: 'TXID_SNAPSHOT',
            target: 'null'
        },
        {
            source: 'PG_LSN',
            target: 'null'
        },
        {
            source: 'PG_NODE_TREE',
            target: 'null'
        },

        {
            source: 'SMALLINT_ARRAY',
            target: 'null'
        },
        {
            source: 'INTEGER_ARRAY',
            target: 'null'
        },
        {
            source: 'BIGINT_ARRAY',
            target: 'null'
        },
        {
            source: 'OID_ARRAY',
            target: 'null'
        },
        {
            source: 'NUMERIC_ARRAY',
            target: 'null'
        },
        {
            source: 'REAL_ARRAY',
            target: 'null'
        },
        {
            source: 'DOUBLE_PRECISION_ARRAY',
            target: 'null'
        },

        {
            source: 'MONEY_ARRAY',
            target: 'null'
        },

        {
            source: 'CHARACTER_ARRAY',
            target: 'null'
        },
        {
            source: 'BPCHAR_ARRAY',
            target: 'null'
        },
        {
            source: 'CHARACTER_VARYING_ARRAY',
            target: 'null'
        },
        {
            source: 'TEXT_ARRAY',
            target: 'null'
        },
        {
            source: 'NAME_ARRAY',
            target: 'null'
        },

        {
            source: 'TIMESTAMP_WITHOUT_TIME_ZONE_ARRAY',
            target: 'null'
        },
        {
            source: 'TIMESTAMP_WITH_TIME_ZONE_ARRAY',
            target: 'null'
        },
        {
            source: 'TIME_WITHOUT_TIME_ZONE_ARRAY',
            target: 'null'
        },
        {
            source: 'TIME_WITH_TIME_ZONE_ARRAY',
            target: 'null'
        },
        {
            source: 'DATE_ARRAY',
            target: 'null'
        },
        {
            source: 'INTERVAL_ARRAY',
            target: 'null'
        },

        {
            source: 'BIT_ARRAY',
            target: 'null'
        },
        {
            source: 'BIT_VARYING_ARRAY',
            target: 'null'
        },
        {
            source: 'BOOLEAN_ARRAY',
            target: 'null'
        },

        {
            source: 'XML_ARRAY',
            target: 'null'
        },
        {
            source: 'BYTEA_ARRAY',
            target: 'null'
        },
        {
            source: 'REF_CURSOR_ARRAY',
            target: 'null'
        },

        {
            source: 'POINT_ARRAY',
            target: 'null'
        },
        {
            source: 'LINE_ARRAY',
            target: 'null'
        },
        {
            source: 'LSEG_ARRAY',
            target: 'null'
        },
        {
            source: 'BOX_ARRAY',
            target: 'null'
        },
        {
            source: 'PATH_ARRAY',
            target: 'null'
        },
        {
            source: 'POLYGON_ARRAY',
            target: 'null'
        },
        {
            source: 'CIRCLE_ARRAY',
            target: 'null'
        },
        {
            source: 'GEOMETRY_ARRAY',
            target: 'null'
        },
        {
            source: 'GEOGRAPHY_ARRAY',
            target: 'null'
        },

        {
            source: 'CIDR_ARRAY',
            target: 'null'
        },
        {
            source: 'INET_ARRAY',
            target: 'null'
        },
        {
            source: 'MACADDR_ARRAY',
            target: 'null'
        },
        {
            source: 'MACADDR8_ARRAY',
            target: 'null'
        },
        {
            source: 'HSTORE_ARRAY',
            target: 'null'
        },
        {
            source: 'CITEXT_ARRAY',
            target: 'null'
        },

        {
            source: 'TSVECTOR_ARRAY',
            target: 'null'
        },
        {
            source: 'TSQUERY_ARRAY',
            target: 'null'
        },

        {
            source: 'UUID_ARRAY',
            target: 'null'
        },

        {
            source: 'JSON_ARRAY',
            target: 'null'
        },
        {
            source: 'JSONB_ARRAY',
            target: 'null'
        },

        {
            source: 'INT4RANGE_ARRAY',
            target: 'null'
        },
        {
            source: 'INT8RANGE_ARRAY',
            target: 'null'
        },
        {
            source: 'NUMRANGE_ARRAY',
            target: 'null'
        },
        {
            source: 'TSRANGE_ARRAY',
            target: 'null'
        },
        {
            source: 'TSTZRANGE_ARRAY',
            target: 'null'
        },
        {
            source: 'DATERANGE_ARRAY',
            target: 'null'
        },

        {
            source: 'TXID_SNAPSHOT_ARRAY',
            target: 'null'
        },
        {
            source: 'PG_LSN_ARRAY',
            target: 'null'
        },
        {
            source: 'PG_NODE_TREE_ARRAY',
            target: 'null'
        },
    ]
}
