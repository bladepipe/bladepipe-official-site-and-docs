const PolarDbMySQL = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'A <b>privileged account</b> or a normal account with read and write permissions of PolarDbMySQL.'
        },
        {
            key: 'Enable Binlog',
            desc: 'In the PolarDbMySQL instance, click Details > Configuration and Management > Parameter Configuration > Set the value of <b>loose_polar_log_bin</b> to true.'
        },
        {
            key: 'Character Set',
            desc: 'Support <b>utf8</b>, <b>utf8mb4</b>, <b>latin1</b>. Other encodings have not been tested.'
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
        }
    ],
    faq: [
        '[How to handle MySQL DataJob latency?](../../faq/solve_incre_task_delay)',
        '[What to do when binary Log cannot be found in MySQL Source?](../../faq/solve_mysql_src_could_not_find_binlog)',
        '[What to do when access to schema in MySQL Source is denied?](../../faq/solve_access_denied_schema)',
        '> Tips: MySQL source-related FAQs are also applicable to MySQL-compatible data sources.'
    ]
}

export {
    PolarDbMySQL
}
