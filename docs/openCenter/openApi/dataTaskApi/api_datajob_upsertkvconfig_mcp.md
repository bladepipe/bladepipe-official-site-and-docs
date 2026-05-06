---
id: api_datajob_upsertkvconfig_mcp
title: Upsert KV Config (MCP Format)
description: Batch upsert task KV configurations by task ID. Request body wraps the array in an object for MCP tool compatibility.
---

## Interface Overview

Batch upsert task KV configurations by task ID. This has the same functionality as `/upsertkvconfigs`, but the request body wraps the array in an object (`{ "configs": [...] }`) for easier MCP tool invocation.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/upsertkvconfig_mcp`

## Request Manner

`POST`

## Request Parameters

| ParameterName | Parameter Description | RequestType | Whether Required | DataType |
| -------- | -------- | -------- | -------- | -------- |
| configs | KV configuration list | body | True | array |

Each element in the `configs` array has the following fields:

| ParameterName | Parameter Description | RequestType | Whether Required | DataType |
| -------- | -------- | -------- | -------- | -------- |
| dataJobId | DataJob ID | body | True | long |
| configName | Configuration name | body | True | string |
| configValue | Configuration value. Cannot be empty for parameters with default values. | body | False | string |
| endPointType | Endpoint type <br/><br/>SOURCE <br/>TARGET <br/>INDEPENDENT | body | True | string |
| configType | Configuration entity type <br/><br/>SERVER_CORE (task) <br/>DATASOURCE (data source) <br/>MAPPING (metadata mapping) | body | True | string |
| needCreate | Whether this configuration does not yet exist in the task (new version config) | body | False | boolean |

## Request Example

```json
{
  "configs": [
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
}
```

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| -------- | -------- | ---------- | ------ |
| code | 1: Success, 0: Failure | string | True |
| data | | object | False |
| msg | | string | False |
| requestId | | string | True |

## Response Example

```json
{
  "requestId": "c5665d7c-2cb7-11ec-a410-bfd57df2q1ea",
  "code": "1",
  "msg": "request success",
  "data": null
}
```
