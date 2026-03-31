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
            key: 'DDL 同步',
            desc: '\n- ALTER TABLE ADD COLUMN, DROP COLUMN, MODIFY COLUMN, CHANGE COLUMN \n- ADD INDEX  \n- RENAME TABLE \n- CREATE TABLE（全库同步） \n- 表分区操作 \n- 其他兼容 DDL'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的，查询设置过对端主键的'
        },
    ],
    master_function: [
        {
            key: '双向同步',
            desc: '支持全量迁移、增量同步（DML/DDL）双向防循环，文档：[双向同步](../../bestPractice/mysql_loop_data_sync)'
        },
        {
            key: '兼容 Online DDL',
            desc: '支持 <b>GH-OST</b>, <b>PT-OSC</b>, <b>Aliyun DMS Online DDL</b>, <b>PT_GHOST</b> 同步，文档：[支持 GH-OST 和 PT-OSC](https://www.clougence.com/blog/data_insights/online_ddl_support)'
        },
        {
            key: '表达式表名',
            desc: '支持按正则表达式表名迁移同步数据，实现全库同步、分表汇聚等功能中自动增减表需求，文档：[表达式任务](../../operation/job_manage/create_job/create_regex_table_job)'
        },
        {
            key: '定时全量迁移',
            desc: '文档1：[创建定时全量任务](../../operation/job_manage/create_job/create_period_full_job) <br /> 文档2：[定时全量实现增量数据迁移](../../bestPractice/time_schedule_full)'
        },
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
        {
            key: '设置对端更新条件',
            desc: '设置 UPDATE 操作额外的更新条件，用于双向同步冲突解决等场景'
        },
    ],
    notice: [],
    examples: [
        {
            key: 'MySQL 到 MySQL 数据迁移同步',
            desc: '文档：[MySQL 到 MySQL 数据迁移同步](https://www.clougence.com/blog/data_sync_sample/mysql_mysql_sync)'
        }
    ],
    faq: [],
    mapping: [
        {
            source: 'BIGINT',
            target: 'BIGINT'
        },
        {
            source: 'BINARY',
            target: 'BINARY'
        },
        {
            source: 'BIT',
            target: 'BIT'
        },
        {
            source: 'BLOB',
            target: 'BLOB'
        },
        {
            source: 'CHAR',
            target: 'CHAR'
        },
        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'DATETIME',
            target: 'DATETIME'
        },
        {
            source: 'DECIMAL',
            target: 'DECIMAL'
        },
        {
            source: 'DOUBLE',
            target: 'DOUBLE'
        },
        {
            source: 'ENUM',
            target: 'ENUM'
        },
        {
            source: 'FLOAT',
            target: 'FLOAT'
        },
        {
            source: 'GEOMCOLLECTION',
            target: 'GEOMCOLLECTION'
        },
        {
            source: 'GEOMETRY',
            target: 'GEOMETRY'
        },
        {
            source: 'GEOMETRYCOLLECTION',
            target: 'GEOMETRYCOLLECTION'
        },
        {
            source: 'INT',
            target: 'INT'
        },
        {
            source: 'JSON',
            target: 'JSON'
        },
        {
            source: 'LINESTRING',
            target: 'LINESTRING'
        },
        {
            source: 'LONGBLOB',
            target: 'LONGBLOB'
        },
        {
            source: 'LONGTEXT',
            target: 'LONGTEXT'
        },
        {
            source: 'MEDIUMBLOB',
            target: 'MEDIUMBLOB'
        },
        {
            source: 'MEDIUMINT',
            target: 'MEDIUMINT'
        },
        {
            source: 'MEDIUMTEXT',
            target: 'MEDIUMTEXT'
        },
        {
            source: 'MULTILINESTRING',
            target: 'MULTILINESTRING'
        },
        {
            source: 'MULTIPOINT',
            target: 'MULTIPOINT'
        },
        {
            source: 'MULTIPOLYGON',
            target: 'MULTIPOLYGON'
        },
        {
            source: 'POINT',
            target: 'POINT'
        },
        {
            source: 'POLYGON',
            target: 'POLYGON'
        },
        {
            source: 'SET',
            target: 'SET'
        },
        {
            source: 'SMALLINT',
            target: 'SMALLINT'
        },
        {
            source: 'TEXT',
            target: 'TEXT'
        },
        {
            source: 'TIME',
            target: 'TIME'
        },
        {
            source: 'TIMESTAMP',
            target: 'TIMESTAMP'
        },
        {
            source: 'TINYBLOB',
            target: 'TINYBLOB'
        },
        {
            source: 'TINYINT',
            target: 'TINYINT'
        },
        {
            source: 'TINYTEXT',
            target: 'TINYTEXT'
        },
        {
            source: 'VARBINARY',
            target: 'VARBINARY'
        },
        {
            source: 'VARCHAR',
            target: 'VARCHAR'
        },
        {
            source: 'YEAR',
            target: 'YEAR'
        }
    ]
}

const MariaDB = { ...MySQL };
MariaDB.examples = []

const AuroraForMySQL = { ...MySQL }
AuroraForMySQL.examples = []

const GaussDbForMySQL = { ...MySQL }
const GaussDB = { ...MySQL }

export {
    MySQL,
    MariaDB,
    AuroraForMySQL,
    GaussDbForMySQL,
    GaussDB
}
