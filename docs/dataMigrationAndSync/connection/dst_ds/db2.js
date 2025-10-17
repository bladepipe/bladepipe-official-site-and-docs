const Db2 = {
    prepare: [],
    params: [
        {
            key: 'keyConflictStrategy',
            desc: 'Strategy for handling primary key conflicts during write in Incremental DataTask:' +
                '<ul>' +
                '  <li><b>IGNORE</b> Ignore conflicts (default)</li>' +
                '  <li><b>REPLACE</b> Replace conflict (optional)</li>' +
                '  <li><b>EXCEPTION</b> Raise an exception on conflict (optional)</li>' +
                '</ul>'
        },
        {
            key: 'limitWriteRps',
            desc: 'Write RPS (Requests Per Second) to the Target.'
        },
        {
            key: 'writeParallel',
            desc: 'The number of parallel threads allowed to write data to the Target, significantly affecting migration or synchronization performance.'
        },
        {
            key: 'minPoolSize',
            desc: 'Minimum size of the data source connection pool.'
        },
        {
            key: 'maxPoolSize',
            desc: 'Maximum size of the data source connection pool.'
        },
        {
            key: 'maxWait',
            desc: 'Maximum wait time for a connection to the data source, in milliseconds.'
        },
        {
            key: 'soTimeoutSec',
            desc: 'TCP socket timeout length for the data source connection, in seconds.'
        },
        {
            key: 'increParallelApplyStrategy',
            desc: 'Parallel write strategy for relational databases in the Target:' +
                '<ul>' +
                '  <li><b>KEY</b>: Parallel writing to partitions separated based on primary keys.<br></li>' +
                '  <li><b>TABLE</b>: Parallel writing to partitions separated based on tables.<br></li>' +
                '</ul>'
        }
    ],
    master_function: []
}

export {
    Db2
}
