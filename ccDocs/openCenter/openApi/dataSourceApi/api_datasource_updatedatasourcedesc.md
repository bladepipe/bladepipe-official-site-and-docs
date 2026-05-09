---
id: api_datasource_updatedatasourcedesc
title: 修改数据源描述
description: 接口描述：修改数据源描述
---

## 接口描述 

修改数据源描述

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datasource/updatedatasourcedesc`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明      |     请求类型 |  是否必须      |  数据类型   |
| ------------ |-----------|-----------|--------|----|
| dataSourceId  | 目标数据源id   |   body    |   是   | long |    
|instanceDesc| 修改后的数据源描述 |   body    |   是   | string |    

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## 响应示例

```json
{
  "requestId": "4f9f0b23-2b4a-11ec-8c7e-d98fc83f029e",
  "code": "1",
  "msg": "request success",
  "data": []
}
```


