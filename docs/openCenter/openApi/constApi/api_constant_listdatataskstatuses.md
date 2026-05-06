---
id: api_constant_listdatataskstatuses
title: DataJob Status
description: Gets the task state constant for display
---

## Interface Overview 

Gets the task state constant for display

## Interface Address 

`/cloudcanal/console/api/v1/openapi/constant/datataskstatuses`

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

The data is an array, and array elements are data source types

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| i18nName       | Internationalized name | string | True     |
| dataTaskStatus | Task status            | string | True     |

## Response Example

```json
 {
  "requestId": "9181193f-2be3-11ec-b616-231d2f6b0021",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "i18nName": "init",
      "dataTaskStatus": "INIT"
    },
    {
      "i18nName": "Wait start",
      "dataTaskStatus": "WAIT_START"
    },
    {
      "i18nName": "running",
      "dataTaskStatus": "RUNNING"
    },
    {
      "i18nName": "wait_stop",
      "dataTaskStatus": "WAIT_STOP"
    },
    {
      "i18nName": "stop",
      "dataTaskStatus": "STOP"
    },
    {
      "i18nName": "wait_complete",
      "dataTaskStatus": "WAIT_COMPLETE"
    },
    {
      "i18nName": "complete",
      "dataTaskStatus": "COMPLETE"
    },
    {
      "i18nName": "abnormal",
      "dataTaskStatus": "ABNORMAL"
    },
    {
      "i18nName": "delete",
      "dataTaskStatus": "DELETE"
    },
    {
      "i18nName": "wait_restart",
      "dataTaskStatus": "WAIT_RESTART"
    }
  ]
}
```


