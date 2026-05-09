---
id: api_datasource_listtables
title: 表列表
description: 接口描述：获取数据库表列表，以便创建任务时选择需要迁移同步的表
---

## 接口描述 

获取数据库表列表，以便创建任务时选择需要迁移同步的表

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datasource/listtables`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId  |尝试连接数据源的机器集群id|   body    |   是   | long |  
| dataSourceId  |目标数据源id|   body    |   是   | long |    
| hostType  |所选数据源网络类型 <br/><br/>PRIVATE(内网) <br/>PUBLIC(公网)|   body    |   是   | string |      
| dbName  |数据库名称，根据不同数据源类型必填不一，关系型数据库必填|   body    |   否   | string |   
| schema  |schema名称，根据不同数据源必填不一|   body    |    否   | string |    

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为一个数组，其中参数说明如下

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| dbName     |  表所属的 dbName  |    string   |   否    |
| schemaName    | 表所属的 schema     |    string   |    否   |
| tableName    | 关系型数据库为表名称，消息为 topic , MongoDB 为 collection, 缓存为 namespace    |    string   |   是  |
| hasPk    | 表是否有主键     |    boolean   |    否   |
| indexMeta    | 如果数据源为 ElasticSearch , 则可能有非 null 值     |    string   |    否   |
| mqTopicPartitions    | 如果数据源是消息中间件且支持 partition (如 Kafka、RocketMQ 等), 则表示该 topic partition值 |    int   |    否   |

## 响应示例

```json
{
  "requestId": "3962501d-2bd7-11ec-b616-c1fbb3356577",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "dbName": "console",
      "schemaName": "",
      "tableName": "alert_config_detail",
      "hasPk": true,
      "indexMeta": null,
      "mqTopicPartitions": 0
    },
    {
      "dbName": "console",
      "schemaName": "",
      "tableName": "alert_event_log",
      "hasPk": true,
      "indexMeta": null,
      "mqTopicPartitions": 0
    },
    {
      "dbName": "console",
      "schemaName": "",
      "tableName": "aliyun_sts_token",
      "hasPk": true,
      "indexMeta": null,
      "mqTopicPartitions": 0
    }
  ]
}
```


