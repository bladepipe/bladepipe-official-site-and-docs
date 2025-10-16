---
id: api_constant_valueformatstemplate
title: Value Format
description: Gets a value format template to display when creating a task
---

## Interface Overview 

Gets a value format template to display when creating a task

## Interface Address

`/cloudcanal/console/api/v1/openapi/constant/schemalessvalueformattemplate`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| schemaLessValueFormat | List of value formats, obtained and selected from [Cache data source value formats](api_constant_cachevalueformats.md) or [Message queue data source value formats](api_constant_mqvalueformats.md) | Body   | True     | String |  

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure | String | True     |
| data       |             | Object | False    |
| msg        |             | String | False    |
| requestId  |             | String | True     |

## Data Parameters

The data value is a json string used primarily for presentation, where `${data}` can be replaced with a real list of columns and values.

## Response Example

```json
{
  "requestId": "b75bd041-2be7-11ec-b616-4fb795c60cd5",
  "code": "1",
  "msg": "request success",
  "data": "{\n    \"action\": \"INSERT/UPDATE/DELETE\",\n    \"bid\": 1,\n    \"before\": [],\n    \"data\": ${data},\n    \"db\": ${db},\n    \"schema\": ${schema},\n    \"table\":${table},\n    \"dbValType\": ${dbValType},\n    \"jdbcType\": ${jdbcType},\n    \"entryType\": \"ROWDATA\",\n    \"isDdl\": false,\n    \"pks\": ${pks},\n    \"execTs\": 0,/*sql execute in db timestamp*/\n    \"sendTs\": 0,/*msg sent timestamp*/\n    \"sql\": \"\"}"
}
```
