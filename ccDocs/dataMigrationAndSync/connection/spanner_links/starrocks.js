export const StarRocks = {
    main_function: [
        {
            key: '结构迁移',
            desc: '如果对端 Schema 不存在，自动从源端获取元数据并由 CloudCanal 负责生成 CREATE 语句生成对端 Schema'
        },
        {
            key: '增量同步',
            desc: '支持获取源量产生的 <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> 操作并实时写入对端集群'
        },
        {
            key: '数据校验和订正',
            desc: '一次性扫描并对比源端与对端的现有数据，可选择根据校验结果自动将不一致的数据覆盖成源端的最新状态。支持周期性定时任务。具体详情见 [创建定时校验和订正任务](../../operation/job_manage/create_job/create_period_verification_correction_job)。'
        },
        {
            key: '修改订阅',
            desc: '在链路正常运转期间支持新增、删除表，并自动触发新表的结构全量迁移，具体详情见 [修改订阅情况](../../operation/job_manage/job_op/edit_job)。'
        },
        {
            key: '映射和过滤',
            desc: '支持自动的表名映射规则：<b>保持原名</b>、<b>全转化为小写</b>、<b>全转化为大写</b>、<b>截取 "_数字" 后缀</b>等。'
        },
        {
            key: '元数据检索',
            desc: '从源端表查对端，查询设置过过滤条件的，查询设置过对端主键的'
        },
        {
            key: '重置位点',
            desc: '支持按照时间戳回溯位点，通过 Change Streams 重新消费指定时间点之后的增量数据'
        }
    ],
    master_function: [
        {
            key: '自定义目标表属性',
            desc: '指定诸如分桶数（bucket count）或者副本数（replica count）等属性。'
        },
        {
            key: '分区表同步',
            desc: '创建任务时可静态或动态指定表级别的分区规则定义，创建结构全量任务会自动应用该分区定义'
        },
        {
            key: '定时全量迁移任务',
            desc: '具体详情见 [创建定时全量迁移任务](../../operation/job_manage/create_job/create_period_full_job)。'
        },
        {
            key: '自定义开发代码',
            desc: '使用 Java 编写业务处理逻辑并在此应用，过滤特定数据或打宽表。具体详情见 [自定义代码处理](../../operation/job_manage/create_job/create_process_job)，[调试自定义代码](../../operation/job_manage/job_op/debug_customer_code) 以及 [在自定义代码增加日志](../../operation/job_manage/job_op/log_in_customer_code)。'
        },
        {
            key: '增加虚拟列',
            desc: '指定某列或为对端新建某列为虚拟列，可自定义一个固定值应用于目标数据表中（常用于地域标识）。'
        },
        {
            key: '指定对端主键',
            desc: '支持转换为主键便于对端数据聚合或其他业务形式操作。'
        },
        {
            key: '数据源端过滤条件',
            desc: '支持使用原生的 SQL WHERE 条件过滤特定的不需要同步的数据。具体详情见 [数据过滤条件](../../operation/job_manage/create_job/create_data_filter_job)。'
        }
    ],
    notice: [],
    examples: [],
    faq: []
}
