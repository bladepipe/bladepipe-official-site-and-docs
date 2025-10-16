export const Paimon = {
    notice: [],
    prepare: [
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the Catalog and Warehouse.'
        },
        {
            key: 'S3 Catalog Configuration Template',
            desc: '\n- CatalogUri: glue.ap-southeast-1.amazonaws.com' +
                '\n- httpsEnabled: true' +
                '\n- metastoreType: filesystem\n' +
                '\n- warehouse\t: s3://warehouse/test\n' +
                '\n- catalogProps: {\n' +
                '    "s3.access-key": "",\n' +
                '    "s3.secret-key": "",\n' +
                '    "s3.path-style-access": "true"\n' +
                '}',
        }
    ],
    params: [
        {
            key: 'writeParallel',
            desc: 'The number of parallel threads allowed to write data to the Target, significantly affecting migration or synchronization performance.'
        },
        {
            key: 'writeProps',
            desc: 'Write configuration (Json format)'
        },
        {
            key: 'compactTaskSize',
            desc: 'Compression task thread count'
        },
        {
            key: 'paimonIOManagerPaths',
            desc: 'I/O manager path'
        },
        {
            key: 'defaultDynamicBucket',
            desc: 'Default dynamic Bucket count'
        },
        {
            key: 'totalDataInMemMb',
            desc: 'Maximum data size allowed in memory when writing in batches; If the data size exceeds the memory limit, or the wait time exceeds asyncFlushIntervalSec, then data is flushed to the write queue.'
        },
        {
            key: 'asyncFlushIntervalSec',
            desc: 'Interval to wait for flushing when writing in batches; If the wait time exceeds asyncFlushIntervalSec, or the data size exceeds totalDataInMemMb, then data is flushed to the write queue.'
        },
        {
            key: 'flushBatchMb',
            desc: 'Maximum batch size per table; If the batch size exceeds this limit, then data is flushed to the write queue. '
        },
        {
            key: 'realFlushPauseSec',
            desc: 'Wait time to flush data to Paimon. <b>0 means no wait is needed<b/>.'
        },
        {
            key: 'catalogUri',
            desc: 'Catalog URI'
        },
        {
            key: 'httpsEnabled',
            desc: 'Enable HTTPS for Catalog URI'
        },
        {
            key: 'catalogWarehouse',
            desc: 'Specify the root directory URI of the Paimon warehouse'
        },
        {
            key: 'catalogMetastoreType',
            desc: 'Enable file system mode'
        },
        {
            key: 'catalogProps',
            desc: 'Catalog configuration'
        },
        {
            key: 'enableTimeZoneProcess',
            desc: 'Whether to convert time zone on time fields'
        },
        {
            key: 'timezone',
            desc: 'Target time zone, e.g., +08:00, Asia/Shanghai, America/New_York, etc.'
        },
    ],
    master_function: [
        {
            key: 'Write Conflict Resolution Rule',
            desc: 'For the source tables with primary keys, data is overwritten to the Target. For the source tables without primary keys, data is appended to the Target.'
        },
        {
            key: 'Custom Table Properties',
            desc: 'Configure format-version and other table properties.'
        },
        {
            key: 'Setting Data Partitions',
            desc: 'When creating a DataJob, specify partition definitions at the table level (separated by comma). Automatically add these partition definitions during schema migration.'
        },
    ]
}
