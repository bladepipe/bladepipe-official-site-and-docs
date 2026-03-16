const Db2 = {
    prepare: [
        {
            key: 'Preparation for Db2 CDC (Incremental)',
            desc: 'See [Preparation for Db2 CDC](../../datasource_func/Db2/prepare_for_db2)'
        }
    ],
    params: [
        {
            key: 'fullBatchSize',
            desc: 'Number of records per batch written to the Target in full data migration, significantly affecting migration performance.'
        },
        {
            key: 'fullPagingCount',
            desc: 'Page size for scanning data in a source relational database.'
        },
        {
            key: 'scanParallel',
            desc: 'Number of threads for parallel data scanning in the source database. If the data source is a relational database, it refers to the number of tables scanned in parallel.'
        },
        {
            key: 'eventStoreSize',
            desc: 'Size of the queue in the memory (it might be event count or memory size in bytes).'
        },
        {
            key: 'maxTxsPerIteration',
            desc: 'Number of transactions scanned by the Worker.'
        },
        {
            key: 'iterateIntervalMs',
            desc: 'Interval between transaction scans (in milliseconds).'
        },
        {
            key: 'snapshotRead',
            desc: 'Whether to scan the whole table (select column_name from table) to read the source database.'
        },
        {
            key: 'filterDDL',
            desc: 'Whether to synchronize DDL in incremental data synchronization. If the value is true, DDL synchronization is not performed.'
        },
        {
            key: 'metaFreshCoolMs',
            desc: 'Waiting time for metadata refresh.'
        },
        {
            key: 'metaFreshCount',
            desc: 'Metadata refresh count.'
        },
        {
            key: 'cdcAutoClear',
            desc: 'Whether to enable automatic cleanup of CDC tables.'
        },
        {
            key: 'cdcClearIntervalMin',
            desc: 'Interval for clean up CDC tables (in minutes).'
        },
        {
            key: 'dbHeartBeatEnable',
            desc: 'Enable heartbeat for the source database.'
        }
    ],
    faq: [],
    notice: []
}

export {
    Db2
}
