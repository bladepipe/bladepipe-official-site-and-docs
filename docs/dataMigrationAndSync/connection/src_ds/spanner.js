const Spanner = {
    notice: [
        {
            key: 'Google Cloud API',
            desc: 'Requires <b>Google Cloud Spanner API</b> to be enabled for your project.'
        }
    ],
    prepare: [
        {
            key: 'Permissions for Service Account',
            desc: 'See [Permissions Required for Spanner](../../datasource_func/Spanner/privs_for_spanner).'
        },
        {
            key: 'Change Streams',
            desc: 'Requires enabling <b>Change Streams</b> on the Spanner database to capture incremental changes.'
        }
    ],
    params: [
        {
            key: 'spannerProjectId',
            desc: 'Google Cloud Project ID'
        },
        {
            key: 'spannerInstanceId',
            desc: 'Spanner Instance ID'
        },
        {
            key: 'spannerDatabaseId',
            desc: 'Spanner Database ID'
        },
        {
            key: 'credentialsPath',
            desc: 'Path or URL to the Google Cloud Service Account JSON credential file.'
        },
        {
            key: 'fullBatchSize',
            desc: 'Batch size used during Full Data Migration.'
        },
        {
            key: 'fullPagingCount',
            desc: 'Paging partition size used during Full Data Migration.'
        },
        {
            key: 'scanParallel',
            desc: 'Number of threads for parallel scanning during Full Data Migration.'
        },
        {
            key: 'snapshotRead',
            desc: 'Whether to use snapshot read for scanning data. Helpful for providing a strong consistency point.'
        },
        {
            key: 'increStartPosition',
            desc: 'Incremental start position timestamp for Change Data Capture (CDC).'
        },
        {
            key: 'heartbeatIntervalMs',
            desc: 'Change Stream heartbeat interval (ms)'
        },
        {
            key: 'filterDDL',
            desc: 'Whether to filter out DDL statements in Incremental Synchronization.'
        },
        {
            key: 'fullDataSqlConditionEnabled',
            desc: 'Add filtering conditions in SQL during source data scanning in Full Data migration.'
        }
    ],
    faq: [],
}

export {
    Spanner
}
