export const AutoMQ = {
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 AutoMQ 各节点'
        }
    ],
    params: [
        {
            key: 'schemaFormat',
            desc: 'MQ 消息格式，文档：[消息格式说明](../../../reference/kafka_msg_format_type)'
        },
        {
            key: 'consumerGroupId',
            desc: 'AutoMQ 消费组 Id'
        },
        {
            key: 'consumeParallel',
            desc: '消费 AutoMQ 的并行度'
        },
        {
            key: 'sessonTimeoutMs',
            desc: 'AutoMQ Session 超时时间（毫秒）'
        },
        {
            key: 'maxPollRecords',
            desc: 'AutoMQ 一次最大拉取消息数量'
        },
    ],
    faq: [
        '[如何打开 AutoMQ 源端心跳?](../../datasource_func/Kafka/open_kafka_heartbeat)'
    ],
    notice: [
        {
            key: '目标端需要提前创建表',
            desc: '仅支持消息自动创建 Topic'
        },
        {
            key: '原始消息格式',
            desc: '仅支持 AutoMQ 到 AutoMQ，且两端的消息格式都需要选择 <b>原始消息格式</b>'
        }
    ],
    examples: [
        {
            key: 'CloudCanal x AutoMQ 数据迁移同步',
            desc: '文档：[CloudCanal x AutoMQ 数据迁移同步](https://www.clougence.com/blog/data_insights/automq_sync)'
        },
        {
            key: '跨互联网数据互通 (AutoMQ)',
            desc: '文档：[跨互联网数据互通 (AutoMQ)](https://www.clougence.com/blog/data_sync_sample/kafka_base_internet_data_sync)'
        },
        {
            key: 'AutoMQ 数据中转校验',
            desc: '文档：[AutoMQ 数据中转校验](https://www.clougence.com/blog/data_sync_sample/kafka_data_check)'
        }
    ],
    master_function: [
        {
            key: '消息格式',
            desc: '支持以下消息格式，文档：[消息格式说明](../../../reference/kafka_msg_format_type) \n- <b>CloudCanal内置格式</b> \n- <b>AlibabaCanal兼容格式</b>'
        },
    ]
}