export const Lindorm = {
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 Lindorm 标准交互接口'
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
        }
    ]
}
