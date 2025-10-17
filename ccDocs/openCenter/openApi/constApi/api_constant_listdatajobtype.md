---
id: api_constant_listdatajobtype
title: 数据任务类型
description: 接口描述：获取DataJob类型,以便选择
---

## 接口描述 

获取DataJob类型,以便选择

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/datajobtype`

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
| dataJobType     |   迁移任务类型   |    string   |   是    |

## 响应示例

```json
{
  "requestId": "344d1524-2be3-11ec-b616-77daa87773f6",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "i18nName": "数据迁移",
      "dataJobType": "MIGRATION"
    },
    {
      "i18nName": "数据同步",
      "dataJobType": "SYNC"
    },
    {
      "i18nName": "数据校验",
      "dataJobType": "CHECK"
    },
    {
      "i18nName": "数据订正",
      "dataJobType": "REVISE"
    },
    {
      "i18nName": "结构迁移",
      "dataJobType": "STRUCT_MIGRATION"
    }
  ]
}
```


