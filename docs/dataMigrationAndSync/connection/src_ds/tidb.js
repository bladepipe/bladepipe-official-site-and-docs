const TiDB = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'See [Permissions Required for TiDB](../../datasource_func/TiDB/privs_for_tidb).'
        },
        {
            key: 'Connection to PD Nodes',
            desc: 'Make sure that BladePipe Workers can communicate with PD nodes. <br /> \n - <b>telnet [PD Node IP] [PD Node Port]</b>'
        },
        {
            key: 'TiKV GC Frequency',
            desc: 'Set GC cycle to <b>24 hours</b> or more in TiDB Server. <br /> \n - <b>set global tidb_gc_life_time = "24h0m0s";</b>'
        },
        {
            key: 'TiKV Historical Data Caching',
            desc: 'Adjust the size based on task needs. <br /> \n - <b>old-value-cache-memory-quota</b>: Upper limit of memory used by past incremental data on TiKV nodes <br /> \n - <b>sink-memory-quota</b>: Upper limit of memory used by incremental data on TiKV nodes'
        }
    ],
    params: [
        {
            key: 'printDetailLog',
            desc: '<b>Print received incremental data</b>. It is used for determining if the source database has incremental data.'
        },
        {
            key: 'pdHost',
            desc: 'PD node address for DataJob requests. <b>Format: [PD_IP]:[PD_PORT], multiple PD nodes separated by ,</b> <br /> Example: 127.0.0.1:2379,127.0.0.1:2380'
        },
        {
            key: 'cdcGrpcTimeout',
            desc: '<b>Timeout for gRPC channel of PD nodes to DataJob</b>, in ms.'
        },
        {
            key: 'cdcStubTimeout',
            desc: '<b>Timeout for each stub in gRPC channel, in ms. Auto-resubscribe the stub in case of time out</b>.'
        },
        {
            key: 'fastFailKeywords',
            desc: 'A comma-separated array of strings. When an exception message contains any of these keywords, the task will skip reconnection attempts and restart directly. For example, <b>DEADLINE_EXCEEDED</b> means the task will restart directly instead of reconnecting when a gRPC timeout exception occurs.'
        }
    ]
}

export {
    TiDB
}
