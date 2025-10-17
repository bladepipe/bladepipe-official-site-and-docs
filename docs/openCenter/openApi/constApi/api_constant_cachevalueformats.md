---
id: api_constant_cachevalueformats
title: Cache Format
description: Format for obtaining values of cache type data sources to select when creating a task.
---

## Interface Overview 

Format for obtaining values of cache type data sources to select when creating a task.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/constant/cacheschemalessvalueformats`

## Request Manner

`POST`

## Request Parameters

None

## Public Response Results 

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure  | String | True
| data       |             | Object | False
| msg        |             | String | False
| requestId  |             | String | True 

## Data Parameters 

The data is an array, and each set of data contains the following field descriptions:

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| i18nName   | Internationalized name  | String |True
| format     | Cache value type  | String | True

## Response Example

```json
{
  "requestId": "54c50364-2be7-11ec-b616-edfc8ee2ce63",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "i18nName": "JSON format for pure data.",
      "format": "VALUE_JSON_FOR_CACHE"
    },
    {
      "i18nName": "JSON format for pure data.(CamelCase Column Name)",
      "format": "VALUE_COL_CAMEL_CASE_JSON_FOR_CACHE"
    }
  ]
}
```


