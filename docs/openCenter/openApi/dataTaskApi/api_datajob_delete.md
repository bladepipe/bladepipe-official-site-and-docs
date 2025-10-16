---
id: api_datajob_delete
title: Delete DataJob
description: Delete data task
---

## Interface Overview

Delete data task

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datajob/delete`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId         | Task ID     | Body     | True     | Long |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code          | 1:Success, 0:Failure | String | True      |
| data          | Response data        | Object | False       |
| msg           | Error message (if any) | String | False       |
| requestId     | Request ID           | String | True      |

## Response Example

```json
{
  "requestId": "c5665d7c-2cb7-11ec-a410-bfd123b071ea",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


