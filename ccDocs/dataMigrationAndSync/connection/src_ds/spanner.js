const Spanner = {
    notice: [
        {
            key: 'Google Cloud API',
            desc: '需要为您的 Google Cloud 项目启用 <b>Google Cloud Spanner API</b>。'
        }
    ],
    prepare: [
        {
            key: '账号权限要求',
            desc: '请参考 [Spanner 权限要求](../datasource_func/Spanner/privs_for_spanner)。'
        },
        {
            key: '开启数据库变更流 (Change Streams)',
            desc: '需要为 Spanner 数据库开启 <b>Change Streams</b> 功能以捕获增量变更数据。'
        }
    ],
    params: [
        {
            key: 'spannerProjectId',
            desc: 'Google Cloud 项目 ID'
        },
        {
            key: 'spannerInstanceId',
            desc: 'Spanner 实例 ID'
        },
        {
            key: 'spannerDatabaseId',
            desc: 'Spanner 数据库 ID'
        },
        {
            key: 'credentialsPath',
            desc: 'Google Cloud 服务账号 (Service Account) 的 JSON 凭证文件路径或 URL。'
        },
        {
            key: 'fullBatchSize',
            desc: '全量同步时的批次大小。'
        },
        {
            key: 'fullPagingCount',
            desc: '全量同步时的分页分区大小。'
        },
        {
            key: 'scanParallel',
            desc: '全量同步时的并行扫描线程数。'
        },
        {
            key: 'snapshotRead',
            desc: '是否使用快照读 (Snapshot Read)，有助于提供强一致性的读取点。'
        },
        {
            key: 'increStartPosition',
            desc: '增量同步 (CDC) 的起始位点（时间戳）。'
        },
        {
            key: 'heartbeatIntervalMs',
            desc: 'Change Stream 心跳间隔(毫秒)'
        },
        {
            key: 'filterDDL',
            desc: '是否在增量同步中过滤掉 DDL 语句。'
        },
        {
            key: 'fullDataSqlConditionEnabled',
            desc: '在全量同步扫描源端数据时允许添加 SQL 过滤条件。'
        }
    ],
    faq: [],
}

export {
    Spanner
}
