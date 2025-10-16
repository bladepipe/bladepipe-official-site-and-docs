const MySQL = {
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
            key: '修改订阅',
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
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
            key: '0 值时间处理',
            desc: '支持将 0 值时间设置成不同类型的值，防止写入对端报错'
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
            source: 'TINYINT',
            target: 'TINYINT'
        }, {
            source: 'SMALLINT',
            target: 'SMALLINT'
        }, {
            source: 'INT',
            target: 'INT'
        }, {
            source: 'BIGINT',
            target: 'BIGINT'
        }, {
            source: 'LARGEINT',
            target: 'BIGINT'
        }, {
            source: 'DECIMAL',
            target: 'DECIMAL'
        }, {
            source: 'DOUBLE',
            target: 'DOUBLE'
        }, {
            source: 'FLOAT',
            target: 'FLOAT'
        }, {
            source: 'BOOLEAN',
            target: 'BIT'
        }, {
            source: 'CHAR',
            target: 'CHAR'
        }, {
            source: 'VARCHAR',
            target: 'VARCHAR'
        }, {
            source: 'STRING',
            target: 'TEXT'
        }, {
            source: "DATE",
            target: "DATE"
        }, {
            source: 'DATETIME',
            target: 'DATETIME'
        }, {
            source: 'ARRAY',
            target: '不支持'
        }, {
            source: 'HLL',
            target: 'BIGINT'
        }, {
            source: 'BITMAP',
            target: 'BIGINT'
        }
    ]
}

const MariaDB = MySQL;
const AuroraForMySQL = MySQL;

export {
    MySQL,
    MariaDB,
    AuroraForMySQL
}
