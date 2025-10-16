export const Hive = {
    prepare: [
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 Hdfs / Hive 节点'
        }
    ],
    params: [
        {
            key: 'asyncFlushIntervalSec',
            desc: '攒批写入，等待刷出的间隔时间，超过此时间或超过 totalDataInMemMb 则刷出数据到写入队列'
        },
        {
            key: 'totalDataInMemMb',
            desc: '攒批写入，内存中最大数据容量，超过此容量或超过 asyncFlushIntervalSec 则刷出数据到写入队列'
        },
        {
            key: 'realFlushPauseSec',
            desc: '刷出数据到 HDFS 文件的等待时间，<b>0 则不等待<b/>'
        },
        {
            key: 'hdfsBlockSize',
            desc: 'Hive 底下的 HDFS 写入的文件块大小'
        },
        {
            key: 'incrTempSchemaName',
            desc: 'Hive 增量临时 Schema'
        },
        {
            key: 'incrTempTableIntervalCharacter',
            desc: 'Hive 增量临时表连接符'
        },
        {
            key: 'incrTempTableDistConnect',
            desc: 'Hive 增量临时表连接区分符，必须为两个，使用 ; 间隔'
        },
        {
            key: 'incrMergePollingPauseSec',
            desc: '增量合并检查线程轮询时间（单位：秒）'
        },
        {
            key: 'incrMergeTimePauseMin',
            desc: '增量临时表合并间隔时间（单位：分钟）'
        }
    ],
    examples: [
        {
            key: 'CloudCanal x Hive 构建高效的实时数仓',
            desc: '文档：[CloudCanal x Hive 构建高效的实时数仓](https://www.clougence.com/blog/data_insights/hive_dst_change_data_capture_writer)'
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
    ]
}