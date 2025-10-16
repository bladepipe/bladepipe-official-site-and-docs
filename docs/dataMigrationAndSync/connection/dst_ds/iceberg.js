export const Iceberg = {
    notice: [
    ],
    prepare: [
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the catalogs and FileIO.'
        },
        {
            key: 'Nessie Catalog Configuration Template',
            desc: '\n- CatalogUri: ip:19120/api/v1' +
                '\n- catalogName: nessie\n' +
                '\n- catalogType: NESSIE\n' +
                '\n- catalogWarehouse: s3://warehouse\n' +
                '\n- catalogProps: {\n' +
                '    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",\n' +
                '    "s3.endpoint": "http://ip:9000",\n' +
                '    "s3.access-key-id": "admin",\n' +
                '    "s3.secret-access-key": "password",\n' +
                '    "s3.path-style-access": "true",\n' +
                '    "client.region": "ap-southeast-1"\n' +
                '}',
        },
        {
            key: 'Glue Data Catalog Configuration Template',
            desc: '\n- CatalogUri: glue.ap-southeast-1.amazonaws.com' +
                '\n- httpsEnabled: true' +
                '\n- catalogName: glue_catalog\n' +
                '\n- catalogType: GLUE\n' +
                '\n- catalogWarehouse\t: s3://warehouse\n' +
                '\n- catalogProps: {\n' +
                '    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",\n' +
                '    "s3.endpoint": "https://s3.ap-southeast-1.amazonaws.com",\n' +
                '    "s3.access-key-id": "",\n' +
                '    "s3.secret-access-key": "",\n' +
                '    "s3.path-style-access": "true",\n' +
                '    "client.region": "ap-southeast-1",\n' +
                '    "client.credentials-provider.glue.access-key-id": "",\n' +
                '    "client.credentials-provider.glue.secret-access-key": "",\n' +
                '    "client.credentials-provider": "com.amazonaws.glue.catalog.credentials.GlueAwsCredentialsProvider"\n' +
                '}',
        },
        {
            key: 'REST Catalog Configuration Template',
            desc: '\n- CatalogUri: ip :8181' +
                '\n- httpsEnabled: false' +
                '\n- catalogName: rest_catalog\n' +
                '\n- catalogType: REST\n' +
                '\n- catalogWarehouse\t: s3://warehouse\n' +
                '\n- catalogProps: {\n' +
                '    "io-impl": "org.apache.iceberg.aws.s3.S3FileIO",\n' +
                '    "s3.endpoint": "http://ip:9000",\n' +
                '    "s3.access-key-id": "admin",\n' +
                '    "s3.secret-access-key": "password",\n' +
                '    "s3.path-style-access": "true",\n' +
                '    "client.region": "us-east-1"\n' +
                '}',
        }
    ],
    params: [
        {
            key: 'fileFormat',
            desc: 'Format of the file to write data to (parquet/orc/...)'
        },
        {
            key: 'writeTargetFileSizeMb',
            desc: 'Size of the target file to write data to (MB).'
        },
        {
            key: 'writeProps',
            desc: 'Data Write Parameters to configure (Json format).'
        },
        {
            key: 'commitBranch',
            desc: 'Branch to commit.'
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
            desc: 'Maximum batch size per table; If the batch size exceeds this limit, then data is flushed to the write queue.'
        },
        {
            key: 'realFlushPauseSec',
            desc: 'Wait time to flush data to Iceberg using <b>Bulk Write<b/>. <b>0 means no wait is needed<b/>.'
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
        desc: 'When creating a DataJob, specify partition definitions at the table level (static or dynamic). Automatically add these partition definitions during schema migration.'
        }
    ]
}
