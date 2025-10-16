const PostgreSQL = {
    notice: [],
    prepare: [
        {
            key: '账号权限',
            desc: '需要权限如下(以自建数据库为例): \n- <b>GRANT ALL PRIVILEGES ON DATABASE 同步库 TO 同步账号</b>（或同步库 information_schema 中所有视图的 SELECT 权限和需要同步表、索引、约束的 SELECT 权限) \n- <b>ALTER USER 同步账号 REPLICATION</b>'
        },
        {
            key: '增量同步准备',
            desc: '准备动作按如下步骤进行: \n- 修改 postgresql.conf, 设置 <b>wal_level=logical 和 wal_log_hints = on</b> \n- 修改 pg_hba.conf, 设置 <b>host  replication  同步账号  CIDR网段  md5 </b> , <b>host  同步库  同步账号  CIDR网段  md5</b>,<b> host  postgres  同步账号  CIDR网段  md5 </b> \n- 重启 PostgreSQL'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 PostgreSQL 标准交互接口（如 5432）'
        }
    ],
    params: [
        {
            key: 'fullFetchSize',
            desc: '全量扫描数据设置的 fetch size'
        },
        {
            key: 'eventStoreSize',
            desc: '缓存解析完毕的增量事件缓存大小'
        },
        {
            key: 'ignoreGisSRID',
            desc: '解析 GIS 数据类型时是否忽略 SRID'
        },
        {
            key: 'defaultGisSRID',
            desc: '设置 GIS 数据类型的 SRID'
        }
    ]
}

const AuroraForPg = PostgreSQL
const AnalyticDbForPg = PostgreSQL;
const Greenplum = PostgreSQL;

export {
    PostgreSQL,
    AuroraForPg,
    Greenplum,
    AnalyticDbForPg,
}