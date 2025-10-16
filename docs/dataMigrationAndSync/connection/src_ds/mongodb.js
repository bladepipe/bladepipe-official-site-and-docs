export const MongoDB = {
    notice: [
        {
            key: 'Oplog Size and Retention Settings',
            desc: 'By default, the value of <b>replication.oplogSizeMB</b> or <b>storage.oplogMinRetentionHours</b> in MongoDB is too small. If data synchronization latency is significant, unconsumed oplogs may be removed. In this case, it is necessary to increase these parameters.'
        },
        {
            key: 'Parameter Configuration for MongoDB Master-Slave Architecture',
            desc: 'For MongoDB master-slave architecture, set the Source parameter <b>oplogCollection</b> to <b>oplog.$main</b>.'
        },
        {
            key: 'ChangeStream Mode',
            desc: 'MongoDB 3.6 and above support <b>changeStream</b> for capturing incremental data changes. Set the Source parameter <b>captureMode</b> to <b>CHANGE_STREAM</b>. For sharded clusters, use the MongoDB connection string for synchronization.'
        },
        {
            key: 'Oplog Mode',
            desc: 'When using <b>oplog</b> mode for data synchronization from a MongoDB instance, ensure the access to the <b>local</b> database.'
        }
    ],
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'See [Permissions Required for MongoDB](../datasource_func/MongoDB/privs_for_mongo).'
        }
    ],
    params: [
        {
            key: 'captureMode',
            desc: 'Configure the MongoDB incremental data sync mode, supporting OP_LOG and CHANGE_STREAM modes.'
        },
        {
            key: 'changeStreamBatchSize',
            desc: 'Set the maximum number of change events per batch for MongoDB Change Stream.'
        },
        {
            key: 'oplogCollection',
            desc: 'Specify the collection name for MongoDB oplog. The default name is oplog.rs.'
        },
        {
            key: 'timezone',
            desc: 'Source time zone (the default time zone is UTC).'
        }
    ]
}
