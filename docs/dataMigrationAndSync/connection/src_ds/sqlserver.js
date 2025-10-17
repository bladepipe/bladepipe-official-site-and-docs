const SQLServer = {
    prepare: [
        {
            key: 'Permissions for Account',
            desc: 'See [Required Permissions for SQL Server](../datasource_func/SqlServer/privs_for_sqlserver).'
        },
        {
            key: 'Enable SQL Server CDC',
            desc: 'Run: exec [your_database].sys.sp_cdc_enable_db'
        }
    ],
    params: [
        {
            key: 'maxTxsPerIteration',
            desc: 'Maximum number of transactions to scan each time in incremental data sync.'
        },
        {
            key: 'scanParallel',
            desc: 'Full data stage: The number of tables to be scanned in parallel.<br/>Incremental stage: The number of CDC tables to be scanned in parallel.'
        },
        {
            key: 'eventStoreSize',
            desc: 'Size of the cache for parsed incremental events.'
        }
    ],
    faq: [
        '[What should I do if TLS10 is not accepted?](../../faq/solve_sqlserver_tls)'
    ]
}

export {
    SQLServer
}
