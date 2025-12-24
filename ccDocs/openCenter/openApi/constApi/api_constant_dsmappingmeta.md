---
id: api_constant_dsmappingmeta
title: 元数据映射结构
description: 接口描述：获取数据源映射信息,以便创建任务时选择
---

## 接口描述 

获取数据源映射信息，以便创建任务时选择

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/dsmappingmeta`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| srcDsType  |源数据源类型 <br/><br/>MySQL <br/>PolarDbMySQL <br/>PolarDbX <br/>PostgreSQL <br/>Greenplum <br/>Oracle <br/>SQLServer <br/>Redis <br/>MongoDB <br/>Kafka <br/>RocketMQ <br/>RabbitMQ <br/>Hive <br/>ElasticSearch <br/>DRDS <br/>AdbForMySQL <br/>TiDB <br/>ClickHouse <br/>Kudu|   body    |   是   |string  |     
| dstDsType  |目标数据源类型 <br/><br/>MySQL <br/>PolarDbMySQL <br/>PolarDbX <br/>PostgreSQL <br/>Greenplum <br/>Oracle <br/>SQLServer <br/>Redis <br/>MongoDB <br/>Kafka <br/>RocketMQ <br/>RabbitMQ <br/>Hive <br/>ElasticSearch <br/>DRDS <br/>AdbForMySQL <br/>TiDB <br/>ClickHouse <br/>Kudu|   body    |   是   |string  |     

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 具有一个名为 dsMappingInfo 的数组，数组项参数说明如下

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| method     |  映射规则名称   |    string   |   是    |
| srcParents     |   源端元数据父节点信息,可选值包括 <br/>DB <br/>SCHEMA <br/>TABLE <br/>COLUMN <br/>TOPIC <br/>INDEX|    List   |   是   |
| dstParents     |   目标元数据父节点信息,可选值包括 <br/>DB <br/>SCHEMA <br/>TABLE <br/>COLUMN <br/>TOPIC <br/>INDEX|    List   |   是   |

## 响应示例

```json
{
  "requestId": "c00aa078-2cb4-11ec-a410-6990afdaac21",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "method": "DB_SCHEMA",
      "srcParents": [],
      "dstParents": [
        "DB"
      ]
    },
    {
      "method": "TABLE_TABLE",
      "srcParents": [
        "DB"
      ],
      "dstParents": [
        "SCHEMA",
        "DB"
      ]
    },
    {
      "method": "COLUMN_COLUMN",
      "srcParents": [
        "TABLE",
        "DB"
      ],
      "dstParents": [
        "TABLE",
        "SCHEMA",
        "DB"
      ]
    }
  ]
}
```


