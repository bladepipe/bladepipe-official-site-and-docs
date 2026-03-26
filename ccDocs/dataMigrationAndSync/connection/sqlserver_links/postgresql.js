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
            desc: '支持 <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> 常见 DML 同步 <br />无主键表 UPDATE, DELETE 不同步（需手动勾选）'
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
            desc: '不支持'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: 'DDL 同步',
            desc: 'ALTER TABLE ADD COLUMN, DROP COLUMN'
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
            key: '添加虚拟列',
            desc: '支持添加自定义的虚拟列，指定的值为固定值，如区域、编号等'
        },
        {
            key: '设置目标主键',
            desc: '变更主键为其他字段，方便数据聚合等操作'
        },
    ],
    examples: [],
    faq: [],
    mapping: [
        {
            source: 'BIT',
            target: 'BIT'
        }, {
            source: 'DECIMAL',
            target: 'DECIMAL'
        }, {
            source: 'NUMERIC',
            target: 'DECIMAL'
        }, {
            source: 'SMALLINT',
            target: 'SMALLINT'
        }, {
            source: 'TINYINT',
            target: 'TINYINT'
        }, {
            source: 'INT',
            target: 'INT'
        }, {
            source: 'BIGINT',
            target: 'BIGINT'
        }, {
            source: 'SMALLMONEY',
            target: 'NUMERIC'
        }, {
            source: 'MONEY',
            target: 'NUMERIC'
        }, {
            source: 'FLOAT',
            target: 'REAL'
        }, {
            source: 'REAL',
            target: 'REAL'
        }, {
            source: 'DATE',
            target: 'DATE'
        }, {
            source: 'DATETIMEOFFSET',
            target: 'TIMESTAMP'
        }, {
            source: 'DATETIME2',
            target: 'TIMESTAMP'
        }, {
            source: 'SMALLDATETIME',
            target: 'TIMESTAMP'
        }, {
            source: 'DATETIME',
            target: 'TIMESTAMP'
        }, {
            source: 'TIME',
            target: 'TIME'
        }, {
            source: 'CHAR',
            target: 'CHAR'
        }, {
            source: 'VARCHAR',
            target: 'VARCHAR'
        }, {
            source: 'TEXT',
            target: 'TEXT'
        }, {
            source: 'NCHAR',
            target: 'CHAR'
        }, {
            source: 'NVARCHAR',
            target: 'VARCHAR'
        }, {
            source: 'NTEXT',
            target: 'TEXT'
        }, {
            source: 'BINARY',
            target: 'BYTEA'
        }, {
            source: 'VARBINARY',
            target: 'BYTEA'
        }, {
            source: 'IMAGE',
            target: 'BYTEA'
        }, {
            source: 'TIMESTAMP',
            target: 'BIGINT'
        }, {
            source: 'ROWVERSION',
            target: 'BIGINT'
        }, {
            source: 'UNIQUEIDENTIFIER',
            target: 'UUID'
        }, {
            source: 'XML',
            target: 'XML'
        }, {
            source: 'SYSNAME',
            target: 'VARCHAR'
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
