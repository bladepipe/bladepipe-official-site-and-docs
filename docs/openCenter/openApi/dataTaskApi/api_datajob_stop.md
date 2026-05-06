---
id: api_datajob_stop
title: Stop DataJob
description: Suspend task
---

## Interface Overview

Suspend task

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datajob/stop`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| JobID | ID of the job | Body | True | long |

## Public Response Results

| ParameterName | Parameter Description  | Type(Java) |NotNull
| ------------ | -------------------|-------|----------- |
| Code | 1: Success 0: Failed | string | True |
| Data | | Object | False |
| Msg | | string | False |
| RequestID | | string | True |

## Response Example

```json
{
  "requestId": "347a4c3a-2cb7-11ec-a410-bdebd47bd4be",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


