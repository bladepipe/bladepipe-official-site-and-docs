export const Redis = {
    main_function: [
        {
            key: '全量迁移、增量同步一体化',
            desc: '通过执行 <b>PSYNC</b> 指令同步数据, 可选历史数据初始化'
        },
        {
            key: '回溯位点',
            desc: '支持通过修改位点，重新初始化历史数据'
        },
        {
            key: '部署形态支持',
            desc: '支持 <b>单节点</b>、<b>Sentinel</b>、<b>分片集群 Redis</b>'
        },
        {
            key: '指令支持',
            desc: '当前支持以下指令(不断增加丰富): ' +
                '\n- <b>SET</b>, <b>SETNX</b>, <b>SETEX</b>, <b>APPEND</b>, <b>GETSET</b>, <b>HSET</b>, <b>HSETNX</b>, <b>MSET</b>, <b>HMSET</b> ' +
                '\n- <b>DEL</b>, <b>HDEL</b>, <b>UnLink</b> ' +
                '\n- <b>INCR</b>, <b>INCRBY</b>, <b>HINCRBY</b>, <b>DECR</b>, <b>DECRBY</b> ' +
                '\n- <b>LPUSH</b>, <b>RPUSH</b>, <b>LSET</b>, <b>LINSERT</b>, <b>LREM</b>, <b>LPOP</b>, <b>RPOP</b>, <b>LTRIM</b> ' +
                '\n- <b>SADD</b>, <b>ZADD</b>, <b>ZREM</b>, <b>ZREMRANGEBYSCORE</b>, <b>SREM</b>, <b>ZINCRBY</b>, <b>ZREMRANGEBYRANK</b>, <b>ZREMRANGEBYLEX</b> ' +
                '\n- <b>EXPIRE</b>, <b>PExpire</b>, <b>RENAME</b>, <b>Eval</b>, <b>PUBLISH</b>'
        },
    ],
    master_function: [
        {
            key: 'Redis 双向同步',
            desc: '支持全量迁移、增量同步双向防循环，文档：[Redis 双向数据同步](../../bestPractice/redis_loop_data_sync)'
        },
        {
            key: 'Redis 双向同步指令支持',
            desc: '当前双向同步支持以下指令(不断增加丰富): ' +
                '\n- <b>SET</b>, <b>SETNX</b>, <b>SETEX</b>, <b>APPEND</b>, <b>GETSET</b>, <b>HSET</b>, <b>HSETNX</b>, <b>MSET</b>, <b>HMSET</b> ' +
                '\n- <b>DEL</b>, <b>HDEL</b>, <b>UnLink</b>' +
                '\n- <b>INCR</b>, <b>INCRBY</b>, <b>HINCRBY</b> ' +
                '\n- <b>LPUSH</b>, <b>RPUSH</b>, <b>LSET</b>, <b>LINSERT</b>, <b>LREM</b>, <b>LPOP</b>, <b>RPOP</b>, <b>LTRIM</b> ' +
                '\n- <b>SADD</b>, <b>ZADD</b>, <b>ZREM</b>, <b>ZREMRANGEBYSCORE</b>, <b>SREM</b>, <b>ZREMRANGEBYRANK</b>, <b>ZREMRANGEBYLEX</b> ' +
                '\n- <b>EXPIRE</b>, <b>PExpire</b>, <b>Eval</b>, <b>PUBLISH</b>'
        }
    ],
    notice: [],
    examples: [
        {
            key: 'Redis 双向数据同步',
            desc: '文档：[Redis 双向数据同步](../../bestPractice/redis_loop_data_sync)'
        }
    ],
    faq: [],
    mapping: []
}
