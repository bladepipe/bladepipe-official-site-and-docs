export const MongoDB = {
    main_function: [
        {
            key: '增量实时同步',
            desc: '支持订阅源端 Topic 的消息，并转换为 <b>INSERT</b>、<b>UPDATE</b>、<b>DELETE</b> DML'
        },
        {
            key: '修改订阅',
            desc: '新增、删除、修改订阅 Topic，文档：[修改订阅](../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '重置位点',
            desc: '按 <b>时间戳</b> 回溯位点，重新消费过去一段时间的数据'
        },
    ],
    master_function: [
        {
            key: '目标端需要提前创建集合',
            desc: 'Kafka / AutoMQ 到 MongoDB 不支持自动创建集合'
        },
    ],
    notice: [],
    examples: [],
    faq: [],
    mapping: []
}
