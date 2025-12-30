---
id: api_constant_supportsrcdeploytypes
title: 源端部署类型
description: 接口描述：获取系统支持的源端数据源部署类型列表
---

## 接口描述 

获取系统支持的源端数据源部署类型列表

## 接口地址 

`/cloudcanal/console/api/v1/openapi/constant/supportsrcdeploytypes`

## 请求方式

`POST`       

## 请求参数

无需请求参数

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    array   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为数组，每个元素包含以下字段：

| 参数名称         | 参数说明      |  不为空     |  数据类型   |
| ------------ |-----------|--------|----|
| envType  | 部署环境类型  |   是   |  string |  
| i18nName  | 国际化名称（根据当前语言环境返回对应的描述） |   是   |  string |   

### envType 取值说明

| 取值 | 说明       |
|------|----------|
| SELF_MAINTENANCE | 自建/IDC   |
| ALIBABA_CLOUD_HOSTED | 阿里云      |
| AWS_CLOUD_HOSTED | 亚马逊 AWS  |
| MICROSOFT_AZURE_CLOUD_HOSTED | 微软 Azure |
| TENCENT_CLOUD_HOSTED | 腾讯云      |

## 响应示例

```json
{
  "code": "1",
  "msg": "request success",
  "data":
  [
    {
      "i18nName": "自建",
      "envType": "SELF_MAINTENANCE"
    },
    {
      "i18nName": "阿里云",
      "envType": "ALIBABA_CLOUD_HOSTED"
    },
    {
      "i18nName": "亚马逊AWS",
      "envType": "AWS_CLOUD_HOSTED"
    },
    {
      "i18nName": "微软Azure",
      "envType": "MICROSOFT_AZURE_CLOUD_HOSTED"
    },
    {
      "i18nName": "腾讯云",
      "envType": "TENCENT_CLOUD_HOSTED"
    }
  ],
  "success": true,
  "fail": false
}
```
