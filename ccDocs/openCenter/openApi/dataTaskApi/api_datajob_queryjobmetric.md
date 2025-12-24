---
id: api_datajob_queryjobmetric
title: 查询任务指标
description: 接口描述：根据任务id查询任务的监控指标数据
---

## 接口描述 

根据任务id查询任务的监控指标数据，包括任务健康状态、当前任务类型、延迟、进度等信息。

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/queryjobmetric`

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

## data 参数说明

返回任务的监控指标信息

| 参数名称         | 参数说明                                                      |  不为空     |  数据类型   |
| ------------ |-----------------------------------------------------------|--------|----|
| isHealthy  | 任务是否健康                                                    |   是   |  boolean |  
| curTaskType  | 当前运行的任务类型，可选值：FULL（全量）、INCREMENT（增量）、CHECK（校验）、REVISE（订正） |   否   |  string |   
| increDelayMs  | 增量同步延迟(毫秒)                                                |   否   |  long |   
| fullAvgProgress  | 全量平均进度(0-100)                                             |   否   |  decimal |   
| checkedPercent  | 校验完成百分比(0-100)                                            |   否   |  decimal |   
| ccDataTaskStatus  | 任务运行状态，可选值：RUNNING（运行）、STOP（停止）、COMPLETE（完成）等             |   否   |  string |   

## 响应示例

```json
{
  "code": "1",
  "msg": "request success",
  "data":
  {
    "curTaskType": "INCREMENT",
    "increDelayMs": 496245537,
    "fullAvgProgress": null,
    "checkedPercent": null,
    "ccDataTaskStatus": "STOP",
    "healthy": false
  },
  "requestId": "f428d850-ce6d-11f0-8388-f3c768d5e432",
  "fail": false,
  "success": true
}
```
