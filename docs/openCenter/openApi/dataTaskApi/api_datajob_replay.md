---
id: api_datajob_replay
title: Replay DataJob
description: Replay the DataJob from beginning (except schema migration).
---

## Interface Overview

Replay the DataJob from beginning (except schema migration).

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/replay`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId  |ID of the DataJob|   Body    |   True   |  Long |  
| autoStart  |Whether start automatically after this operation|   Body    |   False   |  Boolean |  
| resetToCreated  |Whether reset DataJob phase to CREATED after this operation,only use in child DataJob which is triggered by Parent DataJob|   Body    |   False   |  Boolean |  

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
  "requestId": "c861ba2d-4fd9-11ef-807c-ed0985012d22",
  "code": "1",
  "msg": "request success",
  "data": "success"
}
```


