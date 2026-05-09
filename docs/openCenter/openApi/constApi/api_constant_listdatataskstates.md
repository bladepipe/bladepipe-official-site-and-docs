---
id: api_constant_listdatataskstates
title: DataJob Phase
description: Gets the phase constant of DataJob.
---

## Interface Overview

Gets the phase constant of DataJob.

## Interface Address

`/cloudcanal/console/api/v1/openapi/constant/datataskstates`

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

Data is an array. The parameters of the array elements are described as follows：

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| dataTaskState     |   The phase of DataJob   |    string   |   True    |

## Response Example

```json
 {
  "requestId": "9181193f-2be3-11ec-b616-231d2f6b0021",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "dataTaskState": "CREATED"
    },
    {
      "dataTaskState": "INIT"
    },
    {
      "dataTaskState": "FULL"
    },
    {
      "dataTaskState": "INCRE"
    },
    {
      "dataTaskState": "CHECK"
    },
    {
      "dataTaskState": "REVISE"
    },
    {
      "dataTaskState": "COMPLETE"
    },
    {
      "dataTaskState": "TIMING_SCHEDULE"
    },
    {
      "dataTaskState": "TIMING_SCHEDULE_PAUSE"
    },
    {
      "dataTaskState": "CATCH_UP"
    }
  ]
}
```


