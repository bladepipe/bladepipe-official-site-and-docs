---
id: api_constant_dscharset
title: DataSource Charset
description: Obtain the data source code for selecting when creating a task.
---

## Interface Overview 

Obtain the data source code for selecting when creating a task.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/constant/dscharsetoptions`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| dataSourceType | Data source type<br/><br/>MySQL<br/>PolarDbMySQL<br/>PolarDbX<br/>PostgreSQL<br/>Greenplum<br/>Oracle<br/>SQLServer<br/>Redis<br/>MongoDB<br/>Kafka<br/>RocketMQ<br/>RabbitMQ<br/>Hive<br/>ElasticSearch<br/>DRDS<br/>AdbForMySQL<br/>TiDB<br/>ClickHouse<br/>Kudu | Body | True | string |    

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure | string |True
| data       |              | Object |False
| msg        |              | string |False
| requestId  |             | string |True

## Data Parameters

The "data" has an array called "dsCharsetOptions" with the following item descriptions：

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| dsCharset       | Character Encoding Name   | String  |True
| defaultChecked  | Whether to Select by Default | boolean |True

## Response Example

```json
{
  "requestId": "dd47ac5c-2cb4-11ec-a410-b3030910f280",
  "code": "1",
  "msg": "request success",
  "data": {
    "dsCharsetOptions": [
      {
        "defaultChecked": true,
        "dsCharset": "utf8mb4"
      },
      {
        "defaultChecked": false,
        "dsCharset": "utf8"
      },
      {
        "defaultChecked": false,
        "dsCharset": "gbk"
      }
    ]
  }
}
```


