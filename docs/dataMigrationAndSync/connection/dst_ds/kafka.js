export const Kafka = {
    prepare: [
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the Kafka ports.'
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
            key: 'defaultTopic',
            desc: 'Messages that cannot find a corresponding topic are sent to this topic (such as adding a new table)'
        },
        {
            key: 'ddlTopic',
            desc: 'A topic specifically used to receive DDL events. If it is empty, the DDL events will be sent to the 0th partition of the corresponding topic.'
        },
        {
            key: 'compressionType',
            desc: 'Kafka <b>compression.type</b> parameter to set compression algorithm. Support <b>GZIP</b>, <b>SNAPPY</b>, <b>LZ4</b>, <b>ZSTD</b>.'
        },
        {
            key: 'batchSize',
            desc: 'Kafka <b>batch.size</b> parameter.'
        },
        {
            key: 'acks',
            desc: 'Kafka <b>acks</b> parameter. By default, it is <b>all</b>.'
        },
        {
            key: 'maxRequestBytes',
            desc: 'Kafka <b>max.request.size</b> parameter.'
        },
        {
            key: 'lingerMs',
            desc: 'Kafka <b>linger.ms</b> parameter. By default, it is 1.'
        },
        {
            key: 'envelopSchemaInclude',
            desc: 'When schemaFormat is set to <b>DEBEZIUM_ENVELOP_JSON_FOR_MQ</b>, it means whether the message body contains schema information.'
        },
        {
            key: 'customClientProps',
            desc: 'Custom properties passed to the Kafka client in JSON format. The key is the parameter name and the value is the parameter value. This setting takes the highest priority. For example: [AWS IAM Access Control](../../datasource_func/Kafka/kafka_iam_auth)'
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
