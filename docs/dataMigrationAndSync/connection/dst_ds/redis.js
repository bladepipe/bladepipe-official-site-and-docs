export const Redis = {
    prepare: [
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the Redis port and Sentinel port (if available).'
        }
    ],
    params: [
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
        },
        {
            key: 'secondsToExpire',
            desc: 'Use the set command to specify the <b>expiration time</b> of data written to the Target; -1 means no limit.'
        }
    ],
    master_function: [
        {
            key: 'Cache Expiration Time',
            desc: 'Allow setting the cache expiration time (in seconds) for data after it is written to Redis.'
        }
    ]
}
