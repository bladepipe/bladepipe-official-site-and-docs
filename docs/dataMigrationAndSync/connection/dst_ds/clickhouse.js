export const ClickHouse = {
    notice: [
        {
            key: 'Special Operation',
            desc: 'Too many DELETE operations (>50 records/second) significantly affect data synchronization performance.'
        },
        {
            key: 'Target Table Engine',
            desc: 'Only the following table engines and corresponding source table types are supported:' +
                '\n- <b>MergeTree</b>(tables without primary keys)' +
                '\n- <b>ReplacingMergeTree</b>(tables with primary keys)' +
                '\n- <b>ReplicatedMergeTree</b>(tables without primary keys)' +
                '\n- <b>ReplicatedReplacingMergeTree</b>(tables with primary keys)'
        }
    ],
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'SELECT, INSERT and common DDL permissions.'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the ClickHouse port (e.g., 8123).'
        }
    ],
    params: [
        {
            key: 'multiReplica',
            desc: 'Whether there are multiple replicas in a cluster.'
        },
        {
            key: 'clusterName',
            desc: 'Cluster name. When <b>multiReplica</b> is true, the <b>ON CLUSTER clusterName</b> clause is automatically added to DDL/DML.'
        },
        {
            key: 'ckTableEngine',
            desc: 'The following table engines are currently supported: \n- <b>MergeTree</b> \n- <b>ReplacingMergeTree</b> \n- <b>ReplicatedMergeTree</b> \n- <b>ReplicatedReplacingMergeTree</b>'
        },
        {
            key: 'autoOptimizeThresholdSec',
            desc: 'Interval of scheduled table optimization (<b>optimize table final</b>). If the value <=0, it means the feature is disabled.'
        },{
            key:'enableTimeRangeClamping',
            desc: 'Whether to enable time range clamping. Forces date and time values to be constrained within the valid ClickHouse JDBC range. Values outside this range will be clamped to the minimum or maximum values. Disabled by default (false).\n\n Ranges after clamping(UTC)：\n- <b>Date：[1970-01-01, 2149-06-06]</b>\n- <b>Date32：[1925-01-01, 2283-11-11]</b>\n- <b>Timestamp：[1970-01-01 00:00:00, 2106-02-07 14:28:15]</b>\n- <b>Timestamp64：[1925-01-01 08:00:00.000, 2283-11-12 07:59:59.000]</b>'
        }
    ],
    master_function: [
        {
            key: 'Write in Append Mode',
            desc: 'INSERT and UPDATE statements are written in batches in append mode, and DELETE statements are executed individually through ALTER statements.'
        },
        {
            key: 'Scheduled Table Optimization',
            desc: 'By setting the parameter autoOptimizeThresholdSec, the tables are optimized regularly.'
        },
    ]
}