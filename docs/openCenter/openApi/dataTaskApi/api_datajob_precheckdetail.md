---
id: api_datajob_precheckdetail
title: PreCheck DataJob(Detailed)
description: Verify task information in detail, including character sets, data permissions, and metadata
---

## Interface Overview 

Verify task information in detail, including **character sets**, **data permissions**, and **metadata**.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/precheckdetail`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId           | The ID of the cluster that the data source is linked to       |Body | True     | Long     |
| srcDsId             | The ID of the source data source                             |Body | True     | Long     |
| srcHostType         | The host type of the source data source <br/><br/>PRIVATE <br/>PUBLIC |Body | True     | String   |
| srcSchema           | Description of the source database and table, see [Data Source Schema Description](api_datajob_schema.md) |Body | True     | String   |
| dstDsId             | The ID of the target data source                             |Body | True     | Long     |
| dstHostType         | The host type of the target data source <br/><br/>PRIVATE <br/>PUBLIC |Body | True     | String   |
| dstSchema           | Description of the target database and table, can be calculated from srcSchema with mappingDef, can be empty |Body | False    | String   |
| mappingDef          | Database table mapping, see [Mapping Rule Description](api_datajob_mapping.md) |Body | True     | String   |
| jobType             | The type of the task, can be obtained by querying through [Get Task Type](../constApi/api_constant_listdatajobtype.md) |Body | True     | String   |
| initialSync         | For data synchronization tasks, whether to initialize data (full migration) |Body | False    | Boolean  |
| shortTermNum        | If there is short-term synchronization, how many days it lasts |Body | False    | Integer  |
| shortTermSync       | Whether to perform short-term synchronization for data migration tasks |Body | False    | Boolean  |
| specId              | Specification ID |Body | True     | Integer  |
| fullPeriod          | Whether it is periodic full migration |Body | False    | Boolean  |
| fullPeriodCronExpr  | CronTab expression for periodic full migration |Body | False    | String   |
| autoStart           | Whether to start automatically |Body | False    | Boolean  |
| checkOnce           | Whether to perform a full data verification after catching up with incremental data |Body | False    | Boolean  |
| checkPeriod         | Whether it is periodic verification |Body | False    | Boolean  |
| checkPeriodCronExpr | CronTab expression for periodic verification |Body | False    | String   |    

## Public Response Results

| ParameterName | Parameter Description  | NotNull | Type(Java)
| ------------ | -------------------|-------|----------- |
| code          | 1: Success, 0: Failure                        | True     | String |
| data          | Data returned (if any)                        | False    | Object |
| msg           | Error message (if any)                        | False    | String |
| requestId     | Unique identifier for the request and response| True     | String |

## Data Parameter Description

Data is an array. Each item in the array represents a check item. Check item parameters are described as follows:

| ParameterName | Parameter Description | NotNull | Type(Java)
| ------------ | -------------------|-------|----------- |
| title             | Name of the test item                                                        | True     | Long   |
| passRequirement   | Condition for passing the test item                                          | True     | String |
| varName           | Name of the parameter (if any)                                                | False    | String |
| varRequireValues  | Required value(s) for the parameter                                           | False    | String |
| varActualValue    | Actual value of the parameter (if any)                                        | False    | String |
| preCheckType      | Type of pre-check <br/><br/>CONNECTIVITY (Connectivity) <br/>VERSION (Version) <br/>BINLOG_EXISTENCE (Binlog Existence) <br/>PRIVILEGES (Privileges) <br/>STRUCT_TABLE_STORAGE (Table Storage) <br/>STRUCT_TABLE_PK (Primary Key) <br/>STRUCT_TABLE_CHARSET (Table Character Set) <br/>STRUCT_TABLE_COLLATION (Table Collation) <br/>STRUCT_TABLE_FK (Foreign Key) <br/>STRUCT_EXISTENCE (Existence of Database Table Columns) <br/>VARIABLES (Database Parameters) <br/>SPEC_SCHEDULE_SUPPORT (Capacity) <br/>INCREMENT_BALANCE (Incremental License) <br/>FULL_BALANCE (Full Migration Task License) <br/>CHECK_BALANCE (Verification Task License) <br/>STRUCT_BALANCE (Schema Migration License) <br/>NAME_LENGTH (Metadata Name Length) <br/>INDEX_COLUMN (Index Column) <br/>COLUMN_TYPE (Column Type) <br/>VERSION_COMPATIBILITY (Version Compatibility) | False    | String |
| success           | Whether the test item has passed pre-check                                   | False    | String |
| checked           | Whether the test item has been pre-checked                                   | False    | Integer|
| contextDbName     | The database associated with the check (if applicable)                       | False    | Integer|
| contextTableName  | The table associated with the check (if applicable)                          | False    | String |
| contextColumnName | The column associated with the check (if applicable)                         | False    | String |

## Response Example

```json
{
  "requestId": "282a9033-2c26-11ec-9577-adaf6efb66da",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "title": "Check the structure of the source-end database table",
      "passRequirement": "The selected library table fields need to be in the database (except for the library table fields to be built)",
      "varName": null,
      "varRequireValues": null,
      "varActualValue": null,
      "preCheckType": "STRUCT_EXISTENCE",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "Source-end table character set check",
      "passRequirement": "Only 'utf 8','utf 8 mb 4' character sets are supported",
      "varName": null,
      "varRequireValues": [
        "utf8",
        "utf8mb4"
      ],
      "varActualValue": "utf8mb4",
      "preCheckType": "STRUCT_TABLE_CHARSET",
      "success": true,
      "checked": true,
      "contextDbName": "dingtax",
      "contextTableName": "worker_stats",
      "contextColumnName": null
    },
    {
      "title": "Source-end foreign key check",
      "passRequirement": "Cross-library foreign key constraints are not supported",
      "varName": null,
      "varRequireValues": null,
      "varActualValue": null,
      "preCheckType": "STRUCT_TABLE_FK",
      "success": true,
      "checked": true,
      "contextDbName": "dingtax",
      "contextTableName": "proc_table_ref",
      "contextColumnName": null
    },
    {
      "title": "Source table storage format check",
      "passRequirement": "Only the 'Inno DB' format is supported",
      "varName": null,
      "varRequireValues": [
        "InnoDB",
        "XENGINE",
        "MyISAM"
      ],
      "varActualValue": "InnoDB",
      "preCheckType": "STRUCT_TABLE_STORAGE",
      "success": true,
      "checked": true,
      "contextDbName": "dingtax",
      "contextTableName": "worker_stats",
      "contextColumnName": null
    },
    {
      "title": "binlog file existence check",
      "passRequirement": "\"show master status\" The displayed binlog file needs to be in the database",
      "varName": null,
      "varRequireValues": null,
      "varActualValue": null,
      "preCheckType": "BINLOG_EXISTENCE",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    }
  ]
}
```


