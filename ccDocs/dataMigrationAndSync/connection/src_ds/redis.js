export const Redis = {
    notice: [
        {
            key: '主备切换兼容性',
            desc: 'Redis 3.x 因使用早期版本的 PSYNC , 主备切换适配较差，存在丢数据风险'
        },
        {
            key: '复制 backlog 设置',
            desc: 'Redis 默认复制参数 <b>repl-backlog-size</b> 过小, 如数据同步延迟过大，可能触发 FULL SYNC 全量初始化。需调大此参数'
        }
    ],
    prepare: [
        {
            key: '指令准备',
            desc: '可执行 <b>PSYNC</b> 指令 (托管云服务可能不支持该指令)'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 Redis 各节点和 Sentinel 节点（如果有）'
        }
    ],
    params: [
        {
            key: 'dbHeartbeatIntervalSec',
            desc: '发送 <b>PING</b> 指令的间隔时间'
        },
        {
            key: 'deCycle',
            desc: '双向同步过滤开关，<b>过滤带防循环事件</b>的增量事件'
        },
        {
            key: 'deCycleMode',
            desc: '双向同步过滤事件模式：GET_KEY 代表 <b>查询</b> 标记模式，DEL_KEY 代表 <b>删除</b> 标记模式，TX_SIGN 代表 <b>事务</b> 标记模式'
        },
        {
            key: 'enableDbMapping',
            desc: 'Redis 启用 DB 映射，<b>需要保证源端和目标端实例 DB 数量相等</b>'
        },
        {
            key: 'deCycleEventExpireSec',
            desc: '防循环事件写入对端后的过期时间, <b><0 则不过期</b>'
        },
        {
            key: 'extractorQueueSize',
            desc: '暂存的 Redis 事件的队列大小'
        },
        {
            key: 'inputStreamBufferSize',
            desc: '接收 Redis 响应的字节流 buffer 大小'
        },
        {
            key: 'connAndSoTimeoutMs',
            desc: 'TCP 链接参数 <b>SO_TIMEOUT</b>'
        },
        {
            key: 'receiveBufferSize',
            desc: 'TCP 链接参数 <b>SO_RCVBUF</b>'
        },
        {
            key: 'sendBufferSize',
            desc: 'TCP 链接参数 <b>SO_SNDBUF</b>'
        },
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
            key: 'enableWriteDeReplay',
            desc: 'Redis 增量非幂等指令时，是否开启防重放逻辑'
        }
    ]
}
