export const MongoDB = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'See [Permissions Required for MongoDB](../../datasource_func/MongoDB/privs_for_mongo).'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (sidecar) to connect to MongoDB/DocumentDB nodes.'
        }
    ],
    params: [
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
            desc: 'Wait time to flush data to MongoDB. <b>0 means no wait is needed<b/>.'
        },
        {
            key: 'enableTimeZoneProcess',
            desc: 'Enable time zone conversion for time fields.'
        },
        {
            key: 'timezone',
            desc: 'Timezone in the Target (by default, UTC).'
        },
        {
            key: 'enableBatchApply',
            desc: 'Enable batch write mode (it is disabled by default).'
        }
    ]
}
