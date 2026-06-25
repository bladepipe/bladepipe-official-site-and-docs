export const TDengine = {
    notice: [],
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[TDengine 需要的权限](../../datasource_func/TDengine/privs_for_tdengine)'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 TDengine Websocket 端口，如 6041'
        }
    ],
    params: [
        {
            key: 'fullBatchSize',
            desc: '全量写入对端单批数据条数，对迁移性能影响大'
        },
        {
            key: 'fullPagingCount',
            desc: '关系型数据库源端扫描分页大小'
        },
        {
            key: 'consumeParallel',
            desc: '源端消费并发数，建议与 vnode 数量保持一致'
        },
        {
            key: 'supportTimestampToEpochNano',
            desc: '是否支持将时间戳转为纳秒级别整型数字'
        }
    ]
}
