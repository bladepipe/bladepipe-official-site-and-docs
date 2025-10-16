---
id: api_consolejob_retrytask
title: Retry ConsoleJob
description: Deriving the asynchronous task step through re-attempting.
---

## Interface Overview 

Deriving the asynchronous task step through re-attempting.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/consolejob/retrytask`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| consoleJobId  |The asynchronous job identifier, usually obtained from the created task |   Body    |   True   | Long  |    
| consoleTaskId  |The asynchronous job step identifier, obtained through querying the asynchronous job details |   Body    |   True   | Long  |     

## Common Response Result

| ParameterName | Parameter Description     |    Type(Java) |  NotNull |
| ------------ | -------------------|-------|----------- |
| code     |  1: Success<br/>0: Failure    |    String   |   True    |
| data     |      |    Object   |   False    |
| msg      |      |    String   |   False    |
| requestId     |      |    String   |   False    |

## Response Example

```json
{
  "requestId": "4f9f0b23-2b4a-11ec-8c7e-d98fc83f029e",
  "code": "1",
  "msg": "request success",
  "data": []
}
```


