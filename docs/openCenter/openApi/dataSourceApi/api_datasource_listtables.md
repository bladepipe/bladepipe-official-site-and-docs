---
id: api_datasource_listtables
title: List Tables
description: Gets a list of database tables so you can select the tables to be migrated and synchronized when creating a task
---

## Interface Overview 

Gets a list of database tables so you can select the tables to be migrated and synchronized when creating a task.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datasource/listtables`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId | Cluster ID of the machine set that attempts to connect to the data source | Body | True | Long |
| dataSourceId | ID of the target data source | Body | True | Long |
| hostType | Selected data source network type<br/><br/>PRIVATE (intranet)<br/>PUBLIC (internet) | Body | True | String |
| dbName | Database name, required depending on the type of data source, required for relational databases | Body | False | String |
| schema | Schema name, required depending on the type of data source | Body | False | String |  

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success, 0: failure | String | True |
| data | | Object | False |
| msg | | String | False |
| requestId | | String | True |

## Data Parameter

Data is an array whose parameters are described as follows:

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| dbName | Name of the database to which the table belongs | String | False |
| schemaName | Name of the schema to which the table belongs | String | False |
| tableName | For relational databases, this is the table name; for messaging, it is the topic; for MongoDB, it is the collection; for caching, it is the namespace | String | True |
| hasPk | Indicates whether the table has a primary key | Boolean | False |
| indexMeta | If the data source is Elasticsearch, there may be non-null values | String | False |
| mqTopicPartitions | If the data source is a message middleware that supports partitions (such as Kafka, RocketMQ, etc.), this indicates the topic partition value | int | False |

## Response Example

```json
{
  "requestId": "3962501d-2bd7-11ec-b616-c1fbb3356577",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "dbName": "console",
      "schemaName": "",
      "tableName": "alert_config_detail",
      "hasPk": true,
      "indexMeta": null,
      "mqTopicPartitions": 0
    },
    {
      "dbName": "console",
      "schemaName": "",
      "tableName": "alert_event_log",
      "hasPk": true,
      "indexMeta": null,
      "mqTopicPartitions": 0
    },
    {
      "dbName": "console",
      "schemaName": "",
      "tableName": "aliyun_sts_token",
      "hasPk": true,
      "indexMeta": null,
      "mqTopicPartitions": 0
    }
  ]
}
```


