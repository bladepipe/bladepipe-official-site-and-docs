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
            desc: '支持 <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> 常见 DML 同步'
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
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: 'DDL 同步',
            desc: 'KingbaseES DDL 同步基于 <b>触发器</b> 实现，需具备相应的 <b>触发器</b> 和 <b>表</b> 权限。文档：[KingbaseES 需要的权限](../datasource_func/kingbasees/privs_for_kes) \n- ALTER TABLE ADD COLUMN, MODIFY COLUMN, RENAME COLUMN, DROP COLUMN \n- RENAME TABLE \n- CREATE TABLE, TRUNCATE TABLE'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的'
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
            key: '数据过滤条件',
            desc: '支持 WHERE 条件进行数据过滤，内容为 SQL 92 子集，文档：[创建数据过滤任务](../../../operation/job_manage/create_job/create_data_filter_job)'
        },
        {
            key: '设置目标主键',
            desc: '变更主键为其他字段，方便数据聚合等操作'
        },
        {
            key: '添加虚拟列',
            desc: '支持添加自定义的虚拟列，指定的值为固定值，如区域、编号等'
        },
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: [
        {
            source: 'SMALLSERIAL',
            target: 'INT'
        },
        {
            source: 'SERIAL',
            target: 'BIGINT'
        },
        {
            source: 'BIGSERIAL',
            target: 'BIGINT'
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
            source: 'OID',
            target: 'TEXT'
        },
        {
            source: 'NUMERIC',
            target: 'DECIMAL'
        },
        {
            source: 'REAL',
            target: 'FLOAT'
        },
        {
            source: 'DOUBLE_PRECISION',
            target: 'DOUBLE'
        },
        {
            source: 'MONEY',
            target: 'DOUBLE'
        },
        {
            source: 'CHARACTER',
            target: 'VARCHAR'
        },
        {
            source: 'BPCHAR',
            target: 'TEXT'
        },
        {
            source: 'CHARACTER_VARYING',
            target: 'VARCHAR'
        },
        {
            source: 'TEXT',
            target: 'TEXT'
        },
        {
            source: 'NAME',
            target: 'TEXT'
        },
        {
            source: 'TIMESTAMP_WITHOUT_TIME_ZONE',
            target: 'DATETIME'
        },
        {
            source: 'TIMESTAMP_WITH_TIME_ZONE',
            target: 'TIMESTAMP'
        },
        {
            source: 'TIME_WITHOUT_TIME_ZONE',
            target: 'TIME'
        },
        {
            source: 'TIME_WITH_TIME_ZONE',
            target: 'TIME'
        },
        {
            source: 'DATE',
            target: 'DATE'
        },
        {
            source: 'INTERVAL',
            target: 'TIMESTAMP'
        },
        {
            source: 'BIT',
            target: 'BINARY'
        },
        {
            source: 'BIT_VARYING',
            target: 'BINARY'
        },
        {
            source: 'BOOLEAN',
            target: 'TINYINT'
        },
        {
            source: 'XML',
            target: 'TEXT'
        },
        {
            source: 'BYTEA',
            target: 'BINARY'
        },
        {
            source: 'POINT',
            target: 'TEXT'
        },
        {
            source: 'LINE',
            target: 'TEXT'
        },
        {
            source: 'LSEG',
            target: 'TEXT'
        },
        {
            source: 'BOX',
            target: 'TEXT'
        },
        {
            source: 'PATH',
            target: 'TEXT'
        },
        {
            source: 'POLYGON',
            target: 'TEXT'
        },
        {
            source: 'CIRCLE',
            target: 'TEXT'
        },
        {
            source: 'CIDR',
            target: 'TEXT'
        },
        {
            source: 'MACADDR',
            target: 'TEXT'
        },
        {
            source: 'MACADDR8',
            target: 'TEXT'
        },
        {
            source: 'UUID',
            target: 'VARCHAR'
        },
        {
            source: 'JSON',
            target: 'JSON'
        },
        {
            source: 'JSONB',
            target: 'JSON'
        },
        {
            source: 'INT4RANGE',
            target: 'TEXT'
        },
        {
            source: 'INT8RANGE',
            target: 'TEXT'
        },
        {
            source: 'NUMRANGE',
            target: 'TEXT'
        },
        {
            source: 'TSRANGE',
            target: 'TEXT'
        },
        {
            source: 'TSTZRANGE',
            target: 'TEXT'
        },
        {
            source: 'DATERANGE',
            target: 'TEXT'
        }
    ]
}

export {
    MySQL
}
