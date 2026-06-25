const SQLServer = {
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
    master_function:[
        {
            key: '全量前清空目标数据',
            desc: '运行全量任务前清除老数据，包括重跑任务、定时全量迁移都会触发此能力'
        },
        {
            key: '重建目标表',
            desc: '运行全量任务前重建目标表，包括重跑任务、定时全量迁移都会触发此能力'
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
    examples: [
    ],
    faq: [],
    mapping: [
        {
            source: 'BIT',
            target: 'VARBINARY'
        }, // sqlserver bit only include (1、0 or NULL)
        {
            source: 'TINYINT',
            target: 'SMALLINT'
        },// TINYINT has -1, so SMALLINT better safe
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
            target: 'FLOAT'
        },
        {
            source: 'DOUBLE',
            target: 'FLOAT'
        },

        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'DATETIME',
            target: 'DATETIME2'
        },
        {
            source: 'TIMESTAMP',
            target: 'DATETIME2'
        },
        {
            source: 'TIME',
            target: 'VARCHAR'
        },
        {
            source: 'YEAR',
            target: 'INT'
        },

        {
            source: 'CHAR',
            target: 'NCHAR'
        },
        {
            source: 'VARCHAR',
            target: 'NVARCHAR'
        },

        {
            source: 'BINARY',
            target: 'BINARY'
        },
        {
            source: 'VARBINARY',
            target: 'VARBINARY'
        },
        {
            source: 'TINYBLOB',
            target: 'IMAGE'
        },
        {
            source: 'BLOB',
            target: 'IMAGE'
        },
        {
            source: 'MEDIUMBLOB',
            target: 'IMAGE'
        },
        {
            source: 'LONGBLOB',
            target: 'IMAGE'
        },

        {
            source: 'TINYTEXT',
            target: 'NTEXT'
        },
        {
            source: 'TEXT',
            target: 'NTEXT'
        },
        {
            source: 'MEDIUMTEXT',
            target: 'NTEXT'
        },
        {
            source: 'LONGTEXT',
            target: 'NTEXT'
        },
        {
            source: 'ENUM',
            target: 'NVARCHAR'
        },
        {
            source: 'SET',
            target: 'NVARCHAR'
        },
        {
            source: 'JSON',
            target: 'NTEXT'
        },
        {
            source: 'GEOMETRY',
            target: null
        },
        {
            source: 'POINT',
            target: 'TEXT'
        },
        {
            source: 'LINESTRING',
            target: 'TEXT'
        },
        {
            source: 'POLYGON',
            target: 'TEXT'
        },
        {
            source: 'MULTIPOINT',
            target: 'TEXT'
        },
        {
            source: 'GEOMETRY_COLLECTION',
            target: 'TEXT'
        },
        {
            source: 'GEOM_COLLECTION',
            target: 'TEXT'
        },
        {
            source: 'MULTILINESTRING',
            target: 'TEXT'
        },
        {
            source: 'MULTIPOLYGON',
            target: 'TEXT'
        },
        ]

}

export {
    SQLServer,
}
