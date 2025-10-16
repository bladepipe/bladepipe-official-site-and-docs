export const TDengine = {
    notice: [],
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'See [Permissions Required for TDengine](../datasource_func/TDengine/privs_for_tdengine)'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the TDengine Websocket port (e.g., 6041).'
        }
    ],
    params: [
        {
            key: 'fullBatchSize',
            desc: 'The number of records written in a single batch to the target instance. It has a significant impact on migration performance.'
        },
        {
            key: 'fullPagingCount',
            desc: 'The page size for scanning a source relational database.'
        },
        {
            key: 'consumeParallel',
            desc: 'The number of concurrent consumption in source instance. It is recommended to be consistent with the number of vnode.'
        },
        {
            key: 'supportTimestampToEpochNano',
            desc: 'Whether to convert timestamps to nanosecond-level integers.'
        }
    ]
}
