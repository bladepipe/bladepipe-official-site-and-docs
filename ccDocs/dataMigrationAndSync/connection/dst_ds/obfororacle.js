export const ObForOracle = {
    notice: [],
    prepare: [
        {
            key: '账号权限',
            desc: '具备 SELECT, INSERT, DELETE, UPDATE, 常见 DDL 权限'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 OceanBase 标准交互接口（如 2881）'
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
            key: 'writeStrategy',
            desc: '对端写入策略，包含 ' +
                '\n- <b>ROW (单条，默认选项)</b>' +
                '\n- <b>MULTI_SQL (多语句)</b>' +
                '\n- <b>BATCH (批量)</b>'
        }
    ],
    examples: [],
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
            key: '高并发行级写入',
            desc: '适配分布式数据库特征，默认采用高并发行级写入策略 (ROW)'
        },
        {
            key: '增量写入冲突策略',
            desc: '<b>IGNORE</b>: 遇到主键冲突则忽略（不做写入），<b>REPLACE</b>: 遇到主键冲突则整行替换'
        }
    ]
}
