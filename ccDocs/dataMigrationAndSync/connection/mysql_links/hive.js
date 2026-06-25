const Hive = {
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
            desc: '支持 <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> 常见 DML 同步（有主键表）'
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
            key: '设置目标主键',
            desc: '变更主键为其他字段，方便数据聚合等操作'
        },
        {
            key: '数据过滤条件',
            desc: '支持 WHERE 条件进行数据过滤，内容为 SQL 92 子集，文档：[创建数据过滤任务](../../../operation/job_manage/create_job/create_data_filter_job)'
        }
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: [
        {
            source: 'BIT',
            target: 'BIT'
        },
        {
            source: 'TINYINT',
            target: 'TINYINT'
        },
        {
            source: 'SMALLINT',
            target: 'SMALLINT'
        },
        {
            source: 'MEDIUMINT',
            target: 'INT'
        },
        {
            source: 'INT',
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
            source: 'FLOAT',
            target: 'DECIMAL'
        },
        {
            source: 'DOUBLE',
            target: 'DECIMAL'
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
            target: 'TIMESTAMP'
        },
        {
            source: 'YEAR',
            target: 'INT'
        },
        {
            source: 'CHAR',
            target: 'STRING'
        },
        {
            source: 'VARCHAR',
            target: 'STRING'
        },
        {
            source: 'BINARY',
            target: 'BINARY'
        },
        {
            source: 'VARBINARY',
            target: 'BINARY'
        },
        {
            source: 'TINYBLOB',
            target: 'BINARY'
        },
        {
            source: 'BLOB',
            target: 'BINARY'
        },
        {
            source: 'MEDIUMBLOB',
            target: 'BINARY'
        },
        {
            source: 'LONGBLOB',
            target: 'BINARY'
        },
        {
            source: 'TINYTEXT',
            target: 'STRING'
        },
        {
            source: 'TEXT',
            target: 'STRING'
        },
        {
            source: 'MEDIUMTEXT',
            target: 'STRING'
        },
        {
            source: 'LONGTEXT',
            target: 'STRING'
        },
        {
            source: 'ENUM',
            target: 'STRING'
        },
        {
            source: 'JSON',
            target: 'STRING'
        },
        {
            source: 'SET',
            target: 'STRING'
        },
        {
            source: 'GEOMCOLLECTION',
            target: 'STRING'
        },
        {
            source: 'GEOMETRY',
            target: 'STRING'
        },
        {
            source: 'GEOMETRYCOLLECTION',
            target: 'STRING'
        },
        {
            source: 'LINESTRING',
            target: 'STRING'
        },

        {
            source: 'MULTILINESTRING',
            target: 'STRING'
        },
        {
            source: 'MULTIPOINT',
            target: 'STRING'
        },
        {
            source: 'MULTIPOLYGON',
            target: 'STRING'
        },
        {
            source: 'POINT',
            target: 'STRING'
        },
        {
            source: 'POLYGON',
            target: 'STRING'
        }
    ]
}

export {
    Hive,
}
