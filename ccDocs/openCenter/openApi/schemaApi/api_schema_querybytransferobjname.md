---
id: api_schema_querybytransferobjname
title: 查询表映射
sidebar_position: 1
description: 接口描述：根据 表/topic/collection 等源端同步元素，查询目的端元数据
---

## 接口描述 

根据 表/topic/collection 等源端同步元素，查询目的端元数据

## 接口地址 

`/cloudcanal/console/api/v1/openapi/schema/querybytransferobjname`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| transferObjName  |同步任务源端数据源 表/topic/collection 等信息 |   body    |   是   |string  |     

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为数组,其中每一组数据中的字段说明如下:

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| srcTransferObjName     |  同步任务源端数据源 表/topic/collection 等信息   |    string   |   是    |
| targetSchemaObjs    | 对象数组，每一个元素表示一个目的端     |    array   |    是   |

### targetSchemaObjs 元素字段说明

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| dataJobId     |  Data Job id   |     long  |   是    |
| dataJobName    | Data Job 名称|    string   |    是   |
| dataJobDesc    | Data Job 描述|    string   |    否   |
| db    | 对端数据库名称，如ORACLE/PostgreSQL/SQLServer等不为空，MySQL/Kafka/MongoDB/StarRocks/Doris/ClickHouse/Kafka/RocketMQ/RabbitMq等为空|    string   |    否   |
| schema  | 对端schema名称，ORACLE/PostgreSQL/SQLServer/MySQL/MongoDB/StarRocks/Doris/ClickHouse等不为空，Kafka/RocketMQ/RabbitMq为空|    string   |    否   |
| transferObjName    | 对端 表/index/topic/collection|    string   |    否   |

## 响应示例

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


