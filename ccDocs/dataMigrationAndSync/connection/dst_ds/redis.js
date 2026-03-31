export const Redis = {
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 Redis/AWS ElastiCache 各节点和 Sentinel 节点（如果有）'
        }
    ],
    params: [
        {
            key: 'isSentinel',
            desc: 'true 代表 <b>Redis Sentinel 集群</b>，false 则代表 <b>单机或分片集群</b>'
        },
        {
            key: 'sentinelUser',
            desc: '连接 Sentinel 的用户名'
        },
        {
            key: 'sentinelPassword',
            desc: '连接 Sentinel 的密码'
        },
        {
            key: 'sentinelMasterName',
            desc: 'Redis Sentinel 配置中指定的 <b>Master Name</b>'
        },
        {
            key: 'secondsToExpire',
            desc: '通过 set 指令写入对端数据的 <b>过期时间</b>，-1 则不做限制'
        }
    ],
    master_function: [
        {
            key: '缓存失效时间',
            desc: '支持设置数据到 Redis 后缓存失效时间（单位：秒）'
        }
    ]
}