const Doris = {
    notice: [
        {
            key: 'Target Table Type',
            desc: 'Only support <b>Unique key model(Unique)</b>.'
        },
        {
            key: 'Source Table Type',
            desc: 'Migration and sync of **tables without primary keys** are not supported.'
        },
        {
            key: 'Data Type',
            desc: 'Do not support binary data such as <b>BINARY</b>, <b>BLOB</b>.'
        },
        {
            key: 'Incremental Data Write Conflict Resolution Rule',
            desc: 'Using Stream Load method, the primary key is used for full row replacement.'
        },
    ],
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'SELECT and DDL permissions (optional)'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the <b>Doris/SelectDB FE QueryPort<b/> and <b>FE/BE HttpPort<b/>.'
        }
    ],
    params: [
        {
            key: 'host',
            desc: 'MySQL port, corresponding to <b>Doris/SelectDB FE QueryPort<b/>.'
        },
        {
            key: 'httpHost',
            desc: 'Host for Doris stream load, corresponding to <b>Doris/SelectDB FE/BE HttpPort<b/>.'
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
            desc: 'Wait time to flush data to Doris/SelectDB using stream load. <b>0 means no wait is needed<b/>.'
        },
        {
            key: 'soTimeoutSec',
            desc: 'TCP socket timeout (so_timeout) during QueryPort operations.'
        },
        {
            key: 'enableTimeZoneProcess',
            desc: 'Enable time zone conversion for time fields.'
        },
        {
            key: 'timezone',
            desc: 'Timezone in the Target, e.g., +08:00 Asia/Shanghai America/New_York.'
        },
        {
            key: 'maxInSizePerQuery',
            desc: 'Maximum number of IN clause values per query during secondary verification. Queries exceeding this limit will be automatically split.'
        }
    ],
    faq: [
        '[Doris/SelectDB Target Write Error](../../../faq/solve_sr_dr_dst_writer_http_host)',
    ],
    master_function: [
        {
            key: 'Removal of Target Data before Full Data Migration',
            desc: 'Remove the existing data in the Target before running the Full Data Migration, applicable for DataJobs reruning and scheduled Full Data migrations.'
        },
        {
            key: 'Recreating Target Table',
            desc: 'Recreate target tables before running the Full Data Migration, applicable for DataJobs reruning and scheduled Full Data migrations.'
        },
        {
            key: 'Stream Load',
            desc: 'Use Stream Load to write data to Doris/SelectDB BE. By default, batch write is adopted, with dynamic adjustment of data flush interval and batch size.'
        },
        {
            key: 'Handling of Zero Value for Time',
            desc: 'Allow setting zero value for time to different data types to prevent errors when writing to the Target.'
        }
    ]
}

const SelectDB = Doris;

export {
    Doris,
    SelectDB
}
