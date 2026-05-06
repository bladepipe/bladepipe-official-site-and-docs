---
id: api_constant_dspostype
title: DataSource Position Type
description: Gets the data source site type for presentation
---

## Interface Overview 

Gets the data source site type for presentation

## Interface Address 

`/cloudcanal/console/api/v1/openapi/constant/dspostypes`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| dsType     | Data source type, obtained through [Get Source Data Source Type](api_constant_srcdstype.md) | Body | True | string |     

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure  | string |True
| data       |             | Object |False
| msg        |             | string |False
| requestId  |             | string |True

## Data Parameters

The data is an array of strings whose values represent the site type of the data source

## Response Example``

```json
{
  "requestId": "4a178313-2be6-11ec-b616-93507033b0a3",
  "code": "1",
  "msg": "request success",
  "data": [
    "MYSQL_LOG_FILE_POS",
    "MYSQL_GTID_POS",
    "MYSQL_TIMESTAMP_POS"
  ]
}
```


