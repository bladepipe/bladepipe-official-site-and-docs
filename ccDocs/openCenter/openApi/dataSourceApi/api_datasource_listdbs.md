---
id: api_datasource_listdbs
title: 数据库列表
description: 接口描述：获取数据库实例的数据库列表信息
---

## 接口描述 

获取数据库实例的数据库列表信息

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datasource/listdbs`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId  |尝试连接数据源的机器集群id|   body    |   是   | long |  
| dataSourceId  |目标数据源id|   body    |   是   | long |    
| hostType  |所选数据源网络类型 <br/><br/>PRIVATE(内网) <br/>PUBLIC(公网)|   body    |   是   | string |       

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data是一个数组，数组中参数说明如下

| 参数名称               | 参数说明                 | 类型(java)  |  不为空 |
|--------------------|----------------------|-----------|----------- |
| dbName             | 数据库名称,根据不同数据源决定是否为空  | string    |   否    |
| schemas            | schema,根据不同数据源决定是否为空 | ArrayList |    否   |
| caseSensitiveType  | 大小写敏感类型，有LOWER和UPPER | string |    否   |

## 响应示例

```json
{
  "requestId": "01c584d2-2b5c-11ec-8c7e-d9df82935fdd",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "dbName": "abc",
      "schemas": []
    },
    {
      "dbName": "canal_tsdb",
      "schemas": []
    },
    {
      "dbName": "cloudcanal",
      "schemas": []
    },
    {
      "dbName": "clouddm",
      "schemas": []
    },
    {
      "dbName": "col_project",
      "schemas": []
    },
    {
      "dbName": "console",
      "schemas": []
    },
    {
      "dbName": "crm9",
      "schemas": []
    },
    {
      "dbName": "data_error",
      "schemas": []
    },
    {
      "dbName": "dingtax",
      "schemas": []
    },
    {
      "dbName": "drds_1",
      "schemas": []
    },
    {
      "dbName": "drds_2",
      "schemas": []
    },
    {
      "dbName": "from_polardb_x",
      "schemas": []
    },
    {
      "dbName": "huge_tables",
      "schemas": []
    },
    {
      "dbName": "integration_src",
      "schemas": []
    },
    {
      "dbName": "ke",
      "schemas": []
    },
    {
      "dbName": "merge_db",
      "schemas": []
    },
    {
      "dbName": "merge_db_1",
      "schemas": []
    },
    {
      "dbName": "mq_test_source",
      "schemas": []
    },
    {
      "dbName": "mysiam_test",
      "schemas": []
    },
    {
      "dbName": "no_data",
      "schemas": []
    },
    {
      "dbName": "no_table",
      "schemas": []
    },
    {
      "dbName": "nobefore",
      "schemas": []
    },
    {
      "dbName": "not_supported",
      "schemas": []
    },
    {
      "dbName": "quartz",
      "schemas": []
    },
    {
      "dbName": "tpch",
      "schemas": []
    },
    {
      "dbName": "upper_case_db",
      "schemas": []
    },
    {
      "dbName": "urge",
      "schemas": []
    },
    {
      "dbName": "zeroday",
      "schemas": []
    }
  ]
}
```


