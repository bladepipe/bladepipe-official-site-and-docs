---
id: api_constant_dstdstype
title: Target DataSource Type
description: Obtain the destination data source type for selection when creating a task.
---

## Interface Overview 

Obtain the destination data source type for selection when creating a task.


## Interface Address

`/cloudcanal/console/api/v1/openapi/constant/dstdstype`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| sourceType  | Source data source type, obtained through [Get Source Data Source Type](api_constant_srcdstype.md) |Body| True | string |
| deployType  | Data source deployment type<br/><br/>SELF_MAINTENANCE <br/>ALIBABA_CLOUD_HOSTED |Body| True | string |   

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure | string | True |
| data       |             | Object | False |
| msg        |             | string | False |
| requestId  |             | string | True |

## Data Parameters

The data is an array, and array elements are data source types

## Response Example

```json
{
  "requestId": "5d580478-2be4-11ec-b616-fbb1cde383d4",
  "code": "1",
  "msg": "request success",
  "data": [
    "MySQL",
    "TiDB",
    "PostgreSQL",
    "Greenplum",
    "ElasticSearch",
    "ClickHouse",
    "Kafka",
    "RocketMQ",
    "RabbitMQ",
    "Hive",
    "Oracle",
    "Kudu",
    "MongoDB",
    "Redis"
  ]
}
```


