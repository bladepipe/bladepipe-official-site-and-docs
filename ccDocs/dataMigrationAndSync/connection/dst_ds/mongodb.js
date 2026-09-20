export const MongoDB = {
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[MongoDB 需要的权限](../../datasource_func/MongoDB/privs_for_mongo)'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 MongoDB/DocumentDB 节点'
        },
        {
            key: '双向同步准备',
            desc: '文档：[MongoDB 双向同步准备](../../datasource_func/MongoDB/prepare_for_mongodb_bidirectional_sync)'
        }
    ],
    params: [
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
            desc: '刷出数据到 MongoDB 的等待时间，<b>0 则不等待<b/>'
        },
        {
            key: 'enableTimeZoneProcess',
            desc: '是否对时间字段进行时区转换'
        },
        {
            key: 'timezone',
            desc: '需要转换的目标时区（默认 UTC）'
        },
        {
            key: 'enableBatchApply',
            desc: '启用批量写入模式 （默认关闭）'
        },
        {
            key: 'deCycle',
            desc: '是否开启双向同步防循环，默认关闭'
        },
        {
            key: 'deCycleCollection',
            desc: '存储防循环事务 marker 的 collection，默认 cloudcanal.__cc_tx_de_cycle'
        },
        {
            key: 'deCycleMarkerTtlDays',
            desc: '双向同步 marker 的保留天数，默认 7 天。应大于任务允许的最大停机、积压和位点回溯时间'
        },
    ]
}
