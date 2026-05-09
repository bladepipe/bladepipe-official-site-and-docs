---
id: api_datajob_precheckbasic
title: PreCheck DataJob(Basic) 
description: Basic verification of task information, including connectivity, basic parameters, and permissions
---

## Interface Overview 

Basic verification of task information, including **connectivity**, **basic parameters**, and **permissions**

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/precheckbasic`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId     | The ID of the cluster that the data source is linked to |Body | True     | Long    |
| srcDsId       | The ID of the source data source |Body | True     | Long    |
| srcHostType   | The host type of the source data source <br/><br/>PRIVATE <br/>PUBLIC |Body | True     | String  |
| srcSchema     | The description of the source database table, as shown in the example |Body | True     | String  |
| dstDsId       | The ID of the target data source |Body | True     | Long    |
| dstHostType   | The host type of the target data source <br/><br/>PRIVATE <br/>PUBLIC |Body | True     | String  |
| dstSchema     | The description of the target database table, which can be calculated based on `srcSchema` and `mappingDef`, and can be empty |Body | False    | String  |
| mappingDef    | The mapping of the database table, as shown in the example |Body | True     | String  |
| jobType       | The type of the job, which can be obtained through the [Get Data Job Types](../constApi/api_constant_listdatajobtype.md) interface |Body | True     | String  |
| initialSync   | Whether to initialize data (full migration) if it is a data synchronization task |Body | False    | boolean |
| shortTermNum  | How many days the short-term synchronization lasts if there is short-term synchronization |Body | False    | Int     |
| shortTermSync | Whether to perform short-term synchronization if it is a data migration task |Body | False    | boolean |
| specId        | The specification ID |Body | True     | Int     |
| fullPeriod    | Whether it is periodic full migration |Body | False    | boolean |
| fullPeriodCronExpr | The CronTab expression of periodic full migration |Body | False    | String  |
| autoStart     | Whether to start automatically |Body | False    | boolean |
| checkOnce     | Whether to perform a full data verification once the incremental sync catches up |Body | False    | boolean |
| checkPeriod   | Whether it is periodic verification |Body | False    | boolean |
| checkPeriodCronExpr | The CronTab expression of periodic verification |Body | False    | String  |  

### SrcSchema Description (MySQL)
Different data source schemas have different field descriptions. You need to consult the product team for more source data sources.

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| db            | Mapping method <br/><br/>DB_DB <br/>SCHEMA_SCHEMA <br/>TABLE_TABLE <br/>COLUMN_COLUMN <br/>DB_SCHEMA <br/>SCHEMA_DB <br/>DB_TOPIC <br/>TABLE_TOPIC <br/>TOPIC_TABLE <br/>TOPIC_INDEX <br/>ANY_DB <br/>TABLE_INDEX <br/>TABLE_KEYPREFIX| Body | True    | string |
| dbPattern     | Nested multi-level mapping relationship, recognized according to whether `method` or `parent` is empty |Body | False   | string |
| tables        | Tables owned by the database |Body | True    | string |
| targetAutoCreate | Whether the target needs to be created automatically |Body | True    | string |
| inBlackList   | Whether it is in the blacklist (not synchronized or migrated) |Body | True    | string |

```json
[
    {
        "db": "dingtax",
        "dbPattern": "",
        "tables": [],
        "targetAutoCreate": false,
        "inBlackList": false
    }
]
```

### MappingDef Description

MappingDef is an array, with each group representing a mapping

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| method        | Mapping method <br/><br/>DB_DB <br/>SCHEMA_SCHEMA <br/>TABLE_TABLE <br/>COLUMN_COLUMN <br/>DB_SCHEMA <br/>SCHEMA_DB <br/>DB_TOPIC <br/>TABLE_TOPIC <br/>TOPIC_TABLE <br/>TOPIC_INDEX <br/>ANY_DB <br/>TABLE_INDEX <br/>TABLE_KEYPREFIX| Body | True    | string |
| serializeMapping     | Nested multi-level mapping relationship, recognized according to whether `method` or `parent` is empty |Body | False   | string |
| serializeAutoGenRules        | Specifies the mapping rules |Body | True    | string |
| commonGenRule | Common mapping rules |Body | True    | string |

Example of mappingDef (MySQL -> PostgreSQL)

```json
[
    {
        "method": "DB_SCHEMA",
        "serializeMapping": {
            "{\"value\":\"dingtax\"}": "{\"parent\":{\"value\":\"dingtax_target\"},\"value\":\"public\"}"
        },
        "serializeAutoGenRules": {},
        "commonGenRule": "MIRROR"
    },
    {
        "serializeMapping": {},
        "method": "TABLE_TABLE",
        "serializeAutoGenRules": {},
        "commonGenRule": "MIRROR"
    },
    {
        "method": "COLUMN_COLUMN",
        "serializeMapping": {},
        "serializeAutoGenRules": {},
        "commonGenRule": "MIRROR"
    }
]
```

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code          | 1: succeeded, 0: failed | string | True |
| data          |  | Object | False |
| msg           |  | string | False |
| requestId     |  | string | True |

## Data Parameter Description

Data is an array. Each item in the array represents a check item. Check item parameters are described as follows

| ParameterName | Parameter Description | NotNull | Type(Java) |
| ------------ | -------------------|-------|----------- |
| title         | Test item name | True     | string |
| passRequirement | Condition for test item to pass | True     | string |
| varName       | Parameter name | False    | string |
| varRequireValues | Required values for parameter | False    | string |
| varActualValue | Actual value of parameter | False    | string |
| preCheckType  | Check type <br/>CONNECTIVITY (connectivity) <br/>VERSION (version) <br/>BINLOG_EXISTENCE (existence of incremental logs) <br/>PRIVILEGES (privileges) <br/>STRUCT_TABLE_STORAGE (table storage) <br/>STRUCT_TABLE_PK (primary key) <br/>STRUCT_TABLE_CHARSET (table character set) <br/>STRUCT_TABLE_COLLATION (table collation) <br/>STRUCT_TABLE_FK (foreign key) <br/>STRUCT_EXISTENCE (existence of database, tables, and columns) <br/>VARIABLES (database parameters) <br/>SPEC_SCHEDULE_SUPPORT (capacity sufficiency) <br/>INCREMENT_BALANCE (incremental license) <br/>FULL_BALANCE (full license) <br/>CHECK_BALANCE (verification license) <br/>STRUCT_BALANCE (schema migration license) <br/>NAME_LENGTH (metadata name length) <br/>INDEX_COLUMN (index column) <br/>COLUMN_TYPE (column type) <br/>VERSION_COMPATIBILITY (version compatibility) | False    | string |
| success       | Whether the item passed precheck | False    | boolean |
| checked       | Whether the item has been prechecked | False    | boolean |
| contextDbName | Database associated with the check | False    | string |
| contextTableName | Table associated with the check | False    | string |
| contextColumnName | Column associated with the check | False    | string |
| schemaName    | Schema associated with the check | False    | string |

## Response Example

```json
{
  "requestId": "422622b9-2bf5-11ec-8b3e-172e4c81a5c3",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "title": "Source-end database connection test",
      "passRequirement": "The database can be linked",
      "varName": null,
      "varRequireValues": null,
      "varActualValue": null,
      "preCheckType": "CONNECTIVITY",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "Check the source database version",
      "passRequirement": "Support 5.1.x,5.5.x,5.6.x,5.7.x,8.x MySQL",
      "varName": null,
      "varRequireValues": null,
      "varActualValue": null,
      "preCheckType": "VERSION",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "PRECHECK_PRIVS_SOURCE_SELECT_TITLE",
      "passRequirement": "Requires database dingtax select permission",
      "varName": null,
      "varRequireValues": [
        "select"
      ],
      "varActualValue": null,
      "preCheckType": "PRIVILEGES",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "Check for parameter 'log bin'",
      "passRequirement": "The 'log_bin' parameter must be 1",
      "varName": "log_bin",
      "varRequireValues": [
        "1"
      ],
      "varActualValue": "1",
      "preCheckType": "VARIABLES",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "The 'binlog format' parameter is checked",
      "passRequirement": "The 'binlog format' parameter must be 'ROW'",
      "varName": "binlog_format",
      "varRequireValues": [
        "ROW"
      ],
      "varActualValue": "ROW",
      "preCheckType": "VARIABLES",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "The 'binlog row image' parameter is checked",
      "passRequirement": "The 'binlog row image' parameter must be 'FULL'",
      "varName": "binlog_row_image",
      "varRequireValues": [
        "FULL"
      ],
      "varActualValue": "FULL",
      "preCheckType": "VARIABLES",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "'replication client' permission check",
      "passRequirement": "Requires 'replication client' permission",
      "varName": null,
      "varRequireValues": [
        "replication client"
      ],
      "varActualValue": null,
      "preCheckType": "PRIVILEGES",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "'replication slave' permission check",
      "passRequirement": "The 'replication slave' permission is required",
      "varName": null,
      "varRequireValues": [
        "replication slave"
      ],
      "varActualValue": null,
      "preCheckType": "PRIVILEGES",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "Pre-check the availability of task specifications",
      "passRequirement": "The remaining available memory of the machine you add needs to meet the specifications of the selected task",
      "varName": null,
      "varRequireValues": null,
      "varActualValue": null,
      "preCheckType": "SPEC_SCHEDULE_SUPPORT",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    }
  ]
}
```


