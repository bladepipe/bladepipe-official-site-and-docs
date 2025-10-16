---
id: api_datasource_listcols
title: List Columns
description: Gets the columns of the table so that you can select the columns you want when creating a task
---

## Interface Overview 

Gets the columns of the table so that you can select the columns you want when creating a task

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datasource/listcols`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId | Cluster ID of the machine group attempting to connect to the data source | Body | True | Long |
| dataSourceId | Target data source ID | Body | True | Long |
| hostType | Selected network type of the data source <br/><br/> PRIVATE (for intranet) <br/> PUBLIC (for public internet) | Body | True | String |
| schemas | An array that conforms to the structure, details are as follows | Body | True | String |  

Schema composite structure specification

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| db | Name of the database. For relational databases, this field cannot be empty | Body | True | String |
| schema | Name of the schema. For MySQL, this field can be empty | Body | False | String |
| tables | List of table names | Body | True | String |    

Schema composite structure example

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

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success 0: failure | String | True |
| data | -| Object | False |
| msg | | String | False |
| requestId | | String | True |

## Data Parameter

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| tableMetaDataMap | Column information for multiple databases and tables | String | False |
| noPkTableNameList | List of tables without primary keys | String | True |
| numberOfShards | Valid for Kudu data source | String | False |
| numberOfReplicas | Valid for Kudu data source | String | False |

Column information specification

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| columnName | Column name | String | True |
| dataTypeWithLength | Data type with length description | String | False |
| isNullable | Whether the column can be null | Boolean | True |
| dataType | Data type | String | True |
| sqlTypeIntValue | Type length | int | False |
| jdbcType | JDBC type | String | False |
| timePrecision | Time precision | int | False |
| characterMaxLength | String length | String | False |
| numberPrecision | Numeric precision | int | False |
| numberScale | Numeric scale | int | False |
| esAnalyzerType | ElasticSearch analyzer type | String | False |
| needIndex | Whether the ElasticSearch field needs to be indexed | String | False |
| timeFormat | Time format | String | False |
| pk | Whether the column is a primary key | Boolean | True |

##  Response Example

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


