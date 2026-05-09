---
id: api_datasource_updateprivatehost
title: Modify Private Network
description: Example Change the Intranet address of the datasource
---

## Interface Overview 

Example Change the Intranet address of the datasource

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datasource/updateprivatehost`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ |----------|-----------|--------|----|
| dataSourceId | Target data source ID | Body | True | long |
| privateHost | Modified intranet address | Body | True | string |

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success, 0: failure | string | True |
| data | | Object | False |
| msg | | string | False |
| requestId | | string | True |

## Response Example

```json
{
  "requestId": "4f9f0b23-2b4a-11ec-8c7e-d98fc83f029e",
  "code": "1",
  "msg": "request success",
  "data": []
}
```


