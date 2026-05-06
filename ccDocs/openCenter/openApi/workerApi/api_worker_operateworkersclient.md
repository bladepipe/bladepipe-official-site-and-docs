---
id: api_worker_operateworkersclient
title: 操作机器
sidebar_position: 1
description: 接口描述：操作机器, 可以安装, 卸载, 升级, 启动客户端
---

## 接口描述 

操作机器, 可以安装, 卸载, 升级, 启动客户端

## 接口地址 

`/cloudcanal/console/api/v1/openapi/worker/operateworkersclient`

## 请求方式

`POST`       

## 请求参数

| 参数名称      | 参数说明      |     请求类型 | 是否必须 | 数据类型 |
|-----------|-----------|-----------|------|------|
| clusterId | 集群 id     |   body    | 是    | long |
| workers   | 需要操作机器的列表 |   body    | 是    | list |

## workers 参数说明

| 参数名称      | 参数说明    |     请求类型 | 是否必须 | 数据类型 |
|-----------|---------|-----------|------|------|
| workerId | 机器 id |   body    | 是    |long  |
| cloudOrIdcName |SELF_MAINTENANCE(自建) <br/>ALIBABA_CLOUD(阿里云) |   body    | 是    |string  |
| actionType | UNINSTALL(卸载)<br/>INSTALL(安装)<br/>START_CLIENT(启动)<br/>UPGRADE_ALL(升级) |   body    | 是    |string  |
| remoteUser | 机器远程用户名 |   body    | 否    |string  |
| remotePassword | 机器远程密码 |   body    | 否    |string  |   

## 公共响应结果

| 参数名称 | 参数说明 | 类型(java) |  不为空 |
| ---- | ------------------|-------|----------- |
| code |  1:成功 0:失败   |    string |   是    |
| data |      |    object |   否    |
| msg  |      |    string |   否    |
| requestId |      |    string |   是    |

## 响应示例

```json
{
  "requestId": "89a71b85-2cb7-11ec-a410-1100c6102ca7",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


