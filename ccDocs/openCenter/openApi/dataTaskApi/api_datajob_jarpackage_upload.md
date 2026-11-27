---
id: api_datajob_jarpackage_upload
title: 上传代码包
description: 接口描述：向指定数据任务上传自定义代码包，仅上传入库，不会自动生效
---

## 接口描述

向指定数据任务上传自定义代码包，仅上传入库，不会自动生效

## 接口地址

`/cloudcanal/console/api/v1/openapi/jarpackage/upload`

## 请求方式

`POST`

请求的 `Content-Type` 为 `multipart/form-data`。

## 请求参数

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| -------- | -------- | -------- | -------- | -------- |
| dataJobId | 数据任务 ID | body | 是 | long |
| description | 代码包描述，不能为空白 | body | 是 | string |
| customPkgFile | 代码包文件，仅支持 .jar 后缀 | multipart | 是 | file |

## 公共响应结果

| 参数名称 | 参数说明 | 类型(java) | 不为空 |
| -------- | -------- | ---------- | ------ |
| code | 1:成功 其他:失败 | string | 是 |
| data | 新代码包 ID | long | 否 |
| msg | 响应消息 | string | 否 |
| requestId | 请求 ID | string | 是 |

:::info
判断是否成功以 code 为准：成功为 1，业务异常为 0001，参数校验失败为 0002，具体原因看 msg。
:::

## data 参数说明

data 直接返回新代码包的 ID，不再嵌套对象，用于后续激活接口

| 参数名称 | 参数说明 | 类型(java) | 不为空 |
| -------- | -------- | ---------- | ------ |
| data | 新代码包 ID | long | 是 |

:::info
上传成功后代码包为未激活状态，需调用[激活代码包](api_datajob_jarpackage_active.md)接口并重启数据任务后才会生效。同一任务可上传多个代码包。
:::

## 请求示例

如自定义代码包为 `custom-code.jar`，发送请求：

```bash
curl --request POST \
  "${CONSOLE_URL}/cloudcanal/console/api/v1/openapi/jarpackage/upload" \
  --header "AccessKeyId: ${ACCESS_KEY_ID}" \
  --header "SignatureMethod: HmacSHA1" \
  --header "SignatureNonce: ${SIGNATURE_NONCE}" \
  --header "Signature: ${SIGNATURE}" \
  --form 'dataJobId=1' \
  --form 'description=测试代码包' \
  --form 'customPkgFile=@./custom-code.jar;type=application/java-archive'
```

## 响应示例

```json
{
  "requestId": "9181193f-2be3-11ec-b616-231d2f6b0021",
  "code": "1",
  "msg": "request success",
  "data": 10
}
```
