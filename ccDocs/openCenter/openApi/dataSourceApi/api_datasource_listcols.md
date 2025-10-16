---
id: api_datasource_listcols
title: 列名列表
description: 接口描述：获取表的列，以便创建任务时选取需要的列
---

## 接口描述 

获取表的列，以便创建任务时选取需要的列

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datasource/listcols`

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
| tables  |表名列表|   body    |   是   | String |      

schema 复合结构示例

```json
{
  "schemas": [
     {
		"db": "",
		"schema": "",
	    "tables": []
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

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| tableMetaDataMap     | 包含多个库，多个表 中的列信息  |    String   |   否    |
| noPkTableNameList    | 没有主键的表列表      |    String   |    是   |
| numberOfShards    |  kudu 数据源有效   |    String   |   否  |
| numberOfReplicas    | kudu 数据源有效   |    String   |    否   |

列信息说明

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| columnName     | 列名称 |    String   |   是    |
| dataTypeWithLength    | 带长度描述的数据类型     |    String   |    否    |
| isNullable    |  是否可为null  |    Boolean   |   是  |
| dataType    | 数据类型   |    String   |   是  |
| sqlTypeIntValue    | 类型长度  |    int   |    否   |
| jdbcType    | jdbc类型   |    String   |    否   |
| timePrecision    | 时间精度   |    int   |    否   |
| characterMaxLength    | 字符串长度   |    String   |    否   |
| numberPrecision    | 数字精度   |    int   |    否   |
| numberScale    | 数字scale  |    int   |    否   |
| esAnalyzerType    | ElasticSearch 分词器类型  |    String   |    否   |
| needIndex    | ElasticSearch field是否需要索引   |    String   |    否   |
| timeFormat    |  时间格式  |    String   |    否   |
| pk    | 是否是主键   |    Boolean   |    是   |

## 响应示例

```json
{
  "requestId": "6fd787d4-2bdf-11ec-b616-5141902f97d8",
  "code": "1",
  "msg": "request success",
  "data": {
    "tableMetaDataMap": {
      "console": {
        "worker_stats": [
          {
            "columnName": "id",
            "dataTypeWithLength": null,
            "isNullable": "yes",
            "dataType": "BIGINT",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": null,
            "numberPrecision": 19,
            "numberScale": 0,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": true
          },
          {
            "columnName": "gmt_create",
            "dataTypeWithLength": null,
            "isNullable": "yes",
            "dataType": "DATETIME",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": 0,
            "characterMaxLength": null,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "worker_id",
            "dataTypeWithLength": null,
            "isNullable": "yes",
            "dataType": "BIGINT",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": null,
            "numberPrecision": 19,
            "numberScale": 0,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "cpu_stat",
            "dataTypeWithLength": null,
            "isNullable": "no",
            "dataType": "TEXT",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": 65535,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "mem_stat",
            "dataTypeWithLength": null,
            "isNullable": "no",
            "dataType": "TEXT",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": 65535,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "disk_stat",
            "dataTypeWithLength": null,
            "isNullable": "no",
            "dataType": "TEXT",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": 65535,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          }
        ],
        "cluster": [
          {
            "columnName": "id",
            "dataTypeWithLength": null,
            "isNullable": "yes",
            "dataType": "BIGINT",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": null,
            "numberPrecision": 19,
            "numberScale": 0,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": true
          },
          {
            "columnName": "gmt_create",
            "dataTypeWithLength": null,
            "isNullable": "yes",
            "dataType": "DATETIME",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": 0,
            "characterMaxLength": null,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "gmt_modified",
            "dataTypeWithLength": null,
            "isNullable": "yes",
            "dataType": "DATETIME",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": 0,
            "characterMaxLength": null,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "cluster_name",
            "dataTypeWithLength": null,
            "isNullable": "yes",
            "dataType": "VARCHAR",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": 128,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "region",
            "dataTypeWithLength": null,
            "isNullable": "no",
            "dataType": "VARCHAR",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": 64,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "cloud_or_idc_name",
            "dataTypeWithLength": null,
            "isNullable": "no",
            "dataType": "VARCHAR",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": 128,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "console_host",
            "dataTypeWithLength": null,
            "isNullable": "no",
            "dataType": "VARCHAR",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": 255,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "zk_host",
            "dataTypeWithLength": null,
            "isNullable": "no",
            "dataType": "VARCHAR",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": 255,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "cluster_desc",
            "dataTypeWithLength": null,
            "isNullable": "yes",
            "dataType": "VARCHAR",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": 128,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "uid",
            "dataTypeWithLength": null,
            "isNullable": "no",
            "dataType": "VARCHAR",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": 255,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          }
        ]
      },
      "dingtax": {
        "kbs_new_create": [
          {
            "columnName": "id",
            "dataTypeWithLength": null,
            "isNullable": "yes",
            "dataType": "BIGINT",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": null,
            "numberPrecision": 19,
            "numberScale": 0,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": true
          },
          {
            "columnName": "name",
            "dataTypeWithLength": null,
            "isNullable": "no",
            "dataType": "VARCHAR",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": null,
            "characterMaxLength": 244,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          },
          {
            "columnName": "new_col",
            "dataTypeWithLength": null,
            "isNullable": "no",
            "dataType": "DATETIME",
            "sqlTypeIntValue": 0,
            "jdbcType": null,
            "timePrecision": 0,
            "characterMaxLength": null,
            "numberPrecision": null,
            "numberScale": null,
            "esAnalyzerType": null,
            "needIndex": null,
            "timeFormat": null,
            "pk": false
          }
        ]
      }
    },
    "noPkTableNameList": {},
    "numberOfShards": null,
    "numberOfReplicas": null
  }
}
```


