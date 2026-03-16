const Kafka = {
    main_function: [
        {
            key: 'Schema Migration',
            desc: 'If the specified Topic after mapping does not exist in the Target, BladePipe will automatically create the Topic, allowing setting the number of partitions.'
        },
        {
            key: "Incremental Data Sync",
            desc: "Allow subscribing to messages from the source Topic."
        },
        {
            key: 'Subscription Modification',
            desc: 'Add, delete, or modify the subscribed topics. For more information, see [Modify Subscription](../../../operation/job_manage/job_op/edit_job).'
        },
        {
            key: 'Position Resetting',
            desc: 'Reset positions by timestamp to consume the data in a past period again.' 
        }
    ],
    master_function: [
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: []
}

const AutoMQ = Kafka

export {
    Kafka,
    AutoMQ,
}
