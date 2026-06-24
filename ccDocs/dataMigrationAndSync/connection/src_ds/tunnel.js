const Tunnel = {
    prepare: [
        {
            key: '网络准备',
            desc: '若 CloudCanal 为 docker 版本，解压后需要修改 docker-compose.yml 端口映射再安装/升级，并开放 ECS 安全组相关端口，以便远程连接'
        }
    ],
    params: [
        {
            key: 'httpMaxContentSize',
            desc: 'Tunnel 使用 HTTP 传输数据时最大内容大小，目前被使用在 netty 的 HttpObjectAggregator 中'
        },
        {
            key: 'eventStoreSize',
            desc: '内存队列大小（可能为事件数量或者内存大小，单位：byte）'
        },
        {
            key: 'protocol',
            desc: 'Tunnel 传输数据使用的交互协议，目前支持 HTTP'
        },
        {
            key: 'uriPrefix',
            desc: 'Tunnel 数据源 uri 前缀'
        },
        {
            key: 'contentCompressType',
            desc: 'Tunnel 数据源的数据压缩类型,目前支持 DeInflater / GZIP'
        },
        {
            key: 'dbs',
            desc: '数据源结构定义'
        },
        {
            key: 'printDataInLog',
            desc: '是否将关键数据打印到日志以方便排查问题，此选项打开可能影响性能和数据安全'
        },
        {
            key: 'schemaFormat',
            desc: 'Value Schema 类型'
        },
        {
            key: 'printCustomCodeDebugLog',
            desc: '打印自定义代码DEBUG日志(会打印处理前后数据，同步量大会增加磁盘使用和影响同步性能，请知悉)，该参数动态生效，不需要重启任务'
        }
    ],
    examples: [
        {
            key: '跨互联网数据同步进阶',
            desc: '文档：[跨互联网数据同步进阶](../../../bestPractice/http_internet_data_sync_2)'
        },
        {
            key: '跨互联网数据互通(HTTP)',
            desc: '文档：[跨互联网数据互通(HTTP)](https://www.clougence.com/blog/data_sync_sample/http_base_internet_data_sync)'
        }
    ]
}

export {
    Tunnel
}
