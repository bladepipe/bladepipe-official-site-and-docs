---
id: api_datasource_listtypemapping
title: List Type Mapping
description: Gets a data type map for presentation
---

## Interface Overview

Gets a data type map for presentation

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datasource/listcoltypemapping`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| dstDsId | ID of the source data source | Body | True | Long |
| srcDsId | ID of the target data source | Body | True | Long |     

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success, 0: failure | String | True |
| data | | Object | False |
| msg | | String | False |
| requestId | | String | True |

## Data Parameter

Data is the mapping between the type of the source end and the type of the target end. For the time being, one type on the source end cannot be paired with multiple types on the target end.

## Response Example

```json
{
  "requestId": "7d61897e-2be2-11ec-b616-f194b7b514f9",
  "code": "1",
  "msg": "request success",
  "data": {
    "BLOB": "BLOB",
    "FLOAT": "FLOAT",
    "POLYGON": "POLYGON",
    "SET": "SET",
    "BINARY": "BINARY",
    "DECIMAL": "DECIMAL",
    "CHAR": "CHAR",
    "TEXT": "TEXT",
    "JSON": "JSON",
    "MEDIUMTEXT": "MEDIUMTEXT",
    "MULTIPOLYGON": "MULTIPOLYGON",
    "INT": "INT",
    "YEAR": "INT",
    "GEOMCOLLECTION": "GEOMCOLLECTION",
    "TIMESTAMP": "TIMESTAMP",
    "DOUBLE": "DOUBLE",
    "TINYTEXT": "TINYTEXT",
    "LONGBLOB": "LONGBLOB",
    "TINYINT": "TINYINT",
    "GEOMETRYCOLLECTION": "GEOMETRYCOLLECTION",
    "GEOMETRY": "GEOMETRY",
    "ENUM": "ENUM",
    "MULTIPOINT": "MULTIPOINT",
    "LINESTRING": "LINESTRING",
    "LONGTEXT": "LONGTEXT",
    "TIME": "TIME",
    "BIGINT": "BIGINT",
    "MEDIUMINT": "MEDIUMINT",
    "BIT": "BINARY",
    "DATE": "DATE",
    "MULTILINESTRING": "MULTILINESTRING",
    "DATETIME": "DATETIME",
    "MEDIUMBLOB": "MEDIUMBLOB",
    "TINYBLOB": "TINYBLOB",
    "SMALLINT": "SMALLINT",
    "VARCHAR": "VARCHAR",
    "VARBINARY": "VARBINARY",
    "POINT": "POINT"
  }
}
```


