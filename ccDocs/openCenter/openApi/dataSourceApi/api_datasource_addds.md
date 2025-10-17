---
id: api_datasource_addds
title: 添加数据源
description: 接口描述：添加数据源信息
---

## 接口描述 

添加数据源信息

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datasource/addds`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| dataSourceAddData  |数据源配置,标准json格式|   body    |   是   | string |
| securityFile  |安全文件,如 SSL 的 truststore 文件,如 kerberos krb5 文件 |   body    |   否   | MultipartFile |
| secretFile  |密钥文件,如 jaas 用户名密码文件，如 kerberos keytab 文件 |   body    |   否   | MultipartFile |

### dataSourceAddData 参数说明
| 参数名称         | 参数说明               |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| deployType     |  数据源部署类型 <br/><br/>SELF_MAINTENANCE(自建) <br/>ALIBABA_CLOUD_HOSTED(阿里云)    |   String   |   是    |
| region     |  数据源所在区域 <br/><br/>hangzhou <br/>shanghai <br/>beijing <br/>shenzhen <br/>qingdao <br/>zhangjiakou <br/>huhehaote <br/>hongkong <br/>singapore <br/>silicon_valley <br/>london <br/>mq_internet_access <br/>customer   |    String   |  是   |
| type     | 数据源类型 <br/><br/>MySQL <br/>PolarDbMySQL <br/>PolarDbX  <br/>PostgreSQL <br/>Greenplum <br/>Oracle <br/>SQLServer <br/>Redis <br/>MongoDB <br/>Kafka <br/>RocketMQ <br/>RabbitMQ <br/>Hive <br/>ElasticSearch <br/>DRDS <br/>AdbForMySQL <br/>TiDB <br/>ClickHouse <br/>Kudu    |    String   |    是   |
| hostType     | 数据源默认网络类型 <br/><br/>PRIVATE(内网) <br/>PUBLIC(公网)  |    String   |   是    |
| privateHost     | 内网host  |    String   |   根据hostType选择    |
| publicHost     | 公网host  |    String   |   根据hostType选择    |
| host     | 用于发起连接的host，可与privateHost或publicHost相同  |    String   |   是    |
| securityType     | 数据源安全密钥类型  <br/><br/>KERBEROS <br/>USER_PASSWD_WITH_TLS <br/>USER_PASSWD <br/>ONLY_USER <br/>ONLY_PASSWD <br/>NONE  |    String   |   是    |
| account     | 账号  |    String   |   根据securityType选择    |
| password     | 密码  |    String   |   根据securityType选择    |
| instanceDesc     | 数据源描述  |    String   |   否    |
| instanceId     | 阿里云实例 id  |    String   |   否    |
| accessKey     | 阿里云 access key  |    String   |   否    |
| secretKey     | 阿里云 secret key |    String   |   否    |
| clientTrustStorePassword    | 数据源安全密钥类型为 USER_PASSWD_WITH_TLS 时,truststore 文件密码 |    String   |   否    |
| version     | 数据库版本 |    String   |   否    |
| connectType     | 链接类型，目前只对oracle有效 <br/><br/>ORACLE_SID <br/>ORACLE_SERVICE <br/>ORACLE_TNS <br/>ORACLE_PDB |    String   |   否    |

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 是一个数字, 表示添加成功的数据源id.

## 响应示例

```json
{
  "requestId": "422622b9-2bf5-11ec-8b3e-172e4c81a5c3",
  "code": "1",
  "msg": "request success",
  "data": 123243
}
```


