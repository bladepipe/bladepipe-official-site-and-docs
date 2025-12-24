---
id: api_datajob_queryjobcreatedetail
title: 查询任务创建详情
description: 接口描述：根据任务id查询任务创建时的完整配置详情
---

## 接口描述 

根据任务id查询任务创建时的完整配置详情，返回创建任务时使用的所有配置参数，可用于复制任务或查看任务配置。

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/queryjobcreatedetail`

## 请求方式

`POST`       

## 请求参数

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| -------- | -------- | -------- | -------- | -------- |
| jobId | 任务id | body | 是 | long |

## 公共响应结果

| 参数名称 | 参数说明 | 类型(java) | 不为空 |
| -------- | -------- | ---------- | ------ |
| code | 1:成功 0:失败 | string | 是 |
| data | | object | 否 |
| msg | | string | 否 |
| requestId | | string | 是 |

## data 参数说明

返回任务创建时的完整配置详情：

### 基础配置

| 参数名称 | 参数说明                              | 不为空 | 数据类型 |
| -------- |-----------------------------------| ------ | -------- |
| clusterId | 跑任务的机器集群ID                        | 是 | long |
| srcDsId | 源数据源ID                            | 是 | long |
| dstDsId | 目标数据源ID                           | 是 | long |
| srcHostType | 源端数据源 HOST 类型，可选值：PUBLIC、PRIVATE  | 是 | string |
| dstHostType | 目标端数据源 HOST 类型，可选值：PUBLIC、PRIVATE | 是 | string |
| specId | 规格ID                              | 是 | long |

### Schema 配置

| 参数名称 | 参数说明 | 不为空 | 数据类型 |
| -------- | ----- | ------ | -------- |
| schemaWhiteListLevel | Schema白名单级别 | 否 | string |
| srcSchema | 源端Schema配置 | 否 | string |
| dstSchema | 目标端Schema配置（JSON字符串） | 否 | string |
| mappingDef | 映射定义配置（JSON字符串） | 否 | string |
| srcCaseSensitiveType | 源端大小写敏感类型 | 否 | string |
| dstCaseSensitiveType | 目标端大小写敏感类型 | 否 | string |
| srcDsCharset | 源端字符集 | 否 | string |
| tarDsCharset | 目标端字符集 | 否 | string |
| srcSchemaLessFormat | 源端无模式值格式 | 否 | string |
| dstSchemaLessFormat | 目标端无模式值格式 | 否 | string |

### 任务配置

| 参数名称 | 参数说明                                                  | 不为空 | 数据类型 |
| -------- |-------------------------------------------------------| ------ | -------- |
| jobType | 任务类型，可选值：MIGRATION、SYNC、CHECK、REVISE、STRUCT_MIGRATION | 是 | string |
| dataJobDesc | 任务描述                                                  | 否 | string |
| keyConflictStrategy | 主键冲突策略，可选值：IGNORE、REPLACE、EXCEPTION                   | 否 | string |
| structMigration | 是否做结构迁移                                               | 是 | boolean |
| initialSync | 是否做历史数据初始化                                            | 是 | boolean |
| filterDDL | 是否过滤DDL                                               | 是 | boolean |
| shortTermSync | 是否短期同步                                                | 是 | boolean |
| shortTermNum | 短期同步时间(天)                                             | 否 | int |

### 周期任务配置

| 参数名称 | 参数说明 | 不为空 | 数据类型 |
| -------- | ------ | ------ | -------- |
| autoStart | 是否自动启动 | 是 | boolean |
| checkOnce | 是否单次校验 | 是 | boolean |
| checkPeriod | 是否周期校验 | 是 | boolean |
| checkPeriodCronExpr | 校验周期Cron表达式 | 否 | string |
| fullPeriod | 是否周期全量 | 是 | boolean |
| fullPeriodCronExpr | 全量周期Cron表达式 | 否 | string |

## 响应示例

```json
{
  "code": "1",
  "msg": "request success",
  "data":
  {
    "clusterId": 1,
    "srcDsId": 156,
    "dstDsId": 157,
    "srcHostType": "PRIVATE",
    "dstHostType": "PUBLIC",
    "schemaWhiteListLevel": null,
    "srcSchema": "[...]",
    "dstSchema": "",
    "mappingDef": "[{\"method\":\"DB_DB\",\"serializeMapping\":{},\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"},{\"serializeMapping\":{},\"method\":\"TABLE_TABLE\",\"serializeAutoGenRules\":{},\"commonGenRule\":\"TO_LOWER_CASE\"},{\"method\":\"COLUMN_COLUMN\",\"serializeMapping\":{},\"serializeAutoGenRules\":{},\"commonGenRule\":\"MIRROR\"}]",
    "srcCaseSensitiveType": "Sensitive",
    "dstCaseSensitiveType": "Sensitive",
    "srcDsCharset": "utf8mb4",
    "tarDsCharset": "utf8mb4",
    "keyConflictStrategy": "IGNORE",
    "jobType": "SYNC",
    "dataJobDesc": "",
    "structMigration": false,
    "initialSync": true,
    "shortTermSync": false,
    "shortTermNum": 0,
    "filterDDL": false,
    "specId": 16,
    "autoStart": false,
    "checkOnce": false,
    "checkPeriod": false,
    "checkPeriodCronExpr": null,
    "fullPeriod": false,
    "fullPeriodCronExpr": null,
    "srcSchemaLessFormat": null,
    "dstSchemaLessFormat": null
  },
  "requestId": "0feaab4f-ce6d-11f0-8388-7386474fd961",
  "fail": false,
  "success": true
}
```
