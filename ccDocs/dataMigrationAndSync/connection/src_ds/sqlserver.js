const SQLServer = {
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[SQL Server 需要的权限](../datasource_func/SqlServer/privs_for_sqlserver)'
        },
        {
            key: '开启 SQL Server CDC',
            desc: 'exec [你的数据库].sys.sp_cdc_enable_db'
        }
    ],
    params: [
        {
            key: 'maxTxsPerIteration',
            desc: 'SQL Server 增量源端 CDC 每次最大扫描事务数'
        },
        {
            key: 'scanParallel',
            desc: '全量阶段：并发扫描表数量<br/>增量阶段：并发扫描 CDC 表数量'
        },
        {
            key: 'eventStoreSize',
            desc: '缓存解析完毕的增量事件缓存大小'
        }
    ],
    faq: [
        '[出现 TLS10 is not accepted 问题该怎么办?](../../faq/solve_sqlserver_tls)'
    ]
}

export {
    SQLServer
}
