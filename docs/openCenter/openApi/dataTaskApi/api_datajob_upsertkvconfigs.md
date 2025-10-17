---
id: api_datajob_upsertkvconfigs 
title: Update Configuration
description: Batch update or insert task kv configuration based on task id
---

## Interface Overview

Batch update or insert task kv configuration based on task id

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/upsertkvconfigs`

## Request Manner

`POST`

## Request Parameters

The argument is an array, as shown in the following example

```json
[
	{
		"configName": "ddlExceptionSkip",
		"configType": "SERVER_CORE",
		"configValue": "true",
		"dataJobId": 956,
		"endPointType": "INDEPENDENT",
		"needCreate": false
	},
    {
        "configName": "specId",
        "configType": "SERVER_CORE",
        "configValue": "17",
        "dataJobId": 956,
        "endPointType": "INDEPENDENT",
        "needCreate": false
  }
]
```

Each array element is a kv configuration object, the fields of which are described below:

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| dataJobId | Task ID | Body | True | Long |
| configName | Configuration Name | Body | True | String |
| configValue | Configuration Value, please note that parameter items with default values cannot be empty | Body | False | String |
| endPointType | Parameter Effect End: SOURCE (source end), TARGET (target end), INDEPENDENT (global) | Body | True | String |
| configType | Configuration Belongs To Entity: SERVER_CORE (task), DATASOURCE (data source), MAPPING (metadata mapping) | Body | True | String |
| needCreate | Whether the configuration has not appeared in this task (new version configuration) | Body | False | String |

## Public Response Results

| ParameterName | Parameter Description  | Type(Java) |NotNull
| ------------ | -------------------|-------|----------- |
| code | 1: Success 0: Failed | String | True |
| data | | Object | False |
| msg | | String | False |
| requestID | | String | True |

## Response Example

```json
{
  "requestId": "c5665d7c-2cb7-11ec-a410-bfd57df2q1ea",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


