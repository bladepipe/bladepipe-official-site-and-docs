---
id: api_datajob_create
title: Create DataJob
description: Create data migration, synchronization, verification, and correction tasks
---

## Interface Overview 

Create data migration, synchronization, verification, and correction tasks

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datajob/create`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId          | Cluster ID used to link to the data source                                                                                        | Body               | True     | Long      |
| srcDsId            | Source data source ID                                                                                                             | Body               | True     | Long      |
| srcHostType        | Source data source host type (PRIVATE or PUBLIC)                                                                                  | Body               | True     | String    |
| srcSchema          | Description of source database table, see [Data Source Schema Description](api_datajob_schema.md)                                 | Body               | True     | String    |
| dstDsId            | Destination data source ID                                                                                                        | Body               | True     | Long      |
| dstHostType        | Destination data source host type (PRIVATE or PUBLIC)                                                                              | Body               | True     | String    |
| dstSchema          | Description of destination database table, which can be calculated from srcSchema and mappingDef, and can be empty             | Body               | False    | String    |
| mappingDef         | Library table mapping, see [Mapping Rule Description](api_datajob_mapping.md)                                                      | Body               | True     | String    |
| jobType            | Task type, please query through the [Get Task Type](../constApi/api_constant_listdatajobtype.md) interface                        | Body               | True     | String    |
| initialSync        | Whether to initialize data (full migration) if it is a data synchronization task                                                    | Body               | False    | Boolean  |
| shortTermNum       | If there is short-term synchronization, how many days it lasts                                                                     | Body               | False    | Int       |
| shortTermSync      | Whether short-term synchronization is required if it is a data migration task                                                      | Body               | False    | Boolean  |
| specId             | Specification ID                                                                                                                   | Body               | True     | Int       |
| dataJobDesc        | Task description                                                                                                                   | Body               | False    | String    |
| fullPeriod         | Whether it is a periodic full migration                                                                                            | Body               | False    | Boolean  |
| fullPeriodCronExpr | Periodic full migration CronTab expression                                                                                         | Body               | False    | String    |
| autoStart          | Whether to start automatically                                                                                                     | Body               | False    | Boolean  |    
| checkOnce            | Whether to perform a full data verification after catching up with incremental data | Body     | False       | Boolean |
| checkPeriod          | Whether to perform periodic data verification | Body     | False       | Boolean |
| checkPeriodCronExpr  | CronTab expression for periodic data verification | Body     | False       | String  |
| dstCaseSensitiveType      | Case-sensitive type of destination metadata <br/><br/> UpperCase <br/> LowerCase <br/> Sensitive <br/> NoSpecified | Body     | False       | String  |
| srcCaseSensitiveType      | Case-sensitive type of source metadata <br/><br/> UpperCase <br/> LowerCase <br/> Sensitive <br/> NoSpecified | Body     | False       | String  |
| srcDsCharset              | Encoding of the source data source, obtained through the "Get Encoding List Based on Data Source Type" API | Body     | True       | String  |
| tarDsCharset              | Encoding of the target data source, obtained through the "Get Encoding List Based on Data Source Type" API | Body     | True       | String  |
| dstCkTableEngine          | Table engine selection for ClickHouse if the target is ClickHouse <br/><br/> CollapsingMergeTree <br/> ReplacingMergeTree | Body     | False       | String  |
| dstMqDefaultTopic         | Default topic for delivering newly added tables during full data migration if the target is a message queue (Kafka/RocketMQ) | Body | False       | String  |
| dstMqDefaultTopicPartitions | Number of partitions for the default topic | Body | False | Integer |
| dstSchemaLessFormat       | Data format for destination if it is a message (Kafka/RocketMQ) or cache (Redis) <br/><br/> CLOUDCANAL_JSON_FOR_MQ <br/> CANAL_JSON_FOR_MQ <br/> VALUE_JSON_FOR_CACHE <br/> VALUE_COL_CAMEL_CASE_JSON_FOR_CACHE | Body | False | String |
| srcSchemaLessFormat       | Data format for source if it is a message (Kafka/RocketMQ) or cache (Redis) <br/><br/> CLOUDCANAL_JSON_FOR_MQ <br/> CANAL_JSON_FOR_MQ <br/> VALUE_JSON_FOR_CACHE <br/> VALUE_COL_CAMEL_CASE_JSON_FOR_CACHE | Body | False | String |
| filterDDL                | Whether to filter DDL synchronization <br/><br/> True: filter, False: do not filter | body     | True      | Boolean |
| kafkaConsumerGroupId     | Consumer Group ID for the source if it is Kafka                             | Body     | False       | String  |
| srcRabbitExchange        | Exchange for the source if it is RabbitMQ                                   | Body     | False       | String  |
| srcRabbitMqVhost         | VHost for the source if it is RabbitMQ                                      | Body     | False       | String  |
| srcRocketMqGroupId       | Group ID for the source if it is RocketMQ                                   | Body     | False       | String  |
| keyConflictStrategy      | How to handle primary key or unique key conflicts if the target is a relational database <br/><br/> IGNORE <br/> REPLACE <br/> EXCEPTION (not supported yet) | body | False | String |
| kuduNumReplicas          | Number of replicas for Kudu if the target is Kudu                            | Body     | False       | Integer |
| schemaWhiteListLevel     | Whitelist level. If empty, defaults to full whitelist mode (except for column change operations). Currently supports DB level and no value set. <br/><br/> NONE <br/> DB <br/> SCHEMA <br/> TABLE | Body | False | String |
| structMigration          | Whether to perform schema migration. If there is an item in srcSchema with targetAutoCreate set to true, this value is set to true | Body     | True      | Boolean | 

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code        | 1: Success， 0: Failure | String | True |
| data        |                      | Object | False |
| msg         |                      | String | False |
| requestId   |                      | String | True |

## Data parameter description

Data is a number that indicates the id of the task being created. You can query the task record with this id to obtain the id of the asynchronous task, and then query the asynchronous task to learn about the creation process.

## Response Example

```json
{
  "requestId": "422622b9-2bf5-11ec-8b3e-172e4c81a5c3",
  "code": "1",
  "msg": "request success",
  "data": 123243
}
```


