export const Redis = {
    main_function: [
        {
            key: 'Full Data Migration and Incremental Data Sync',
            desc: 'Synchronize data by executing the <b>PSYNC</b> command, with optional historical data initialization.'
        },
        {
            key: 'Position Resetting',
            desc: 'Initialize historical data again by modifying the position.'
        },
        {
            key: 'Supported Deployment',
            desc: 'Support <b>single node</b>, <b>Sentinel</b>, and <b>Redis sharded cluster</b>.'
        },
        {
            key: 'Supported Commands',
            desc: 'Currently support the following commands (continuously expanding): ' +
                '\n- <b>SET</b>, <b>SETNX</b>, <b>SETEX</b>, <b>APPEND</b>, <b>GETSET</b>, <b>HSET</b>, <b>HSETNX</b>, <b>MSET</b>, <b>HMSET</b> ' +
                '\n- <b>DEL</b>, <b>HDEL</b>, <b>UnLink</b> ' +
                '\n- <b>INCR</b>, <b>INCRBY</b>, <b>HINCRBY</b> ' +
                '\n- <b>LPUSH</b>, <b>RPUSH</b>, <b>LSET</b>, <b>LINSERT</b>, <b>LREM</b>  ' +
                '\n- <b>SADD</b>, <b>ZADD</b>, <b>ZREM</b>, <b>ZREMRANGEBYSCORE</b>, <b> SREM </b> ' +
                '\n- <b>EXPIRE</b>, <b>PExpire</b>, <b>RENAME</b>, <b>Eval</b>'
        },
    ],
    master_function: [
        {
            key: 'Bidirectional Redis Synchronization',
            desc: 'Support full data migration and incremental data synchronization in which the circular data replication is prevented. See [Redis Bidirectional Data Synchronization](../../../bestPractice/redis_loop_data_sync).'
        },
        {
            key: 'Supported Commands for Redis Bidirectional Synchronization',
            desc: 'Currently, the following commands are supported in bidirectional synchronization (continuously expanding): ' +
                '\n- <b>SET</b>, <b>SETNX</b>, <b>SETEX</b>, <b>APPEND</b>, <b>GETSET</b>, <b>HSET</b>, <b>HSETNX</b>, <b>MSET</b>, <b>HMSET</b> ' +
                '\n- <b>DEL</b>, <b>HDEL</b>, <b>UnLink</b>' +
                '\n- <b>LPUSH</b>, <b>RPUSH</b>, <b>LSET</b>, <b>LINSERT</b>, <b>LREM</b> ' +
                '\n- <b>SADD</b>, <b>ZADD</b>, <b>ZREM</b>, <b>ZREMRANGEBYSCORE</b> ' +
                '\n- <b>EXPIRE</b>, <b>PExpire</b>, <b>Eval</b>'
        }
    ],
    notice: [],
    examples: [
        {
            key: 'Redis Bidirectional Data Synchronization',
            desc: 'See [Redis Bidirectional Data Synchronization](../../../bestPractice/redis_loop_data_sync).'
        }
    ],
    faq: [],
    mapping: []
}
