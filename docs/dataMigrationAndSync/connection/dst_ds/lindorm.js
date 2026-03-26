export const Lindorm = {
    prepare: [
        {
            key: 'Network Preparation',
            desc: 'The sidecar node must be able to connect to the Lindorm service interface.'
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
        }
    ]
}
