export const DynamoDB = {
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[DynamoDB 需要的权限](../datasource_func/DynamoDB/privs_for_dynamodb)'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 DynamoDB 标准交互接口'
        }
    ],
    params: [
        {
            key: 'fullFetchSize',
            desc: '全量扫描数据设置的 fetch size'
        },
        {
            key: 'eventStoreSize',
            desc: '缓存解析完毕的增量事件缓存大小'
        },
        {
            key: 'incrPagingCount',
            desc: '全量扫描每次查询数据总量'
        },
        {
            key: 'incrIdleSleepSecond',
            desc: '增量同步空闲时查询间隔（单位：秒）'
        },
        {
            key: 'incrScanIntervalMs',
            desc: '设置增量同步数据查询间隔（单位：毫秒）'
        },
        {
            key: 'shardDiscoveryIntervalSecond',
            desc: '定期检查新 Shard 的时间间隔（单位：秒）'
        },
        {
            key: 'streamsRetryCount',
            desc: 'Streams 接口错误重试次数'
        },
        {
            key: 'streamsBackoffMinDelayMs',
            desc: 'Streams 重试最小延迟'
        },
        {
            key: 'streamsBackoffMaxDelayMs',
            desc: 'Streams 重试最大延迟'
        }
    ],
    notice: [
    ],
    examples: [
    ],
    master_function: [
    ]
}