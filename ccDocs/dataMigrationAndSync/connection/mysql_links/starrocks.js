export const StarRocks = {
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
            key: '重置位点',
            desc: '支持按照文件位点、时间戳 回溯位点，重新消费过去一段时间或指定 Binlog 文件和位点开始的增量日志'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        },
        {
            key: 'DDL 同步',
            desc: '\n- ALTER TABLE ADD COLUMN, MODIFY COLUMN, DROP COLUMN \n- CREATE TABLE (全库同步) \n- RENAME TABLE (全库同步) \n- DROP TABLE (全库同步)'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的，查询设置过对端主键的'
        },
    ],
    master_function: [
        {
            key: '兼容 Online DDL',
            desc: '支持 <b>GH-OST</b>, <b>PT-OSC</b>, <b>Aliyun DMS Online DDL</b>, <b>PT_GHOST</b> 同步，文档：[支持 GH-OST 和 PT-OSC](https://www.clougence.com/blog/data_insights/online_ddl_support)'
        },
        {
            key: '自定义表属性',
            desc: '包括分桶数、副本数等属性设置'
        },
        {
            key: '设置数据分区',
            desc: '创建任务时，可按表粒度指定分区定义（静态或动态）,结构迁移时自动添加该分区定义'
        },
        {
            key: '表达式表名',
            desc: '支持按正则表达式表名迁移同步数据，实现全库同步、分表汇聚等功能中自动增减表需求，文档：[表达式任务](../../../operation/job_manage/create_job/create_regex_table_job)'
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
            key: '添加虚拟列',
            desc: '支持添加自定义的虚拟列，指定的值为固定值，如区域、编号等'
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
    notice: [
        {
            key: 'DDL 同步限制',
            desc: [
                '- 不同步二级索引的新增、删除和重命名，包括普通、唯一和联合索引。例如 `ADD INDEX idx_name(name)`、`ADD UNIQUE INDEX uk_code(code)`、`DROP INDEX idx_name`、`RENAME INDEX idx_name TO idx_name_v2`。',
                '- 不同步 `ALTER TABLE ... ADD PRIMARY KEY (...)` 和 `ALTER TABLE ... DROP PRIMARY KEY`。',
                '- 忽略列顺序选项 `FIRST`、`AFTER`，例如 `ADD COLUMN code VARCHAR(32) AFTER id` 不保证目标列顺序与源端一致。',
                '- 普通非主键列按可空方式转换。例如 `MODIFY COLUMN name VARCHAR(100) NOT NULL` 不会将目标普通列改为 `NOT NULL`；目标主键、分区列另受其约束。',
                '- 不同步独立的默认值设置和删除，例如 `ALTER TABLE t ALTER COLUMN qty SET DEFAULT 9`、`ALTER TABLE t ALTER COLUMN qty DROP DEFAULT`。`CREATE TABLE`、`ADD COLUMN`、`MODIFY COLUMN` 中的常量默认值按映射保留。',
                '- 过滤函数默认值，例如 `DEFAULT CURRENT_TIMESTAMP`、`DEFAULT CURRENT_TIMESTAMP(6)`、`DEFAULT NOW()`、`DEFAULT (UUID_TO_BIN(UUID()))`。',
                '- 修改列时，目标返回 `Can not change default value` 或 `Cannot shorten string length`，会记录警告并跳过该条目标 DDL；该条语句中的类型、长度等修改也不会生效。',
                '- 类型、长度和精度变更受目标版本及列用途限制，不保证所有转换均可执行。例如 `VARCHAR(100)` 扩为 `VARCHAR(200)` 与缩为 `VARCHAR(50)` 的执行结果可能不同。',
                '- 过滤 `MEDIUMBLOB`、`LONGBLOB` 字段的加列、改列操作，例如 `ADD COLUMN payload MEDIUMBLOB`。`TINYBLOB`、`BLOB` 映射为 `VARBINARY`，目标版本需为 StarRocks 3.0 及以上。',
                '- 一条包含多个操作的 `ALTER TABLE` 可能拆成多条目标 DDL，分别执行或过滤，不保证整条源端语句原子生效。例如 `ADD COLUMN enabled BOOLEAN, MODIFY COLUMN name VARCHAR(100), DROP COLUMN obsolete`。'
            ].join('\n')
        }
    ],
    examples: [],
    faq: [],
    mapping: [
        {
            source: 'BIT',
            target: 'INT'
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
            target: 'FLOAT'
        },
        {
            source: 'DOUBLE',
            target: 'DOUBLE'
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
            source: 'TIMESTAMP',
            target: 'DATETIME'
        },
        {
            source: 'TIME',
            target: 'STRING'
        },
        {
            source: 'YEAR',
            target: 'INT'
        },
        {
            source: 'CHAR',
            target: 'VARCHAR'
        },
        {
            source: 'VARCHAR',
            target: 'VARCHAR'
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
        }
    ]
}
