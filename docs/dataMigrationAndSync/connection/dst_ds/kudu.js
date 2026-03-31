export const Kudu = {
    prepare: [
        {
            key: 'Network Preparation',
            desc: 'The sidecar node must be able to connect to Kudu Masters and Tablet Server nodes.'
        }
    ],
    params: [
        {
            key: 'writeParallel',
            desc: 'Number of parallel writes to the target.'
        },
        {
            key: 'batchSize',
            desc: 'Maximum number of records per single write.'
        },
        {
            key: 'retryCount',
            desc: 'Number of retries on write errors.'
        }
    ]
}
