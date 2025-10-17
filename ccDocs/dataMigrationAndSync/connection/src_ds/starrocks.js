export const StarRocks = {
    notice: [],
    prepare: [
        {
            key: '账号权限',
            desc: '具备 SELECT 权限'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 <b>StarRocks FE QueryPort<b/>'
        }
    ],
    params: [
        {
            key: 'fullBatchSize',
            desc: '全量写入对端单批数据条数,对迁移性能影响大'
        },
        {
            key: 'fullPagingCount',
            desc: '关系型数据库源端扫描分页大小'
        },
        {
            key: 'scanParallel',
            desc: '源端扫描并发数，如果数据源类型为关系型数据库，则为并发扫描表数量'
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
        }
    ]
}
