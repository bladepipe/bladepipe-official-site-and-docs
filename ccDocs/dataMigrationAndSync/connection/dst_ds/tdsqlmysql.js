export const TdsqlMySQL = {
    prepare: [
        {
            key: '账号权限',
            desc: '具备 SELECT, INSERT, DELETE, UPDATE, 常见 DDL 权限'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 TDSQL MySQL 标准交互接口（如 3306）'
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
            key: 'mergeMaxInsertSize',
            desc: '当并行策略 mergeMaxInsertSize 为 <b>TABLE_IMPORT_OPTIMIZE</b> 时, 相同表单批最大合并变更数据条数(提升并行度)'
        }
    ],
    master_function: [
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
