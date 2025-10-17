---
id: api_datajob_start
title: Start DataJob
description: Start task
---

## Interface Overview 

Start task

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/start`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| jobID | ID of the job | Body | True | Long |

## Public Response Results

| ParameterName | Parameter Description  | Type(Java) |NotNull
| ------------ | -------------------|-------|----------- |
| code | 1: Success 0: Failed | String | True |
| data | | Object | False |
| msg | | String | False |
| requestId | | String | True |

## Response Example

```json
{
  "requestId": "89a71b85-2cb7-11ec-a410-1100c6102ca7",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


