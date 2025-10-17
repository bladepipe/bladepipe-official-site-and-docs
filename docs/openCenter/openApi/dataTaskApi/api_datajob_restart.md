---
id: api_datajob_restart
title: Restart DataJob
description: Restart DataJob when running
---

## Interface Overview

Restart DataJob when running.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datajob/restart`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId         | ID of the DataJob |Body| True     | Long   | 

## Public Response Results

| ParameterName | Parameter Description   |NotNull |Type(Java)
| ------------ | -------------------|-------|----------- |
| code          | 1: Success, 0: Failure | True              | String |
| data          | Response data.                             | False    | Object |
| msg           | Response message.                          | False    | String |
| requestId     | ID of the request.                         | True     | String |

## Response Example

```json
{
  "requestId": "c5665d7c-2cb7-11ec-a410-bfd574b071ea",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


