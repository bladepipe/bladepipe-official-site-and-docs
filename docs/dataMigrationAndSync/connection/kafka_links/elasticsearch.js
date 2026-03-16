export const Elasticsearch = {
    main_function: [
        {
            key: "Incremental Data Sync",
            desc: "Allow subscribing to messages from the source Topic and transforming them into DML operations, namely, <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b>."
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
        {
            key: "Pre-Creation of Index in the Target",
            desc: "Automatic index creation is not supported when moving data from Kafka/AutoMQ to Elasticsearch."
        },
        {
            key: 'Setting Target Primary Key',
            desc: 'Change the primary key to another field to facilitate data aggregation and other operations.'
        }
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: []
}
