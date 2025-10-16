export const GoogleDrive = {
    notice: [
        {
            key: '同步文件类型限制',
            desc: '暂时仅支持同步 <b>Google Doc</b>、<b>Google Sheet</b> 文件，其他文件类型暂不支持同步'
        },
        {
            key: 'Sheet 表格 NULL 数据同步限制',
            desc: 'Google Sheet API 会忽略<b>末尾为空的单元格</b>。因此末尾空单元格同步到对端为 null，中间的空单元格同步到对端为空字符串，空行会直接忽略'
        }
    ],
    prepare: [
        {
            key: '账号权限',
            desc: '文档：[Google Drive 需要的权限](../datasource_func/GoogleDrive/privs_for_googledrive)'
        },
        {
            key: '网络准备',
            desc: '迁移同步节点（sidecar）可连接 Google Drive API 接口'
        }
    ],
    params: [
        {
            key: "projectId",
            desc: "Google Cloud 项目 ID"
        },
        {
            key: "privateKeyId",
            desc: "Google Cloud 服务账号私钥 ID"
        },
        {
            key: "privateKey",
            desc: "Google Cloud 服务账号私钥"
        },
        {
            key: "clientEmail",
            desc: "Google Cloud 服务账号邮箱"
        },
        {
            key: "clientId",
            desc: "Google Cloud 服务账号 ID"
        },
        {
            key: 'maxLines',
            desc: '如果同步的是 Google Docs 文档，意为一条数据的最大行数；如果同步的是 Google Sheets 表格，意为一批数据包含的最大行数'
        },
        {
            key: 'maxChars',
            desc: '如果同步的是 Google Docs 文档，意为一条数据的最大字符数'
        },
        {
            key: 'skipRows',
            desc: '跳过 Google Sheet 文件的头 n 行数据，如果一个文件返回多个 Sheet，则每个 Sheet 都会跳过相同的行数'
        }
    ]
}
