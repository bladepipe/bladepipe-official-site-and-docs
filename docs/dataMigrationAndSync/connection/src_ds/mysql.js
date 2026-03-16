const MySQL = {
    notice: [
        {
            key: 'MySQL Storage Engine',
            desc: 'Support <b>InnoDB</b>, <b>MyISAM</b>, <b>AWS XEngine</b>. Other storage engines have not been tested yet.'
        },
        {
            key: 'MySQL Character Set',
            desc: 'Support <b>utf8</b>, <b>utf8mb4</b>, <b>latin1</b>. Other encodings have not been tested yet.'
        }
    ],
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'See [Permissions Required for MySQL/MariaDB](../../datasource_func/MySQL/privs_for_mysql).'
        },
        {
            key: 'Enabling Binlog',
            desc: '[mysqld] <br /> log-bin=mysql-bin # Enable Binlog <br /> binlog-format=ROW # Choose ROW mode <br /> binlog_row_image=FULL # Changes include all column data'
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
            key: 'extraDDL',
            desc: 'Support synchronization of additional DDL, including <b>PT</b>, <b>GHOST</b>, <b>ALI_DMS</b>, and <b>PT_GHOST</b>.'
        },
        {
            key: 'needJsonEscape',
            desc: 'Escape special characters in JSON to be written to the target database.'
        },
        {
            key: 'fullDataSqlConditionEnabled',
            desc: 'Add filtering conditions in SQL during source data scanning. It only works in Full Data migration.'
        },
        {
            key: 'srcTimeZone',
            desc: 'Source time zone, e.g., +08:00, Asia/Shanghai, America/New_York, etc.'
        }
    ],
    faq: [
        '[How to handle MySQL DataJob latency?](../../../faq/solve_incre_task_delay)',
        '[What to do when binary Log cannot be found in MySQL Source?](../../../faq/solve_mysql_src_could_not_find_binlog)',
        '[What to do when access to schema in MySQL Source is denied?](../../../faq/solve_access_denied_schema)',
    ],
}

const MariaDB = MySQL;
const AuroraForMySQL = MySQL;
const AnalyticDbForMySQL = MySQL;

MySQL.faq[MySQL.faq.length - 1] += "\n\r > Tip: MySQL source-related FAQ also applies to MySQL-based DataSources."

export {
    MySQL,
    MariaDB,
    AuroraForMySQL,
    AnalyticDbForMySQL
}
