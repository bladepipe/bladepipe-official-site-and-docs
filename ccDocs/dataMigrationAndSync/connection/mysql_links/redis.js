export const Redis = {
    main_function: [
        {
            key: '全量数据迁移',
            desc: '逻辑迁移，通过顺序扫描表数据，将数据分批写入到对端数据库，数据格式默认 JSON'
        },
        {
            key: '增量实时同步',
            desc: '支持 <b>INSERT</b>, <b>UPDATE</b>, <b>DELETE</b> 常见 DML 同步'
        },
        {
            key: '数据校验和订正',
            desc: '全量数据校验，并可选根据校验结果订正差异数据，支持定时，文档：[创建定时校验订正任务](../../../operation/job_manage/create_job/create_verification_correction_job) <br /> <b>无主键表不支持</b>'
        },
        {
            key: '修改订阅',
            desc: '新增、删除、修改订阅表，支持历史数据迁移，文档：[修改订阅](../../../operation/job_manage/job_op/edit_job)'
        },
        {
            key: '重置位点',
            desc: '支持按照文件位点、时间戳 回溯位点，重新消费过去一段时间或指定 Binlog 文件和位点开始的增量日志'
        },
    ],
    master_function: [
        {
            key: '拼接式 KEY',
            desc: '按冒号拼接源端 <b>库</b>, <b>表</b>, <b>主键值</b> 形成对端缓存 KEY'
        },
        {
            key: 'JSON 数据格式',
            desc: '将源端结构化数据序列化成 JSON 格式，字段名支持转换成 <b>和源端保持一致</b>，<b>全小写</b>，<b>全大写</b>，<b>驼峰</b>'
        },
    ],
    notice: [],
    examples: [
        {
            key: 'MySQL 到 Redis 数据迁移同步',
            desc: '文档：[MySQL 到 Redis 数据迁移同步](../../../bestPractice/mysql_redis_sync)'
        }
    ],
    faq: [],
    mapping: []
}
