---
id: api_datajob_updatelevel
title: Update Level
description: Update the level of the DataJob for risk management.
---

## Interface Overview

Update the level of the DataJob for risk management.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/updatelevel`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId  |ID of the DataJob|   Body    |   True   |  Long |  
| jobLevel  |Level of the DataJob,optional values are:P0/P1/P2/P3/P4|  Body    |   True   |  String |    

## Public Response Results

| ParameterName | Parameter Description  | Type(Java) |NotNull
| ------------ | -------------------|-------|----------- |
| code | 1: Success 0: Failed | String | True |
| data | | Object | False |
| msg | | String | False |
| requestId | | String | True |

## Response Example

```json
{
  "requestId": "d002b16e-2cb6-11ec-a410-956c64452d7e",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


