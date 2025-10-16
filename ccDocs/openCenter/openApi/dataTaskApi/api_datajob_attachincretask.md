---
id: api_datajob_attachincretask
title: 挂载任务
description: 接口描述：将增量任务重新挂载到机器，以便重新运行，该 api 前置条件为任务为停止状态且已经从机器上摘除。
---

## 接口描述 

将增量任务重新挂载到机器，以便重新运行，该 api 前置条件为任务为停止状态且已经从机器上摘除。

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/attachincretask`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId  |任务id|   body    |   是   |  long |  

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## 响应示例

```json
{
  "requestId": "89a71b85-2cb7-11ec-a410-1100c6102ca7",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


