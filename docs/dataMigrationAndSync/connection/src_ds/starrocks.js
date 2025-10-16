export const StarRocks = {
    notice: [],
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'SELECT permission'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the <b>StarRocks FE QueryPort<b/>.'
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
            key: 'minPoolSize',
            desc: 'Minimum connection pool size for the data source.'
        },
        {
            key: 'maxPoolSize',
            desc: 'Maximum connection pool size for the data source.'
        },
        {
            key: 'maxWait',
            desc: 'Maximum wait time for data source connections (in milliseconds).'
        },
        {
            key: 'soTimeoutSec',
            desc: 'TCP socket timeout duration for data source connections.'
        }
    ]
}
