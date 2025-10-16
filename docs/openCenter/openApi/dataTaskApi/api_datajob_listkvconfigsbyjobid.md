---
id: api_datajob_listkvconfigsbyjobid
title: Query Configuration
description: Query the kv configuration list according to the task id
---

## Interface Overview

Query the kv configuration list according to the task id

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datajob/listkvconfigsbyjobid`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| dataJobId     | Task ID     | Body     | True     | Long  |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code          | 1:Success, 0:Failure | String | True     |
| data          | Response data | Object | False    |
| msg           | Error message (if any) | String | False    |
| requestId     | Request ID | String | True     |

## Data Parameter Description

Data is an array where each item is information for a kv configuration item. The field parameters are as follows. Note that:

| ParameterName | Parameter Description  | NotNull | Type(Java)
| ------------ |-----------|--------|----|
| dataJobId     | DataJob ID | True     | Long    |
| configName    | Configuration name | True     | String  |
| configValue   | Current configuration value | False    | String  |
| defaultValue  | System default value | False    | String  |
| valueRange    | System recommended value | False    | String  |
| description   | Parameter description | True     | String  |
| taskType      | Task type to which the parameter applies <br/><br/>BUILD_STRUCT (Schema Migration) <br/>FULL (Full Data) <br/>INCREMENT (Incremental Sync) <br/>CHECK (Verification) <br/>REVISE (Correction) | False    | String  |
| endPointType  | Endpoint type to which the parameter applies <br/><br/>SOURCE (Source) <br/>TARGET (Target) <br/>INDEPENDENT (Global) | True     | String  |
| dynamic       | Whether the parameter can be changed dynamically (without restarting the task); currently false for all parameters | True     | Boolean |
| readOnly      | Whether the parameter is read-only | True     | Boolean |
| configType    | Entity type to which the configuration belongs <br/><br/>SERVER_CORE (Task) <br/>DATASOURCE (Data Source) <br/>MAPPING (Metadata Mapping) | True     | String  |
| configTagType | Configuration type <br/><br/>NORMAL (General) <br/>PERFORMANCE (Performance) | True     | String  |
| isSecret      | Whether the configuration is a secret; if true, then the configValue is empty | True     | Boolean |
| needCreate    | Whether the configuration has not appeared in this task (new version configuration), and needs to be inserted as a new configuration when submitting a configuration update | True     | Boolean |

## Response Example

```json
{
  "requestId": "50bcb593-6673-11ed-b716-e934b5005e9f",
  "taskId": 0,
  "workerIdentity": null,
  "sendBackToTask": false,
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "dataJobId": 956,
      "configName": "dataTaskDsType",
      "configValue": "MYSQL_TUNNEL",
      "defaultValue": "",
      "valueRange": "",
      "description": "Combination of task source and target data source types",
      "taskType": null,
      "endPointType": "INDEPENDENT",
      "dynamic": false,
      "readOnly": true,
      "configType": "SERVER_CORE",
      "configTagType": "NORMAL",
      "needCreate": false,
      "secret": false
    },
    {
      "dataJobId": 956,
      "configName": "specId",
      "configValue": "16",
      "defaultValue": "",
      "valueRange": "15/16/17/18/19/20/21/22/23/24/25/26. 15=1GB mem,16=2GB mem,17=3GB mem,18=4GB mem,19=512MB mem,20=5GB mem,21=6GB mem,22=7GB mem,23=8GB mem,24=12GB mem,25=16GB mem,26=20GB mem.",
      "description": "Task specification ID. The value must be the recommended value",
      "taskType": null,
      "endPointType": "INDEPENDENT",
      "dynamic": false,
      "readOnly": false,
      "configType": "SERVER_CORE",
      "configTagType": "NORMAL",
      "needCreate": false,
      "secret": false
    },
    {
      "dataJobId": 956,
      "configName": "exceptionSkipMode",
      "configValue": "NONE",
      "defaultValue": "NONE",
      "valueRange": "NONE / ApplierHandlerException / ALL",
      "description": "Task Exception ignore mode, NONE: exceptions are not ignored. Applier Handler Exception: write exceptions are ignored on the peer end",
      "taskType": null,
      "endPointType": "INDEPENDENT",
      "dynamic": false,
      "readOnly": false,
      "configType": "SERVER_CORE",
      "configTagType": "NORMAL",
      "needCreate": false,
      "secret": false
    },
    {
      "dataJobId": 956,
      "configName": "ddlExceptionSkip",
      "configValue": "false",
      "defaultValue": "false",
      "valueRange": "true / false",
      "description": "Whether to ignore the DDL execution exception on the peer end: true: ignore the DDL execution exception, false: not ignore the DDL execution exception ",
      "taskType": null,
      "endPointType": "INDEPENDENT",
      "dynamic": false,
      "readOnly": false,
      "configType": "SERVER_CORE",
      "configTagType": "NORMAL",
      "needCreate": false,
      "secret": false
    },
    {
      "dataJobId": 956,
      "configName": "fullRingBufferSize",
      "configValue": "64",
      "defaultValue": "16",
      "valueRange": "16-256",
      "description": "Full task internal queue size",
      "taskType": null,
      "endPointType": "INDEPENDENT",
      "dynamic": false,
      "readOnly": false,
      "configType": "SERVER_CORE",
      "configTagType": "PERFORMANCE",
      "needCreate": false,
      "secret": false
    },
    {
      "dataJobId": 956,
      "configName": "mappingDef",
      "configValue": "[{\"method\":\"DB_SCHEMA\",\"serializeMapping\":{\"{\\\"value\\\":\\\"dingtax\\\"}\":\"{\\\"parent\\\":{\\\"value\\\":\\\"cc_virtual_db\\\"},\\\"value\\\":\\\"cc_virtual_schema\\\"}\"},\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"},{\"serializeMapping\":{},\"method\":\"TABLE_TABLE\",\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"},{\"method\":\"COLUMN_COLUMN\",\"serializeMapping\":{},\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"}]",
      "defaultValue": "",
      "valueRange": "",
      "description": "Table structure mapping information",
      "taskType": null,
      "endPointType": "INDEPENDENT",
      "dynamic": false,
      "readOnly": true,
      "configType": "MAPPING",
      "configTagType": "NORMAL",
      "needCreate": false,
      "secret": false
    },
    {
      ...
    }
  ],
  "fail": false,
  "success": true,
  "rsocketDirectionType": null
}
```


