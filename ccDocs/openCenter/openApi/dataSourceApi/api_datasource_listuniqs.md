---
id: api_datasource_listuniqs
title: 唯一键列表
description: 接口描述：获取数据库表的唯一键列表，以便创建任务时设置唯一键为主键
---

## 接口描述 

获取数据库表的唯一键列表，以便创建任务时设置唯一键为主键

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datasource/listuniqs`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId  |尝试连接数据源的机器集群id|   body    |   是   | long |  
| dataSourceId  |目标数据源id|   body    |   是   | long |    
| hostType  |所选数据源网络类型 <br/><br/>PRIVATE(内网) <br/>PUBLIC(公网)|   body    |   是   | string |      
| dbName  |数据库名称，如果是 MySQL ，请填充到 schemas 参数|   body    |   否   | string |   
| schemas  |schema名称列表，包括 MySQL dbname, PostgreSQL schema ,Oracle schema|   body    |   是   | List |    

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 包含多组 json object, 每一组 key 表示表，value 是表示该表所拥有的唯一键队列
 
key 参数说明

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| dbName     | 数据库名称,根据不同数据源决定是否为空    |    string   |   否    |
| tableSchema    | schema,根据不同数据源决定是否为空     |    string   |    否   |
| tableName    | 表名     |    string   |    是   |

value 数组元素

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| constraintCatalog     | 约束所属的 dbName ,MySQL 默认为空   |    string   |   否    |
| constraintSchema    | 约束所属的 schema     |    string   |    是   |
| constraintName    | 约束名称    |    string   |   是  |
| tableSchema    | 约束所作用的 schema     |    string   |    是   |
| tableName    | 约束所作用的表(非类似外键依赖表)     |    string   |    是   |
| constraintType    | 约束类型 <br/><br/>PrimaryKey <br/>Unique <br/>ForeignKey     |    string   |    是   |
| cols    | 该约束包含的列     |    string   |    是  |

## 响应示例

```json
{
  "requestId": "c7ed1d38-2bd0-11ec-b616-e92730e52825",
  "code": "1",
  "msg": "request success",
  "data": {
    "{\"dbName\":\"console\",\"tableSchema\":null,\"tableName\":\"meta_snapshot\"}": [
      {
        "constraintCatalog": null,
        "constraintSchema": "console",
        "constraintName": "binlog_file_offest",
        "tableSchema": "console",
        "tableName": "meta_snapshot",
        "constraintType": "Unique",
        "cols": [
          "destination",
          "binlog_master_id",
          "binlog_file",
          "binlog_offset"
        ]
      }
    ],
    "{\"dbName\":\"console\",\"tableSchema\":null,\"tableName\":\"console_user\"}": [
      {
        "constraintCatalog": null,
        "constraintSchema": "console",
        "constraintName": "idx_unique_ak",
        "tableSchema": "console",
        "tableName": "console_user",
        "constraintType": "Unique",
        "cols": [
          "ak"
        ]
      },
      {
        "constraintCatalog": null,
        "constraintSchema": "console",
        "constraintName": "idx_unique_sk",
        "tableSchema": "console",
        "tableName": "console_user",
        "constraintType": "Unique",
        "cols": [
          "sk"
        ]
      }
    ]
  }
}
```


