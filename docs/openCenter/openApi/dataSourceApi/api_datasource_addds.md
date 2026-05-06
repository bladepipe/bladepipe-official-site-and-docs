---
id: api_datasource_addds
title: Add DataSource
description: Add datasource information
---

## Interface Overview 

Add datasource information.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datasource/addds`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| dataSourceAddData | Data source configuration in standard JSON format | Body   | True  | string |
| securityFile   | Security file, such as the truststore file for SSL or the krb5 file for Kerberos | Body   | False | MultipartFile |
| secretFile     | Secret file, such as the username/password file for jaas or the keytab file for Kerberos | Body   | False | MultipartFile |

### DataSourceAddData Indicates the parameter description
| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| deployType                 | Data source deployment type<br/><br/>SELF_MAINTENANCE (self-built)<br/>ALIBABA_CLOUD_HOSTED (Alibaba Cloud) | string | True     |
| region                     | Data source region<br/><br/>hangzhou<br/>shanghai<br/>beijing<br/>shenzhen<br/>qingdao<br/>zhangjiakou<br/>huhehaote<br/>hongkong<br/>singapore<br/>silicon_valley<br/>london<br/>mq_internet_access<br/>customer | string | True     |
| type                       | Data source type<br/><br/>MySQL<br/>PolarDbMySQL<br/>PolarDbX<br/>PostgreSQL<br/>Greenplum<br/>Oracle<br/>SQLServer<br/>Redis<br/>MongoDB<br/>Kafka<br/>RocketMQ<br/>RabbitMQ<br/>Hive<br/>ElasticSearch<br/>DRDS<br/>AdbForMySQL<br/>TiDB<br/>ClickHouse<br/>Kudu | string | True     |
| hostType                   | Default network type<br/><br/>PRIVATE (intranet)<br/>PUBLIC (public network)                                 | string | True     |
| privateHost                | Intranet host                                                                                                 | string | Depending on hostType |
| publicHost                 | Public network host                                                                                           | string | Depending on hostType |
| securityType              | Security key type<br/><br/>KERBEROS<br/>USER_PASSWD_WITH_TLS<br/>USER_PASSWD<br/>ONLY_USER<br/>ONLY_PASSWD<br/>NONE | string | True     |
| account                    | Account                                                                                                       | string | Depending on securityType |
| password                   | Password                                                                                                      | string | Depending on securityType |
| instanceDesc               | Data source description                                                                                       | string | False    |
| instanceId                 | Alibaba Cloud instance ID                                                                                     | string | False    |
| accessKey                  | Alibaba Cloud access key                                                                                      | string | False    |
| secretKey                  | Alibaba Cloud secret key                                                                                      | string | False    |
| clientTrustStorePassword  | Truststore file password when security key type is USER_PASSWD_WITH_TLS                                      | string | False    |
| version                    | Database version                                                                                              | string | False    |
| connectType                | Connection type, currently only valid for Oracle<br/><br/>ORACLE_SID<br/>ORACLE_SERVICE<br/>ORACLE_TNS<br/>ORACLE_PDB | string | False    |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code     |  1: Success<br/>0: Failure    |    String   |   True    |
| data     |      |    Object   |   False    |
| msg      |      |    String   |   False    |
| requestId     |      |    String   |   True    |

## Data Parameters

The data is a number that indicates the data source id that was successfully added.

## Response Example

```json
{
  "requestId": "422622b9-2bf5-11ec-8b3e-172e4c81a5c3",
  "code": "1",
  "msg": "request success",
  "data": 123243
}
```


