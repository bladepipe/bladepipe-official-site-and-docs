export const Pulsar = {
    prepare: [
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the nodes of Pulsar.'
        }
    ],
    params: [
        {
            key: 'schemaFormat',
            desc: 'Message format. For more information, see [Message Format](../../../reference/kafka_msg_format_type).'
        },
        {
            key: 'batchWriteSize',
            desc: 'The maximum data size of a single message. If the size exceeds the limit, the message will be split.'
        },
        {
            key: 'enableBatching',
            desc: 'Enable Pulsar to push messages in batches.'
        },
        {
            key: 'batchingMaxBytes',
            desc: 'The maximum bytes of messages in a batch pushed by Pulsar (in bytes).'
        },
        {
            key: 'connectionTimeoutMs',
            desc: 'The timeout period for connection to Pulsar Client (in milliseconds).'
        },
        {
            key: 'compressionType',
            desc: 'Set compression algorithm. Support <b>LZ4</b>, <b>ZLIB</b>, <b>ZSTD</b>, <b>SNAPPY</b>.'
        },
        {
            key: 'envelopSchemaInclude',
            desc: 'When schemaFormat is set to <b>DEBEZIUM_ENVELOP_JSON_FOR_MQ</b>, it means whether the message body contains schema information.'
        }
    ],
    examples: [
    ],
    master_function: [
        {
            key: 'Message Format',
            desc: 'The following message formats are supported. See [Message Format](../../../reference/kafka_msg_format_type). \n- <b>CloudCanal format</b> \n- <b>AlibabaCanal format</b>'
        }
    ]
}
