const PostgreSQL = {
    prepare: [
        {
            key: '账号权限',
            desc: '具备 <b>SELECT</b>, <b>INSERT</b>, <b>DELETE</b>, <b>UPDATE</b> 常见 <b>DDL</b> 权限 <br /> 阿里云 AnalyticDB for PostgreSQL <b>初始账号</b>，或有 <b>SELECT</b>, <b>INSERT</b>, <b>DELETE</b>, <b>UPDATE</b>, <b>常见 DDL 权限</b>'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 PostgreSQL / Greenplum / AnalyticDB for PostgreSQL / PolarDB for PostgreSQL 标准交互接口（如 5432）'
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
            desc: '目标端时区，例如 +08:00, Asia/Shanghai, America/New_York'
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
                '\n- <b>BATCH (批量，默认选项)</b>' +
                '\n- <b>COPY (PostgreSQL COPY 指令)</b>'
        },
        {
            key: 'defaultGisSRID',
            desc: '设置 GIS 数据类型的 SRID'
        }
    ],
    notice: [
        {
            key: '主键冲突处理',
            desc: 'PostgreSQL <= 9.4 或 Greenplum <= 6, 因不支持冲突掠过或覆盖，当大量主键冲突场景下，性能较低'
        }
    ],
    master_function: [
        {
            key: '0 值时间处理',
            desc: '支持将 0 值时间设置成不同类型的值，防止写入对端报错'
        }
    ]
}

const Greenplum = PostgreSQL;
const AnalyticDbForPg = PostgreSQL;
const AuroraForPg = PostgreSQL;

export {
    PostgreSQL,
    Greenplum,
    AnalyticDbForPg,
    AuroraForPg
}