---
id: api_datajob_detachincretask
title: Detach DataTask
description: Remove the incremental task from the machine to free up resources, which is conditional on the task being stopped
---

## Interface Overview 

Remove the incremental task from the machine to free up resources, which is conditional on the task being stopped

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/detachincretask`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId         | Task ID     | Body     | True      | long | 

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code          | 1:Success, 0:Failure | string | True     |
| data          | Response data        | Object | False    |
| msg           | Error message (if any) | string | False    |
| requestId     | Request ID           | string | True     |

## Response Example

```json
{
  "requestId": "89a71b85-2cb7-11ec-a410-1100c6102ca7",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


