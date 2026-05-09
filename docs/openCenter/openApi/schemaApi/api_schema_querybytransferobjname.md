---
id: api_schema_querybytransferobjname
title: Query Table Mapping
sidebar_position: 1
description: Synchronize elements on the source end, such as topiccollection, and query metadata on the destination end
---

## Interface Overview

Synchronize elements on the source end, such as topiccollection, and query metadata on the destination end.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/schema/querybytransferobjname`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| transferObjName | Synchronization Task Source Data Source Table/Topic/Collection Information | Body | True |String |    

## Public Response Results

| ParameterName | Parameter Description  | Type(Java) |NotNull
| ------------ | -------------------|-------|----------- |
| code | 1: Success 0: Failed | string | True |
| data | | Object | False |
| msg | | string | False |
| requestID | | string | True |

## Data Parameter Description

Data is an array where the fields in each set of data are described as follows:

| ParameterName | Parameter Description  | Type(Java) |NotNull
| ------------ | -------------------|-------|----------- |
| srcTransferObjName | Synchronization Task Source Data Source Table/Topic/Collection Information | string | True |
| targetSchemaObjs | Object Array, where each element represents a target destination | Array | True |

### TargetSchemaObjs Element field description

| ParameterName | Parameter Description  | Type(Java) |NotNull
| ------------ | -------------------|-------|----------- |
| dataJobId | Data Job ID | long | True |
| dataJobName | Data Job Name | string | True |
| dataJobDesc | Data Job Description | string | True |
| srcDsInstanceId | Source data source instance ID | long | False |
| dstDsInstanceId | Target data source instance ID | long | False |
| db | Target database name, such as ORACLE/PostgreSQL/SQLServer, not empty. Empty for MySQL/Kafka/MongoDB/StarRocks/Doris/ClickHouse/Kafka/RocketMQ/RabbitMQ, etc. | string | False |
| schema | Target schema name, not empty for ORACLE/PostgreSQL/SQLServer/MySQL/MongoDB/StarRocks/Doris/ClickHouse, etc. Empty for Kafka/RocketMQ/RabbitMQ | string | False |
| transferObjName | Target table/index/topic/collection | string | False |

## Response Example

```json
{
  "taskId": 0,
  "workerIdentity": null,
  "sendBackToTask": false,
  "code": "1",
  "msg": "request success",
  "data": {
    "srcTransferObjName": "worker_stats",
    "targetSchemaObjs": [
      {
        "dataJobId": 488,
        "dataJobName": "canalmq0h45193p1",
        "dataJobDesc": "1234",
        "db": null,
        "schema": null,
        "transferObjName": "table_4"
      },
      {
        "dataJobId": 469,
        "dataJobName": "canal7200hxm2t8k",
        "dataJobDesc": "1234",
        "db": null,
        "schema": "dingtax_from_src",
        "transferObjName": "worker_stats"
      },
      {
        "dataJobId": 468,
        "dataJobName": "canal1c1zu6ye2dz",
        "dataJobDesc": "1234",
        "db": null,
        "schema": "dingtax_from_mongo",
        "transferObjName": "worker_stats_re"
      },
      {
        "dataJobId": 463,
        "dataJobName": "canal18s6ks5793k",
        "dataJobDesc": "4123",
        "db": null,
        "schema": "dingtax_in_adb",
        "transferObjName": "worker_stats"
      },
      {
        "dataJobId": 462,
        "dataJobName": "canal27h614pi7p7",
        "dataJobDesc": "1234",
        "db": "dingtax",
        "schema": "dbo",
        "transferObjName": "worker_stats"
      },
      {
        "dataJobId": 458,
        "dataJobName": "canall61uha92i1u",
        "dataJobDesc": "1234",
        "db": "dingtax",
        "schema": "public",
        "transferObjName": "worker_stats"
      },
      {
        "dataJobId": 457,
        "dataJobName": "canalqhuc714f31q",
        "dataJobDesc": "1234",
        "db": "dingtax",
        "schema": "public",
        "transferObjName": "worker_stats"
      },
      {
        "dataJobId": 455,
        "dataJobName": "canalz1yt0nutvr3",
        "dataJobDesc": "1234",
        "db": "dingtax",
        "schema": "public",
        "transferObjName": "worker_stats"
      },
      {
        "dataJobId": 459,
        "dataJobName": "canalc51a374175o",
        "dataJobDesc": "123",
        "db": "dingtax",
        "schema": "public",
        "transferObjName": "worker_stats"
      }
    ]
  },
  "success": true,
  "fail": false,
  "rsocketDirectionType": null
}
```


