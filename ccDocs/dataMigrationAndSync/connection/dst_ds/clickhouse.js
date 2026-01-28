export const ClickHouse = {
    notice: [
        {
            key: '特殊操作',
            desc: 'DELETE 操作过多（>50 条/秒）将大幅影响数据同步性能'
        },
        {
            key: '目标端表引擎',
            desc: '仅支持以下表引擎以及对应的源端表类型: ' +
                '\n- <b>MergeTree</b>（无主键表）' +
                '\n- <b>ReplacingMergeTree</b>（有主键表）' +
                '\n- <b>ReplicatedMergeTree</b>（无主键表）' +
                '\n- <b>ReplicatedReplacingMergeTree</b>（有主键表）'
        }
    ],
    prepare: [
        {
            key: '账号权限',
            desc: '具备 SELECT, INSERT, 常见 DDL 权限'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 ClickHouse 标准交互接口（如 8123）'
        }
    ],
    params: [
        {
            key: 'multiReplica',
            desc: '是否为多副本集群'
        },
        {
            key: 'clusterName',
            desc: '集群名称，当 <b>multiReplica</b> 为 true, 则自动在 DDL/DML 中加入 <b>ON CLUSTER clusterName</b> 子句'
        },
        {
            key: 'ckTableEngine',
            desc: '当前支持以下表引擎: \n- <b>MergeTree</b> \n- <b>ReplacingMergeTree</b> \n- <b>ReplicatedMergeTree</b> \n- <b>ReplicatedReplacingMergeTree</b>'
        },
        {
            key: 'autoOptimizeThresholdSec',
            desc: '定时优化表（<b>optimize table final</b>）间隔，<=0 则关闭此功能'
        },
        {
            key:'enableTimeRangeClamping',
            desc:'是否启用时间范围裁剪,强制将时间和日期值收束到 ClickHouse JDBC 的合法区间内，超出的数值将被截断至最小值或最大值。默认关闭（false）。\n\n 收束后范围(UTC)：\n- <b>Date：[1970-01-01, 2149-06-06]</b>\n- <b>Date32：[1925-01-01, 2283-11-11]</b>\n- <b>Timestamp：[1970-01-01 00:00:00, 2106-02-07 14:28:15]</b>\n- <b>Timestamp64：[1925-01-01 08:00:00.000, 2283-11-12 07:59:59.000]</b>'
        }
    ],
    master_function: [
        {
            key: '追加模式写入',
            desc: 'INSERT 和 UPDATE 以追加模式批量写入, DELETE 单独通过 ALTER 方式执行'
        },
        {
            key: '定时优化表',
            desc: '通过设置 autoOptimizeThresholdSec 参数，定时优化表'
        },
    ]
}