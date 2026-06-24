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
            key: '数据校验',
            desc: '全量数据校验, 并支持定时'
        },
        {
            key: '修改订阅',
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        }
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
        }
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: [
        {
            "source": "Bool",
            "target": "BOOLEAN"
        },
        {
            "source": "Int8",
            "target": "TINYINT"
        },
        {
            "source": "Int16",
            "target": "INT"
        },
        {
            "source": "Int32",
            "target": "INT"
        },
        {
            "source": "Int64",
            "target": "BIGINT"
        },
        {
            "source": "Int128",
            "target": "LARGEINT"
        },
        {
            "source": "Int256",
            "target": "LARGEINT"
        },
        {
            "source": "UInt8",
            "target": "INT"
        },
        {
            "source": "UInt16",
            "target": "INT"
        },
        {
            "source": "UInt32",
            "target": "BIGINT"
        },
        {
            "source": "UInt64",
            "target": "LARGEINT"
        },
        {
            "source": "UInt128",
            "target": "LARGEINT"
        },
        {
            "source": "UInt256",
            "target": "LARGEINT"
        },
        {
            "source": "Float32",
            "target": "FLOAT"
        },
        {
            "source": "Float64",
            "target": "DOUBLE"
        },
        {
            "source": "Decimal",
            "target": "DECIMAL"
        },
        {
            "source": "String",
            "target": "VARCHAR"
        },
        {
            "source": "FixedString",
            "target": "CHAR"
        },
        {
            "source": "UUID",
            "target": "VARCHAR"
        },
        {
            "source": "IPv4",
            "target": "VARCHAR"
        },
        {
            "source": "IPv6",
            "target": "VARCHAR"
        },
        {
            "source": "Enum",
            "target": null
        },
        {
            "source": "Enum8",
            "target": null
        },
        {
            "source": "Enum16",
            "target": null
        },
        {
            "source": "Date",
            "target": "DATE"
        },
        {
            "source": "Date32",
            "target": "DATE"
        },
        {
            "source": "DateTime",
            "target": "DATETIME"
        },
        {
            "source": "DateTime32",
            "target": "DATETIME"
        },
        {
            "source": "DateTime64",
            "target": "DATETIME"
        },
        {
            "source": "Nothing",
            "target": null
        },
        {
            "source": "Nested",
            "target": null
        },
        {
            "source": "Tuple",
            "target": null
        },
        {
            "source": "Array",
            "target": null
        },
        {
            "source": "Map",
            "target": null
        },
        {
            "source": "Nullable",
            "target": null
        },
        {
            "source": "Unknown",
            "target": null
        },
        {
            "source": "Point",
            "target": null
        },
        {
            "source": "Polygon",
            "target": null
        },
        {
            "source": "MultiPolygon",
            "target": null
        },
        {
            "source": "LowCardinality",
            "target": null
        },
        {
            "source": "Ring",
            "target": null
        }
    ]
}
