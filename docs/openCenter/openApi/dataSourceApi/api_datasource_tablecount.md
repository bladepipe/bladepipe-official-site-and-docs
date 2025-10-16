---
id: api_datasource_tablecount
title: Get Count of Databases and Tables
description: Gets the number of database tables to quickly filter out empty libraries
---

## Interface Overview

Gets the number of database tables to quickly filter out empty libraries

## Interface Address

`/cloudcanal/console/api/v1/openapi/datasource/schemastablecount`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId | Cluster ID of the machine set attempting to connect to the data source | Body | True | Long |
| dataSourceId | Target data source ID | Body | True | Long |
| hostType | Selected network type of the data source<br/><br/>PRIVATE (intranet)<br/>PUBLIC (Internet) | Body | True | String |
| schemas | An array of structures, as described below | Body | True | String |

Schema Description of the composite structure

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| db | Name of the database, not empty for relational databases | Body | True | String |
| schema | Name of the schema, empty for MySQL | Body | False | String | 

Schema Composite structure example

```json
{   
  "schemas": [
     {
		"db": "",
		"schema": ""
	 }
   ]
}
```

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success, 0: failure | String | True |
| data | | Object | False |
| msg | | String | False |
| requestId | | String | True |

## Data Parameter

| ParameterName | Parameter Description | Type(Java) | NotNull |

Key Parameter Description

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| dbName | Name of the database, not empty for relational databases | String | False |
| schema | Name of the schema, empty for MySQL | String | False |

## Response Example

```json
{
  "requestId": "ad6d0db7-2bdb-11ec-b616-2bc3f3f1c79f",
  "code": "1",
  "msg": "request success",
  "data": {
    "{\"dbName\":\"console\",\"schema\":null}": 45,
    "{\"dbName\":\"dingtax\",\"schema\":null}": 26
  }
}
```


