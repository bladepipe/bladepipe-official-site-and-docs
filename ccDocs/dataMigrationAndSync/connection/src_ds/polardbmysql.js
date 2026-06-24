const PolarDbMySQL = {
    prepare: [
        {
            key: '账号权限',
            desc: '云数据库读写账号或高权限账号'
        },
        {
            key: '开启 Binlog',
            desc: '云数据实例详情 > 配置与管理 > 参数配置 > 设置 <b>loose_polar_log_bin</b> 为 true'
        },
        {
            key: 'PolarDbMySQL 字符集',
            desc: '支持 <b>utf8</b>, <b>utf8mb4</b>, <b>latin1</b>, 其他编码暂未测试'
        }
    ],
    params: [
        {
            key: 'parseBinlogParallel',
            desc: '增量解析 Binlog 的并发数'
        },
        {
            key: 'parseBinlogBufferSize',
            desc: '用于增量解析 Binlog 的环形队列大小'
        },
        {
            key: 'maxTransactionSize',
            desc: '单事务最大数据条数，超过则分段刷出'
        },
        {
            key: 'limitThroughputMb',
            desc: '限制增量 Binlog 流量'
        },
        {
            key: 'extraDDL',
            desc: '兼容额外的 DDL 同步，包括 <b>PT</b>, <b>GHOST</b>, <b>ALI_DMS</b>, <b>PT_GHOST</b>'
        },
        {
            key: 'needJsonEscape',
            desc: '将 json 中特殊字符进行转义，以写入到对端'
        }
    ],
    faq: [
        '[MySQL 任务延迟怎么办?](../../../faq/solve_incre_task_delay)',
        '[MySQL 源端找不到 binlog 文件](../../../faq/solve_mysql_src_could_not_find_binlog)',
        '[如何打开 MySQL 源端心跳?](../../datasource_func/MySQL/open_mysql_heartbeat)',
        '[MySQL 源端 Schema 权限报错怎么办?](../../../faq/solve_access_denied_schema)',
    ]
}

PolarDbMySQL.faq[PolarDbMySQL.faq.length - 1] += "\n\r > Tips: MySQL 源端相关 FAQ 同样适用于 MySQL 系数据源。"

export {
    PolarDbMySQL
}