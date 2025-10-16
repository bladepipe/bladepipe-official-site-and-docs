export const Kafka = {
    main_function: [
        {
            key: '结构迁移',
            desc: '如目标端不存在指定映射规则后的 Topic, 则自动进行 Topic 创建，并支持设置分区数'
        },
        {
            key: '全量数据迁移',
            desc: '逻辑迁移，通过顺序扫描表数据，将数据分批写入到消息中间件'
        },
        {
            key: '增量实时同步',
            desc: '支持 <b>INSERT</b>、<b>UPDATE</b>、<b>DELETE</b> 常见 DML 同步'
        },
        {
            key: '修改订阅',
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '增量位点回溯',
            desc: '支持按照数据 ID、时间戳 回溯位点，重新消费过去一段时间的 CDC 数据'
        },
        {
            key: '表名映射',
            desc: '支持 <b>和源端保持一致</b>, <b>转小写</b>, <b>转大写</b>'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的，查询设置过对端主键的'
        },
    ],
    master_function: [
        {
            key: '表级别 Topic',
            desc: '最小按照源端表级别设置对应的 Topic, 支持自动获取表分区'
        },
        {
            key: 'DDL 专用 Topic',
            desc: '支持指定 Topic 发送 DDL, 如未指定，则放置 DDL 时间在对应表 Topic 分区 0 中'
        },
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
    ],
    notice: [
        {
            key: 'Hana 触发器记录变更前的数据',
            desc: '考虑到 Hana 触发器的执行效率，单 CDC 表模式下，目前只记录变更前的主键数据'
        },
    ],
    examples: [],
    faq: [],
    mapping: []
}
