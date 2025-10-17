---
id: api_datasource_updateaccountandpassword
title: 修改数据源账号密码
description: 接口描述：修改数据源账号密码
---

## 接口描述 

修改数据源账号密码

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datasource/updateaccountandpassword`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ |----------|-----------|--------|----|
| dataSourceAddData  |数据源配置,标准json格式|   body    |   是   | string |
| securityFile  |安全文件,如 SSL 的 truststore 文件,如 kerberos krb5 文件 |   body    |   否   | MultipartFile |
| secretFile  |密钥文件,如 jaas 用户名密码文件，如 kerberos keytab 文件 |   body    |   否   | MultipartFile |

### dataSourceAddData 参数说明
| 参数名称         | 参数说明               |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| dataSourceId  | 目标数据源id  |   body    |   是   | Long |
| securityType     | 数据源安全密钥类型  <br/><br/>KERBEROS <br/>USER_PASSWD_WITH_TLS <br/>USER_PASSWD <br/>ONLY_USER <br/>ONLY_PASSWD <br/>NONE  |    String   |   是    |
| userName     | 账号  |    String   |   根据securityType选择    |
| password     | 密码  |    String   |   根据securityType选择    |

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
  "requestId": "4f9f0b23-2b4a-11ec-8c7e-d98fc83f029e",
  "code": "1",
  "msg": "request success",
  "data": []
}
```


