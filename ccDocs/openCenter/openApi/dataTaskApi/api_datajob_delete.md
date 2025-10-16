---
id: api_datajob_delete
title: 删除数据任务
description: 接口描述：删除数据任务。
---

## 接口描述 

删除数据任务

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/delete`

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
  "requestId": "c5665d7c-2cb7-11ec-a410-bfd123b071ea",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


