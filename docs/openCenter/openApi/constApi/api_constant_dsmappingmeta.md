---
id: api_constant_dsmappingmeta
title: Mapping Meta
description: Obtain the data source mapping information for selection when creating a task.
---

## Interface Overview

Obtain the data source mapping information for selection when creating a task.

## Interface Address

`/cloudcanal/console/api/v1/openapi/constant/dsmappingmeta`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| srcDsType  | Source Data Source Type<br/><br/>MySQL<br/>PolarDbMySQL<br/>PolarDbX<br/>PostgreSQL<br/>Greenplum<br/>Oracle<br/>SQLServer<br/>Redis<br/>MongoDB<br/>Kafka<br/>RocketMQ<br/>RabbitMQ<br/>Hive<br/>ElasticSearch<br/>DRDS<br/>AdbForMySQL<br/>TiDB<br/>ClickHouse<br/>Kudu |Body| True | String |
| dstDsType  | Destination Data Source Type<br/><br/>MySQL<br/>PolarDbMySQL<br/>PolarDbX<br/>PostgreSQL<br/>Greenplum<br/>Oracle<br/>SQLServer<br/>Redis<br/>MongoDB<br/>Kafka<br/>RocketMQ<br/>RabbitMQ<br/>Hive<br/>ElasticSearch<br/>DRDS<br/>AdbForMySQL<br/>TiDB<br/>ClickHouse<br/>Kudu |Body| True | String |    

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure | String |True
| data       |             | Object |False
| msg        |             | String |False
| requestId  |             | String |True

## Data Parameters

The "data" has an array called "dsMappingInfo" with the following item descriptions：

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| method     | Mapping Rule Name | String |True
| srcParents | Source Metadata Parent Node Information<br/>Optional values include:<br/>DB<br/>SCHEMA<br/>TABLE<br/>COLUMN<br/>TOPIC<br/>INDEX | List | True |
| dstParents | Destination Metadata Parent Node Information<br/>Optional values include:<br/>DB<br/>SCHEMA<br/>TABLE<br/>COLUMN<br/>TOPIC<br/>INDEX | List | True |

## Response Example

```json
{
  "requestId": "c00aa078-2cb4-11ec-a410-6990afdaac21",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "method": "DB_SCHEMA",
      "srcParents": [],
      "dstParents": [
        "DB"
      ]
    },
    {
      "method": "TABLE_TABLE",
      "srcParents": [
        "DB"
      ],
      "dstParents": [
        "SCHEMA",
        "DB"
      ]
    },
    {
      "method": "COLUMN_COLUMN",
      "srcParents": [
        "TABLE",
        "DB"
      ],
      "dstParents": [
        "TABLE",
        "SCHEMA",
        "DB"
      ]
    }
  ]
}
```


