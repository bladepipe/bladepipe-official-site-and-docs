export const Kafka = {
    prepare: [
        {
            key: "Port Preparation",
            desc: 'Allow the migration and sync node (Worker) to connect to the Kafka ports.'
        }
    ],
    params: [
        {
            key: "schemaFormat",
            desc: 'MQ Message format. For more information, see [Message Format](../../reference/kafka_msg_format_type).'
        },
        {
            key: "consumerGroupId",
            desc: "Kafka consumer group ID."
        },
        {
            key: "consumeParallel",
            desc: "Degree of consuming Kafka topics in parallel."
        },
        {
            key: "sessionTimeoutMs",
            desc: "Kafka session timeout in milliseconds."
        },
        {
            key: "maxPollRecords",
            desc: "Maximum number of messages fetched in one poll from Kafka."
        },
        {
            key: 'dbHeartbeatIntervalSec',
            desc: 'Interval for initiating heartbeat on the source database.'
        },
        {
            key: 'dbHeartbeatToleranceStep',
            desc: 'The threshold of gap between the latest offset and the current offset. If the actual gap is bigger than the threshold, BladePipe won‘t send heartbeat message.'
        },
        {
            key: 'customClientProps',
            desc: 'Custom properties passed to the Kafka client in JSON format. The key is the parameter name and the value is the parameter value. This setting takes the highest priority. For example: [AWS IAM Access Control](../datasource_func/Kafka/kafka_iam_auth)'
        }
    ],
    faq: [
    ],
    notice: [
        {
            key: "Creating Tables in the Target in Advance",
            desc: "Only support automatic Topic creation for messages."
        },
        {
            key: "Raw Message Format",
            desc: "Only support raw message replication from Kafka to Kafka, and <b>Raw Message Format</b> needs to be selected at both the Source and the Target."
        }
    ],
    examples: [
    ],
    master_function: [
        {
            key: "Message Format",
            desc: 'The following message formats are supported. See [Message Format](../../reference/kafka_msg_format_type). \n- <b>CloudCanal format</b> \n- <b>AlibabaCanal format</b>'
        }
    ]
}
