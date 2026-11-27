---
id: api_datajob_createwithpackage
title: 创建数据任务并上传自定义代码包
description: 接口描述：创建数据迁移、同步、校验、订正等任务，并上传自定义 JAR 代码包。
---

## 接口描述

创建数据迁移、同步、校验、订正等任务，并上传自定义 JAR 代码包。

## 接口地址

`/cloudcanal/console/api/v1/openapi/datajob/createwithpackage`

## 请求方式

`POST`

请求的 `Content-Type` 为 `multipart/form-data`。

## 请求参数

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| -------- | -------- | -------- | -------- | -------- |
| data | 分段的 Content-Type 为 application/json | multipart | 是 | object |
| customPkgFile | 仅支持 .jar 文件 | multipart | 否 | file |

:::info
- `data` 的字段及含义参见 [创建数据任务的请求参数](api_datajob_create.md#请求参数)。
:::

## 公共响应结果

| 参数名称 | 参数说明 | 类型(java) | 不为空 |
| -------- | -------- | ---------- | ------ |
| code | 1:成功 0:失败 | string | 是 |
| data | 新建的数据任务 ID | long | 否 |
| msg | 响应消息 | string | 否 |
| requestId | 请求 ID | string | 是 |

## 请求示例

如任务创建参数保存为本地 `data.json` 文件，自定义代码包为 `custom-code.jar`，发送请求：

```bash
curl --request POST \
  "${CONSOLE_URL}/cloudcanal/console/api/v1/openapi/datajob/createwithpackage" \
  --header "AccessKeyId: ${ACCESS_KEY_ID}" \
  --header "SignatureMethod: HmacSHA1" \
  --header "SignatureNonce: ${SIGNATURE_NONCE}" \
  --header "Signature: ${SIGNATURE}" \
  --form 'data=@./data.json;type=application/json' \
  --form 'customPkgFile=@./custom-code.jar;type=application/java-archive'
```

## 响应示例

```json
{
  "requestId": "422622b9-2bf5-11ec-8b3e-172e4c81a5c3",
  "code": "1",
  "msg": "request success",
  "data": 123243
}
```
