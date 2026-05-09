---
id: api_datasource_listdbs
title: List Databases
description: Gets the database list information about the database instance
---

## Interface Overview

Gets the database list information about the database instance

## Interface Address

`/cloudcanal/console/api/v1/openapi/datasource/listdbs`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId | Machine cluster ID attempting to connect to the data source | Body | True | long |
| dataSourceId | Target data source ID | Body | True | long |
| hostType | Selected data source network type<br/><br/>PRIVATE (intranet)<br/>PUBLIC (internet) | Body | True | string |  

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success 0: failure | string | True |
| data | - | Object | False |
| msg | - | string | False |
| requestId | - | string | True |

## Data Parameter

Data is an array. The parameters in the array are described as follows

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| dbName | Database name, may be empty depending on the data source | string | False |
| schemas | Schema, may be empty depending on the data source | string | False |

## Response Example

```json
{
  "requestId": "01c584d2-2b5c-11ec-8c7e-d9df82935fdd",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "dbName": "abc",
      "schemas": []
    },
    {
      "dbName": "canal_tsdb",
      "schemas": []
    },
    {
      "dbName": "cloudcanal",
      "schemas": []
    },
    {
      "dbName": "clouddm",
      "schemas": []
    },
    {
      "dbName": "col_project",
      "schemas": []
    },
    {
      "dbName": "console",
      "schemas": []
    },
    {
      "dbName": "crm9",
      "schemas": []
    },
    {
      "dbName": "data_error",
      "schemas": []
    },
    {
      "dbName": "dingtax",
      "schemas": []
    },
    {
      "dbName": "drds_1",
      "schemas": []
    },
    {
      "dbName": "drds_2",
      "schemas": []
    },
    {
      "dbName": "from_polardb_x",
      "schemas": []
    },
    {
      "dbName": "huge_tables",
      "schemas": []
    },
    {
      "dbName": "integration_src",
      "schemas": []
    },
    {
      "dbName": "ke",
      "schemas": []
    },
    {
      "dbName": "merge_db",
      "schemas": []
    },
    {
      "dbName": "merge_db_1",
      "schemas": []
    },
    {
      "dbName": "mq_test_source",
      "schemas": []
    },
    {
      "dbName": "mysiam_test",
      "schemas": []
    },
    {
      "dbName": "no_data",
      "schemas": []
    },
    {
      "dbName": "no_table",
      "schemas": []
    },
    {
      "dbName": "nobefore",
      "schemas": []
    },
    {
      "dbName": "not_supported",
      "schemas": []
    },
    {
      "dbName": "quartz",
      "schemas": []
    },
    {
      "dbName": "tpch",
      "schemas": []
    },
    {
      "dbName": "upper_case_db",
      "schemas": []
    },
    {
      "dbName": "urge",
      "schemas": []
    },
    {
      "dbName": "zeroday",
      "schemas": []
    }
  ]
}
```


