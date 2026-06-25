const TiDB = {
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[TiDB 需要的权限](../../datasource_func/TiDB/privs_for_tidb)'
        },
        {
            key: 'PD节点网络连通',
            desc: '请确保 CloudCanal 各节点能正常与 PD 各节点通讯 <br /> \n - <b>telnet [PD节点IP] [PD节点端口号]</b>'
        },
        {
            key: 'TiKV GC 回收频率',
            desc: '在 TiDB Server 中修改 GC 周期时间为 <b>24小时</b> 以上 <br /> \n - <b>set global tidb_gc_life_time = "24h0m0s";</b>'
        },
        {
            key: 'TiKV 历史变更数据缓存',
            desc: '建议根据任务所需适当调整大小 <br /> \n - <b>old-value-cache-memory-quota</b>：增量旧数据占用 TiKV 节点的内存的上限 <br /> \n - <b>sink-memory-quota</b>：增量数据占用 TiKV 节点的内存的上限'
        }
    ],
    params: [
        {
            key: 'printDetailLog',
            desc: '<b>打印接收到的增量</b>，常用于判断源端是否有增量数据推送'
        },
        {
            key: 'pdHost',
            desc: '任务请求的 PD 节点地址，<b>格式为: [PD_IP]:[PD_PORT], 多个 PD 节点用 , 隔开</b> <br /> 例: 127.0.0.1:2379,127.0.0.1:2380'
        },
        {
            key: 'cdcGrpcTimeout',
            desc: '<b>任务与 PD 节点 gRpc 连接通道的超时时间</b>，单位ms'
        },
        {
            key: 'cdcStubTimeout',
            desc: '<b>gRpc 通道中的每个 stub 的超时时间，超过该时间会自动重新订阅</b>，单位ms'
        },
        {
            key: 'fastFailKeywords',
            desc: '字符串数组，以逗号分隔，当异常信息中包含这些关键字时，任务不再尝试重连，直接重启。例如 <b>DEADLINE_EXCEEDED</b> 表示当 gRPC 超时异常时不再重连，直接重启任务'
        }
    ]
}

export {
    TiDB
}