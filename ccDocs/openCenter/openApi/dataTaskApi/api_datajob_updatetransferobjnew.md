---
id: api_datajob_updatetransferobjnew
title: 编辑数据任务(增量)
description: 接口描述：编辑任务的订阅信息，此接口会检测当前任务是否是处于增量同步追上阶段。
---

## 接口描述 

编辑任务的订阅信息，此接口会检测当前任务是否是处于增量同步追上阶段。如果是是全库同步，则无效。

调用成功后，如果有新增同步实体，则会生成当前任务的子任务

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/updatetransferobject`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| dataJobId  |任务id|   body    |   是   |  long |  
| structMigration  |是否需要结构迁移，比如建表、建库、建topic等|   body    |   否   |  boolean |  
| initialSync  |是否需要全量迁移|   body    |   否   |  boolean |  
| addMappingConfig  |新添加的元数据映射，参考 [元数据映射说明](api_datajob_mapping.md)|   body    |   否   |  string |
| sourceAddConfig  |源端添加的元数据，参考 [库表列结构说明](api_datajob_schema.md)|   body    |   否   |  string |
| targetAddConfig  |目标端添加的元数据，参考 [库表列结构说明](api_datajob_schema.md)|   body    |   否   |  string |
| mappingConfigWithoutAdd  |变更后的元数据映射，除去新添加的，参考 [元数据映射说明](api_datajob_mapping.md)|   body    |   是   |  string |
| srcSchemaWithoutAdd  |变更后的源端元数据，除去新添加的，参考 [库表列结构说明](api_datajob_schema.md)|   body    |   是   |  string |
| dstSchemaWithoutAdd  |变更后的目标端元数据，除去新添加的，参考 [库表列结构说明](api_datajob_schema.md)|   body    |   否   |  string |

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


