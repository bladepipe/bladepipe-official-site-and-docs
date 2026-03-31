export const Kudu = {
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 Kudu 各 Master 和 Tablet Server 节点'
        }
    ],
    params: [
        {
            key: 'writeParallel',
            desc: '对端写入并发数'
        },
        {
            key: 'batchSize',
            desc: '单次写入的数据条数上限'
        },
        {
            key: 'retryCount',
            desc: '写入错误重试次数'
        }
    ]
}
