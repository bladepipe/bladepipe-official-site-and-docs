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
            key: '重置位点',
            desc: '支持按照文件位点、时间戳 回溯位点，重新消费过去一段时间或指定 Binlog 文件和位点开始的增量日志'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: 'DDL 同步',
            desc: '\n- ALTER TABLE ADD COLUMN, DROP COLUMN, MODIFY COLUMN, CHANGE COLUMN \n- ADD INDEX  \n- RENAME TABLE \n- CREATE TABLE（全库同步） \n- 表分区操作 \n- 其他兼容 DDL'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的，查询设置过对端主键的'
        },
    ],
    master_function: [
        // {
        //     key: '全库同步',
        //     desc: '支持源端新建、删除、修改表的 DDL 和数据同步，文档：[创建全库同步任务](../../operation/job_manage/create_job/create_db_sync_job)'
        // },
        {
            key: '自定义代码',
            desc: '文档1：[创建自定义代码任务](../../operation/job_manage/create_job/create_process_job) <br />文档2：[自定义代码任务 debug](../../operation/job_manage/job_op/debug_customer_code) <br />文档3：[在自定义代码中打日志](../../operation/job_manage/job_op/log_in_customer_code)'
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
        },
        {
            source: 'TINYINT',
            target: 'INTEGER'
        },
        {
            source: 'SMALLINT',
            target: 'INTEGER'
        },
        {
            source: 'MEDIUMINT',
            target: 'INTEGER'
        },
        {
            source: 'INT',
            target: 'LONG'
        },
        {
            source: 'BIGINT',
            target: 'LONG'
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
            target: 'TIMESTAMP'
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
            target: 'INTEGER'
        },

        {
            source: 'CHAR',
            target: 'INTEGER'
        },
        {
            source: 'VARCHAR',
            target: 'STRING'
        },

        {
            source: 'BINARY',
            target: 'BYTES'
        },
        {
            source: 'VARBINARY',
            target: 'BYTES'
        },
        {
            source: 'TINYBLOB',
            target: 'BYTES'
        },
        {
            source: 'BLOB',
            target: 'BYTES'
        },
        {
            source: 'MEDIUMBLOB',
            target: 'BYTES'
        },
        {
            source: 'LONGBLOB',
            target: 'BYTES'
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
            source: 'SET',
            target: 'STRING'
        },
        {
            source: 'JSON',
            target: 'STRING'
        },

        {
            source: 'GEOMETRY',
            target: 'STRING'
        },
        {
            source: 'POINT',
            target: 'STRING'
        },
        {
            source: 'LINESTRING',
            target: 'STRING'
        },
        {
            source: 'POLYGON',
            target: 'STRING'
        },
        {
            source: 'MULTIPOINT',
            target: 'STRING'
        },
        {
            source: 'GEOMETRY_COLLECTION',
            target: 'STRING'
        },
        {
            source: 'GEOM_COLLECTION',
            target: 'STRING'
        },
        {
            source: 'MULTILINESTRING',
            target: 'STRING'
        },
        {
            source: 'MULTIPOLYGON',
            target: 'STRING'
        },
    ]
}


export {
    Tunnel
}
