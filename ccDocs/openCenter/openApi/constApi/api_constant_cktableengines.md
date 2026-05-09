---
id: api_constant_cktableengines
title: ClickHouse表引擎
description: 接口描述：获取任务状态常量,以便展示
---

## 接口描述 

获取任务状态常量，以便展示

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/cktableengine`

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
| ckTableEngine     |    ClickHouse 表引擎  |    string   |   是    |
| defaultCheck     |   是否默认选中此项   |    boolean   |   是    |

## 响应示例

```json
{
  "requestId": "5dbc52e1-2be9-11ec-b616-7b75d91a340d",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "ckTableEngine": "CollapsingMergeTree",
      "defaultCheck": false
    },
    {
      "ckTableEngine": "ReplacingMergeTree",
      "defaultCheck": true
    }
  ]
}
```


