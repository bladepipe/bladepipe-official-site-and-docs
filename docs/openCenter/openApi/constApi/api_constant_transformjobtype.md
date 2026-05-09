---
id: api_constant_transformjobtype
title: DataJob Features
description: Get the ability to support each type of task to create task selections
---

## Interface Overview

Get the ability to support each type of task to create task selections.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/constant/transformjobtype`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| sourceType     | Data source type of the source endpoint, obtained from [Retrieve the data source type of the source endpoint](api_constant_srcdstype.md) | Body   | True     | string |
| targetType     | Data source type of the target endpoint, obtained from [Retrieve the data source type of the target endpoint](api_constant_dstdstype.md) | Body   | True     | string |   

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure | string | True     |
| data       |                | Object | False    |
| msg        |                | string | False    |
| requestId  |                | string | True     |

## Data Parameters

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| source     | Source data source type | string | True     |
| target     | Target data source type | string | False    |
| optionType | Capability model constructed from multiple DataJobTypes | string | False    |

Capability Description Parameter Description

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| Incremental   | Incremental synchronization        | string | True     |
| FullAmount    | Full data migration                | string | True     |
| defaultCheck  | Whether this DataJobType is selected by default | string | False    |

## Response Example

```json
{
  "requestId": "1ee03cdf-2be5-11ec-b616-7bf5855db86d",
  "code": "1",
  "msg": "request success",
  "data": {
    "source": "MySQL",
    "target": "PostgreSQL",
    "optionType": {
      "STRUCT_MIGRATION": {},
      "SYNC": {
        "Incremental": "true",
        "FullAmount": "true",
        "defaultCheck": "true"
      },
      "MIGRATION": {
        "Incremental": "true",
        "FullAmount": "true"
      },
      "CHECK": {
        "Incremental": "true",
        "FullAmount": "true"
      }
    }
  }
}
```


