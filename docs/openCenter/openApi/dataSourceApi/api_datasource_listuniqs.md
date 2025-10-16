---
id: api_datasource_listuniqs
title: List UniqKeys
description: Gets a list of unique keys for database tables so that the unique key is set as the primary key when creating a task
---

## Interface Overview

Gets a list of unique keys for database tables so that the unique key is set as the primary key when creating a task

## Interface Address

`/cloudcanal/console/api/v1/openapi/datasource/listuniqs`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId | Cluster ID of the machine set that attempts to connect to the data source | Body | True | Long |
| dataSourceId | ID of the target data source | Body | True | Long |
| hostType | Selected data source network type<br/><br/>PRIVATE (intranet)<br/>PUBLIC (internet) | Body | True | String |
| dbName | Database name; for MySQL, please fill in the "schemas" parameter | Body | False | String |
| schemas | List of schema names, including MySQL dbname, PostgreSQL schema, and Oracle schema | Body | True | List | 

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success, 0: failure | String | True |
| data | | Object | False |
| msg | | String | False |
| requestId | | String | True |

## Data Parameter

Data contains multiple sets of json objects, each set of keys representing the table, and value representing the unique key queue owned by the table.

Key Parameter Description:

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| dbName | Database name, may be empty depending on the data source | String | False |
| tableSchema | Schema, may be empty depending on the data source | String | False |
| tableName | Table name | String | True |

Value array element

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| constraintCatalog | Name of the database to which the constraint belongs; default is empty for MySQL | String | False |
| constraintSchema | Schema to which the constraint belongs | String | True |
| constraintName | Name of the constraint | String | True |
| tableSchema | Schema on which the constraint acts | String | True |
| tableName | Table on which the constraint acts (not the table on which foreign key dependency exists) | String | True |
| constraintType | Type of constraint<br/><br/>PrimaryKey<br/>Unique<br/>ForeignKey | String | True |
| cols | Columns included in the constraint | String | True |

## Response Example

```json
{
  "requestId": "c7ed1d38-2bd0-11ec-b616-e92730e52825",
  "code": "1",
  "msg": "request success",
  "data": {
    "{\"dbName\":\"console\",\"tableSchema\":null,\"tableName\":\"meta_snapshot\"}": [
      {
        "constraintCatalog": null,
        "constraintSchema": "console",
        "constraintName": "binlog_file_offest",
        "tableSchema": "console",
        "tableName": "meta_snapshot",
        "constraintType": "Unique",
        "cols": [
          "destination",
          "binlog_master_id",
          "binlog_file",
          "binlog_offset"
        ]
      }
    ],
    "{\"dbName\":\"console\",\"tableSchema\":null,\"tableName\":\"console_user\"}": [
      {
        "constraintCatalog": null,
        "constraintSchema": "console",
        "constraintName": "idx_unique_ak",
        "tableSchema": "console",
        "tableName": "console_user",
        "constraintType": "Unique",
        "cols": [
          "ak"
        ]
      },
      {
        "constraintCatalog": null,
        "constraintSchema": "console",
        "constraintName": "idx_unique_sk",
        "tableSchema": "console",
        "tableName": "console_user",
        "constraintType": "Unique",
        "cols": [
          "sk"
        ]
      }
    ]
  }
}
```


