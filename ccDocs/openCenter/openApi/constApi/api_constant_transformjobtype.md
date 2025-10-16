---
id: api_constant_transformjobtype
title: 数据任务能力
description: 接口描述：获取各类型任务支持的能力,以便创建任务选择
---

## 接口描述 

获取各类型任务支持的能力,以便创建任务选择

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/transformjobtype`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| sourceType  |源端数据源类型 , 根据 [获取源端数据源类型](api_constant_srcdstype.md) 获取|   body    |   是   |string  |     
| targetType  |目标端数据源类型 , 根据 [获取目标端数据源类型](api_constant_dstdstype.md) 获取|   body    |   是   |string  |     

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| source     |  源端数据源类型    |    String   |   是    |
| target     |    目标端数据源类型    |   String  |   否    |
| optionType      |    多组 DataJobType 构成的能力模型  |    String   |   否    |

能力描述参数说明

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| Incremental     |  增量同步   |    String   |   是    |
| FullAmount     |     全量迁移   |   String  |   是    |
| defaultCheck      |   该 DataJobType 选项是否默认选中  |    String   |   否    |

## 响应示例

```json
{
  "requestId": "1ee03cdf-2be5-11ec-b616-7bf5855db86d",
  "code": "1",
  "msg": "request success",
  "data": {
    "source": "MySQL",
    "target": "PostgreSQL",
    "optionType": {
      "STRUCT_MIGRATION": {},
      "SYNC": {
        "Incremental": "true",
        "FullAmount": "true",
        "defaultCheck": "true"
      },
      "MIGRATION": {
        "Incremental": "true",
        "FullAmount": "true"
      },
      "CHECK": {
        "Incremental": "true",
        "FullAmount": "true"
      }
    }
  }
}
```


