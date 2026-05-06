---
id: api_datajob_activefsm
title: Active FSM
description: The state machine controls task flow. In some cases, the task does not want to be automatically started. When creating a task, you can set autoStart to false, so the state machine will not flow the task.
---

## Interface Overview

The state machine controls task flow. In some cases, the task does not want to be automatically started. When creating a task, you can set autoStart to false, so the state machine will not flow the task.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datajob/activefsm`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId | Task ID | Body | True | long |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1:Success, 0:Failure | string | True |
| data | | Object | False |
| msg | | string | False |
| requestId | | string | True |

## Response Example

```json
{
  "requestId": "c5665d7c-2cb7-11ec-a410-bfd57df2q1ea",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


