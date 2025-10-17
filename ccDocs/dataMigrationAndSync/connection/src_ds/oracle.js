export const Oracle = {
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[Oracle 需要的权限](../datasource_func/Oracle/privs_for_oracle)'
        },
        {
            key: '增量同步准备',
            desc: '文档：[Oracle Logminer 准备](../datasource_func/Oracle/prepare_for_oracle_logminer)'
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
            key: 'logminerUser',
            desc: '执行 Logminer SQL 的 Oracle 连接用户'
        },
        {
            key: 'logminerPasswd',
            desc: '执行 Logminer SQL 的 Oracle 连接密码'
        },
        {
            key: 'logminerConnectType',
            desc: '执行 Logminer SQL 的 Oracle 连接类型（PDB），包括 <b>ORACLE_SID</b>, <b>ORACLE_SERVICE</b> 两种可选'
        },
        {
            key: 'logminerSidOrService',
            desc: '执行 Logminer SQL 的 Oracle 连接串 SID 或服务名（PDB）'
        },
        {
            key: 'parseRedoSqlParallel',
            desc: '解析 Logminer 数据的并发度'
        },
        {
            key: 'parseRedoSqlBufferSize',
            desc: '解析 Logminer 数据的环形队列大小'
        },
        {
            key: 'redoFetchSize',
            desc: '单次获取 Logminer 分析数据条数'
        },
        {
            key: 'redoOfferTransMaxSize',
            desc: '未消费但已提交事务最大缓存数量'
        },
        {
            key: 'oraMiningSessionPauseSec',
            desc: '使用 Logminer 挖掘日志间隙停顿时间，单位为秒'
        },
        {
            key: 'maxEventCountPerTxInMem',
            desc: '内存中每个事务的最大事件数'
        },
        {
            key: 'logMiningScnStep',
            desc: 'Oracle Logminer 分析 redo log 时指定的分析范围大小'
        },
        {
            key: 'abandonUnCommitTxTimeoutSec',
            desc: '不带数据变更的事务未提交超过设置的值，则自动放弃该事务'
        },
        {
            key: 'restartTxWithDataTimeoutSec',
            desc: '带数据变更的事务未提交超过设置的值，则自动重启任务'
        },
        {
            key: 'oraUseOnlineDic',
            desc: '是否使用在线日志，false 使用离线日志对 Oracle 压力较大'
        },
        {
            key: 'oraReleaseIntervalSec',
            desc: '重建分析链接的间隔，以释放 Oracle 服务端资源'
        },
        {
            key: 'oraMiningSessionPauseSec',
            desc: '执行 Logminer 指令分析的间隔时间'
        },
        {
            key: 'fallBackScnStep',
            desc: '和 Redo log 最新数据保持的距离，0 表示紧跟'
        },
        {
            key: 'sqlCaseConversionEnabled',
            desc: '是否打开 DDL 大小写转换（根据当前数据库默认大小写规则）'
        },
    ],
    notice: [
        {
            key: '增量同步性能',
            desc: '因 Logminer 有性能上限，且 CloudCanal 未采用并行分析，所以以 3000 条变更/秒 为性能基准'
        },
        {
            key: '数据类型',
            desc: '不支持 <b>BLOB</b> 及衍生类型'
        }
    ],
    examples: [
        {
            key: 'Oracle 数据迁移同步优化与思考',
            desc: '文档：[Oracle 数据迁移同步优化与思考](https://www.clougence.com/blog/data_insights/the_way_of_oracle_cdc_optimize)'
        },
        {
            key: 'Oracle 数据迁移同步优化(三)',
            desc: '文档：[Oracle 数据迁移同步优化(三)](https://www.clougence.com/blog/data_insights/oracle_change_data_capture_optimize)'
        }
    ],
    master_function: [
        {
            key: '自动建字典',
            desc: '如果使用离线字典解析 Oracle Redo, 则在创建任务时自动创建字典'
        },
    ]
}