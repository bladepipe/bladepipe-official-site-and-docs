export const Pulsar = {
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 Pulsar 各节点'
        }
    ],
    params: [
        {
            key: 'schemaFormat',
            desc: 'MQ 消息格式，文档：[消息格式说明](../../reference/kafka_msg_format_type)'
        },
        {
            key: 'subscriptionMode',
            desc: 'Pulsar 订阅模式 <b>Durable</b> 或 <b>NonDurable</b>'
        },
        {
            key: 'consumeParallel',
            desc: '消费 Pulsar 的并行度'
        },
        {
            key: 'receiverQueueSize',
            desc: 'Pulsar 消费者接收队列大小'
        },
        {
            key: 'receiverMaxNumBytes',
            desc: 'Pulsar batch 接收最大字节数, 单位为字节'
        },
        {
            key: 'receiverTimeout',
            desc: 'Pulsar batch 接收超时时间, 单位为秒'
        },
        {
            key: 'connectionTimeoutMs',
            desc: 'Pulsar Client 连接超时时间, 单位为毫秒'
        }
    ],
    faq: [],
    notice: [
        {
            key: '目标端需要提前创建表',
            desc: '仅支持消息自动创建 Topic'
        }
    ],
    examples: [
    ],
    master_function: [
        {
            key: '消息格式',
            desc: '支持以下消息格式，文档：[消息格式说明](../../reference/kafka_msg_format_type) \n- <b>CloudCanal内置格式</b> \n- <b>AlibabaCanal兼容格式</b>'
        },
    ]
}
