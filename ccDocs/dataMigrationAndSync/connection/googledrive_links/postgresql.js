export const PostgreSQL = {
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
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '表名映射',
            desc: '支持 <b>映射为别名</b>, <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        }
    ],
    master_function: [
        {
            key: "表格检索范围",
            desc: "表格的数据检索范围（[A1 表示法或 R1C1 表示法](https://developers.google.cn/workspace/sheets/api/guides/concepts#cell)）"
        },
        {
            key: '自定义代码',
            desc: '文档1：[创建自定义代码任务](../../../operation/job_manage/create_job/create_process_job) <br />文档2：[自定义代码任务 debug](../../../operation/job_manage/job_op/debug_customer_code) <br />文档3：[在自定义代码中打日志](../../../operation/job_manage/job_op/log_in_customer_code)'
        }
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: [
        {
            source: 'BOOLEAN',
            target: 'BOOLEAN'
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
            source: 'DECIMAL',
            target: 'NUMERIC'
        },
        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'TIME',
            target: 'TIME_WITHOUT_TIME_ZONE'
        },
        {
            source: 'TIMESTAMP',
            target: 'TIMESTAMP_WITHOUT_TIME_ZONE'
        },
        {
            source: 'VARCHAR',
            target: 'CHARACTER_VARYING'
        },
        {
            source: 'TEXT',
            target: 'TEXT'
        },
        {
            source: 'BYTES',
            target: 'BYTEA'
        },
        {
            source: 'CHARACTER_VARYING',
            target: 'CHARACTER_VARYING'
        },
        {
            source: 'VECTOR',
            target: 'VECTOR'
        }
    ]
}
