const Db2 = {
    prepare: [],
    params: [
        {
            key: 'keyConflictStrategy',
            desc: '增量写入遇到主键冲突策略:' +
                '<ul>' +
                '  <li><b>IGNORE</b> 冲突忽略（默认）</li>' +
                '  <li><b>REPLACE</b> 冲突替换（可选）</li>' +
                '  <li><b>EXCEPTION</b> 冲突异常（可选）</li>' +
                '</ul>'
        },
        {
            key: 'limitWriteRps',
            desc: '对端写入RPS'
        },
        {
            key: 'writeParallel',
            desc: '对端写入并发数，对迁移或者同步性能影响大'
        },
        {
            key: 'minPoolSize',
            desc: '数据源最小连接池大小'
        },
        {
            key: 'maxPoolSize',
            desc: '数据源最大连接池大小'
        },
        {
            key: 'maxWait',
            desc: '数据源连接最大超时时间，单位毫秒'
        },
        {
            key: 'soTimeoutSec',
            desc: '数据源链接 tcp SOCKET TIMEOUT 大小'
        },
        {
            key: 'increParallelApplyStrategy',
            desc: '关系型数据库对端写入数据并行策略：' +
                '<ul>' +
                '  <li><b>KEY</b>: 以主键进行分区并行写入<br></li>' +
                '  <li><b>TABLE</b>: 以表进行分区并行写入<br></li>' +
                '</ul>'
        }
    ],
    master_function: []
}

export {
    Db2
}
