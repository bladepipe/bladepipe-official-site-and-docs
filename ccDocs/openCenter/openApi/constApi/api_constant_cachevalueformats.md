---
id: api_constant_cachevalueformats
title: 缓存值格式
description: 接口描述：获取缓存类型数据源值格式,以便创建任务时选择
---

## 接口描述 

获取缓存类型数据源值格式，以便创建任务时选择

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/cacheschemalessvalueformats`

## 请求方式

`POST`       

## 请求参数

无

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为数组，数组元素参数说明如下

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| i18nName     |    国际化名称  |    string   |   是    |
| format     |   缓存值类型  |    string   |   是    |

## 响应示例

```json
{
  "requestId": "54c50364-2be7-11ec-b616-edfc8ee2ce63",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "i18nName": "纯数据JSON格式",
      "format": "VALUE_JSON_FOR_CACHE"
    },
    {
      "i18nName": "纯数据JSON格式(CamelCase列名)",
      "format": "VALUE_COL_CAMEL_CASE_JSON_FOR_CACHE"
    }
  ]
}
```


