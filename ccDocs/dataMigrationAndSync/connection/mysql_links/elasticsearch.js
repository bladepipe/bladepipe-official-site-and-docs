export const Elasticsearch = {
    main_function: [
        {
            key: '结构迁移',
            desc: '如目标不存在 Index，则根据源端元数据，结合映射规则在对端创建 Index mapping'
        },
        {
            key: '全量数据迁移',
            desc: '逻辑迁移，通过顺序扫描表数据，将数据分批写入到对端数据库'
        },
        {
            key: '增量实时同步',
            desc: '支持 <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> 常见 DML 同步 <br /> 无主键表 UPDATE, DELETE 不同步'
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
            key: '重置位点',
            desc: '支持按照文件位点、时间戳 回溯位点，重新消费过去一段时间或指定 Binlog 文件和位点开始的增量日志'
        },
        {
            key: '索引名映射',
            desc: '支持 <b>按下划线拼接(任务名_DB_SCHEMA_表)</b>, <b>转小写</b>, <b>转大写</b>, <b>和源端保持一致</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: 'DDL 同步',
            desc: '\n- ALTER TABLE ADD COLUMN'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的，查询设置过对端主键的'
        },
    ],
    master_function: [
        {
            key: '可选索引字段',
            desc: '默认索引所有字段，可选择不索引指定字段'
        },
        {
            key: '字段级分词器',
            desc: '可选择字符串类型且索引的字段分词器，支持 STANDARD（默认）、SIMPLE 等常见分词器，并可指定自定义分词器'
        },
        {
            key: '设定 Index _id 字段',
            desc: '默认以源端主键值拼接，可修改为其他字段值'
        },
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
        }
    ],
    notice: [],
    examples: [
        {
            key: 'MySQL 到 Elasticsearch 数据迁移同步',
            desc: '文档：[MySQL 到 Elasticsearch 数据迁移同步](https://www.clougence.com/blog/data_sync_sample/mysql_elasticsearch_sync)'
        },
        {
            key: 'MySQL 到 Elasticsearch 宽表构建',
            desc: '文档：[MySQL 到 Elasticsearch 宽表构建](https://www.clougence.com/blog/data_sync_sample/mysql_elasticsearch_widetable_sync)'
        }
    ],
    faq: [],
    mapping: [
        {
            source: 'CHAR',
            target: 'TEXT'
        },
        {
            source: 'LONGTEXT',
            target: 'TEXT'
        },
        {
            source: 'MEDIUMTEXT',
            target: 'TEXT'
        },
        {
            source: 'TINYTEXT',
            target: 'TEXT'
        },
        {
            source: 'VARCHAR',
            target: 'TEXT'
        },
        {
            source: 'TEXT',
            target: 'TEXT'
        },
        {
            source: 'BIGINT',
            target: 'LONG'
        },
        {
            source: 'DECIMAL',
            target: 'DOUBLE'
        },
        {
            source: 'FLOAT',
            target: 'FLOAT'
        },
        {
            source: 'DOUBLE',
            target: 'DOUBLE'
        },
        {
            source: 'INT',
            target: 'INTEGER'
        },
        {
            source: 'MEDIUMINT',
            target: 'INTEGER'
        },
        {
            source: 'SMALLINT',
            target: 'SHORT'
        },
        {
            source: 'TINYINT',
            target: 'SHORT'
        },
        {
            source: 'BINARY',
            target: 'BINARY'
        },
        {
            source: 'BIT',
            target: 'BINARY'
        },
        {
            source: 'BLOB',
            target: 'BINARY'
        },
        {
            source: 'LONGBLOB',
            target: 'BINARY'
        },
        {
            source: 'MEDIUMBLOB',
            target: 'BINARY'
        },
        {
            source: 'TINYBLOB',
            target: 'BINARY'
        },
        {
            source: 'VARBINARY',
            target: 'BINARY'
        },
        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'DATETIME',
            target: 'DATE'
        },
        {
            source: 'TIME',
            target: 'DATE'
        },
        {
            source: 'TIMESTAMP',
            target: 'DATE'
        },
        {
            source: 'YEAR',
            target: 'INTEGER'
        },
        {
            source: 'JSON',
            target: 'OBJECT'
        },
        {
            source: 'ENUM',
            target: 'KEYWORD'
        },
        {
            source: 'SET',
            target: 'KEYWORD'
        },
        {
            source: 'GEOMETRY',
            target: 'GEO_SHAPE'
        },
        {
            source: 'POINT',
            target: 'GEO_SHAPE'
        },
        {
            source: 'LINESTRING',
            target: 'GEO_SHAPE'
        },
        {
            source: 'POLYGON',
            target: 'GEO_SHAPE'
        },
        {
            source: 'MULTIPOINT',
            target: 'GEO_SHAPE'
        },
        {
            source: 'MULTILINESTRING',
            target: 'GEO_SHAPE'
        },
        {
            source: 'MULTIPOLYGON',
            target: 'GEO_SHAPE'
        },
        {
            source: 'GEOMETRY_COLLECTION',
            target: 'GEO_SHAPE'
        }
    ]
}
