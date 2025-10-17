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
            desc: 'Message format. For more information, see [Message Format](../../reference/kafka_msg_format_type).'
        },
        {
            key: 'subscriptionMode',
            desc: 'Pulsar subscription mode, including <b>Durable</b> and <b>NonDurable</b>.'
        },
        {
            key: 'consumeParallel',
            desc: 'Degree of consuming Pulsar topics in parallel.'
        },
        {
            key: 'receiverQueueSize',
            desc: 'The size of a Pulsar receiver queue.'
        },
        {
            key: 'receiverMaxNumBytes',
            desc: 'The maximum bytes of a batch received from Pulsar (in bytes).'
        },
        {
            key: 'receiverTimeout',
            desc: 'The timeout period for receiving a batch from Pulsar (in seconds).'
        },
        {
            key: 'connectionTimeoutMs',
            desc: 'The timeout period for connection to Pulsar Client (in milliseconds).'
        }
    ],
    faq: [],
    notice: [
        {
            key: "Creating Tables in the Target in Advance",
            desc: "Only support automatic Topic creation for messages."
        }
    ],
    examples: [
    ],
    master_function: [
        {
            key: 'Message Format',
            desc: 'The following message formats are supported. See [Message Format](../../reference/kafka_msg_format_type). \n- <b>CloudCanal format</b> \n- <b>AlibabaCanal format</b>'
        }
    ]
}
