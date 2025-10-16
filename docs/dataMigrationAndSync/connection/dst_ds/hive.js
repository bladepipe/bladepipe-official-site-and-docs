export const Hive = {
    prepare: [
        {
            key: 'Port Preparation',
            desc: 'Allow the migration and sync node (Worker) to connect to the Hdfs/Hive port.'
        }
    ],
    params: [
        {
            key: 'asyncFlushIntervalSec',
            desc: 'Interval to wait for flushing when writing in batches; If the wait time exceeds asyncFlushIntervalSec, or the data size exceeds totalDataInMemMb, then data is flushed to the write queue.'
        },
        {
            key: 'totalDataInMemMb',
            desc: 'Maximum data size allowed in memory when writing in batches; If the data size exceeds the memory limit, or the wait time exceeds asyncFlushIntervalSec, then data is flushed to the write queue.'
        },
        {
            key: 'realFlushPauseSec',
            desc: 'Wait time to flush data to HDFS. <b>0 means no wait is needed<b/>.'
        },
        {
            key: 'hdfsBlockSize',
            desc: 'HDFS block size in Hive.'
        },
        {
            key: 'incrTempSchemaName',
            desc: 'Temporary schema for incremental data in Hive.'
        },
        {
            key: 'incrTempTableIntervalCharacter',
            desc: 'Concatenation operator of temporary tables for incremental data in Hive.'
        },
        {
            key: 'incrTempTableDistConnect',
            desc: 'Connection specifiers of temporary tables for incremental data in Hive. There must be two specifiers with ; in between.'
        },
        {
            key: 'incrMergePollingPauseSec',
            desc: 'Polling interval of checking threads in merging temporary tables for incremental data (in seconds).'
        },
        {
            key: 'incrMergeTimePauseMin',
            desc: 'Interval of merging temporary tables for incremental data (in minutes).'
        }
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
        }
    ]
}