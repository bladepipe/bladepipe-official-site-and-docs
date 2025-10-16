export const MongoDB = {
    notice: [
        {
            key: 'oplog 大小和保留时间设置',
            desc: 'MongoDB 默认配置 <b>replication.oplogSizeMB</b> 过小 或 <b>storage.oplogMinRetentionHours</b> 过小，如数据同步延迟过大，可能导致未消费的 oplog 被清除，需调大此参数'
        },
        {
            key: 'MongoDB 主备架构的任务设置',
            desc: '源端 MongoDB 主备架构模式，需要将源端任务参数 <b>oplogCollection</b> 设置为 <b>oplog.$main</b>'
        },
        {
            key: 'changeStream 模式',
            desc: 'MongoDB 3.6 以上支持 <b>changeStream</b> 获取增量变更，同步任务可以设置源端参数 <b>captureMode</b> 为 <b>CHANGE_STREAM</b>，MongoDB 分片集群可以填写 Mongos 连接串进行同步'
        },
        {
            key: 'oplog 模式',
            desc: '当使用 <b>oplog</b> 模式进行 MongoDB 源端同步时，需要确保该能够访问到 <b>local</b> 库'
        }
    ],
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[MongoDB 需要的权限](../datasource_func/MongoDB/privs_for_mongo)'
        },
    ],
    params: [
        {
            key: 'captureMode',
            desc: '配置 MongoDB 增量源端模式，支持 OP_LOG 和 CHANGE_STREAM 模式'
        },
        {
            key: 'changeStreamBatchSize',
            desc: '配置 MongoDB Change Stream 每一批拉取变更事件的最大条数'
        },
        {
            key: 'oplogCollection',
            desc: '配置 MongoDB oplog 的集合名，默认是 oplog.rs'
        },
        {
            key: 'timezone',
            desc: '需要转换的源端时区（默认 UTC）'
        },
    ]
}
