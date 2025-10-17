---
id: api_datajob_activefsm
title: 激活状态机
description: 接口描述：状态机控制任务流转，某些情况下任务不希望自动启动，创建任务时可以将 autoStart 置为 false ,则状态机不会流转该任务 ,当时机成熟时，需要启动自动任务流转，激活状态机即可
---

## 接口描述 

状态机控制任务流转，某些情况下任务不希望自动启动，创建任务时可以将 autoStart 置为 false ,则状态机不会流转该任务 ,当时机成熟时，需要启动自动任务流转，激活状态机即可

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/activefsm`

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
  "requestId": "c5665d7c-2cb7-11ec-a410-bfd57df2q1ea",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


