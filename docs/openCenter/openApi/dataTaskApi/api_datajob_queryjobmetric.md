---
id: api_datajob_queryjobmetric
title: Query DataJob Metrics
description: Query monitoring metric data of a task by task ID
---

## Interface Overview

Query monitoring metric data of a task by task ID, including task health status, current task type, delay, progress, and other information.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/queryjobmetric`

## Request Manner

`POST`

## Request Parameters

| ParameterName | Parameter Description | RequestType | Whether Required | DataType |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId | DataJob ID | body | True | long |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: Success, 0: Failure | string | True |
| data | | object | False |
| msg | | string | False |
| requestId | | string | True |

## Data Parameter Description

Returns the monitoring metric information of the task.

| ParameterName | Parameter Description | NotNull | Type(Java) |
| ------------ |---|--------|----|
| isHealthy | Whether the task is healthy | True | boolean |
| curTaskType | Currently running task type. Options: FULL, INCREMENT, CHECK, REVISE | False | string |
| increDelayMs | Incremental sync delay (milliseconds) | False | long |
| fullAvgProgress | Average full migration progress (0-100) | False | decimal |
| checkedPercent | Verification completion percentage (0-100) | False | decimal |
| ccDataTaskStatus | Task running status. Options: RUNNING, STOP, COMPLETE, etc. | False | string |

## Response Example

```json
{
  "code": "1",
  "msg": "request success",
  "data": {
    "curTaskType": "INCREMENT",
    "increDelayMs": 496245537,
    "fullAvgProgress": null,
    "checkedPercent": null,
    "ccDataTaskStatus": "STOP",
    "healthy": false
  },
  "requestId": "f428d850-ce6d-11f0-8388-f3c768d5e432"
}
```
