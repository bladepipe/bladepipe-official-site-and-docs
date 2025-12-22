export const ClickHouse = {
    notice: [
    ],
    prepare: [
        {
            key: '账号权限',
            desc: '具备 SELECT 权限'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 ClickHouse 标准交互接口（如 8123）'
        }
    ],
    params: [
        {
            key: 'enableSelectFinal',
            desc: '是否开启 ClickHouse 的 SELECT FINAL 功能，默认为 false'
        },
        {
            key: 'fullFetchSize',
            desc: '全量扫描数据设置的 fetch size，默认为 8192'
        },
    ],
    faq: []
}
