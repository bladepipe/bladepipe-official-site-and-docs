const SQLServer = {
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[SQL Server 需要的权限](../../datasource_func/SqlServer/privs_for_sqlserver)'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 SQL Server 标准交互接口（如 1433）'
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
            desc: '将 INSERT 和 UPDATE 操作变成对端的整行覆盖'
        },
        {
            key: 'enableTimeZoneProcess',
            desc: '是否对时间字段进行时区转换'
        },
        {
            key: 'timezone',
            desc: '目标端 SQL Server 时区，例如 +08:00 Asia/Shanghai America/New_York'
        },
        {
            key: 'defaultZeroDate',
            desc: '在遇到\'0000-00-00 00:00:00\' / \'0000-00-00\' 值时用于替换的默认值，可选参数有：' +
                '\n- <b>null (空值)</b>' +
                '\n- <b>时间 (14:23:33)</b>' +
                '\n- <b>日期 (1970-01-01)</b>' +
                '\n- <b>时间日期 (1970-01-01 00:00:00)</b>,' +
                '\n- <b>时区时间 (14:23:33+08:00 或 1970-01-01 00:00:00+08:00)</b>'
        },
        {
            key: 'caseSensitive',
            desc: '对端写入SQL语句表名大小写策略，包含 ' +
                '\n- <b>UpperCase (转大写)</b>' +
                '\n- <b>LowerCase (转小写)</b>' +
                '\n- <b>Sensitive (添加限定符)</b>' +
                '\n- <b>NoSpecified (不转换/不加限定符)</b>'
        },
        {
            key: 'writeStrategy',
            desc: '对端写入策略，包含 ' +
                '\n- <b>ROW (单条)</b>' +
                '\n- <b>MULTI_SQL (多语句)</b>' +
                '\n- <b>BATCH (批量，默认选项)</b></b>'
        }
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

export {
    SQLServer
}
