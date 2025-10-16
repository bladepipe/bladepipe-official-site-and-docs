---
id: api_constant_listdatajobtype
title: DataJob Type
description: Gets the Data Job type for selection
---

## Interface Overview

Gets the Data Job type for selection

## Interface Address 

`/cloudcanal/console/api/v1/openapi/constant/datajobtype`

## Request Manner

`POST`       

## Request Parameters

None  

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure | String | True |
| data       |             | Object | False |
| msg        |             | String | False |
| requestId  |             | String | True |

## Data Parameters

Data is an array. The parameters of the array elements are described as follows：

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| i18nName       | Internationalized name | String      | True     |
| dataJobType    | Migration task type    | String      | True     |

## Response Example

```json
{
  "requestId": "344d1524-2be3-11ec-b616-77daa87773f6",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "i18nName": "Schema Migration",
      "dataJobType": "MIGRATION"
    },
    {
      "i18nName": "Incremental",
      "dataJobType": "SYNC"
    },
    {
      "i18nName": "Verification",
      "dataJobType": "CHECK"
    },
    {
      "i18nName": "Correction",
      "dataJobType": "REVISE"
    },
    {
      "i18nName": "Schema Migration",
      "dataJobType": "STRUCT_MIGRATION"
    }
  ]
}
```


