---
id: api_datasource_updateaccountandpassword
title: Update Account and Password
description: Change the password of a data source account
---

## Interface Overview

Change the password of a data source account

## Interface Address

`/cloudcanal/console/api/v1/openapi/datasource/updateaccountandpassword`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ |----------|-----------|--------|----|
| dataSourceAddData | Data source configuration, standard JSON format | Body | True | String |
| securityFile | Security file, such as the SSL truststore file or Kerberos krb5 file | Body | False | MultipartFile |
| secretFile | Secret key file, such as the JAAS username and password file or Kerberos keytab file | Body | False | MultipartFile |

## DataSourceAddData Indicates the parameter description
| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| dataSourceId | Target data source ID | Body | True | Long |
| securityType | Data source security key type<br/><br/>KERBEROS<br/>USER_PASSWD_WITH_TLS<br/>USER_PASSWD<br/>ONLY_USER<br/>ONLY_PASSWD<br/>NONE | String | True |
| userName | Account | String | Depending on securityType chosen |
| password | Password | String | Depending on securityType chosen |

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success, 0: failure | String | True |
| data | | Object | False |
| msg | | String | False |
| requestId | | String | True |

## Response Example

```json
{
  "requestId": "4f9f0b23-2b4a-11ec-8c7e-d98fc83f029e",
  "code": "1",
  "msg": "request success",
  "data": []
}
```


