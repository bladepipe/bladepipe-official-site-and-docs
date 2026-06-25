export const DynamoDB = {
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[DynamoDB 需要的权限](../../datasource_func/DynamoDB/privs_for_dynamodb)'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 DynamoDB 标准交互接口'
        }
    ],
    params: [
        {
            key: 'writeParallel',
            desc: '对端写入并发数，对迁移或者同步性能影响大'
        },
        {
            key: 'totalDataInMemMb',
            desc: '攒批写入，内存中最大数据容量，超过此容量或超过 asyncFlushIntervalSec 则刷出数据到写入队列'
        },
        {
            key: 'asyncFlushIntervalSec',
            desc: '攒批写入，等待刷出的间隔时间，超过此时间或超过 totalDataInMemMb 则刷出数据到写入队列'
        },
        {
            key: 'flushBatchMb',
            desc: '单表最大攒批容量，超过此容量则刷出数据到写入队列'
        },
        {
            key: 'realFlushPauseSec',
            desc: '刷出数据到 DynamoDB 的等待时间，<b>0 则不等待<b/>'
        },
        {
            key: 'retryCount',
            desc: '写入错误重试次数'
        },
        {
            key: 'retryWaitTimeMs',
            desc: '写入错误重试等待时间（毫秒）'
        },
        {
            key: 'maxBatchSize',
            desc: '控制单次写入的条数上限'
        },
    ]
}
