export const ClickHouse = {
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
            key: '数据校验',
            desc: '全量数据校验, 并支持定时'
        },
        {
            key: '修改订阅',
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '重置位点',
            desc: '按 <b>时间戳</b> 或 <b>Scn</b> 回溯位点，重新消费过去一段时间 Oracle Redo Log'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: 'DDL 同步',
            desc: '\n- ALTER TABLE ADD , MODIFY , DROP COLUMN \n- TRUNCATE TABLE'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的'
        }
    ],
    master_function: [
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
        }
    ],
    notice: [],
    examples: [
        {
            key: 'Oracle 到 ClickHouse 数据迁移同步',
            desc: '文档：[Oracle 到 ClickHouse 数据迁移同步](https://www.clougence.com/docs/bestPractice/oracle_clickhouse_sync)'
        }
    ],
    faq: [],
    mapping: [
        {
            source: 'CHAR',
            target: 'String'
        },
        {
            source: 'NCHAR',
            target: 'String'
        },
        {
            source: 'VARCHAR2',
            target: 'String'
        },
        {
            source: 'NVARCHAR',
            target: 'String'
        },
        {
            source: 'NVARCHAR2',
            target: 'String'
        },
        {
            source: 'LONG',
            target: 'String'
        },
        {
            source: 'NUMBER_BIGINT',
            target: 'Int128'
        },
        {
            source: 'NUMBER_DECIMAL',
            target: 'Decimal'
        },
        {
            source: 'FLOAT',
            target: 'Float64'
        },
        {
            source: 'BINARY_FLOAT',
            target: 'Decimal'
        },
        {
            source: 'BINARY_DOUBLE',
            target: 'Decimal'
        },
        {
            source: 'CLOB',
            target: 'String'
        },
        {
            source: 'NCLOB',
            target: 'String'
        },
        {
            source: 'DATE',
            target: 'DateTime64'
        },
        {
            source: 'TIMESTAMP',
            target: 'DateTime64'
        },
        {
            source: 'TIMESTAMP_WITH_TIME_ZONE',
            target: 'DateTime64'
        },
        {
            source: 'TIMESTAMP_WITH_LOCAL_TIME_ZONE',
            target: 'DateTime64'
        },
        {
            source: 'INTERVAL_YEAR_TO_MONTH',
            target: 'DateTime64'
        },
        {
            source: 'INTERVAL_DAY_TO_SECOND',
            target: 'DateTime64'
        },
        {
            source: 'ROWID',
            target: 'String'
        },
        {
            source: 'XMLTYPE',
            target: 'String'
        },
        {
            source: 'HTTPURITYPE',
            target: 'String'
        }
    ]
}
