export const Dameng = {
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[ORACLE 需要的权限](../database/privs_for_dameng)'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 Dameng 标准交互接口（如 5432）'
        }
    ],
    params: [
        {
            key: 'keyConflictStrategy',
            desc: '增量写入遇到主键冲突策略:' +
                '<ul>' +
                '  <li><b>IGNORE</b> 冲突忽略（默认）</li>' +
                '  <li><b>REPLACE</b> 冲突替换（可选）</li>' +
                '</ul>'
        },
        {
            key: 'dstWholeReplace',
            desc: '将 INSERT 和 UPDATE 操作变成对端整行覆盖'
        },
        {
            key: 'writeStrategy',
            desc: '对端写入策略，包含 ' +
                '\n- <b>ROW (单条)</b>' +
                '\n- <b>MULTI_SQL (多语句)</b>' +
                '\n- <b>BATCH (批量，默认选项)</b>'
        },
    ],
    master_function: [
        {
            key: '全量前清空目标数据',
            desc: '运行全量任务前清除老数据，包括重跑任务、定时全量迁移都会触发此能力'
        },
        {
            key: '重建目标表',
            desc: '运行全量任务前重建目标表，包括重跑任务、定时全量迁移都会触发此能力'
        },
        {
            key: '增量写入冲突策略',
            desc: '<b>IGNORE</b>: 主键冲突则忽略（不做写入），<b>REPLACE</b>: 主键冲突则整行替换'
        },
        {
            key: '0 值时间处理',
            desc: '支持将 0 值时间设置成不同类型的值，防止写入对端报错'
        },
    ]
}