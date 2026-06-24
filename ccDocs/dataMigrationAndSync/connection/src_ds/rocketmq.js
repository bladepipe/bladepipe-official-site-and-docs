export const RocketMQ = {
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 RocketMQ 各节点'
        }
    ],
    params: [
        {
            key: 'schemaFormat',
            desc: 'MQ 消息格式，文档：[消息格式说明](../../../reference/kafka_msg_format_type)'
        },
    ],
    faq: [],
    notice: [
        {
            key: 'RocketMQ 目前不支持自动创建 Topic',
            desc: '目标端需要提前创建表'
        },
    ],
    examples: [],
    master_function: [
        {
            key: '消息格式',
            desc: '支持以下消息格式，文档：[消息格式说明](../../../reference/kafka_msg_format_type) \n- <b>CloudCanal内置格式</b> \n- <b>AlibabaCanal兼容格式</b>'
        },
    ]
}