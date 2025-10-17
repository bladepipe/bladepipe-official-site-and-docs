export const Elasticsearch = {
    prepare: [
        {
            key: '账号权限',
            desc: '具备索引的 <b>create</b>, <b>delete</b>, <b>create_index</b>, <b>delete_index</b>, <b>read</b>, <b>write</b> 权限'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 Elasticsearch 节点'
        }
    ],
    params: [
        {
            key: 'maxBulkSizeMb',
            desc: '单表最大攒批容量，超过此容量则刷出数据到写入队列'
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
            key: 'realFlushPauseSec',
            desc: '使用 <b>Bulk Write</b> 刷出数据到 ElasticSearch 的等待时间，<b>0 则不等待<b/>'
        },
        {
            key: 'pkSeparator',
            desc: '拼接 <b>_id</b> 的分隔符（字段数 > 1）'
        },
        {
            key: 'enableBulkSizeThreshold',
            desc: '启用批量写入模式（默认开启）'
        },
    ],
    examples: [
        {
            key: 'Elasticsearch 对端同步技术详解',
            desc: '文档：[Elasticsearch 对端同步技术详解](https://www.clougence.com/blog/data_insights/es_sync_detail)'
        }
    ],
    master_function: [
        {
            key: '全量前清空目标数据',
            desc: '运行全量任务前清除老数据，包括重跑任务、定时全量迁移都会触发此能力'
        },
        {
            key: '重建目标表',
            desc: '运行全量任务前重建目标表，包括重跑任务、定时全量迁移都会触发此能力'
        },
        {
            key: 'ES 时间写入格式',
            desc: '以该字段的第一个时间格式写入 Elasticsearch，如果未设置时间格式，则使用 <b>yyyy-MM-dd\'T\'HH:mm:ss</b> 格式',
        },
        {
            key: 'ES 时区设置',
            desc: '只有当时间格式的时区为 <b>ZZZZZ</b> 时，才会将页面设置的时区写入到 Elasticsearch'
        },
    ]
}
