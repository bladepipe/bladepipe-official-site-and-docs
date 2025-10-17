export const Dameng = {
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[Dameng 需要的权限](../datasource_func/Dameng/privs_for_dameng)'
        },
        {
            key: '增量同步准备',
            desc: '文档：[Dameng LogMiner 准备](../datasource_func/Dameng/prepare_for_dameng_logminer)'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 ORACLE 标准交互接口（如 1521）'
        }
    ],
    params: [
        {
            key: 'fullFetchSize',
            desc: '全量扫描数据设置的 fetch size'
        },
        {
            key: 'eventStoreSize',
            desc: '缓存解析完毕的增量事件缓存大小'
        },
        {
            key: 'redoFetchSize',
            desc: '单次获取 LogMiner 分析数据条数'
        },
        {
            key: 'redoOfferTransMaxSize',
            desc: '未消费但已提交事务最大缓存数量'
        },
        {
            key: 'logMiningLsnStep',
            desc: 'Dameng LogMiner 分析 redo log 时指定的分析范围大小'
        },
        {
            key: 'sqlReplaceKeywords',
            desc: '将 DDL 语句进行关键字替换，会将 DDL 中的 "key" 替换为 "value"，参数结构为哈希结构(e.g.: key: value)'
        },
        {
            key: 'isDscNode',
            desc: '是否为 DSC 集群'
        },
        {
            key: 'dscHosts',
            desc: 'DSC 源端所有节点信息，参数值示例：ip1:port1,ip2:port2,ip3:port3...'
        },
        {
            key: 'dscSyncLsnTable',
            desc: 'DSC 用于同步全局 LSN 的表名称，参数值示例："DbName"."TableName"'
        },
    ],
    notice: [
        {
            key: '数据类型',
            desc: '不支持 <b>BLOB</b> 及衍生类型'
        }
    ],
    examples: [],
    master_function: []
}