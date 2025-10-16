---
id: api_datajob_replay
title: 重跑数据任务
description: 接口描述：任务重跑
---

## 接口描述 

任务重跑

前提条件: 任务已暂停

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/replay`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId  |任务id|   body    |   是   |  long |  
| autoStart  |重跑操作后，是否自动启动，4.6.0.0 新增|   body    |   否   |  boolean |  
| resetToCreated  |是否重置到 CREATED 状态，用于主任务触发启动的子任务，4.6.0.0 新增|   body    |   否   |  boolean |  

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
  "requestId": "c861ba2d-4fd9-11ef-807c-ed0985012d22",
  "code": "1",
  "msg": "request success",
  "data": "success"
}
```


