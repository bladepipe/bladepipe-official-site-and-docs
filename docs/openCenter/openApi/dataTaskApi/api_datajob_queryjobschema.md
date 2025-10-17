---
id: api_datajob_queryjobschema
title: Query DataJob Metadata
description: Query the source metadata, target metadata, and metadata mapping of a created task
---

## Interface Overview

Query the source metadata, **target metadata**, and **metadata mapping of a created task**

## Interface Address`` 

`/cloudcanal/console/api/v1/openapi/datajob/queryjobschemabyid`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId         | ID of the job |Body | True     | Long   |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code          | 1: Success, 0: Failure                     | True     | String |
| data          | Response data.                             | False    | Object |
| msg           | Response message.                          | False    | String |
| requestId     | ID of the request.                         | True     | String |

## Data Parameter Description

| ParameterName | Parameter Description  | NotNull | Type(Java)
| ------------ |-----------|--------|----|
| sourceSchema          | Source metadata. See [Database, Table and Column Structure Specification](api_datajob_schema.md) for reference. | True     | String |
| targetSchema          | Default empty string.                                                                                            | True     | String |
| mappingConfig         | Metadata mapping. See [Metadata Mapping Specification](api_datajob_mapping.md) for reference.                  | True     | String |
| defaultTopic          | Default delivery queue for newly added table data during full database migration if the target is a message queue. | False    | String |
| defaultTopicPartition | Default number of partitions for the queue.                                                                      | True     | Int    |
| schemaWhiteListLevel  | Whitelist level. If empty, fully whitelist mode is used (except for column modification operations).           | False    | String |
| srcSchemaLessFormat   | Data format for the source message (Kafka/RocketMQ) or cache (Redis).                                             | True     | String |
| dstSchemaLessFormat   | Data format for the target message (Kafka/RocketMQ) or cache (Redis).                                             | True     | String |      


## Response Example

```json
{
  "requestId": "ea812377-2cbf-11ec-a410-b73acd35bc17",
  "code": "1",
  "msg": "request success",
  "data": {
    "sourceSchema": "[{\"db\":\"dingtax\",\"dbPattern\":\"\",\"tables\":[{\"table\":\"kbs_question\",\"tablePattern\":\"\",\"columns\":[{\"column\":\"ID\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"QUESTION\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"GRADE\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"CATEGORY\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"CATEGORY_ID\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"PRIMARY_KEYWORD\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"ALTERNATE_KEYWORD\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"SEARCH_KEYWORD\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"KEYWORD_OPTION\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"SYNONYMS\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"ANSWER_SHAPE\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"PERSPECTIVE_ID\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"ANSWER\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"ANSWER_MD5\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"VOICE_ANSWER\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"SHOW_ANSWER\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"REMARK\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"STATUS\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"VALID_DATE\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"INVALID_DATE\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"INVALID_REASON\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"ADD_MODE\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"ORIGINAL\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"APPROVAL_STATUS\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"MAP_SOURCE\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"MAP_ID\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"VOICE_URL\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"SYNC_FLAG\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"SYNC_TIME\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"BIZ_CATEGORY_ID\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"FILE_CODE\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"REFERENCE\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"SUGGESTION\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"BRIGHTNESS\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"OPEN_FLAG\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"RELATION_STATUS\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"CREATOR\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"CREATION_DATE\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"MODIFIER\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"MODIFICATION_DATE\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"QUESTION_TYPE\",\"targetAutoCreate\":false,\"inBlackList\":false}],\"actions\":[\"INSERT\",\"UPDATE\",\"DELETE\"],\"inBlackList\":false,\"targetAutoCreate\":false,\"specifiedPks\":[]},{\"table\":\"worker_stats\",\"tablePattern\":\"\",\"columns\":[{\"column\":\"id\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"gmt_create\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"worker_id\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"cpu_stat\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"mem_stat\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"disk_stat\",\"targetAutoCreate\":false,\"inBlackList\":false},{\"column\":\"col_new\",\"targetAutoCreate\":false,\"inBlackList\":false}],\"actions\":[\"INSERT\",\"UPDATE\",\"DELETE\"],\"inBlackList\":false,\"targetAutoCreate\":false,\"specifiedPks\":[]}],\"targetAutoCreate\":false,\"inBlackList\":false}]",
    "targetSchema": "",
    "mappingConfig": "[{\"method\":\"DB_DB\",\"serializeMapping\":{\"{\\\"value\\\":\\\"dingtax\\\"}\":\"{\\\"value\\\":\\\"dingtax_re\\\"}\"},\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"},{\"serializeMapping\":{},\"method\":\"TABLE_TABLE\",\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"},{\"method\":\"COLUMN_COLUMN\",\"serializeMapping\":{},\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"}]",
    "defaultTopic": null,
    "defaultTopicPartition": 0,
    "schemaWhiteListLevel": null,
    "srcSchemaLessFormat": null,
    "dstSchemaLessFormat": null
  }
}
```


