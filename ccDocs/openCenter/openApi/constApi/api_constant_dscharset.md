---
id: api_constant_dscharset
title: 数据源编码
description: 接口描述：获取数据源编码,以便创建任务时选择
---

## 接口描述 

获取数据源编码,以便创建任务时选择

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/dscharsetoptions`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| dataSourceType  |数据源类型 <br/><br/>MySQL <br/>PolarDbMySQL <br/>PolarDbX <br/>PostgreSQL <br/>Greenplum <br/>Oracle <br/>SQLServer <br/>Redis <br/>MongoDB <br/>Kafka <br/>RocketMQ <br/>RabbitMQ <br/>Hive <br/>ElasticSearch <br/>DRDS <br/>AdbForMySQL <br/>TiDB <br/>ClickHouse <br/>Kudu|   body    |   是   |string  |     

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 具有一个名为 dsCharsetOptions 的数组，数组项说明如下

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| dsCharset     |  编码名称   |    string   |   是    |
| defaultChecked     |   是否默认选中   |    boolean   |   是   |

## 响应示例

```json
{
  "requestId": "dd47ac5c-2cb4-11ec-a410-b3030910f280",
  "code": "1",
  "msg": "request success",
  "data": {
    "dsCharsetOptions": [
      {
        "defaultChecked": true,
        "dsCharset": "utf8mb4"
      },
      {
        "defaultChecked": false,
        "dsCharset": "utf8"
      },
      {
        "defaultChecked": false,
        "dsCharset": "gbk"
      }
    ]
  }
}
```


