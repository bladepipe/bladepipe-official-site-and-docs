export const PolarDbForMySQL = {
    notice: [
        {
            key: '字符集',
            desc: '支持 <b>utf8</b>, <b>utf8mb4</b>, <b>latin1</b>, 其他编码暂未测试'
        }
    ],
    prepare: [
        {
            key: '账号权限',
            desc: '云数据库 <b>读写</b> 权限账号或 <b>高权限</b> 账号'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 PolarDbMySQL 标准交互接口（如 3306）'
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
            key: 'mergeMaxInsertSize',
            desc: '当并行策略 mergeMaxInsertSize 为 <b>TABLE_IMPORT_OPTIMIZE</b> 时, 相同表单批最大合并变更数据条数(提升并行度)'
        }
    ],
    master_function: [
        {
            key: '增量写入冲突策略',
            desc: '<b>IGNORE</b>: 冲突则忽略（不做写入），<b>REPLACE</b>: 冲突则整行替换'
        },
        {
            key: '0 值时间处理',
            desc: '支持将 0 值时间设置成不同类型的值，防止写入对端报错'
        },
    ]
}