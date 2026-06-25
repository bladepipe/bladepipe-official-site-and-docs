const MySQL = {
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[MySQL / MariaDB 需要的权限](../../datasource_func/MySQL/privs_for_mysql)'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 MySQL / MariaDB 标准交互接口（如 3306）'
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
            key: 'deCycle',
            desc: '双向同步过滤开关，过滤特定标记的 DML/DDL'
        },
        {
            key: 'specialSqlMode',
            desc: '初始化数据库连接时，可以设置特定的 SQL Mode'
        },
        {
            key: 'defaultGisSRID',
            desc: '设置 GIS 数据类型的 SRID'
        },
        {
            key: 'dstTimeZone',
            desc: '目标端时区，例如 +08:00, Asia/Shanghai, America/New_York等'
        },
        {
            key: 'increParallelApplyStrategy',
            desc: '关系型数据库对端写入数据并行策略：' +
                '<ul>' +
                '  <li><b>KEY</b>: 以主键进行分区并行写入<br></li>' +
                '  <li><b>TABLE</b>: 以表进行分区并行写入<br></li>' +
                '  <li><b>KEY_UPGRADE_TABLE</b>: 以主键进行分区并行写入，若有更新唯一键的操作升级为表进行分区写入<br></li>' +
                '</ul>'
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

const MariaDB = MySQL;
const AuroraForMySQL = MySQL

export {
    MySQL,
    MariaDB,
    AuroraForMySQL
}