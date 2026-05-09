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
| dataSourceId | Data source ID | Body | True | long |

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success, 0: failure | string | True |
| data | | Object | False |
| msg | | string | False |
| requestId | | string | True |

## Data Parameter
Data is an array where each item is information for a kv configuration item. The field parameters are as follows. Note that

| ParameterName | Parameter Description |  NotNull |Type(Java)
| ------------ |-----------|--------|----|
| id | Configuration ID | True | long |
| configName | Configuration name | True | string |
| configGroup | Configuration group | True | string |
| description | Description information | True | string |
| valueRequire | Whether the value is required | True | boolean |
| valueValidRegex | Value verification format | False | string |
| configValue | Configuration value | False | string |
| defaultValue | Default value | False | string |
| valueAdvance | Recommended value | False | string |
| readOnly | Whether it is read-only | True | boolean |
| needCreated | Whether it needs to be created | True | boolean |
| secret | Whether it is encrypted | True | boolean |

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


