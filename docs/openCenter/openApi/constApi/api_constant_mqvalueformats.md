---
id: api_constant_mqvalueformats
title: MQ Format
description: Gets the message type data source value format to select when creating a task
---

## Interface Overview

Gets the message type data source value format to select when creating a task

## Interface Address 

`/cloudcanal/console/api/v1/openapi/constant/mqschemalessvalueformats`

## Request Manner

`POST`       

## Request Parameters

None

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure | string | True     |
| data       |             | Object | False    |
| msg        |             | string | False    |
| requestId  |             | string | True     |

## Data Parameters

The data is an array. The parameters of the array elements are described as follows:

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| i18nName   | Internationalized name | string | True     |
| format     | Message value type | string | True     |

## Response Example

```json
{
  "requestId": "1e920b2d-2be7-11ec-b616-050c3dbac1ca",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "i18nName": "CloudCanal Built-in format",
      "format": "CLOUDCANAL_JSON_FOR_MQ"
    },
    {
      "i18nName": "AlibabaCanal Compatible format",
      "format": "CANAL_JSON_FOR_MQ"
    }
  ]
}
```


