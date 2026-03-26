export const DynamoDB = {
    prepare: [
        {
            key: 'Accounts and Permissions',
            desc: 'Documentation: [Permissions Required for DynamoDB](../datasource_func/DynamoDB/privs_for_dynamodb)'
        },
        {
            key: 'Network Preparation',
            desc: 'The sidecar node must be able to connect to the standard interactive interface of DynamoDB.'
        }
    ],
    params: [
        {
            key: 'writeParallel',
            desc: 'Number of parallel writes to the target, which significantly affects migration or synchronization performance.'
        },
        {
            key: 'totalDataInMemMb',
            desc: 'Batch write. Maximum data capacity in memory. Data will be flushed to the write queue if this capacity is exceeded or if the asyncFlushIntervalSec is reached.'
        },
        {
            key: 'asyncFlushIntervalSec',
            desc: 'Batch write. Interval time for waiting to flush. Data will be flushed to the write queue if this time is exceeded or if the totalDataInMemMb is reached.'
        },
        {
            key: 'flushBatchMb',
            desc: 'Maximum batch capacity per table. Data will be flushed to the write queue if this capacity is exceeded.'
        },
        {
            key: 'realFlushPauseSec',
            desc: 'Waiting time for flushing data to DynamoDB. <b>0 means no waiting.</b>'
        },
        {
            key: 'retryCount',
            desc: 'Number of retries on write errors.'
        },
        {
            key: 'retryWaitTimeMs',
            desc: 'Wait time for retrying on write errors (milliseconds).'
        },
        {
            key: 'maxBatchSize',
            desc: 'Upper limit for the number of records per single write.'
        },
    ]
}
