---
id: api_datajob_precheckbasic
title: 任务预检(基础)
description: 接口描述：任务信息基础校验，包括可连接性、基本参数、权限等
---

## 接口描述 

任务信息基础校验，包括**可连接性**、**基本参数**、**权限**等

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/precheckbasic`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId  |链接数据源的集群id|   body    |   是   |  long |  
| srcDsId  |源端数据源id|   body    |    是   |  long |   
| srcHostType  |源数据源host类型 <br/><br/>PRIVATE <br/>PUBLIC|   body    |   是   |  string |   
| srcSchema  |源端库表描述，见示例|   body    |    是   |  string |      
| dstDsId  |目标数据源id|   body    |   是   |  long |     
| dstHostType  |目标数据源host类型 <br/><br/>PRIVATE <br/>PUBLIC|   body    |   是   |  string |     
| dstSchema  |目标库表描述,可由 srcSchema 配合 mappingDef 计算得出，可为空|   body    |   否   |  string |     
| mappingDef  |库表映射，见示例|   body    |   是   |  string |    
| jobType  |任务类型，可通过 [获取任务类型](../constApi/api_constant_listdatajobtype.md) 接口查询获取|   body    |   是   | string |  
| initialSync  |如果是数据同步任务，是否需要初始化数据(全量迁移)|   body    |   否   |  boolean |     
| shortTermNum  |如果有短期同步，持续多少天|   body    |   否   |  int |     
| shortTermSync  |如果是数据迁移任务，是否需要短期同步|   body    |   否   |  boolean |     
| specId  |规格id|   body    |    是   |  int |     
| fullPeriod  |是否是周期性全量迁移|   body    |   否   |  boolean |     
| fullPeriodCronExpr  |周期性全量迁移 CronTab 表达式|   body    |   否   |  string |     
| autoStart  |是否自动启动|   body    |   否   |  boolean |     
| checkOnce  |增量追上后是否做一次全量数据校验|   body    |   否   |  boolean |     
| checkPeriod  |是否是周期性校验|   body    |   否   |  boolean |     
| checkPeriodCronExpr  |周期性校验 CronTab 表达式|   body    |   否   |  string |     

### srcSchema 说明 (MySQL)
不同数据源 schema 存在不同的字段描述,需要更多源端数据源可找产品团队咨询

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| db  | 映射方法 <br/><br/>DB_DB <br/>SCHEMA_SCHEMA <br/>TABLE_TABLE <br/>COLUMN_COLUMN <br/>DB_SCHEMA <br/>SCHEMA_DB <br/>DB_TOPIC <br/>TABLE_TOPIC <br/>TOPIC_TABLE <br/>TOPIC_INDEX <br/>ANY_DB <br/>TABLE_INDEX <br/>TABLE_KEYPREFIX|   body    |   是   | string  |  
| dbPattern  |嵌套多层映射关系,根据 method 或 parent 为空进行识别|   body    |   否   | string |      
| tables  |该数据库所拥有的表|   body    |   是   | string |      
| targetAutoCreate  |对端是否需要自动创建|   body    |   是   | string | 
| inBlackList  |是否在黑名单(不同步或者迁移数据)|   body    |   是   | string |   

```json
[
    {
        "db": "dingtax",
        "dbPattern": "",
        "tables": [],
        "targetAutoCreate": false,
        "inBlackList": false
    }
]
```

### mappingDef 说明

mappingDef 为一个数组，每一个组代表一种映射

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| method  | 映射方法 <br/><br/>DB_DB <br/>SCHEMA_SCHEMA <br/>TABLE_TABLE <br/>COLUMN_COLUMN <br/>DB_SCHEMA <br/>SCHEMA_DB <br/>DB_TOPIC <br/>TABLE_TOPIC <br/>TOPIC_TABLE <br/>TOPIC_INDEX <br/>ANY_DB <br/>TABLE_INDEX <br/>TABLE_KEYPREFIX|   body    |   是   | string  |  
| serializeMapping  |嵌套多层映射关系,根据 method 或 parent 为空进行识别|   body    |   否   | string |      
| serializeAutoGenRules  |指定映射规则|   body    |   是   | string |      
| commonGenRule  |通用映射规则|   body    |   是   | string |  

mappingDef 示例(MySQL -> PostgreSQL)

```json
[
    {
        "method": "DB_SCHEMA",
        "serializeMapping": {
            "{\"value\":\"dingtax\"}": "{\"parent\":{\"value\":\"dingtax_target\"},\"value\":\"public\"}"
        },
        "serializeAutoGenRules": {},
        "commonGenRule": "MIRROR"
    },
    {
        "serializeMapping": {},
        "method": "TABLE_TABLE",
        "serializeAutoGenRules": {},
        "commonGenRule": "MIRROR"
    },
    {
        "method": "COLUMN_COLUMN",
        "serializeMapping": {},
        "serializeAutoGenRules": {},
        "commonGenRule": "MIRROR"
    }
]
```

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 是一个数组，数组里面每一项表示一个检查项，检查项参数说明如下

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| title     |  测试项名称    |    string   |   是    |
| passRequirement    | 测试项通过需要的条件     |    string   |   是    |
| varName      |   参数名称   |    string   |    否   |
| varRequireValues     |   参数需要符合的值   |    string   |  否     |
| varActualValue     |  参数实际值  |    string   |   否    |
| preCheckType     | 校验类型 <br/>CONNECTIVITY(可连接性) <br/>VERSION(版本) <br/>BINLOG_EXISTENCE(增量日志是否存在) <br/>PRIVILEGES(权限) <br/>STRUCT_TABLE_STORAGE(表存储) <br/>STRUCT_TABLE_PK(主键) <br/>STRUCT_TABLE_CHARSET(表字符集) <br/>STRUCT_TABLE_COLLATION(表校验集) <br/>STRUCT_TABLE_FK(外键) <br/>STRUCT_EXISTENCE(库表列是否存在) <br/>VARIABLES(数据库参数) <br/>SPEC_SCHEDULE_SUPPORT(容量是否足够) <br/>INCREMENT_BALANCE(增量license) <br/>FULL_BALANCE(全量任务license) <br/>CHECK_BALANCE(校验任务license) <br/>STRUCT_BALANCE(结构迁移license) <br/>NAME_LENGTH(元数据名字长度) <br/>INDEX_COLUMN(索引列) <br/>COLUMN_TYPE(列类型)<br/>VERSION_COMPATIBILITY(版本兼容度)  |    string   |   否    |
| success     | 该项是否预检成功  |    boolean   |   否    |
| checked     | 该项是否已经预检 |    boolean   |   否    |
| contextDbName     |  检查所关联的db |    string   |   否    |
| contextTableName     | 检查所关联的表  |    string   |   否    |
| contextColumnName     | 检查所关联的列  |    string   |   否    |
| schemaName     | 检查所关联的 schema  |    string   |   否    |

## 响应示例

```json
{
  "requestId": "422622b9-2bf5-11ec-8b3e-172e4c81a5c3",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "title": "源端数据库连接测试",
      "passRequirement": "数据库能被链接上",
      "varName": null,
      "varRequireValues": null,
      "varActualValue": null,
      "preCheckType": "CONNECTIVITY",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "源端数据库版本检查",
      "passRequirement": "支持5.1.x,5.5.x,5.6.x,5.7.x,8.x MySQL",
      "varName": null,
      "varRequireValues": null,
      "varActualValue": null,
      "preCheckType": "VERSION",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "PRECHECK_PRIVS_SOURCE_SELECT_TITLE",
      "passRequirement": "需要有数据库dingtax select权限",
      "varName": null,
      "varRequireValues": [
        "select"
      ],
      "varActualValue": null,
      "preCheckType": "PRIVILEGES",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "参数'log_bin'检查",
      "passRequirement": "'log_bin'参数值必须为 1",
      "varName": "log_bin",
      "varRequireValues": [
        "1"
      ],
      "varActualValue": "1",
      "preCheckType": "VARIABLES",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "参数'binlog_format'检查",
      "passRequirement": "'binlog_format'参数值必须为'ROW'",
      "varName": "binlog_format",
      "varRequireValues": [
        "ROW"
      ],
      "varActualValue": "ROW",
      "preCheckType": "VARIABLES",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "参数'binlog_row_image'检查",
      "passRequirement": "'binlog_row_image'参数值必须为'FULL'",
      "varName": "binlog_row_image",
      "varRequireValues": [
        "FULL"
      ],
      "varActualValue": "FULL",
      "preCheckType": "VARIABLES",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "'replication client'权限检查",
      "passRequirement": "需要有'replication client'权限",
      "varName": null,
      "varRequireValues": [
        "replication client"
      ],
      "varActualValue": null,
      "preCheckType": "PRIVILEGES",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "'replication slave'权限检查",
      "passRequirement": "需要有'replication slave'权限",
      "varName": null,
      "varRequireValues": [
        "replication slave"
      ],
      "varActualValue": null,
      "preCheckType": "PRIVILEGES",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "任务规格可用性预检",
      "passRequirement": "您添加的机器的剩余可用内存需要满足所选任务的规格",
      "varName": null,
      "varRequireValues": null,
      "varActualValue": null,
      "preCheckType": "SPEC_SCHEDULE_SUPPORT",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    }
  ]
}
```


