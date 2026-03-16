export const RabbitMQ = {
    prepare: [
        {
            key: "Port Preparation",
            desc: 'Allow the migration and sync node (Worker) to connect to the RabbitMQ ports.'
        }
    ],
    params: [
        {
            key: "schemaFormat",
            desc: "MQ message format. For more information, see [Message Format](../../../reference/kafka_msg_format_type)."
        },
        {
            key: "consumeParallel",
            desc: "Degree of consuming RabbitMQ topics in parallel."
        }
    ],
    faq: [],
    notice: [
        {
            key: "Creating Tables in the Target in Advance",
            desc: "Only support automatic Queue creation for messages."
        },
        {
            key: "Raw Message Format",
            desc: "Only support raw message replication from RabbitMQ to RabbitMQ, and <b>Raw Message Format</b> needs to be selected at both the Source and the Target."
        }
    ],
    examples: [],
    master_function: [
        {
            key: "Message Format",
            desc: 'The following message formats are supported. See [Message Format](../../../reference/kafka_msg_format_type). \n- <b>CloudCanal format</b> \n- <b>AlibabaCanal format</b>'
        }
    ]
}
