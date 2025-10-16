const Pulsar = {
    main_function: [
        {
            key: '结构迁移',
            desc: '如目标端不存在指定映射规则后的 Topic，则自动进行 Topic 创建，并支持设置分区数'
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
            key: '重置位点',
            desc: '支持按照文件位点、时间戳 回溯位点，重新消费过去一段时间或指定 Binlog 文件和位点开始的增量日志'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的，查询设置过对端主键的'
        },
    ],
    master_function: [
        {
            key: 'Topic 映射规则',
            desc: '默认按 和源端一致 进行映射，额外支持按 <b>转小写</b>、<b>转大写</b>、<b>以\'_数字\'后缀截取</b>、<b>按 SCHEMA_TABLE 拼接（元数据镜像）</b>、<b>按 SCHEMA_TABLE 拼接（元数据转大写）</b>、<b>按 SCHEMA_TABLE 拼接（元数据转小写）</b> 映射'
        },
        {
            key: '表级别 Topic',
            desc: '最小按照源端表级别设置对应的 Topic，支持自动获取表分区'
        },
        {
            key: '全库同步',
            desc: '支持源端新建、删除、修改表的 DDL 和数据同步，文档：[创建全库同步任务](../../operation/job_manage/create_job/create_db_sync_job)'
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
        {
            key: '设置目标主键',
            desc: '支持变更主键为其他字段'
        }
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: []
}

export {
    Pulsar
}
