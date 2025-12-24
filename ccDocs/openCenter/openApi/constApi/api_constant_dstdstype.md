---
id: api_constant_dstdstype
title: 目标端数据源类型
description: 接口描述：获取目标端数据源类型,以便创建任务选择
---

## 接口描述 

获取目标端数据源类型，以便创建任务选择

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/dstdstype`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| sourceType  |源端数据源类型 , 根据 [获取源端数据源类型](api_constant_srcdstype.md) 获取|   body    |   是   |string  |     
| deployType  |数据源部署类型 <br/><br/>SELF_MAINTENANCE(自建) <br/>ALIBABA_CLOUD_HOSTED(阿里云) |   body    |   是   |string  |     

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为数组，数组元素为数据源类型

## 响应示例

```json
{
  "requestId": "5d580478-2be4-11ec-b616-fbb1cde383d4",
  "code": "1",
  "msg": "request success",
  "data": [
    "MySQL",
    "TiDB",
    "PostgreSQL",
    "Greenplum",
    "ElasticSearch",
    "ClickHouse",
    "Kafka",
    "RocketMQ",
    "RabbitMQ",
    "Hive",
    "Oracle",
    "Kudu",
    "MongoDB",
    "Redis"
  ]
}
```


