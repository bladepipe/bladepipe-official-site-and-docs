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
            desc: '消息格式，文档：[消息格式说明](../../reference/kafka_msg_format_type)'
        }
    ],
    master_function: [
        {
            key: '消息格式',
            desc: '支持以下消息格式，文档：[消息格式说明](../../reference/kafka_msg_format_type) \n- <b>CloudCanal内置格式</b> \n- <b>AlibabaCanal兼容格式</b>'
        },
    ]
}
