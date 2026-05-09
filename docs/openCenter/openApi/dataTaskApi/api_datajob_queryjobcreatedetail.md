---
id: api_datajob_queryjobcreatedetail
title: Query DataJob Creation Detail
description: Query the full configuration details used when a task was created
---

## Interface Overview

Query the full configuration details used when a task was created, including all configuration parameters. Can be used to duplicate a task or review its configuration.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/queryjobcreatedetail`

## Request Manner

`POST`

## Request Parameters

| ParameterName | Parameter Description | RequestType | Whether Required | DataType |
| -------- | -------- | -------- | -------- | -------- |
| jobId | DataJob ID | body | True | long |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| -------- | -------- | ---------- | ------ |
| code | 1: Success, 0: Failure | string | True |
| data | | object | False |
| msg | | string | False |
| requestId | | string | True |

## Data Parameter Description

Returns the full configuration details used when the task was created.

### Basic Configuration

| ParameterName | Parameter Description | NotNull | Type(Java) |
| -------- |---| ------ | -------- |
| clusterId | ID of the cluster running the task | True | long |
| srcDsId | Source data source ID | True | long |
| dstDsId | Target data source ID | True | long |
| srcHostType | Source data source HOST type. Options: PUBLIC, PRIVATE | True | string |
| dstHostType | Target data source HOST type. Options: PUBLIC, PRIVATE | True | string |
| specId | Specification ID | True | long |

### Schema Configuration

| ParameterName | Parameter Description | NotNull | Type(Java) |
| -------- | ----- | ------ | -------- |
| schemaWhiteListLevel | Schema whitelist level | False | string |
| srcSchema | Source schema configuration | False | string |
| dstSchema | Target schema configuration (JSON string) | False | string |
| mappingDef | Mapping definition configuration (JSON string) | False | string |
| srcCaseSensitiveType | Source case-sensitive type | False | string |
| dstCaseSensitiveType | Target case-sensitive type | False | string |
| srcDsCharset | Source character set | False | string |
| tarDsCharset | Target character set | False | string |
| srcSchemaLessFormat | Source schema-less value format | False | string |
| dstSchemaLessFormat | Target schema-less value format | False | string |

### Task Configuration

| ParameterName | Parameter Description | NotNull | Type(Java) |
| -------- |---| ------ | -------- |
| jobType | Task type. Options: MIGRATION, SYNC, CHECK, REVISE, STRUCT_MIGRATION | True | string |
| dataJobDesc | Task description | False | string |
| keyConflictStrategy | Primary key conflict strategy. Options: IGNORE, REPLACE, EXCEPTION | False | string |
| structMigration | Whether to perform structure migration | True | boolean |
| initialSync | Whether to initialize historical data | True | boolean |
| filterDDL | Whether to filter DDL | True | boolean |
| shortTermSync | Whether to perform short-term synchronization | True | boolean |
| shortTermNum | Duration of short-term synchronization (days) | False | int |

### Periodic Task Configuration

| ParameterName | Parameter Description | NotNull | Type(Java) |
| -------- | ------ | ------ | -------- |
| autoStart | Whether to start automatically | True | boolean |
| checkOnce | Whether to perform one-time verification | True | boolean |
| checkPeriod | Whether to perform periodic verification | True | boolean |
| checkPeriodCronExpr | CronTab expression for periodic verification | False | string |
| fullPeriod | Whether to perform periodic full migration | True | boolean |
| fullPeriodCronExpr | CronTab expression for periodic full migration | False | string |

## Response Example

```json
{
  "code": "1",
  "msg": "request success",
  "data": {
    "clusterId": 1,
    "srcDsId": 156,
    "dstDsId": 157,
    "srcHostType": "PRIVATE",
    "dstHostType": "PUBLIC",
    "schemaWhiteListLevel": null,
    "srcSchema": "[...]",
    "dstSchema": "",
    "mappingDef": "[{\"method\":\"DB_DB\",\"serializeMapping\":{},\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"},{\"serializeMapping\":{},\"method\":\"TABLE_TABLE\",\"serializeAutoGenRules\":{},\"commonGenRule\":\"TO_LOWER_CASE\"},{\"method\":\"COLUMN_COLUMN\",\"serializeMapping\":{},\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"}]",
    "srcCaseSensitiveType": "Sensitive",
    "dstCaseSensitiveType": "Sensitive",
    "srcDsCharset": "utf8mb4",
    "tarDsCharset": "utf8mb4",
    "keyConflictStrategy": "IGNORE",
    "jobType": "SYNC",
    "dataJobDesc": "",
    "structMigration": false,
    "initialSync": true,
    "shortTermSync": false,
    "shortTermNum": 0,
    "filterDDL": false,
    "specId": 16,
    "autoStart": false,
    "checkOnce": false,
    "checkPeriod": false,
    "checkPeriodCronExpr": null,
    "fullPeriod": false,
    "fullPeriodCronExpr": null,
    "srcSchemaLessFormat": null,
    "dstSchemaLessFormat": null
  },
  "requestId": "0feaab4f-ce6d-11f0-8388-7386474fd961"
}
```
