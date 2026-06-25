const Db2 = {
    prepare: [
        {
            key: '源端 CDC 同步准备（增量）',
            desc: '文档：[Db2 源端 CDC 同步准备](../../datasource_func/Db2/prepare_for_db2)'
        }
    ],
    params: [
        {
            key: 'fullBatchSize',
            desc: '全量写入对端单批数据条数,对迁移性能影响大'
        },
        {
            key: 'fullPagingCount',
            desc: '关系型数据库源端扫描分页大小'
        },
        {
            key: 'scanParallel',
            desc: '源端扫描并发数，如果数据源类型为关系型数据库，则为并发扫描表数量'
        },
        {
            key: 'eventStoreSize',
            desc: '内存队列大小（可能为事件数量或者内存大小(byte)）'
        },
        {
            key: 'maxTxsPerIteration',
            desc: 'Worker 扫描的事务数量'
        },
        {
            key: 'iterateIntervalMs',
            desc: '事务扫描的间隔毫秒数'
        },
        {
            key: 'snapshotRead',
            desc: '读源端数据库的方式是否采用全表扫描（select column_name from table）'
        },
        {
            key: 'filterDDL',
            desc: '增量是否进行 DDL 同步，值为 true 则不进行 DDL 同步'
        },
        {
            key: 'metaFreshCoolMs',
            desc: '元信息的刷新等待时间'
        },
        {
            key: 'metaFreshCount',
            desc: '元信息刷新次数'
        },
        {
            key: 'cdcAutoClear',
            desc: '是否开启 CDC 表自动清理'
        },
        {
            key: 'cdcClearIntervalMin',
            desc: '清理 CDC 表的周期（分钟）'
        },
        {
            key: 'dbHeartBeatEnable',
            desc: '配置对源端数据库是否开启心跳'
        }
    ],
    faq: [],
    notice: [],
}

export {
    Db2
}
