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
            desc: '消息格式，文档：[消息格式说明](../../reference/kafka_msg_format_type)'
        },
        {
            key: 'batchWriteSize',
            desc: '单条消息最大数据条数，超过则拆分消息'
        },
        {
            key: 'enableBatching',
            desc: 'Pulsar 是否启用批量发送'
        },
        {
            key: 'batchingMaxBytes',
            desc: 'Pulsar 批量发送最大字节数，单位为字节'
        },
        {
            key: 'connectionTimeoutMs',
            desc: 'Pulsar Client 连接超时时间，单位为毫秒'
        },
        {
            key: 'compressionType',
            desc: '设置 Pulsar 消息压缩算法，支持 <b>LZ4</b>, <b>ZLIB</b>, <b>ZSTD</b>, <b>SNAPPY</b> 算法'
        },
        {
            key: 'envelopSchemaInclude',
            desc: '当 schemaFormat 设置为 <b>DEBEZIUM_ENVELOP_JSON_FOR_MQ</b> 时，消息体是否包含 schema 信息'
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
