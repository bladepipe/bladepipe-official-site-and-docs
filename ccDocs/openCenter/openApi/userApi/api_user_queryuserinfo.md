---
id: api_user_queryuserinfo
title: 查询用户信息
description: 接口描述：根据用户uid查询用户基本信息。
---

## 接口描述

根据用户 uid 查询用户基本信息。

## 接口地址

`/cloudcanal/console/api/v1/openapi/user/queryuserinfo`

## 请求方式

`POST`

## 请求参数

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| -------- | -------- | -------- | -------- | -------- |
| uid | 用户uid | body | 是 | string |

## 公共响应结果

| 参数名称 | 参数说明 | 类型(java) | 不为空 |
| -------- | -------- | ---------- | ------ |
| code | 1:成功 0:失败 | string | 是 |
| data | | object | 否 |
| msg | | string | 否 |
| requestId | | string | 是 |

## data 参数说明

| 参数名称 | 参数说明 | 类型(java) | 不为空 |
| -------- | -------- | ---------- | ------ |
| username | 用户名 | string | 是 |

## 响应示例

```json
{
  "requestId": "c5665d7c-2cb7-11ec-a410-bfd57df2q1ea",
  "code": "1",
  "msg": "request success",
  "data": {
    "username": "admin"
  }
}
```
