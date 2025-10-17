export const Oracle = {
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
            desc: '支持按照文件位点、时间戳 回溯位点，重新消费过去一段时间或指定 Binlog 文件和位点开始的增量日志'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的，查询设置过对端主键的'
        }
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
        {
            key: '数据过滤条件',
            desc: '支持 WHERE 条件进行数据过滤，内容为 SQL 92 子集，文档：[创建数据过滤任务](../../operation/job_manage/create_job/create_data_filter_job)'
        },
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: [
        {
            source: 'BIT',
            target: 'BLOB'
        },
        {
            source: 'TINYINT',
            target: 'NUMBER_BIGINT'
        },
        {
            source: 'SMALLINT',
            target: 'NUMBER_BIGINT'
        },
        {
            source: 'MEDIUMINT',
            target: 'NUMBER_BIGINT'
        },
        {
            source: 'INT',
            target: 'NUMBER_BIGINT'
        },
        {
            source: 'BIGINT',
            target: 'NUMBER_BIGINT'
        },
        {
            source: 'DECIMAL',
            target: 'NUMBER_DECIMAL'
        },
        {
            source: 'FLOAT',
            target: 'NUMBER_DECIMAL'
        },
        {
            source: 'DOUBLE',
            target: 'NUMBER_DECIMAL'
        },
        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'DATETIME',
            target: 'TIMESTAMP'
        },
        {
            source: 'TIMESTAMP',
            target: 'TIMESTAMP'
        },
        {
            source: 'TIME',
            target: 'VARCHAR2'
        },
        {
            source: 'YEAR',
            target: 'NUMBER_BIGINT'
        },
        {
            source: 'CHAR',
            target: 'CHAR'
        },
        {
            source: 'VARCHAR',
            target: 'VARCHAR2'
        },
        {
            source: 'BINARY',
            target: 'BLOB'
        },
        {
            source: 'VARBINARY',
            target: 'BLOB'
        },
        {
            source: 'TINYBLOB',
            target: 'BLOB'
        },
        {
            source: 'BLOB',
            target: 'BLOB'
        },
        {
            source: 'MEDIUMBLOB',
            target: 'BLOB'
        },
        {
            source: 'LONGBLOB',
            target: 'BLOB'
        },
        {
            source: 'TINYTEXT',
            target: 'CLOB'
        },
        {
            source: 'TEXT',
            target: 'CLOB'
        },
        {
            source: 'MEDIUMTEXT',
            target: 'CLOB'
        },
        {
            source: 'LONGTEXT',
            target: 'CLOB'
        },
        {
            source: 'ENUM',
            target: 'VARCHAR2'
        },
        {
            source: 'SET',
            target: 'VARCHAR2'
        },
        {
            source: 'JSON',
            target: 'CLOB'
        }
    ]
}
