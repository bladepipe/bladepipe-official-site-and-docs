---
id: api_datajob_precheckdetail
title: 任务预检(详细)
description: 接口描述：任务信息详细校验，包括字符集、数据权限、元数据是否存在等
---

## 接口描述 

任务信息详细校验，包括**字符集**、**数据权限**、**元数据是否存在**等

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/precheckdetail`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId  |链接数据源的集群id|   body    |   是   |  long |  
| srcDsId  |源端数据源id|   body    |    是   |  long |   
| srcHostType  |源数据源host类型 <br/><br/>PRIVATE <br/>PUBLIC|   body    |   是   |  String |   
| srcSchema  |源端库表描述，详见 [数据源schema说明](api_datajob_schema.md)|   body    |    是   |  String |      
| dstDsId  |目标数据源id|   body    |   是   |  long |     
| dstHostType  |目标数据源host类型 <br/><br/>PRIVATE <br/>PUBLIC|   body    |   是   |  String |     
| dstSchema  |目标库表描述,可由 srcSchema 配合 mappingDef 计算得出，可为空|   body    |   否   |  String |     
| mappingDef  |库表映射，详见 [映射规则说明](api_datajob_mapping.md)|   body    |   是   |  String |    
| jobType  |任务类型，可通过 [获取任务类型](../constApi/api_constant_listdatajobtype.md) 接口查询获取|   body    |   是   | String |  
| initialSync  |如果是数据同步任务，是否需要初始化数据(全量迁移)|   body    |   否   |  Boolean |     
| shortTermNum  |如果有短期同步，持续多少天|   body    |   否   |  int |     
| shortTermSync  |如果是数据迁移任务，是否需要短期同步|   body    |   否   |  Boolean |     
| specId  |规格id|   body    |    是   |  int |     
| fullPeriod  |是否是周期性全量迁移|   body    |   否   |  Boolean |     
| fullPeriodCronExpr  |周期性全量迁移 CronTab 表达式|   body    |   否   |  String |     
| autoStart  |是否自动启动|   body    |   否   |  Boolean |     
| checkOnce  |增量追上后是否做一次全量数据校验|   body    |   否   |  Boolean |     
| checkPeriod  |是否是周期性校验|   body    |   否   |  Boolean |     
| checkPeriodCronExpr  |周期性校验 CronTab 表达式|   body    |   否   |  String |     

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
| title     |  测试项名称    |    Long   |   是    |
| passRequirement    | 测试项通过需要的条件     |    String   |   是    |
| varName      |   参数名称   |    String   |    否   |
| varRequireValues     |   参数需要符合的值   |    String   |  否     |
| varActualValue     |  参数实际值  |    String   |   否    |
| preCheckType     | 校验类型 <br/><br/>CONNECTIVITY(可连接性) <br/>VERSION(版本) <br/>BINLOG_EXISTENCE(增量日志是否存在) <br/>PRIVILEGES(权限) <br/>STRUCT_TABLE_STORAGE(表存储) <br/>STRUCT_TABLE_PK(主键) <br/>STRUCT_TABLE_CHARSET(表字符集) <br/>STRUCT_TABLE_COLLATION(表校验集) <br/>STRUCT_TABLE_FK(外键) <br/>STRUCT_EXISTENCE(库表列是否存在) <br/>VARIABLES(数据库参数) <br/>SPEC_SCHEDULE_SUPPORT(容量是否足够) <br/>INCREMENT_BALANCE(增量license) <br/>FULL_BALANCE(全量任务license) <br/>CHECK_BALANCE(校验任务license) <br/>STRUCT_BALANCE(结构迁移license) <br/>NAME_LENGTH(元数据名字长度) <br/>INDEX_COLUMN(索引列) <br/>COLUMN_TYPE(列类型)<br/>VERSION_COMPATIBILITY(版本兼容度)  |    String   |   否    |
| success     | 该项是否预检成功  |    String   |   否    |
| checked     | 该项是否已经预检 |    int   |   否    |
| contextDbName     |  检查所关联的db |    int   |   否    |
| contextTableName     | 检查所关联的表  |    String   |   否    |
| contextColumnName     | 检查所关联的列  |    String   |   否    |

## 响应示例

```json
{
  "requestId": "282a9033-2c26-11ec-9577-adaf6efb66da",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "title": "源端库表结构检查",
      "passRequirement": "所选库/表/字段需要在数据库中(除待建库/表/字段)",
      "varName": null,
      "varRequireValues": null,
      "varActualValue": null,
      "preCheckType": "STRUCT_EXISTENCE",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    },
    {
      "title": "源端表字符集检查",
      "passRequirement": "仅支持'utf8','utf8mb4'字符集",
      "varName": null,
      "varRequireValues": [
        "utf8",
        "utf8mb4"
      ],
      "varActualValue": "utf8mb4",
      "preCheckType": "STRUCT_TABLE_CHARSET",
      "success": true,
      "checked": true,
      "contextDbName": "dingtax",
      "contextTableName": "worker_stats",
      "contextColumnName": null
    },
    {
      "title": "源端外键检查",
      "passRequirement": "不支持跨库的外键约束",
      "varName": null,
      "varRequireValues": null,
      "varActualValue": null,
      "preCheckType": "STRUCT_TABLE_FK",
      "success": true,
      "checked": true,
      "contextDbName": "dingtax",
      "contextTableName": "proc_table_ref",
      "contextColumnName": null
    },
    {
      "title": "源端表存储格式检查",
      "passRequirement": "只支持'InnoDB'格式",
      "varName": null,
      "varRequireValues": [
        "InnoDB",
        "XENGINE",
        "MyISAM"
      ],
      "varActualValue": "InnoDB",
      "preCheckType": "STRUCT_TABLE_STORAGE",
      "success": true,
      "checked": true,
      "contextDbName": "dingtax",
      "contextTableName": "worker_stats",
      "contextColumnName": null
    },
    {
      "title": "binlog 文件存在性检查",
      "passRequirement": "\"show master status\" 显示的 binlog 文件需要在数据库中",
      "varName": null,
      "varRequireValues": null,
      "varActualValue": null,
      "preCheckType": "BINLOG_EXISTENCE",
      "success": true,
      "checked": true,
      "contextDbName": null,
      "contextTableName": null,
      "contextColumnName": null
    }
  ]
}
```


