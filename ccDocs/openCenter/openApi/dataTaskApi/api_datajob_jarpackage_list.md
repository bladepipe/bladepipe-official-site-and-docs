---
id: api_datajob_jarpackage_list
title: 数据任务代码包列表
description: 接口描述：查询指定数据任务下的自定义代码包列表
---

## 接口描述

查询指定数据任务下的自定义代码包列表

## 接口地址

`/cloudcanal/console/api/v1/openapi/jarpackage/list`

## 请求方式

`POST`

## 请求参数

| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 |
| -------- | -------- | -------- | -------- | -------- |
| dataJobId | 数据任务 ID | body | 是 | long |

## 公共响应结果

| 参数名称 | 参数说明 | 类型(java) | 不为空 |
| -------- | -------- | ---------- | ------ |
| code | 1:成功 其他:失败 | string | 是 |
| data | 代码包列表 | object | 否 |
| msg | 响应消息 | string | 否 |
| requestId | 请求 ID | string | 是 |

:::info
判断是否成功以 code 为准：成功为 1，业务异常为 0001，参数校验失败为 0002，具体原因看 msg。
:::

## data 参数说明

data 为数组，数组元素参数说明如下：

| 参数名称 | 参数说明 | 类型(java) | 不为空 |
| -------- | -------- | ---------- | ------ |
| id | 代码包 ID | long | 是 |
| gmtCreate | 创建时间 | string | 是 |
| gmtModified | 修改时间 | string | 是 |
| fileName | 代码包文件名 | string | 是 |
| md5 | 代码包文件 MD5（大写） | string | 是 |
| pkgInstanceName | 代码包实例名 | string | 是 |
| description | 代码包描述 | string | 否 |
| dataJobId | 所属数据任务 ID | long | 是 |
| uploadUserName | 上传人用户名，用户不存在时为 SYSTEM | string | 是 |
| active | 是否已激活 | boolean | 是 |
| fileSizeMb | 代码包大小（整数 MB，不足 1 MB 为 0） | long | 否 |

:::info
任务下没有代码包时返回空数组，不是报错。
:::

## 响应示例

```json
{
  "requestId": "9181193f-2be3-11ec-b616-231d2f6b0021",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "id": 9,
      "gmtCreate": "2026-11-23T17:12:45",
      "gmtModified": "2026-11-23T17:12:45",
      "fileName": "test-pkg.jar",
      "md5": "E520E394D89922A259C213867FC31E3B",
      "pkgInstanceName": "pkgk2xt7b9c7l",
      "description": "测试代码包",
      "dataJobId": 1,
      "uploadUserName": "Trial",
      "active": true,
      "fileSizeMb": 0
    }
  ]
}
```
