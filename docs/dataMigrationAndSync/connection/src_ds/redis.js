export const Redis = {
    notice: [
        {
            key: 'Failover Compatibility',
            desc: 'Redis 3.x, due to its use of an earlier version of PSYNC, has poor failover compatibility and carries a risk of data loss.'
        },
        {
            key: 'Replication Backlog Configuration',
            desc: 'The default Redis replication parameter <b>repl-backlog-size</b> is too small. If there is significant data synchronization latency, it may trigger a FULL SYNC for full initialization. It is recommended to increase the value of this parameter.'
        }
    ],
    prepare: [
        {
            key: 'Command Preparation',
            desc: 'The <b>PSYNC</b> command can be executed (may not be supported by managed cloud services).'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the Redis port and Sentinel port (if available).'
        }
    ],
    params: [
        {
            key: 'dbHeartbeatIntervalSec',
            desc: 'Interval for sending the <b>PING</b> command.'
        },
        {
            key: 'deCycle',
            desc: 'Enable event filtering in bidirectional data synchronization, which <b>filters out the specific events to prevent circular data replication</b> in the Incremental stage.'
        },
        {
            key: 'deCycleMode',
            desc: 'Bidirectional data synchronization event filter modes: GET_KEY represents <b>query</b> marking mode, and DEL_KEY represents <b>delete</b> marking mode.'
        },
        {
            key: 'enableDbMapping',
            desc: 'Enable Redis DB mapping. Make sure that <b>the number of DBs in the source and target instances are equal</b>.'
        },
        {
            key: 'deCycleEventExpireSec',
            desc: 'Expiration time for the specific events to prevent circular data replication written to the target instance; <b><0 means the events won‘t expired</b>.'
        },
        {
            key: 'extractorQueueSize',
            desc: 'Queue size for temporarily stored Redis events.'
        },
        {
            key: 'inputStreamBufferSize',
            desc: 'Buffer size of byte streams for receiving Redis response.'
        },
        {
            key: 'connAndSoTimeoutMs',
            desc: 'TCP connection parameter <b>SO_TIMEOUT</b>.'
        },
        {
            key: 'receiveBufferSize',
            desc: 'TCP connection parameter <b>SO_RCVBUF</b>.'
        },
        {
            key: 'sendBufferSize',
            desc: 'TCP connection parameter <b>SO_SNDBUF</b>.'
        },
        {
            key: 'isSentinel',
            desc: 'true represents <b>Redis Sentinel Cluster</b>, while false represents <b>Single Node or Sharded Cluster</b>.'
        },
        {
            key: 'sentinelUser',
            desc: 'Username for connecting to Sentinel.'
        },
        {
            key: 'sentinelPassword',
            desc: 'Password for connecting to Sentinel.'
        },
        {
            key: 'sentinelMasterName',
            desc: '<b>Master Name</b> specified in the Redis Sentinel configuration.'
        }
    ]
}
