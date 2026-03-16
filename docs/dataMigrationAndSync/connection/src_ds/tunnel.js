const Tunnel = {
    prepare: [
        {
            key: 'Port Preparation',
            desc: 'For BladePipe (Docker version), modify the docker-compose.yml port mappings before installing/upgrading after extraction, and open relevant ECS security group ports for remote connection.'
        }
    ],
    params: [
        {
            key: 'httpMaxContentSize',
            desc: 'The maximum content size when Tunnel uses HTTP to transmit data. Currently it is used in Netty‘s HttpObjectAggregator.'
        },
        {
            key: 'eventStoreSize',
            desc: 'Size of the queue in the memory (it might be event count or memory size, in bytes).'
        },
        {
            key: 'protocol',
            desc: 'Protocol for data transfer in Tunnel. Support HTTP currently.'
        },
        {
            key: 'uriPrefix',
            desc: 'URI prefix for Tunnel data sources.'
        },
        {
            key: 'contentCompressType',
            desc: 'Data compression form for Tunnel data sources. Support DeInflater / GZIP currently.'
        },
        {
            key: 'dbs',
            desc: 'Definition of the data source schema.'
        },
        {
            key: 'printDataInLog',
            desc: 'Enable to print key data to logs for troubleshooting. Enabling this feature may impact performance and data security.'
        },
        {
            key: 'schemaFormat',
            desc: 'Type of Value Schema.'
        },
        {
            key: 'printCustomCodeDebugLog',
            desc: 'Print custom code DEBUG logs (Note that it will print data before and after processing, which may increase disk usage and impact sync performance). This parameter takes effect dynamically and DataJob restart is not required.'
        }
    ]
}

export {
    Tunnel
}
