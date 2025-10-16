export const OceanBase = {
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
            desc: '支持 <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> 常见 DML 同步 <br />无主键表 UPDATE、DELETE 不同步（需手动勾选）'
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
            desc: '按 <b>时间戳</b> 回溯位点，重新消费过去一段时间的增量日志'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: 'DDL 同步',
            desc: '\n- ALTER TABLE ADD , MODIFY , DROP COLUMN \n- TRUNCATE TABLE \n- ALTER TABLE RENAME TO \n- CREATE TABLE (全库同步) \n- DROP TABLE (全库同步)'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的'
        },
    ],
    master_function: [
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
            source: 'VARCHAR2',
            target: 'VARCHAR'
        },
        {
            source: 'NVARCHAR',
            target: 'VARCHAR'
        },
        {
            source: 'NVARCHAR2',
            target: 'VARCHAR'
        },
        {
            source: 'NUMBER_BIGINT',
            target: 'BIGINT'
        },
        {
            source: 'NUMBER_DECIMAL',
            target: 'DECIMAL'
        },
        {
            source: 'FLOAT',
            target: 'FLOAT'
        },
        {
            source: 'BINARY_FLOAT',
            target: 'FLOAT'
        },
        {
            source: 'BINARY_DOUBLE',
            target: 'DOUBLE'
        },
        {
            source: 'CLOB',
            target: 'TEXT'
        },
        {
            source: 'DATE',
            target: 'DATETIME'
        },
        {
            source: 'TIMESTAMP',
            target: 'TIMESTAMP'
        },
        {
            source: 'TIMESTAMP_WITH_TIME_ZONE',
            target: 'TIMESTAMP'
        },
        {
            source: 'TIMESTAMP_WITH_LOCAL_TIME_ZONE',
            target: 'TIMESTAMP'
        },
        {
            source: 'INTERVAL_YEAR_TO_MONTH',
            target: 'VARCHAR'
        },
        {
            source: 'INTERVAL_DAY_TO_SECOND',
            target: 'VARCHAR'
        },
        {
            source: 'ROWID',
            target: 'VARCHAR'
        },
        {
            source: 'XMLTYPE',
            target: 'VARCHAR'
        },
        {
            source: 'HTTPURITYPE',
            target: 'VARCHAR'
        }
    ]
}
