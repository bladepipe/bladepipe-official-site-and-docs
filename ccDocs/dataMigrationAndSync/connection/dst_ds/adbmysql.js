export const AnalyticDbForMySQL = {
    prepare: [
        {
            key: '账号权限',
            desc: '云数据库高权限账号，或具备 <b>SELECT</b>, <b>INSERT</b>, <b>DELETE</b>, <b>UPDATE</b>, <b>常见 DDL 权限</b>的普通账号'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 AnalyticDB for MySQL 标准交互接口（如 3306）'
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