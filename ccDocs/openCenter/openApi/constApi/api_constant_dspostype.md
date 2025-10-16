---
id: api_constant_dspostype
title: 数据源位点类型
description: 接口描述：获取数据源位点类型,以便展示
---

## 接口描述 

获取数据源位点类型,以便展示

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/dspostypes`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| dsType  |数据源类型 , 根据 [获取源端数据源类型](api_constant_srcdstype.md) 获取|   body    |   是   |string  |     

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为一串字符串数组，值表示该数据源的位点类型

## 响应示例

```json
{
  "requestId": "4a178313-2be6-11ec-b616-93507033b0a3",
  "code": "1",
  "msg": "request success",
  "data": [
    "MYSQL_LOG_FILE_POS",
    "MYSQL_GTID_POS",
    "MYSQL_TIMESTAMP_POS"
  ]
}
```


