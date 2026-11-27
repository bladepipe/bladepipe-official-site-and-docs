---
id: api_datajob_jarpackage_active
title: 激活代码包
description: 接口描述：激活指定数据任务下的自定义代码包
---

## 接口描述

激活指定数据任务下的自定义代码包

## 接口地址

`/cloudcanal/console/api/v1/openapi/jarpackage/active`

## 请求方式

`POST`

## 请求参数

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| -------- | -------- | -------- | -------- | -------- |
| dataJobId | 数据任务 ID | body | 是 | long |
| activePkgId | 待激活的代码包 ID | body | 是 | long |

## 公共响应结果

| 参数名称 | 参数说明 | 类型(java) | 不为空 |
| -------- | -------- | ---------- | ------ |
| code | 1:成功 其他:失败 | string | 是 |
| data | 固定返回 success | string | 否 |
| msg | 响应消息 | string | 否 |
| requestId | 请求 ID | string | 是 |

:::info
判断是否成功以 code 为准：成功为 1，业务异常为 0001，参数校验失败为 0002，具体原因看 msg。
:::

## data 参数说明

data 直接返回固定字符串 success，不再嵌套对象

| 参数名称 | 参数说明 | 类型(java) | 不为空 |
| -------- | -------- | ---------- | ------ |
| data | 固定返回 success | string | 是 |

:::info
待激活的代码包必须属于 dataJobId 指定的数据任务；激活会将同一任务下其它代码包置为未激活；激活后需重启数据任务，代码包才会下发到执行节点生效。
:::

## 响应示例

```json
{
  "requestId": "9181193f-2be3-11ec-b616-231d2f6b0021",
  "code": "1",
  "msg": "request success",
  "data": "success"
}
```
