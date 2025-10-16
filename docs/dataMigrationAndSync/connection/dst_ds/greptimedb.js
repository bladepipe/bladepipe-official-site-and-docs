const GreptimeDB = {
    prepare: [
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the GreptimeDB MySQL port (e.g., 4002) and gRPC port (e.g., 4001).'
        }
    ],
    params: [
        {
            key: 'greptimeDBGrpcAddr',
            desc: 'GreptimeDB gRPC address, e.g.,192.168.0.101:4001,192.168.0.102:4001'
        },
        {
            key: 'batchCompleteRowSize',
            desc: 'Number of rows in a batch commit. 512 rows in a batch by default.'
        },
        {
            key: 'defaultStreamMaxWritePointsPerSecond',
            desc: 'The default max rate of GreptimeDB Stream Writer.'
        }
    ],
    master_function: [
        {
            key: 'Removal of Target Data before Full Data Migration',
            desc: 'Remove the existing data in the Target before running the Full Data Migration, applicable for DataJobs reruning and scheduled Full Data migrations.'
        },
        {
            key: 'Recreating Target Table',
            desc: 'Recreate target tables before running the Full Data Migration, applicable for DataJobs reruning and scheduled Full Data migrations.'
        }
    ]
}

export {
    GreptimeDB
}
