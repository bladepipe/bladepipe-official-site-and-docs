export const Paimon = {
    notice: [],
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 Catalog 和 Warehouse'
        },
        {
            key: 'S3 数据源配置模版',
            desc: '\n- 网络地址（CatalogUri）: glue.ap-southeast-1.amazonaws.com' +
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
            desc: '对端写入并发数，对迁移或者同步性能影响大'
        },
        {
            key: 'writeProps',
            desc: '写入配置参数（Json 格式）'
        },
        {
            key: 'compactTaskSize',
            desc: '压缩任务线程数'
        },
        {
            key: 'paimonIOManagerPaths',
            desc: 'I/O 管理器路径'
        },
        {
            key: 'defaultDynamicBucket',
            desc: '默认动态 Bucket 数'
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
            desc: '刷出数据到 Paimon 的等待时间，<b>0 则不等待<b/>'
        },
        {
            key: 'catalogUri',
            desc: 'Catalog 地址'
        },
        {
            key: 'httpsEnabled',
            desc: 'Catalog URI 使用 HTTPS'
        },
        {
            key: 'catalogWarehouse',
            desc: '指定 Paimon 仓库的根目录 URI'
        },
        {
            key: 'catalogMetastoreType',
            desc: '启用文件系统模式'
        },
        {
            key: 'catalogProps',
            desc: 'Catalog 配置参数'
        },
        {
            key: 'enableTimeZoneProcess',
            desc: '是否对时间字段进行时区转换'
        },
        {
            key: 'timezone',
            desc: '目标端时区，例如 +08:00 Asia/Shanghai America/New_York'
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
            desc: '创建任务时可按表级粒度指定分区字段名（多个以逗号分隔，如：col1,col2,col3），结构迁移过程中将自动添加对应分区'
        },
    ]
}
