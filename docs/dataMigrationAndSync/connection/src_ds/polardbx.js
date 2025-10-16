export const PolarDbX = {
    notice: [
        {
            key: 'Supported Version',
            desc: 'Only support PolarDB-X 2.0.'
        },
        {
            key: 'PolarDB-X 2.0 Character Set',
            desc: 'Support <b>utf8</b>, <b>utf8mb4</b>, <b>latin1</b>. Other encodings are not yet tested.'
        },
        {
            key: 'Source Database Restrictions',
            desc: 'Incremental data sync is not supported if table names to be synced in the source PolarDB-X 2.0 contain uppercase letters.'
        }
    ],
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'Require <b>read and write permissions</b> for cloud database account. <br /> For self-managed database, the following permissions are required: \n- GRANT SELECT ON *.* TO \'user\'@\'host\' \n- GRANT REPLICATION CLIENT ON *.* TO \'user\'@\'host\' \n- GRANT REPLICATION SLAVE ON *.* TO \'user\'@\'host\''
        }
    ],
    params: [
        {
            key: 'parseBinlogParallel',
            desc: 'Number of threads for parallel parsing of Binlog in Incremental DataJobs.'
        },
        {
            key: 'parseBinlogBufferSize',
            desc: 'Size of the circular buffer for parsing Binlog in Incremental DataJobs.'
        },
        {
            key: 'maxTransactionSize',
            desc: 'Maximum number of data rows per transaction. If exceeded, the transaction will be split and flushed in parts.'
        },
        {
            key: 'limitThroughputMb',
            desc: 'Limit the throughput of incremental Binlogs.'
        },
        {
            key: 'needJsonEscape',
            desc: 'Escape special characters in JSON to be written to the target database.'
        }
    ]
}
