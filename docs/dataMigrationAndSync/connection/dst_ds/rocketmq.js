export const RocketMQ = {
    prepare: [
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the RocketMQ ports.'
        }
    ],
    params: [
        {
            key: 'schemaFormat',
            desc: 'Message format. For more information, see [Message Format](../../reference/kafka_msg_format_type).'
        }
    ],
    master_function: [
        {
            key: 'Message Format',
            desc: 'The following message formats are supported. See [Message Format](../../reference/kafka_msg_format_type). \n- <b>CloudCanal format</b> \n- <b>AlibabaCanal format</b>'
        }
    ]
}
