const PostgreSQL = {
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
            desc: '支持 <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> 常见 DML 同步'
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
            desc: '\n- ALTER TABLE ADD COLUMN, DROP COLUMN, MODIFY COLUMN, CHANGE COLUMN \n- ADD INDEX \n- RENAME TABLE'
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
    examples: [
        {
            key: 'MySQL 到 PostgresSQL 数据迁移同步',
            desc: '文档：[MySQL 到 PostgresSQL 数据迁移同步](https://www.clougence.com/blog/data_sync_sample/mysql_pg_gp)'
        }
    ],
    faq: [],
    mapping: [
        {
            source: 'CHAR',
            target: 'CHAR'
        },
        {
            source: 'NCHAR',
            target: 'CHAR'
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
            source: 'TEXT',
            target: 'TEXT'
        },
        {
            source: 'TINYTEXT',
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
            source: 'BOOL',
            target: 'BOOLEAN'
        },
        {
            source: 'BOOLEAN',
            target: 'BOOLEAN'
        },
        {
            source: 'SMALLINT',
            target: 'SMALLINT'
        },
        {
            source: 'TINYINT',
            target: 'SMALLINT'
        },
        {
            source: 'INT',
            target: 'INTEGER'
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
            source: 'MEDIUMINT',
            target: 'BIGINT'
        },
        {
            source: 'FLOAT',
            target: 'REAL'
        },
        {
            source: 'DOUBLE',
            target: 'DOUBLE_PRECISION'
        },
        {
            source: 'DOUBLE_PRECISION',
            target: 'DOUBLE_PRECISION'
        },
        {
            source: 'DECIMAL',
            target: 'DECIMAL'
        },
        {
            source: 'DEC',
            target: 'DECIMAL'
        },
        {
            source: 'REAL',
            target: 'REAL'
        },
        {
            source: 'SERIAL',
            target: 'BIGINT'
        },
        {
            source: 'NUMERIC',
            target: 'NUMERIC'
        },
        {
            source: 'FIXED',
            target: 'DECIMAL'
        },
        {
            source: 'BIT',
            target: 'VARBIT'
        },
        {
            source: 'BINARY',
            target: 'BYTEA'
        },
        {
            source: 'VARBINARY',
            target: 'BYTEA'
        },
        {
            source: 'TINYBLOB',
            target: 'BYTEA'
        },
        {
            source: 'BLOB',
            target: 'BYTEA'
        },
        {
            source: 'LONGBLOB',
            target: 'BYTEA'
        },
        {
            source: 'MEDIUMBLOB',
            target: 'BYTEA'
        },
        {
            source: 'JSON',
            target: 'JSON'
        },
        {
            source: 'ENUM',
            target: 'VARCHAR'
        },
        {
            source: 'SET',
            target: 'VARCHAR'
        },
        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'TIME',
            target: 'TIME'
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
            source: 'YEAR',
            target: 'INTEGER'
        },
        {
            source: 'TINYINT_UNSIGNED',
            target: 'SMALLINT'
        },
        {
            source: 'SMALLINT_UNSIGNED',
            target: 'INTEGER'
        },
        {
            source: 'MEDIUMINT_UNSIGNED',
            target: 'INTEGER'
        },
        {
            source: 'INT_UNSIGNED',
            target: 'BIGINT'
        },
        {
            source: 'INTEGER_UNSIGNED',
            target: 'BIGINT'
        },
        {
            source: 'BIGINT_UNSIGNED',
            target: 'BIGINT'
        }
    ]
}

const Greenplum = PostgreSQL;
const AnalyticDbForPg = PostgreSQL;
const AuroraForPg = PostgreSQL;
const OpenGauss = PostgreSQL;

export {
    PostgreSQL,
    AuroraForPg,
    Greenplum,
    AnalyticDbForPg,
    OpenGauss
}
