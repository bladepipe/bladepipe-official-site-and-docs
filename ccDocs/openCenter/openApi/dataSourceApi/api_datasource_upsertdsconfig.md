---
id: api_datasource_upsertdsconfig
title: 更新或插入kv配置
description: 接口描述：根据数据源id,批量更新或插入任务kv配置
---

## 接口描述

根据数据源id,批量更新或插入任务kv配置

## 接口地址

`/cloudcanal/console/api/v1/openapi/datasource/upsertdsconfig`

## 请求方式

`POST`

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| dataSourceId  |数据源id| body | 是 | long |  
| updateConfigs | 更新配置 | body | 否 | Map&lt;String, String&gt; |
| needCreateConfigs | 插入配置 | body | 否 | Map&lt;String, String&gt; |

```json
{
  "dataSourceId": 52,
  "updateConfigs": {
    "pdHost": "192.168.0.195:3333"
    // 更多配置项
  },
  "needCreateConfigs": {
    "test": ""
    // 更多配置项
  }
}
```

## 公共响应结果

| 参数名称 | 参数说明 | 类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## 响应示例

```json
{
  "requestId": "8aa8b0f9-dd95-11ed-a147-d7efab8bdcbb",
  "taskId": 0,
  "workerIdentity": null,
  "sendBackToTask": false,
  "code": "1",
  "msg": "request success",
  "data": null,
  "success": true,
  "fail": false,
  "rsocketDirectionType": null
}
```


