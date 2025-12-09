const MySQL = {
    notice: [
        {
            key: 'MySQL 存储引擎',
            desc: '支持 <b>InnoDB</b>, <b>MySIAM</b>, <b>阿里云 XEngine</b>, 其他存储引擎暂未测试'
        },
        {
            key: 'MySQL 字符集',
            desc: '支持 <b>utf8</b>, <b>utf8mb4</b>, <b>latin1</b>, 其他编码暂未测试'
        }
    ],
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[MySQL / MariaDB 需要的权限](../datasource_func/MySQL/privs_for_mysql)'
        },
        {
            key: '开启 Binlog',
            desc: '[mysqld] <br /> log-bin=mysql-bin # 开启 Binlog <br /> binlog-format=ROW # 选择 ROW 模式 <br /> binlog_row_image=FULL # 变更带所有列数据'
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
            key: 'fullDataSqlConditionEnabled',
            desc: '将过滤条件拼入 SQL 中进行源端数据扫描，此参数只针对全量迁移有效'
        },
        {
            key: 'srcTimeZone',
            desc: '源端时区，例如 +08:00, Asia/Shanghai, America/New_York 等'
        }
    ],
    faq: [
        '[MySQL 任务延迟怎么办?](../../faq/solve_incre_task_delay)',
        '[MySQL 源端找不到 binlog 文件](../../faq/solve_mysql_src_could_not_find_binlog)',
        '[如何打开 MySQL 源端心跳?](../datasource_func/MySQL/open_mysql_heartbeat)',
        '[MySQL 源端 Schema 权限报错怎么办?](../../faq/solve_access_denied_schema)',
    ],
}

const MariaDB = MySQL;
const AuroraForMySQL = MySQL;
const AnalyticDbForMySQL = MySQL;

MySQL.faq[MySQL.faq.length - 1] += "\n\r > Tips: MySQL 源端相关 FAQ 同样适用于 MySQL 系数据源。"

export {
    MySQL,
    MariaDB,
    AuroraForMySQL,
    AnalyticDbForMySQL
}
