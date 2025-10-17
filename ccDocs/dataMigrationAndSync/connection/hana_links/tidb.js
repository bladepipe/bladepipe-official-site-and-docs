const TiDB = {
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
            key: '增量位点回溯',
            desc: '支持按照数据 ID、时间戳 回溯位点，重新消费过去一段时间的 CDC 数据'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的，查询设置过对端主键的'
        },
    ],
    master_function: [
        {
            key: '定时全量迁移',
            desc: '文档1：[创建定时全量任务](../../operation/job_manage/create_job/create_period_full_job) <br /> 文档2：[定时全量实现增量数据迁移](../../bestPractice/time_schedule_full)'
        },
        {
            key: '自定义代码',
            desc: '文档1：[创建自定义代码任务](../../operation/job_manage/create_job/create_process_job) <br />文档2：[自定义代码任务 debug](../../operation/job_manage/job_op/debug_customer_code) <br />文档3：[在自定义代码中打日志](../../operation/job_manage/job_op/log_in_customer_code)'
        },
        {
            key: '数据过滤条件',
            desc: '支持 WHERE 条件进行数据过滤，内容为 SQL 92 子集，文档：[创建数据过滤任务](../../operation/job_manage/create_job/create_data_filter_job)'
        }
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: [
        {
            source: 'TINYINT',
            target: 'TINYINT'
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
            source: 'DECIMAL',
            target: 'DECIMAL'
        },
        {
            source: 'SMALLDECIMAL',
            target: 'DECIMAL'
        },
        {
            source: 'REAL',
            target: 'DOUBLE'
        },
        {
            source: 'FLOAT',
            target: 'DOUBLE'
        },
        {
            source: 'DOUBLE',
            target: 'DOUBLE'
        },
        {
            source: 'BOOLEAN',
            target: 'BIT'
        },
        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'SECONDDATE',
            target: 'DATETIME'
        },
        {
            source: 'TIMESTAMP',
            target: 'DATETIME'
        },
        {
            source: 'TIME',
            target: 'TIME'
        },
        {
            source: 'CHAR',
            target: 'VARCHAR'
        },
        {
            source: 'NCHAR',
            target: 'VARCHAR'
        },
        {
            source: 'VARCHAR',
            target: 'VARCHAR'
        },
        {
            source: 'NVARCHAR',
            target: 'VARCHAR'
        },
        {
            source: 'ALPHANUM',
            target: 'VARCHAR'
        },
        {
            source: 'SHORTTEXT',
            target: 'VARCHAR'
        },
        {
            source: 'CLOB',
            target: 'LONGTEXT'
        },
        {
            source: 'NCLOB',
            target: 'LONGTEXT'
        },
        {
            source: 'TEXT',
            target: 'LONGTEXT'
        },
        {
            source: 'BINTEXT',
            target: 'LONGTEXT'
        },
        {
            source: 'BLOB',
            target: 'LONGBLOB'
        },
        {
            source: 'BINARY',
            target: 'VARBINARY'
        },
        {
            source: 'VARBINARY',
            target: 'VARBINARY'
        }
    ]
}


export {
    TiDB
}
