const Kafka = {
    main_function: [
        {
            key: '结构迁移',
            desc: '如目标不存在所选 Topic，会自动根据源端表名（结合映射），生成对端 Topic 并创建，支持设置分区数'
        },
        {
            key: '全量数据迁移',
            desc: '逻辑迁移，通过顺序扫描表数据，将数据分批写入到对端消息队列'
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
        }
    ],
    master_function: [
        {
            key: 'Topic 映射规则',
            desc: '默认由源端 <b>实例ID</b>.<b>数据库</b>.<b>表名</b> 组成（如 my-vgpq6q097174t6t.dingtax.app_key），此外支持 <b>保持一致</b>、<b>转小写</b>、<b>转大写</b> 等映射规则'
        },
        {
            key: '按表分 Topic',
            desc: '为源端每一张表创建对应的 Topic，且能自动获取表的分区信息'
        },
        {
            key: 'DDL 独立 Topic',
            desc: '支持指定 DDL 专用的 Topic。若未指定，DDL 消息默认进入对应表 Topic 的 0 号分区'
        },
        {
            key: '定时全量迁移',
            desc: '支持定时触发全量数据迁移，文档：[创建定时全量任务](../../operation/job_manage/create_job/create_period_full_job)'
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
            desc: '变更主键为其他字段'
        }
    ],
    notice: [],
    examples: [],
    faq: []
}

export {
    Kafka as AmazonMSK
}
