export const AutoMQ = {
    prepare: [
        {
            key: "Port Preparation",
            desc: "Allow the migration and sync node (Worker) to connect to the AutoMQ nodes."
        }
    ],
    params: [
        {
            key: "schemaFormat",
            desc: "MQ Message format. For more information, see [Message Format](../../reference/kafka_msg_format_type)."
        },
        {
            key: "consumerGroupId",
            desc: "AutoMQ consumer group ID."
        },
        {
            key: "consumeParallel",
            desc: "Degree of consuming AutoMQ topics in parallel."
        },
        {
            key: "sessionTimeoutMs",
            desc: "AutoMQ session timeout in milliseconds."
        },
        {
            key: "maxPollRecords",
            desc: "Maximum number of messages fetched in one poll from AutoMQ."
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
            desc: "Only support raw message replication from AutoMQ to AutoMQ, and <b>Raw Message Format</b> needs to be selected at both the Source and the Target."
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
