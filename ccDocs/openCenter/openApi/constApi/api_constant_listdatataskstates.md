---
id: api_constant_listdatataskstates
title: 数据任务阶段
description: 接口描述：获取数据任务的各阶段常量
---

## 接口描述 

获取数据任务的各阶段常量

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/datataskstates`

## 请求方式

`POST`       

## 请求参数

无  

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为数组，数组元素参数说明如下

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| dataTaskState     |   任务的阶段   |    string   |   是    |

## 响应示例

```json
 {
  "requestId": "9181193f-2be3-11ec-b616-231d2f6b0021",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "dataTaskState": "CREATED"
    },
    {
      "dataTaskState": "INIT"
    },
    {
      "dataTaskState": "FULL"
    },
    {
      "dataTaskState": "INCRE"
    },
    {
      "dataTaskState": "CHECK"
    },
    {
      "dataTaskState": "REVISE"
    },
    {
      "dataTaskState": "COMPLETE"
    },
    {
      "dataTaskState": "TIMING_SCHEDULE"
    },
    {
      "dataTaskState": "TIMING_SCHEDULE_PAUSE"
    },
    {
      "dataTaskState": "CATCH_UP"
    }
  ]
}
```


