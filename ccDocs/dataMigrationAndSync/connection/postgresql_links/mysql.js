const MySQLCommon = {
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
            desc: '全量数据校验，并可选根据校验结果订正差异数据，支持定时，文档：[创建定时校验订正任务](../../../operation/job_manage/create_job/create_verification_correction_job)'
        },
        {
            key: '修改订阅',
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: 'DDL 同步',
            desc: 'PostgreSQL DDL 同步基于 <b>触发器</b> 实现，需具备相应的 <b>触发器</b> 和 <b>表</b> 权限。文档：[PostgreSQL 需要的权限](/docs/dataMigrationAndSync/datasource_func/PostgreSQL/privs_for_pg/)'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的'
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
            target: 'TEXT'
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
            target: 'DOUBLE'
        },
        {
            source: 'CHARACTER',
            target: 'VARCHAR'
        },
        {
            source: 'BPCHAR',
            target: 'TEXT'
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
            target: 'TEXT'
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
            target: 'TIME'
        },
        {
            source: 'TIME_WITH_TIME_ZONE',
            target: 'TIME'
        },
        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'INTERVAL',
            target: 'TIMESTAMP'
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
            target: 'TINYINT'
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
            source: 'POINT',
            target: 'TEXT'
        },
        {
            source: 'LINE',
            target: 'TEXT'
        },
        {
            source: 'LSEG',
            target: 'TEXT'
        },
        {
            source: 'BOX',
            target: 'TEXT'
        },
        {
            source: 'PATH',
            target: 'TEXT'
        },
        {
            source: 'POLYGON',
            target: 'TEXT'
        },
        {
            source: 'CIRCLE',
            target: 'TEXT'
        },
        {
            source: 'GEOMETRY',
            target: 'GEOMETRY'
        },
        {
            source: 'GEOGRAPHY',
            target: 'TEXT'
        },
        {
            source: 'CIDR',
            target: 'TEXT'
        },
        {
            source: 'MACADDR',
            target: 'TEXT'
        },
        {
            source: 'MACADDR8',
            target: 'TEXT'
        },
        {
            source: 'HSTORE',
            target: 'TEXT'
        },
        {
            source: 'CITEXT',
            target: 'TEXT'
        },
        {
            source: 'UUID',
            target: 'VARCHAR'
        },
        {
            source: 'JSON',
            target: 'JSON'
        },
        {
            source: 'JSONB',
            target: 'JSON'
        },
        {
            source: 'INT4RANGE',
            target: 'TEXT'
        },
        {
            source: 'INT8RANGE',
            target: 'TEXT'
        },
        {
            source: 'NUMRANGE',
            target: 'TEXT'
        },
        {
            source: 'TSRANGE',
            target: 'TEXT'
        },
        {
            source: 'TSTZRANGE',
            target: 'TEXT'
        },
        {
            source: 'DATERANGE',
            target: 'TEXT'
        }
    ]
}

const MySQL = {
    ...MySQLCommon,
    notice: [
        {
            key: 'DDL 同步限制',
            desc: [
                '- 默认过滤 `CREATE TABLE`（包括 `CREATE TABLE IF NOT EXISTS`）。',
                '- 不支持 `ALTER COLUMN ... TYPE ...`、`SET DATA TYPE`（包括长度、精度和标度调整）以及 `SET NOT NULL`、`DROP NOT NULL`。',
                '- 不支持 `COMMENT ON COLUMN` 的设置、覆盖以及使用空串或 `NULL` 清除注释。',
                '- 不支持 `DROP CONSTRAINT`、添加 CHECK、添加外键、`VALIDATE CONSTRAINT` 和 `UNIQUE NULLS NOT DISTINCT`。',
                '- 不支持通过 `DROP CONSTRAINT ..., ADD CONSTRAINT ... PRIMARY KEY ...` 替换目标已有主键。',
                '- 不支持 `DROP INDEX`（包括 `IF EXISTS`、`CONCURRENTLY` 形式）。',
                '- 不支持表达式索引及当前未覆盖的索引排序、操作符类选项。',
                '- 不支持 `USING gin(...)` 索引同步到 MySQL。',
                '- 不保留部分索引的 `WHERE` 条件，可能转换为覆盖全部行的普通索引。',
                '- 不支持包含额外数据计算的 `USING` 表达式，例如 `USING amount::bigint + 100`。',
                '- 不支持生成列的 `SET EXPRESSION AS (...)` 和 identity 列的 `RESTART WITH ...`。',
                '- 不采集 FUNCTION、PROCEDURE、TRIGGER 等对象的创建和修改；不支持函数、索引、约束等对象的注释同步。',
                '- 不支持 `ALTER COLUMN ... SET STATISTICS`、表级 `SET (fillfactor=...)` 等源端专用属性同步。',
                '- 不支持表重命名后自动延续原订阅，新表名未被订阅时，后续 DDL/DML 不会同步。',
                '- 不支持在同一次多语句请求中混合 DDL 与 `ROLLBACK TO SAVEPOINT` 的可靠同步。'
            ].join('\n')
        }
    ]
};

const MariaDB = { ...MySQLCommon };
const AuroraForMySQL = { ...MySQLCommon };

export {
    MySQL,
    MariaDB,
    AuroraForMySQL
}
