---
id: api_datasource_updatedatasourcedesc
title: Update Description
description: Modifying data source description
---

## Interface Overview

Modifying data source description

## Interface Address

`/cloudcanal/console/api/v1/openapi/datasource/updatedatasourcedesc`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ |-----------|-----------|--------|----|
| dataSourceId | Target data source ID | Body | True | Long |
| instanceDesc | Modified data source description | Body | True | Long | 

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success, 0: failure | String | True |
| data | | Object | False |
| msg | | String | False |
| requestId | | String | True |

## Response Example

```json
{
  "requestId": "4f9f0b23-2b4a-11ec-8c7e-d98fc83f029e",
  "code": "1",
  "msg": "request success",
  "data": []
}
```


