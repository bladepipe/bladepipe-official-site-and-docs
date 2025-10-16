---
id: api_datasource_querydsconfig
title: Query DataSource Configuration
description: Query the kv configuration list based on the data source id
---

## Interface Overview

Query the kv configuration list based on the data source id

## Interface Address

`/cloudcanal/console/api/v1/openapi/datasource/querydsconfig`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| dataSourceId | Data source ID | Body | True | Long |

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success, 0: failure | String | True |
| data | | Object | False |
| msg | | String | False |
| requestId | | String | True |

## Data Parameter
Data is an array where each item is information for a kv configuration item. The field parameters are as follows. Note that

| ParameterName | Parameter Description |  NotNull |Type(Java)
| ------------ |-----------|--------|----|
| id | Configuration ID | True | Long |
| configName | Configuration name | True | String |
| configGroup | Configuration group | True | String |
| description | Description information | True | String |
| valueRequire | Whether the value is required | True | Boolean |
| valueValidRegex | Value verification format | False | String |
| configValue | Configuration value | False | String |
| defaultValue | Default value | False | String |
| valueAdvance | Recommended value | False | String |
| readOnly | Whether it is read-only | True | Boolean |
| needCreated | Whether it needs to be created | True | Boolean |
| secret | Whether it is encrypted | True | Boolean |

## Response Example

```json
{
  "requestId": "d007d7d8-dd8f-11ed-a147-4b7671be16cb",
  "taskId": 0,
  "workerIdentity": null,
  "sendBackToTask": false,
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "id": 21,
      "configName": "pdHost",
      "configGroup": "GENERAL",
      "description": "DS_CONFIG_TIDB_PD_HOST",
      "valueRequire": true,
      "valueValidRegex": "",
      "configValue": "192.168.0.195:2379",
      "defaultValue": "",
      "valueAdvance": "",
      "readOnly": false,
      "needCreated": false,
      "secret": false
    },
    {
      ...
    }
  ],
  "success": true,
  "fail": false,
  "rsocketDirectionType": null
}
```


