---
id: api_datajob_upsertkvconfigs 
title: 更新或插入kv配置
description: 接口描述：根据任务id,批量更新或插入任务kv配置
---

## 接口描述

根据任务id,批量更新或插入任务kv配置

## 接口地址

`/cloudcanal/console/api/v1/openapi/datajob/upsertkvconfigs`

## 请求方式

`POST`

## 请求参数

请为参数为一个数组,如下示例

```json
[
	{
		"configName": "ddlExceptionSkip",
		"configType": "SERVER_CORE",
		"configValue": "true",
		"dataJobId": 956,
		"endPointType": "INDEPENDENT",
		"needCreate": false
	},
    {
        "configName": "specId",
        "configType": "SERVER_CORE",
        "configValue": "17",
        "dataJobId": 956,
        "endPointType": "INDEPENDENT",
        "needCreate": false
  }
]
```

每一个数组元素为一个kv配置对象，其中的字段说明如下

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| dataJobId  |任务id|   body    |   是   |  long |  
| configName  |配置名称|   body    |   是  |  string |  
| configValue  |配置值,需要注意的是,带默认值的参数项不能为空|   body    |   否   |  string |  
| endPointType  |参数作用端 <br/><br/>SOURCE(源端) <br/>TARGET(目标端) <br/>INDEPENDENT(全局)|   body    |   是   |  string |
| configType  |配置所属实体 <br/><br/>SERVER_CORE(任务) <br/>DATASOURCE(数据源) <br/>MAPPING(元数据映射)|   body    |   是   |  string |
| needCreate  |该配置是否在本任务中未出现(新版本配置)|   body    |   否   |  string |

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
  "requestId": "c5665d7c-2cb7-11ec-a410-bfd57df2q1ea",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


