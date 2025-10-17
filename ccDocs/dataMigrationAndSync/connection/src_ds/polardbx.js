export const PolarDbX = {
    notice: [
        {
            key: '版本支持',
            desc: '只支持 PolarDB-X 2.0 版本'
        },
        {
            key: 'PolarDB-X 2.0 字符集',
            desc: '支持 <b>utf8</b>, <b>utf8mb4</b>, <b>latin1</b>,其他编码暂未测试'
        },
        {
            key: '源库限制',
            desc: '若源端 PolarDB-X 2.0 待同步的表名中含大写字母，则不支持增量同步'
        }
    ],
    prepare: [
        {
            key: '账号权限',
            desc: '云数据库为<b>读写权限</b>账号 <br />自建数据库权限: \n- GRANT SELECT ON *.* TO \'user\'@\'host\' \n- GRANT REPLICATION CLIENT ON *.* TO \'user\'@\'host\' \n- GRANT REPLICATION SLAVE ON *.* TO \'user\'@\'host\''
        }
    ],
    params: [
        {
            key: 'parseBinlogParallel',
            desc: '增量解析 Binlog 的并发数'
        },
        {
            key: 'parseBinlogBufferSize',
            desc: '用于增量解析 Binlog 的环形队列大小'
        },
        {
            key: 'maxTransactionSize',
            desc: '单事务最大数据条数，超过则分段刷出'
        },
        {
            key: 'limitThroughputMb',
            desc: '限制增量 Binlog 流量'
        },
        {
            key: 'needJsonEscape',
            desc: '将 json 中特殊字符进行转义，以写入到对端'
        }
    ]
}
