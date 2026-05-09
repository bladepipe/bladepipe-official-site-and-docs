---
id: api_datajob_updatelevel
title: 更新任务级别
description: 接口描述：更新数据迁移同步任务的级别，方便识别和管理
---

## 接口描述 

更新数据迁移同步任务的级别，方便识别和管理

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/updatelevel`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId  |任务id|   body    |   是   |  long |  
| jobLevel  |任务级别，可选值 P0/P1/P2/P3/P4|   body    |   是   |  string |    

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
  "requestId": "d002b16e-2cb6-11ec-a410-956c64452d7e",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


