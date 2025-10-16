export const StarRocks = {
    notice: [
        {
            key: 'Target Table Type',
            desc: 'Only support <b>Primary Key model</b>.'
        },
        {
            key: 'Source Table Type',
            desc: 'Migration and sync of **tables without primary keys** are not supported.'
        },
        {
            key: 'DDL Synchronization Errors',
            desc: '\n- Continuous DDLs on the same table will cause errors (because asynchronous DDLs are executed on a target StarRocks instance).' +
                '\n- Errors may occur when modifying field constraints or some types of DDL.' +
                '\n- If DDL errors occur, you can change the target table schema and then skip the errors by setting DataJob parameters.'
        },
        {
            key: 'Incremental Data Write Conflict Resolution Rule',
            desc: 'Using Stream Load method, the primary key is used for full row replacement.'
        }
    ],
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'SELECT and DDL permissions (optional)'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the <b>StarRocks FE QueryPort<b/> and <b>FE/BE HttpPort<b/>.'
        }
    ],
    params: [
        {
            key: 'host',
            desc: 'MySQL port, corresponding to <b>StarRocks FE QueryPort<b/>.'
        },
        {
            key: 'httpHost',
            desc: 'Host for StarRocks stream load, corresponding to <b>StarRocks FE/BE HttpPort<b/>.'
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
            desc: 'Wait time to flush data to StarRocks using stream load, <b>0 means no wait is needed<b/>.'
        },
        {
            key: 'soTimeoutSec',
            desc: 'TCP socket timeout (so_timeout) during QueryPort operations.'
        },
        {
            key: 'httpSoTimeoutSec',
            desc: 'TCP socket timeout (so_timeout) during HttpPort operations.'
        },
        {
            key: 'enableTimeZoneProcess',
            desc: 'Enable time zone conversion for time fields.'
        },
        {
            key: 'timezone',
            desc: 'Timezone in the Target, e.g., +08:00 Asia/Shanghai America/New_York.'
        }
    ],
    faq: [
        '[Doris/SelectDB Target Write Error](../../faq/solve_sr_dr_dst_writer_http_host)',
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
            desc: 'Use Stream Load to write data to StarRocks BE. By default, batch write is adopted, with dynamic adjustment of data flush interval and batch size.'
        },
        {
            key: 'Handling of Zero Value for Time',
            desc: 'Allow setting zero value for time to different data types to prevent errors when writing to the Target.'
        }
    ]
}
