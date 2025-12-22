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
            key: '数据校验',
            desc: '全量数据校验, 并支持定时'
        },
        {
            key: '修改订阅',
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>, <b>以\'_数字\'后缀截取</b>'
        }
    ],
    master_function: [
        {
            key: '定时全量迁移',
            desc: '文档1：[创建定时全量任务](../../operation/job_manage/create_job/create_period_full_job) <br /> 文档2：[定时全量实现增量数据迁移](../../bestPractice/time_schedule_full)'
        },
        {
            key: '自定义代码',
            desc: '文档1：[创建自定义代码任务](../../operation/job_manage/create_job/create_process_job) <br />文档2：[自定义代码任务 debug](../../operation/job_manage/job_op/debug_customer_code) <br />文档3：[在自定义代码中打日志](../../operation/job_manage/job_op/log_in_customer_code)'
        },
        {
            key: '数据过滤条件',
            desc: '支持 WHERE 条件进行数据过滤，内容为 SQL 92 子集，文档：[创建数据过滤任务](../../operation/job_manage/create_job/create_data_filter_job)'
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
            source: 'Bool',
            target: 'Bool'
        },
        {
            source: 'Int8',
            target: 'Int8'
        },
        {
            source: 'Int16',
            target: 'Int16'
        },
        {
            source: 'Int32',
            target: 'Int32'
        },
        {
            source: 'Int64',
            target: 'Int64'
        },
        {
            source: 'Int128',
            target: 'Int128'
        },
        {
            source: 'Int256',
            target: 'Int256'
        },
        {
            source: 'UInt8',
            target: 'UInt8'
        },
        {
            source: 'UInt16',
            target: 'UInt16'
        },
        {
            source: 'UInt32',
            target: 'UInt32'
        },
        {
            source: 'UInt64',
            target: 'UInt64'
        },
        {
            source: 'UInt128',
            target: 'UInt128'
        },
        {
            source: 'UInt256',
            target: 'UInt256'
        },
        {
            source: 'Float32',
            target: 'Float32'
        },
        {
            source: 'Float64',
            target: 'Float64'
        },
        {
            source: 'Decimal32',
            target: 'Decimal32'
        },
        {
            source: 'Decimal64',
            target: 'Decimal64'
        },
        {
            source: 'Decimal128',
            target: 'Decimal128'
        },
        {
            source: 'Decimal256',
            target: 'Decimal256'
        },
        {
            source: 'Decimal',
            target: 'Decimal'
        },
        {
            source: 'String',
            target: 'String'
        },
        {
            source: 'FixedString',
            target: 'FixedString'
        },
        {
            source: 'UUID',
            target: 'UUID'
        },
        {
            source: 'Enum',
            target: 'Enum'
        },
        {
            source: 'Enum8',
            target: 'Enum8'
        },
        {
            source: 'Enum16',
            target: 'Enum16'
        },
        {
            source: 'IPv4',
            target: 'IPv4'
        },
        {
            source: 'IPv6',
            target: 'IPv6'
        },
        {
            source: 'Date',
            target: 'Date'
        },
        {
            source: 'Date32',
            target: 'Date32'
        },
        {
            source: 'DateTime',
            target: 'DateTime'
        },
        {
            source: 'DateTime32',
            target: 'DateTime32'
        },
        {
            source: 'DateTime64',
            target: 'DateTime64'
        },
        {
            source: 'Nothing',
            target: 'Nothing'
        },
        {
            source: 'Nested',
            target: 'Nested'
        },
        {
            source: 'Tuple',
            target: 'Tuple'
        },
        {
            source: 'Array',
            target: 'Array'
        },
        {
            source: 'Map',
            target: 'Map'
        },
        {
            source: 'Nullable',
            target: 'Nullable'
        },
        {
            source: 'Point',
            target: 'Point'
        },
        {
            source: 'Polygon',
            target: 'Polygon'
        },
        {
            source: 'MultiPolygon',
            target: 'MultiPolygon'
        },
        {
            source: 'LowCardinality',
            target: 'LowCardinality'
        },
        {
            source: 'Ring',
            target: 'Ring'
        }
    ]
}
