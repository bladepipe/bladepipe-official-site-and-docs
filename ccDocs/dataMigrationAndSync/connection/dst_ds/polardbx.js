export const PolarDbX = {
    prepare: [
        {
            key: '账号权限',
            desc: '具备 SELECT, INSERT, DELETE, UPDATE, 常见 DDL 权限'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 PolarDB-X 标准交互接口（如 3306）'
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