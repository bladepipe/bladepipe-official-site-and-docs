---
id: api_constant_valueformatstemplate
title: 值格式模板
description: 接口描述：获取值格式模板,以便创建任务时显示
---

## 接口描述 

获取值格式模板,以便创建任务时显示

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/schemalessvalueformattemplate`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| schemaLessValueFormat  |值格式列表, 可从 [缓存类型数据源值格式](api_constant_cachevalueformats.md) 或 [消息类型数据源值格式](api_constant_mqvalueformats.md) 接口获取并选择|   body    |   是   |string  |     

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 值为 json 字符串 ，主要用来做展示 ，其中 `${data}` 可替换成真实的 列和值 列表。

## 响应示例

```json
{
  "requestId": "b75bd041-2be7-11ec-b616-4fb795c60cd5",
  "code": "1",
  "msg": "request success",
  "data": "{\n    \"action\": \"INSERT/UPDATE/DELETE\",\n    \"bid\": 1,\n    \"before\": [],\n    \"data\": ${data},\n    \"db\": ${db},\n    \"schema\": ${schema},\n    \"table\":${table},\n    \"dbValType\": ${dbValType},\n    \"jdbcType\": ${jdbcType},\n    \"entryType\": \"ROWDATA\",\n    \"isDdl\": false,\n    \"pks\": ${pks},\n    \"execTs\": 0,/*sql execute in db timestamp*/\n    \"sendTs\": 0,/*msg sent timestamp*/\n    \"sql\": \"\"}"
}
```
