---
id: api_constant_dsdeploytypes
title: DataSource Deployment
description: Obtain the data source deployment method for selection when creating a task.
---

## Interface Overview

Obtain the data source deployment method for selection when creating a task.

## Interface Address

`/cloudcanal/console/api/v1/openapi/constant/datasourcedeploytypes`

## Request Manner

`POST`       

## Request Parameters

None

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure  | string |True
| data       |             | Object |False
| msg        |             | string |False
| requestId  |             | string |True

## Data Parameters

The data is an array, and the parameter descriptions for its elements are as follows:

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| i18nName   | Internationalized Name  | string |True
| envType    | Deployment Type | string |True

## Response Example

```json
{
  "requestId": "b2c637e0-2be6-11ec-b616-87a20804d669",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "i18nName": "Self built",
      "envType": "SELF_MAINTENANCE"
    },
    {
      "i18nName": "ALIBABA CLOUD",
      "envType": "ALIBABA_CLOUD_HOSTED"
    }
  ]
}
```


