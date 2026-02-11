export const Kafka = {
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 Kafka 各节点'
        }
    ],
    params: [
        {
            key: 'schemaFormat',
            desc: 'MQ 消息格式，文档：[消息格式说明](../../reference/kafka_msg_format_type)'
        },
        {
            key: 'consumerGroupId',
            desc: 'Kafka 消费组 Id'
        },
        {
            key: 'consumeParallel',
            desc: '消费 Kafka 的并行度'
        },
        {
            key: 'sessonTimeoutMs',
            desc: 'Kafka Session 超时时间（毫秒）'
        },
        {
            key: 'maxPollRecords',
            desc: 'Kafka 一次最大拉取消息数量'
        },
        {
            key: 'dbHeartbeatIntervalSec',
            desc: '配置对源端数据库发起心跳操作的间隔时长'
        },
        {
            key: 'dbHeartbeatToleranceStep',
            desc: '配置对源端数据库心跳操作可容忍的位点差值'
        },{
            key:'customClientProps',
            desc:'自定义传入到 Kafka Client 参数，JSON 格式，key为参数名，value为参数值。此配置项以最高优先级生效。例如：[AWS IAM 访问控制](../datasource_func/Kafka/kafka_iam_auth)'
        }
    ],
    faq: [
        '[如何打开 Kafka 源端心跳?](../datasource_func/Kafka/open_kafka_heartbeat)'
    ],
    notice: [
        {
            key: '目标端需要提前创建表',
            desc: '仅支持消息自动创建 Topic'
        },
        {
            key: '原始消息格式',
            desc: '仅支持 Kafka 到 Kafka，且两端的消息格式都需要选择 <b>原始消息格式</b>'
        }
    ],
    examples: [
        {
            key: '跨互联网数据互通 (Kafka)',
            desc: '文档：[跨互联网数据互通 (Kafka)](../../blog/kafka_base_internet_data_sync)'
        },
        {
            key: 'Kafka 数据中转校验',
            desc: '文档：[Kafka 数据中转校验](../../blog/kafka_data_check)'
        }
    ],
    master_function: [
        {
            key: '消息格式',
            desc: '支持以下消息格式，文档：[消息格式说明](../../reference/kafka_msg_format_type) \n- <b>CloudCanal内置格式</b> \n- <b>AlibabaCanal兼容格式</b>'
        },
    ]
}
