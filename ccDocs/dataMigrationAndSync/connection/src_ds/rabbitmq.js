export const RabbitMQ = {
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 RabbitMQ 各节点'
        }
    ],
    params: [
        {
            key: 'schemaFormat',
            desc: 'MQ 消息格式，文档：[消息格式说明](../../reference/kafka_msg_format_type)'
        },
        {
            key: 'consumeParallel',
            desc: '消费 RabbitMQ 的并行度'
        },
    ],
    faq: [],
    notice: [
        {
            key: '目标端需要提前创建表',
            desc: '仅支持消息自动创建 Queue'
        },
        {
            key: '原始消息格式',
            desc: '仅支持 RabbitMQ 到 RabbitMQ，且两端的消息格式都需要选择 <b>原始消息格式</b>'
        }
    ],
    examples: [],
    master_function: [
        {
            key: '消息格式',
            desc: '支持以下消息格式，文档：[消息格式说明](../../reference/kafka_msg_format_type) \n- <b>CloudCanal内置格式</b> \n- <b>AlibabaCanal兼容格式</b>'
        },
    ]
}