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
            desc: '消息格式，文档：[消息格式说明](../../reference/kafka_msg_format_type)'
        },
        {
            key: 'batchWriteSize',
            desc: '单条消息最大数据条数，超过则拆分消息'
        },
        {
            key: 'defaultTopic',
            desc: '无法找到对应 Topic 的消息则发送到此 Topic (如新增表)'
        },
        {
            key: 'ddlTopic',
            desc: '专门发送 DDL 的 Topic, 为空则发送到对应 Topic 的第 0 个分区'
        },
        {
            key: 'compressionType',
            desc: 'Kafka <b>compression.type</b> 参数, 设置压缩算法, 支持 <b>GZIP</b>, <b>SNAPPY</b>, <b>LZ4</b>, <b>ZSTD</b> 算法'
        },
        {
            key: 'batchSize',
            desc: 'Kafka <b>batch.size</b> 参数'
        },
        {
            key: 'acks',
            desc: 'Kafka <b>acks</b> 参数, 默认 <b>all</b>'
        },
        {
            key: 'maxRequestBytes',
            desc: 'Kafka <b>max.request.size</b> 参数'
        },
        {
            key: 'lingerMs',
            desc: 'Kafka <b>linger.ms</b> 参数, 默认 1'
        },
        {
            key: 'envelopSchemaInclude',
            desc: '当 schemaFormat 设置为 <b>DEBEZIUM_ENVELOP_JSON_FOR_MQ</b> 时，消息体是否包含 schema 信息'
        }
    ],
    examples: [
        {
            key: '跨互联网数据互通 (Kafka)',
            desc: '文档：[跨互联网数据互通 (Kafka)](https://www.clougence.com/blog/data_sync_sample/kafka_base_internet_data_sync)'
        },
        {
            key: 'Kafka 数据中转校验',
            desc: '文档：[Kafka 数据中转校验](https://www.clougence.com/blog/data_sync_sample/kafka_data_check)'
        }
    ],
    master_function: [
        {
            key: '消息格式',
            desc: '支持以下消息格式，文档：[消息格式说明](../../reference/kafka_msg_format_type) \n- <b>CloudCanal内置格式</b> \n- <b>AlibabaCanal兼容格式</b>'
        },
    ]
}