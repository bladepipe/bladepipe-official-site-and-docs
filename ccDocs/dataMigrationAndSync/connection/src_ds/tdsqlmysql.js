export const TdsqlMySQL = {
    notice: [
        {
            key: '分区表同步限制',
            desc: '增量同步不支持二级分区表，全量同步二级分区表只需要选择对应的一级分表'
        }
    ],
    prepare: [
        {
            key: '账号权限',
            desc: '云数据库读写账号或高权限账号'
        },
        {
            key: '开启 Binlog',
            desc: '云数据库开启 Binlog 功能'
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
    ],
    faq: []
}
