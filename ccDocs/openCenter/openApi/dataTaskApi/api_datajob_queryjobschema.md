---
id: api_datajob_queryjobschema
title: 数据任务元数据
description: 接口描述：查询已创建任务源端元数据,目标元数据,元数据映射
---

## 接口描述 

查询已创建任务**源端元数据**,**目标元数据**,**元数据映射**

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/queryjobschemabyid`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId  |任务id|   body    |   是   |  long |  

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| sourceSchema  | 源端元数据, 参考 [库表列结构说明](api_datajob_schema.md) |   是   |  String |   
| targetSchema  | 默认为空字符串|   是   | String |    
| mappingConfig | 元数据映射, 参考 [元数据映射说明](api_datajob_mapping.md)   |   是   |  String |    
| defaultTopic  | 如果是全库迁移，且对端为消息，则新增表数据默认投递的队列|   否   |  String | 
| defaultTopicPartition  | 默认队列分区数  |    是   |  int |      
| schemaWhiteListLevel  | 白名单级别,如果为空，则默认完全白名单模式(列变更操作除外),目前支持 DB 级别和不设任何值 <br/>NONE <br/>DB <br/>SCHEMA <br/>TABLE |   否   |  String |     
| srcSchemaLessFormat  |如果源为消息(Kafka/RocketMQ)或缓存(Redis), 指定数据的格式 <br/><br/>CLOUDCANAL_JSON_FOR_MQ <br/>CANAL_JSON_FOR_MQ <br/>VALUE_JSON_FOR_CACHE <br/>VALUE_COL_CAMEL_CASE_JSON_FOR_CACHE  |   是   |  String |     
| dstSchemaLessFormat  |如果目标为消息(Kafka/RocketMQ)或缓存(Redis), 指定数据的格式 <br/><br/>CLOUDCANAL_JSON_FOR_MQ <br/>CANAL_JSON_FOR_MQ <br/>VALUE_JSON_FOR_CACHE <br/>VALUE_COL_CAMEL_CASE_JSON_FOR_CACHE|   是   |  String |       


## 响应示例

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


