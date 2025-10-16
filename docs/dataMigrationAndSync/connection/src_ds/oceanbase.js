export const OceanBase = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'Permissions for all tables in the SYS tenant databases and SELECT permission for databases and tables to be synced.'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the OceanBase ports (e.g., 2881) and LogProxy ports (if available, e.g., 2983).'
        }
    ],
    params: [
        {
            key: 'needJsonEscape',
            desc: 'Escape special characters in JSON to be written to the target database.'
        },
        {
            key: 'fullDataSqlConditionEnabled',
            desc: 'Add filtering conditions in SQL during source data scanning. It only works in Full Data migration.'
        },
        {
            key: 'eventStoreSize',
            desc: 'Cache size for parsed incremental events.'
        },
        {
            key: 'obIncreMode',
            desc: 'Incremental mode, including <b>LogProxy</b> and <b>Binlog</b> options.'
        },
        {
            key: 'clusterUrl',
            desc: 'OceanBase cluster URL (similar to a name server).'
        },
        {
            key: 'obLogProxyHost',
            desc: 'LogProxy service address, typically in the format <b>ip:2983</b>. Required for LogProxy incremental mode.'
        },
        {
            key: 'rpcPortList',
            desc: 'RPC ports for OceanBase server nodes. If the host parameter is ip1;ip2, this parameter should be port1;port2. Common port is <b>2882</b>. Required for LogProxy incremental mode.'
        },
        {
            key: 'syncAccount',
            desc: 'Account for LogProxy to connect to OceanBase server (optional).'
        },
        {
            key: 'syncPwd',
            desc: 'Password for LogProxy to connect to OceanBase server (optional).'
        },
        {
            key: 'tenant',
            desc: 'The tenant where the subscribed tables reside.'
        },
        {
            key: 'workingMode',
            desc: 'Libobcdc parameter that LogProxy depends on. The default value is <b>storage</b>.'
        }
    ],
    examples: [
    ],
    master_function: [
        {
            key: 'CDC-based Incremental Data Sync',
            desc: 'Support incremental data synchronization based on [OceanBase LogProxy](https://github.com/oceanbase/oblogproxy).'
        },
        {
            key: 'Binlog-based Incremental Data Sync',
            desc: 'Support incremental data synchronization based on OceanBase Binlog service. This method is limited to OceanBase for MySQL.'
        },
        {
            key: 'Tenant-specific Data Migration and Sync',
            desc: 'Allow specifying a tenant to parse relevant information from ObLogProxy events.'
        }
    ]
}
