export const Iceberg = {
    notice: [],
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 Catalog 和 文件存储'
        },
        {
            key: 'Nessie 数据源配置模版',
            desc: '\n- 网络地址（CatalogUri）: ip:19120/api/v1' +
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
            key: 'Glue 数据源配置模版',
            desc: '\n- 网络地址（CatalogUri）: glue.ap-southeast-1.amazonaws.com' +
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
            key: 'REST 数据源配置模版',
            desc: '\n- 网络地址（CatalogUri）: ip :8181' +
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
        },
    ],
    params: [
        {
            key: 'fileFormat',
            desc: '写入文件格式（parquet / orc / ... ）'
        },
        {
            key: 'writeTargetFileSizeMb',
            desc: '写入目标文件大小（MB）'
        },
        {
            key: 'writeProps',
            desc: '写入配置参数（Json 格式）'
        },
        {
            key: 'commitBranch',
            desc: '写入提交的分支'
        },
        {
            key: 'totalDataInMemMb',
            desc: '攒批写入，内存中最大数据容量，超过此容量或超过 asyncFlushIntervalSec 则刷出数据到写入队列'
        },
        {
            key: 'asyncFlushIntervalSec',
            desc: '攒批写入，等待刷出的间隔时间，超过此时间或超过 totalDataInMemMb 则刷出数据到写入队列'
        },
        {
            key: 'flushBatchMb',
            desc: '单表最大攒批容量，超过此容量则刷出数据到写入队列'
        },
        {
            key: 'realFlushPauseSec',
            desc: '刷出数据到 Iceberg 的等待时间，<b>0 则不等待<b/>'
        },
    ],
    master_function: [
        {
            key: '写入冲突策略',
            desc: '源端有主键表进行覆盖写入，源端无主键表进行追加写入'
        },
        {
            key: '自定义表属性',
            desc: '包括 format-version 等属性设置'
        },
        {
            key: '设置数据分区',
            desc: '创建任务时，可按表粒度指定分区定义（静态或动态），结构迁移时自动添加该分区定义'
        },
    ]
}
