---
id: api_constant_dsdeploytypes
title: 数据源部署方式
description: 接口描述：获取数据源部署方式,以便创建任务时选择
---

## 接口描述 

获取数据源部署方式,以便创建任务时选择

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/datasourcedeploytypes`

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
| envType     |   部署类型  |    string   |   是    |

## 响应示例

```json
{
  "requestId": "b2c637e0-2be6-11ec-b616-87a20804d669",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "i18nName": "自建",
      "envType": "SELF_MAINTENANCE"
    },
    {
      "i18nName": "阿里云",
      "envType": "ALIBABA_CLOUD_HOSTED"
    }
  ]
}
```


