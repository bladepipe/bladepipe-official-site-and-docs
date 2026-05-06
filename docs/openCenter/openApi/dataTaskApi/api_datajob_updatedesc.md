---
id: api_datajob_updatedesc
title: Update Description
description: Update the description of the DataJob
---

## Interface Overview 

Update the description of the DataJob.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/updatedesc`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| jobID  | ID of the DataJob |   Body    |   True   |  Long |  
| dataJobDesc  | Description of the job |   Body    |   True   |  String |  

## Public Response Results

| ParameterName | Parameter Description  | Type(Java) |NotNull
| ------------ | -------------------|-------|----------- |
| code | 1: Success 0: Failed | string | True |
| data | | Object | False |
| msg | | string | False |
| requestId | | string | True |

## Response Example

```json
{
  "requestId": "d002b16e-2cb6-11ec-a410-956c64452d7e",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


