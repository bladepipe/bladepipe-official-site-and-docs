const Tunnel = {
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
            desc: '支持 <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> 常见 DML 同步 <br />无主键表 UPDATE, DELETE 不同步(需手动勾选)'
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
            desc: '文档1：[创建自定义代码任务](../../../operation/job_manage/create_job/create_process_job) <br />文档2：[自定义代码任务 debug](../../../operation/job_manage/job_op/debug_customer_code) <br />文档3：[在自定义代码中打日志](../../../operation/job_manage/job_op/log_in_customer_code)'
        },
        {
            key: '设置目标主键',
            desc: '变更主键为其他字段，方便数据聚合等操作'
        },
        {
            key: '数据过滤条件',
            desc: '支持 WHERE 条件进行数据过滤，内容为 SQL 92 子集，文档：[创建数据过滤任务](../../../operation/job_manage/create_job/create_data_filter_job)'
        },
    ],
    notice: [],
    examples: [
        {
            key: '跨互联网数据同步',
            desc: '文档：[跨互联网数据同步](https://www.clougence.com/cc-doc/bestPractice/http_internet_data_sync)'
        },
        {
            key: '跨互联网数据同步进阶',
            desc: '文档：[跨互联网数据同步进阶](https://www.clougence.com/cc-doc/bestPractice/http_internet_data_sync_2)'
        }
    ],
    faq: [],
    mapping: [
        {
            source: 'BIT',
            target: 'INTEGER'
        }, {
            source: 'TINYINT',
            target: 'INTEGER'
        }, {
            source: 'SMALLINT',
            target: 'INTEGER'
        }, {
            source: 'INT',
            target: 'LONG'
        }, {
            source: 'BIGINT',
            target: 'LONG'
        }, {
            source: 'DECIMAL',
            target: 'DECIMAL'
        }, {
            source: 'FLOAT',
            target: 'DECIMAL'
        }, {
            source: 'REAL',
            target: 'DECIMAL'
        }, {
            source: 'DATE',
            target: 'TIMESTAMP'
        }, {
            source: 'DATETIME',
            target: 'TIMESTAMP'
        }, {
            source: 'TIMESTAMP',
            target: 'TIMESTAMP'
        }, {
            source: 'TIME',
            target: 'TIMESTAMP'
        }, {
            source: 'CHAR',
            target: 'STRING'
        }, {
            source: 'VARCHAR',
            target: 'STRING'
        }, {
            source: 'BINARY',
            target: 'BYTES'
        }, {
            source: 'VARBINARY',
            target: 'BYTES'
        }, {
            source: 'TEXT',
            target: 'STRING'
        }
    ]
}

export {
    Tunnel
}
