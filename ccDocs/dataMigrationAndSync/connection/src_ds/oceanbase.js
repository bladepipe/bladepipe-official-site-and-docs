export const OceanBase = {
    prepare: [
        {
            key: '账号权限',
            desc: '具备 SYS 租户下所有表权限, 迁移同步库表 SELECT 权限'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 OceanBase server 交互端口（如 2881），LogProxy 交互端口(如有，如 2983)'
        }
    ],
    params: [
        {
            key: 'needJsonEscape',
            desc: '将 json 中特殊字符进行转义，以写入到对端'
        },
        {
            key: 'fullDataSqlConditionEnabled',
            desc: '将过滤条件拼入 SQL 中进行源端数据扫描，此参数只针对全量迁移有效'
        },
        {
            key: 'eventStoreSize',
            desc: '缓存解析完毕的增量事件缓存大小'
        },
        {
            key: 'obIncreMode',
            desc: '增量模式, 包括 <b>LogProxy</b> 和 <b>Binlog</b> 两种模式'
        },
        {
            key: 'clusterUrl',
            desc: 'OceanBase 集群地址服务(类 name server)'
        },
        {
            key: 'obLogProxyHost',
            desc: 'LogProxy 服务地址，常见格式为 <b>ip:2983</b>，LogProxy 增量模式必填项'
        },
        {
            key: 'rpcPortList',
            desc: 'OceanBase server 节点 RPC 端口，如 host 参数为 ip1;ip2, 则此参数对应为 port1;port2, 常见端口 <b>2882</b> ,LogProxy 增量模式必填项'
        },
        {
            key: 'syncAccount',
            desc: 'LogProxy 连接 OceanBase server 的账号（可选）'
        },
        {
            key: 'syncPwd',
            desc: 'LogProxy 连接 OceanBase server 的密码（可选）'
        },
        {
            key: 'tenant',
            desc: '需要订阅表所在的 tenant'
        },
        {
            key: 'workingMode',
            desc: 'LogProxy 依赖的 libobcdc 参数，默认值为 <b>storage</b>'
        }
    ],
    examples: [
        {
            key: 'OceanBase 源端数据迁移同步',
            desc: '文档：[OceanBase 源端数据迁移同步](https://www.clougence.com/blog/data_sync_sample/biz_ob_sub)'
        }
    ],
    master_function: [
        {
            key: '基于 CDC 模式的增量同步',
            desc: '支持基于 [OceanBase LogProxy](https://github.com/oceanbase/oblogproxy) 进行增量数据同步'
        },
        {
            key: '基于 Binlog 模式的增量同步',
            desc: '支持基于 OceanBase Binlog 服务进行增量数据同步，此方式仅限于 OceanBase for MySQL 版本'
        },
        {
            key: '指定租户迁移同步',
            desc: '指定租户以解析 ObLogProxy 事件中所带的相关信息'
        },
    ]
}