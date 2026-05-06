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
| clusterId | Cluster ID of the machine group attempting to connect to the data source | Body | True | long |
| dataSourceId | Target data source ID | Body | True | long |
| hostType | Selected network type of the data source <br/><br/> PRIVATE (for intranet) <br/> PUBLIC (for public internet) | Body | True | string |
| schemas | An array that conforms to the structure, details are as follows | Body | True | string |  

Schema composite structure specification

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| db | Name of the database. For relational databases, this field cannot be empty | Body | True | string |
| schema | Name of the schema. For MySQL, this field can be empty | Body | False | string |
| tables | List of table names | Body | True | string |    

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
| code | 1: success 0: failure | string | True |
| data | -| Object | False |
| msg | | string | False |
| requestId | | string | True |

## Data Parameter

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| tableMetaDataMap | Column information for multiple databases and tables | string | False |
| noPkTableNameList | List of tables without primary keys | string | True |
| numberOfShards | Valid for Kudu data source | string | False |
| numberOfReplicas | Valid for Kudu data source | string | False |

Column information specification

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| columnName | Column name | string | True |
| dataTypeWithLength | Data type with length description | string | False |
| isNullable | Whether the column can be null | boolean | True |
| dataType | Data type | string | True |
| sqlTypeIntValue | Type length | int | False |
| jdbcType | JDBC type | string | False |
| timePrecision | Time precision | int | False |
| characterMaxLength | String length | string | False |
| numberPrecision | Numeric precision | int | False |
| numberScale | Numeric scale | int | False |
| esAnalyzerType | ElasticSearch analyzer type | string | False |
| needIndex | Whether the ElasticSearch field needs to be indexed | string | False |
| timeFormat | Time format | string | False |
| pk | Whether the column is a primary key | boolean | True |

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


