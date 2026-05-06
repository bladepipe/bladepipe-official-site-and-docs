---
id: api_datajob_attachincretask
title: Attach DataTask
description: To remount an incremental task to the machine so that it can run again, the api preconditions that the task is stopped and removed from the machine.
---

## Interface Overview

To remount an incremental task to the machine so that it can run again, the api preconditions that the task is stopped and removed from the machine.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/attachincretask`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId | Task ID | Body | True | long | 

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success, 0: failure | string | True |
| data | | Object | False |
| msg | | string | False |
| requestId | | string | True |

## Response Example

```json
{
  "requestId": "89a71b85-2cb7-11ec-a410-1100c6102ca7",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


