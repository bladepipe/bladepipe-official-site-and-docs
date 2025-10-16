---
id: api_consolejob_retrytask
title: 重试异步任务
description: 接口描述：重试某一个异步任务的某一步骤
---

## 接口描述 

重试某一个异步任务的某一步骤

## 接口地址 

`/cloudcanal/console/api/v1/openapi/consolejob/retrytask`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| consoleJobId  |异步任务id,通常从创建的任务中获得 |   body    |   是   | long  |    
| consoleTaskId  |异步任务步骤id,通过查询异步任务详情获得 |   body    |   是   | long  |     

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
  "requestId": "4f9f0b23-2b4a-11ec-8c7e-d98fc83f029e",
  "code": "1",
  "msg": "request success",
  "data": []
}
```


