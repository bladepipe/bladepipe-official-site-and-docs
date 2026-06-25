export const StarRocks = {
    notice: [
        {
            key: '对端表类型',
            desc: '仅支持 <b>主键模型(Primary Key)</b> '
        },
        {
            key: '源端表类型',
            desc: '不支持 **无主键表** 迁移同步'
        },
        {
            key: 'DDL 同步报错',
            desc: '\n- 同一张表连续几个 DDL 将报错（因 StarRocks 对端是异步 DDL) ' +
                '\n- 修改字段约束或者部分类型的 DDL 报错 ' +
                '\n- 如遇到 DDL 报错，可在对端变更好表结构，然后通过设置任务参数跳过，文档：[跳过 DDL 异常](../../param_and_func/skip_ddl_error)'
        },
        {
            key: '增量写入冲突策略',
            desc: 'Stream Load 写入以主键进行整行替换'
        },
    ],
    prepare: [
        {
            key: '账号权限',
            desc: '具备 SELECT, DDL 权限（可选）'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 <b>StarRocks FE QueryPort<b/> 和 <b>FE/BE HttpPort<b/>'
        }
    ],
    params: [
        {
            key: 'host',
            desc: 'MySQL 协议交互链接，对应 <b>StarRocks FE QueryPort<b/>'
        },
        {
            key: 'httpHost',
            desc: 'StarRocks stream load 链接，对应 <b>StarRocks FE/BE HttpPort<b/>'
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
            desc: '使用 stream load 刷出数据到 StarRocks 的等待时间，<b>0 则不等待<b/>'
        },
        {
            key: 'soTimeoutSec',
            desc: '在 QueryPort 执行操作时 tcp 超时链接 (so_timeout) '
        },
        {
            key: 'httpSoTimeoutSec',
            desc: '在 HttpPort 执行操作时 tcp 超时链接 (so_timeout) '
        },
        {
            key: 'enableTimeZoneProcess',
            desc: '是否对时间字段进行时区转换'
        },
        {
            key: 'timezone',
            desc: '目标端 StarRocks 时区，例如 +08:00 Asia/Shanghai America/New_York'
        }, 
        {
            key: 'maxInSizePerQuery',
            desc: '校验任务中，对端单次查询的最大 IN 条件值数量，大于该值会自动拆分多次查询'
        },
    ],
    faq: [
        '[Doris / SelectDB 目标端写入报错](../../../faq/solve_sr_dr_dst_writer_http_host)',
        '[StarRocks 对端结构迁移如何设置分区?](../../datasource_func/StarRocks/starrocks_partition)',
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
            key: 'Stream Load 数据写入',
            desc: '采用 Stream Load 到 StarRocks Be 写入数据, 默认攒批写入，可动态调节刷出数据节奏和批次大小'
        },
        {
            key: '0 值时间处理',
            desc: '支持将 0 值时间设置成不同类型的值，防止写入对端报错'
        }
    ]
}
