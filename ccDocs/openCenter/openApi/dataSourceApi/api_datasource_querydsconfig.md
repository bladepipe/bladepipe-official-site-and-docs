---
id: api_datasource_querydsconfig
title: 查询数据源kv配置
description: 接口描述：根据数据源id查询其kv配置列表
---

## 接口描述 

根据数据源id查询其kv配置列表

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datasource/querydsconfig`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| dataSourceId  |数据源id|   body    |   是   |  long |  

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 是一个数组，其中每一项为一个 kv 配置项信息.其中字段参数如下,需要注意的是

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| id  | 配置id  |   是   |  long |  
| configName | 配置名称 | 是 | string |
| configGroup | 配置组 | 是 | string |
| description | 描述信息 | 是 | string |
| valueRequire | 是否必填 | 是 | boolean |
| valueValidRegex | 值校验格式 | 否 | string |
| configValue | 配置值 | 否 | string |
| defaultValue | 默认值 | 否 | string |
| valueAdvance | 推荐值 | 否 | string |
| readOnly | 是否只读 | 是 | boolean |
| needCreated | 是否需要被创建 | 是 | boolean |
| secret | 是否加密 | 是 | boolean |

## 响应示例

```json
{
  "requestId": "d007d7d8-dd8f-11ed-a147-4b7671be16cb",
  "taskId": 0,
  "workerIdentity": null,
  "sendBackToTask": false,
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "id": 21,
      "configName": "pdHost",
      "configGroup": "GENERAL",
      "description": "DS_CONFIG_TIDB_PD_HOST",
      "valueRequire": true,
      "valueValidRegex": "",
      "configValue": "192.168.0.195:2379",
      "defaultValue": "",
      "valueAdvance": "",
      "readOnly": false,
      "needCreated": false,
      "secret": false
    },
    {
      ...
    }
  ],
  "success": true,
  "fail": false,
  "rsocketDirectionType": null
}
```


