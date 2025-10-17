export const MongoDB = {
    main_function: [
        {
            key: '全量数据迁移',
            desc: '逻辑迁移，通过顺序扫描表数据，将数据分批写入到对端数据库，支持的 _id 类型为 <b>ObjectId</b>、<b>Long</b>、<b>Integer</b>'
        },
        {
            key: '增量实时同步',
            desc: '支持 <b>INSERT</b>、<b>UPDATE</b>、<b>DELETE</b> 同步 <br />'
        },
        {
            key: '数据校验和订正',
            desc: '全量数据校验，并可选根据校验结果订正差异数据，支持定时，文档：[创建定时校验订正任务](../../operation/job_manage/create_job/create_verification_correction_job)'
        },
        {
            key: '修改订阅',
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '增量位点回溯',
            desc: '支持按照 时间戳 回溯位点，重新消费过去一段时间的 oplog'
        },
        {
            key: '部署形态支持',
            desc: '支持 <b>主备</b>、<b>副本集</b>、<b>分片集群</b>'
        },
    ],
    master_function: [],
    notice: [],
    examples: [
        {
            key: 'MongoDB 到 MongoDB 数据迁移同步',
            desc: '文档：[MongoDB 到 MongoDB 数据迁移同步](https://www.clougence.com/blog/data_sync_sample/mongodb_mongodb_sync)'
        }
    ],
    faq: [],
    mapping: [
        {
            source: 'NUMBER_DECIMAL',
            target: 'NUMBER_DECIMAL'
        },
        {
            source: 'NUMBER_LONG',
            target: 'NUMBER_LONG'
        },
        {
            source: 'DOUBLE',
            target: 'DOUBLE'
        },
        {
            source: 'INT',
            target: 'INT'
        },
        {
            source: 'BINARY',
            target: 'BINARY'
        },
        {
            source: 'STRING',
            target: 'STRING'
        },
        {
            source: 'ISO_DATE',
            target: 'ISO_DATE'
        },
        {
            source: 'TIMESTAMP',
            target: 'TIMESTAMP'
        },
        {
            source: 'ARRAY',
            target: 'ARRAY'
        },
        {
            source: 'BOOLEAN',
            target: 'BOOLEAN'
        },
        {
            source: 'DOCUMENT',
            target: 'DOCUMENT'
        },
        {
            source: 'OBJECT_ID',
            target: 'OBJECT_ID'
        },
    ]
}
