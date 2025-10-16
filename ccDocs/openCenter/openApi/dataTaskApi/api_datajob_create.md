---
id: api_datajob_create
title: 创建数据任务
description: 接口描述：创建数据迁移、同步、校验、订正等任务。
---

## 接口描述 

创建数据迁移、同步、校验、订正等任务

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/create`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 | 是否必须 |  数据类型   |
| ------------ | -------------------------------- |-----------|------|----|
| clusterId  |链接数据源的集群id|   body    | 是    |  long |  
| srcDsId  |源端数据源id|   body    | 是    |  long |   
| srcHostType  |源数据源host类型 <br/><br/>PRIVATE <br/>PUBLIC|   body    | 是    |  String |   
| srcSchema  |源端库表描述，详见 [数据源schema说明](api_datajob_schema.md)|   body    | 是    |  String |      
| dstDsId  |目标数据源id|   body    | 是    |  long |     
| dstHostType  |目标数据源host类型 <br/><br/>PRIVATE <br/>PUBLIC|   body    | 是    |  String |     
| dstSchema  |目标库表描述,可由 srcSchema 配合 mappingDef 计算得出，可为空|   body    | 否    |  String |     
| mappingDef  |库表映射，详见 [映射规则说明](api_datajob_mapping.md)|   body    | 是    |  String |    
| jobType  |任务类型，可通过 [获取任务类型](../constApi/api_constant_listdatajobtype.md) 接口查询获取|   body    | 是    | String |  
| initialSync  |如果是数据同步任务，是否需要初始化数据(全量迁移)|   body    | 否    |  Boolean |     
| shortTermNum  |如果有短期同步，持续多少天|   body    | 否    |  int |     
| shortTermSync  |如果是数据迁移任务，是否需要短期同步|   body    | 否    |  Boolean |     
| specId  |规格id|   body    | 是    |  int |     
| dataJobDesc  |任务描述|   body    | 否    |  String |  
| fullPeriod  |是否是周期性全量迁移|   body    | 否    |  Boolean |     
| fullPeriodCronExpr  |周期性全量迁移 CronTab 表达式|   body    | 否    |  String |     
| autoStart  |是否自动启动|   body    | 否    |  Boolean |     
| checkOnce  |增量追上后是否做一次全量数据校验|   body    | 否    |  Boolean |     
| checkPeriod  |是否是周期性校验|   body    | 否    |  Boolean |     
| checkPeriodCronExpr  |周期性校验 CronTab 表达式|   body    | 否    |  String |
| dstCaseSensitiveType  |目标元数据大小写类型 <br/><br/>UpperCase <br/>LowerCase <br/>Sensitive <br/>NoSpecified|   body    | 否    |  String | 
| srcCaseSensitiveType  |源端元数据大小写类型 <br/><br/>UpperCase <br/>LowerCase <br/>Sensitive <br/>NoSpecified|   body    | 否    |  String |     
| srcDsCharset  |源端数据源编码,可通过 [根据数据源类型获取编码列表](../constApi/api_constant_dscharset.md) 接口查询获取|   body    | 是    |  String |          
| tarDsCharset  |目标端数据源编码,可通过 [根据数据源类型获取编码列表](../constApi/api_constant_dscharset.md) 接口查询获取|   body    | 是    |  String |            
| dstCkTableEngine  |如果目标为 ClickHouse ，表引擎选择 <br/><br/>CollapsingMergeTree <br/>ReplacingMergeTree|   body    | 否    |  String |          
| dstMqDefaultTopic  |如果目标为消息(Kafka/RocketMQ) 且全库迁移，给同步过程中新增表的默认投递 topic |   body    | 否    |  String |    
| dstMqDefaultTopicPartitions  |默认投递 topic 分区数|   body    | 否    |   int| 
| dstSchemaLessFormat  |如果目标为消息(Kafka/RocketMQ)或缓存(Redis), 指定数据的格式 <br/><br/>CLOUDCANAL_JSON_FOR_MQ <br/>CANAL_JSON_FOR_MQ <br/>VALUE_JSON_FOR_CACHE <br/>VALUE_COL_CAMEL_CASE_JSON_FOR_CACHE |   body    | 否    |  String |  
| srcSchemaLessFormat  |如果源端为消息(Kafka/RocketMQ)或缓存(Redis), 指定数据的格式 <br/><br/>CLOUDCANAL_JSON_FOR_MQ <br/>CANAL_JSON_FOR_MQ <br/>VALUE_JSON_FOR_CACHE <br/>VALUE_COL_CAMEL_CASE_JSON_FOR_CACHE |   body    | 否    |  String |  
| filterDDL  |是否过滤 DDL 同步,true 表示过滤， false 表示不过滤|   body    | 是    |  Boolean |  
| kafkaConsumerGroupId  |如果源端为 Kafka, 指定 Consumer Group|   body    | 否    |  String | 
| srcRabbitExchange  |如果源端为 RabbitMQ, 指定 Exchange|   body    | 否    |  String | 
| srcRabbitMqVhost  |如果源端为 RabbitMQ, 指定 VHost|   body    | 否    |  String | 
| srcRocketMqGroupId  |如果源端为 RocketMQ, 指定 Group ID|   body    | 否    |  String | 
| keyConflictStrategy  |如果目标端是关系型数据库, 主键或者唯一键约束冲突如何响应。<br/><br/>IGNORE(忽略) <br/>REPLACE(替换) <br/>EXCEPTION(暂不支持)|   body    | 否    |  String | 
| kuduNumReplicas  |如果目标端是Kudu,其副本数|   body    | 否    |  int | 
| schemaWhiteListLevel  |白名单级别,如果为空，则默认完全白名单模式(列变更操作除外),目前支持 DB 级别和不设任何值 <br/><br/>NONE <br/>DB <br/>SCHEMA <br/>TABLE|   body    | 否    |  String| 
| structMigration  |是否做结构迁移,如果 srcSchema 中存在 targetAutoCreate 为 true 的项时,此值为true|   body    | 是    |  Boolean | 
| dbHeartbeatEnable | 开启数据源端心跳检测 | body | 否 | Boolean |

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 是一个数字, 表示正在创建的任务 id .可以用这个id查询任务记录，得到异步任务 id ,再查询异步任务了解创建进程

## 响应示例

```json
{
  "requestId": "422622b9-2bf5-11ec-8b3e-172e4c81a5c3",
  "code": "1",
  "msg": "request success",
  "data": 123243
}
```


