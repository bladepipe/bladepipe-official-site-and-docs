---
id: api_constant_cktableengines
title: ClickHouse TableEngine
description: Obtain the task status constants for display.
---

## Interface Overview

Obtain the task status constants for display.

## Interface Address

`/cloudcanal/console/api/v1/openapi/constant/cktableengine`

## Request Manner

`POST`       

## Request Parameters

None

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure  | String |True
| data       |             | Object |False
| msg        |             | String |False
| requestId  |             | String |True

## Data Parameters

The data is an array, and each set of data contains the following field descriptions:

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| ckTableEngine | ClickHouse table engine       | String  |True 
| defaultCheck  | Whether to select this option | Boolean |True

## Response Example

```json
{
  "requestId": "5dbc52e1-2be9-11ec-b616-7b75d91a340d",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "ckTableEngine": "CollapsingMergeTree",
      "defaultCheck": false
    },
    {
      "ckTableEngine": "ReplacingMergeTree",
      "defaultCheck": true
    }
  ]
}
```


