export const Hana = {
    notice: [
        {
            key: 'DDL 变化处理方案',
            desc: 'SAP HANA 源端通过触发器捕获增量数据，不支持 DDL 同步。若发生 DDL 变更，可参考文档：[SAP HANA 源端表结构变更](../../datasource_func/Hana/sap_hana_ddl)'
        },
        {
            key: 'HANA 增量同步数据类型',
            desc: 'HANA 增量阶段，触发器不支持捕获 **TEXT**、**BIN_TEXT**、**ST_POINT**、**ST_GEOMETRY** 类型的数据变更'
        },
    ],
    faq: [
        '[SAP HANA 测试链接报错](../../../faq/solve_hana_test_connection_fail)'
    ],
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[HANA 需要的权限](../../datasource_func/Hana/privs_for_hana)'
        },
    ],
    params: [
        {
            key: 'sysTriggerDataSchema',
            desc: '触发器写入增量表 SCHEMA 名称'
        },
        {
            key: 'sysTriggerDataTable',
            desc: '触发器写入增量表 TABLE 名称'
        },
        {
            key: 'incrPagingCount',
            desc: '触发器增量同步每次查询数据总量'
        },
        {
            key: 'incrIdleSleepSecond',
            desc: '触发器的增量同步空闲时查询间隔（单位：秒）'
        },
        {
            key: 'incrScanIntervalMs',
            desc: '设置基于触发器的增量同步数据查询间隔（单位：毫秒）'
        },
        {
            key: 'autoCheckTriggerAndReInstall',
            desc: '任务启动时检查触发器状态并重新安装'
        },
        {
            key: 'triggerDataCleanEnabled',
            desc: '是否开启定时清理触发器增量表数据'
        },
        {
            key: 'triggerDataCleanIntervalMin',
            desc: '设置触发器增量表的清理间隔（单位：分钟）'
        },
        {
            key: 'triggerDataRetentionMin',
            desc: '设置触发器增量表数据的保留时间（单位：分钟）'
        },
        {
            key: 'dbHeartbeatEnable',
            desc: '配置对源端数据库是否开启心跳'
        },
        {
            key: 'needTriggerDataJsonEscape',
            desc: '是否对触发器增量表数据加转义符（\\\\）'
        },
        {
            key: 'triggerDataJsonQuotation',
            desc: '自定义触发器增量表 JSON 数据引号'
        },
        {
            key: 'triggerParamBathSize',
            desc: '设置触发器模板中每个变量包含列的个数'
        },
        {
            key: 'fullBeforeImageEnabled',
            desc: '触发器是否记录所有列变更前的完整数据'
        },
    ],
    master_function: [
        {
            key: '基于 Trigger 增量同步',
            desc: '任务会自动创建表的触发器，触发器能捕获数据的 INSERT / UPDATE / DELETE 事件并写入增量 CDC 数据表'
        },
    ]
}
