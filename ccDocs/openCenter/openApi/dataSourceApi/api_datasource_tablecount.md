---
id: api_datasource_tablecount
title: 数据库表数量
description: 接口描述：获取数据库表的数量，以便快速过滤掉空库
---

## 接口描述 

获取数据库表的数量，以便快速过滤掉空库

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datasource/schemastablecount`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId  |尝试连接数据源的机器集群id|   body    |   是   | Long |  
| dataSourceId  |目标数据源id|   body    |   是   | Long |    
| hostType  |所选数据源网络类型 <br/><br/>PRIVATE(内网) <br/>PUBLIC(公网)|   body    |   是   | String |      
| schemas  |是一个符合结构数组，具体说明如下|   body    |   是   | String |   

schema 复合结构说明

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| db  | database 名称,关系型数据库不为空|   body    |   是   | String  |  
| schema  |schema 名称,MySQL 为空|   body    |   否   | String |      

schema 复合结构示例

```json
{   
  "schemas": [
     {
		"db": "",
		"schema": ""
	 }
   ]
}
```

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 包含多组 json , 其中 key 表示 schema 信息, value 表示该 schema 所拥有的表数量

key 参数说明

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| dbName     |  数据库名称，关系型数据库不为空 |    String   |   否    |
| schema    |  schema 名称,MySQL 为空  |    String   |    否   |

## 响应示例

```json
{
  "requestId": "ad6d0db7-2bdb-11ec-b616-2bc3f3f1c79f",
  "code": "1",
  "msg": "request success",
  "data": {
    "{\"dbName\":\"console\",\"schema\":null}": 45,
    "{\"dbName\":\"dingtax\",\"schema\":null}": 26
  }
}
```


