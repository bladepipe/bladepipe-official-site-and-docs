const GreptimeDB = {
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 GreptimeDB MySQL 协议交互接口（如 4002）、gRPC 协议交互接口（如 4001）'
        }
    ],
    params: [
        {
            key: 'greptimeDBGrpcAddr',
            desc: 'GreptimeDB gRPC 地址，e.g.,192.168.0.101:4001,192.168.0.102:4001'
        },
        {
            key: 'batchCompleteRowSize',
            desc: 'GreptimeDB 批量提交行数，默认 512'
        },
        {
            key: 'defaultStreamMaxWritePointsPerSecond',
            desc: 'GreptimeDB Stream Writer 的默认速率限制'
        }
    ],
    master_function: [
        {
            key: '全量前清空目标数据',
            desc: '运行全量任务前清除老数据，包括重跑任务、定时全量迁移都会触发此能力'
        },
        {
            key: '重建目标表',
            desc: '运行全量任务前重建目标表，包括重跑任务、定时全量迁移都会触发此能力'
        }
    ]
}

export {
    GreptimeDB
}
