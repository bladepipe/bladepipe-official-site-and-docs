---
id: api_datasource_upsertdsconfig
title: Update Configuration
description: Batch update or insert task kv configuration based on data source id
---

## Interface Overview

Batch update or insert task kv configuration based on data source id

## Interface Address

`/cloudcanal/console/api/v1/openapi/datasource/upsertdsconfig`

## Request Manner

`POST`

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| dataSourceId | Data source ID | Body | True | Long |
| updateConfigs | Update configuration | Body | False | Map&lt;String, String&gt; |
| needCreateConfigs | Insert configuration | Body | False | Map&lt;String, String&gt; |

```json
{
  "dataSourceId": 52,
  "updateConfigs": {
    "pdHost": "192.168.0.195:3333"
    // more configs
  },
  "needCreateConfigs": {
    "test": ""
    // more configs
  }
}
```

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
  "requestId": "8aa8b0f9-dd95-11ed-a147-d7efab8bdcbb",
  "taskId": 0,
  "workerIdentity": null,
  "sendBackToTask": false,
  "code": "1",
  "msg": "request success",
  "data": null,
  "success": true,
  "fail": false,
  "rsocketDirectionType": null
}
```


