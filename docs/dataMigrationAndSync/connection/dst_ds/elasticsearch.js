export const Elasticsearch = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: '<b>create</b>, <b>delete</b>, <b>create_index</b>, <b>delete_index</b>, <b>read</b>, <b>write</b> permissions for indexes.'
        },
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the Elasticsearch port.'
        }
    ],
    params: [
        {
            key: 'maxBulkSizeMb',
            desc: 'Maximum batch size per table; If the batch size exceeds this limit, then data is flushed to the write queue.'
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
            key: 'realFlushPauseSec',
            desc: 'Wait time to flush data to ElasticSearch using <b>Bulk Write<b/>. <b>0 means no wait is needed<b/>.'
        },
        {
            key: 'pkSeparator',
            desc: 'Separator for concatenating <b>_id</b> (number of fields > 1).'
        },
        {
            key: 'enableBulkSizeThreshold',
            desc: 'Enable batch write mode (enabled by default).'
        },
    ],
    examples: [
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
            key: 'Format of Time Written to ES',
            desc: 'Time is written to Elasticsearch in the format of the first time record of the field, or <b>yyyy-MM-dd\'T\'HH:mm:ss</b> if no time format is set.',
        },
        {
            key: 'Setting ES Time Zone',
            desc: 'The time zone setting on the page will be written to Elasticsearch only when the time zone format is <b>ZZZZZ</b>.'
        },
    ]
}
