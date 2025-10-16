---
id: api_datasource_listtypemapping
title: 类型映射
description: 接口描述：获取数据类型映射，以便展示
---

## 接口描述 

获取数据类型映射，以便展示

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datasource/listcoltypemapping`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| dstDsId  |源端数据源 id|   body    |   是   | Long |  
| srcDsId  |目标数据源 id|   body    |   是   | Long |        

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为源端类型和目标端类型的对应关系，暂时不支持源端一种类型对应对端多种类型。

## 响应示例

```json
{
  "requestId": "7d61897e-2be2-11ec-b616-f194b7b514f9",
  "code": "1",
  "msg": "request success",
  "data": {
    "BLOB": "BLOB",
    "FLOAT": "FLOAT",
    "POLYGON": "POLYGON",
    "SET": "SET",
    "BINARY": "BINARY",
    "DECIMAL": "DECIMAL",
    "CHAR": "CHAR",
    "TEXT": "TEXT",
    "JSON": "JSON",
    "MEDIUMTEXT": "MEDIUMTEXT",
    "MULTIPOLYGON": "MULTIPOLYGON",
    "INT": "INT",
    "YEAR": "INT",
    "GEOMCOLLECTION": "GEOMCOLLECTION",
    "TIMESTAMP": "TIMESTAMP",
    "DOUBLE": "DOUBLE",
    "TINYTEXT": "TINYTEXT",
    "LONGBLOB": "LONGBLOB",
    "TINYINT": "TINYINT",
    "GEOMETRYCOLLECTION": "GEOMETRYCOLLECTION",
    "GEOMETRY": "GEOMETRY",
    "ENUM": "ENUM",
    "MULTIPOINT": "MULTIPOINT",
    "LINESTRING": "LINESTRING",
    "LONGTEXT": "LONGTEXT",
    "TIME": "TIME",
    "BIGINT": "BIGINT",
    "MEDIUMINT": "MEDIUMINT",
    "BIT": "BINARY",
    "DATE": "DATE",
    "MULTILINESTRING": "MULTILINESTRING",
    "DATETIME": "DATETIME",
    "MEDIUMBLOB": "MEDIUMBLOB",
    "TINYBLOB": "TINYBLOB",
    "SMALLINT": "SMALLINT",
    "VARCHAR": "VARCHAR",
    "VARBINARY": "VARBINARY",
    "POINT": "POINT"
  }
}
```


