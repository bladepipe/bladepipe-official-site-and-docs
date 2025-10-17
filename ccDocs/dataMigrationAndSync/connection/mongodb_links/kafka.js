export const Kafka = {
    main_function: [
        {
            key: '全量数据迁移',
            desc: '逻辑迁移，通过顺序扫描表数据，将数据分批写入到对端数据库，支持的 _id 类型为 <b>ObjectId</b>、<b>Long</b>、<b>Integer</b>'
        },
        {
            key: '增量实时同步',
            desc: '支持 <b>INSERT</b>、<b>UPDATE</b>、<b>DELETE</b> 同步'
        },
        {
            key: '修改订阅',
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '增量位点回溯',
            desc: '支持按照 时间戳 回溯位点，重新消费过去一段时间的 oplog'
        },
        {
            key: '部署形态支持',
            desc: '支持 <b>主备</b>、<b>副本集</b>、<b>分片集群</b>'
        },
    ],
    master_function: [
        {
            key: '表级别 topic',
            desc: '最小按照源端表级别设置对应的 topic, 支持自动获取表分区'
        },
        {
            key: 'DDL 专用 topic',
            desc: '支持指定 topic 发送 DDL, 如未指定，则放置 DDL 时间在对应表 topic 分区 0 中'
        },
    ],
    notice: [
        {
            key: '目标端需要提前创建 Topic',
            desc: 'MongoDB 到 Kafka / AutoMQ 不支持自动创建 Topic'
        }
    ],
    examples: [],
    faq: [],
    mapping: []
}
