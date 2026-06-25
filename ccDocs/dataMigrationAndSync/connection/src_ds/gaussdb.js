export const GaussDB = {
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[GaussDB 需要的权限](../../datasource_func/GaussDB/privs_for_gaussdb)'
        },
        {
            key: '增量同步准备',
            desc: '准备动作按如下步骤进行: \n- 修改 gaussdb.conf，设置 <b>wal_level=logical </b> \n- 修改 gs_hba.conf，设置 <b>host  replication  同步账号  CIDR网段  sha256 </b> , <b>host  同步库  同步账号  CIDR网段  sha256</b>,<b> host  gaussdb  同步账号  CIDR网段  sha256 </b> \n- 重启 GaussDB'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 GaussDB 标准交互接口（如 8000）'
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
    ],
    notice: [
        {
            key: '数据类型',
            desc: '不支持 <b>BLOB</b> 及衍生类型'
        }
    ],
    examples: [],
    master_function: []
}