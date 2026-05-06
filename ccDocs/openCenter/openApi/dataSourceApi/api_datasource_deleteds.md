---
id: api_datasource_deleteds
title: 删除数据源
description: 接口描述：删除数据源，前置条件是没有一个数据任务依赖这个数据源，否则报错
---

## 接口描述 

删除数据源，前置条件是没有一个数据任务依赖这个数据源，否则报错

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datasource/deleteds`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| dataSourceId  |目标数据源id|   body    |   是   | long |    

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


