const PostgreSQL = {
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
            key: '数据校验和订正',
            desc: '全量数据校验，并可选根据校验结果订正差异数据，支持定时，文档：[创建定时校验订正任务](../../operation/job_manage/create_job/create_verification_correction_job)'
        },
        {
            key: '修改订阅',
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: 'DDL 同步',
            desc: 'PostgreSQL DDL 同步基于 <b>触发器</b> 实现，需具备相应的 <b>触发器</b> 和 <b>表</b> 权限。文档：[PostgreSQL 需要的权限](../datasource_func/PostgreSQL/privs_for_pg)'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的'
        }
    ],
    master_function: [
        {
            key: '自定义代码',
            desc: '文档1：[创建自定义代码任务](../../operation/job_manage/create_job/create_process_job) <br />文档2：[自定义代码任务 debug](../../operation/job_manage/job_op/debug_customer_code) <br />文档3：[在自定义代码中打日志](../../operation/job_manage/job_op/log_in_customer_code)'
        },
        {
            key: '数据过滤条件',
            desc: '支持 WHERE 条件进行数据过滤，内容为 SQL 92 子集，文档：[创建数据过滤任务](../../operation/job_manage/create_job/create_data_filter_job)'
        },
        {
            key: '设置目标主键',
            desc: '变更主键为其他字段，方便数据聚合等操作'
        },
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


const Greenplum = PostgreSQL;
const AnalyticDbForPg = PostgreSQL;
const AuroraForPg = PostgreSQL;
const OpenGauss = PostgreSQL;
const PolarDbForPg = PostgreSQL;

export {
    PostgreSQL,
    AuroraForPg,
    Greenplum,
    AnalyticDbForPg,
    OpenGauss,
    PolarDbForPg
}
