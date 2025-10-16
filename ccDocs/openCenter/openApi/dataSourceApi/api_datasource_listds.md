---
id: api_datasource_listds
title: 数据源列表
description: 接口描述：获取数据源列表，以便任务创建选择正确的源端和目标端数据源
---

## 接口描述 

获取数据源列表，以便任务创建选择正确的源端和目标端数据源

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datasource/listds`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 | 是否必须 | 数据类型   |
| ------------ | -------------------------------- |-----------|------|--------|
| dataSourceId | 数据源id | body | 否    | long   |
| deployType  |数据源部署类型 <br/><br/>SELF_MAINTENANCE(自建) <br/>ALIBABA_CLOUD_HOSTED(阿里云) |   body    | 否    | string |     
| hostType  | 数据源默认网络类型 <br/><br/>PRIVATE(内网) <br/>PUBLIC(公网) |   body    | 否    | string |    
| lifeCycleState  | 数据源状态 <br/><br/>CREATING(创建中) <br/>CREATED(已创建) <br/>DELETING(删除中) <br/>DELETED(已删除) <br/>LOCKED(已锁定) |   body    | 否    | string |   
| type  | 数据源类型 <br/><br/>MySQL <br/>PolarDbMySQL <br/>PolarDbX  <br/>PostgreSQL <br/>Greenplum <br/>Oracle <br/>SQLServer <br/>Redis <br/>MongoDB <br/>Kafka <br/>RocketMQ <br/>RabbitMQ <br/>Hive <br/>ElasticSearch <br/>DRDS <br/>AdbForMySQL <br/>TiDB <br/>ClickHouse <br/>Kudu |   body    | 否    | string |  

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 为数组,其中每一组数据中的字段说明如下:

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| id     |  主键    |    Long   |   是    |
| gmtCreate    | 创建时间     |    String   |    是   |
| gmtModified      |   修改时间   |    String   |  是     |
| uid     |  数据源拥有者uid    |    String   |   是    |
| owner     |  数据源拥有者    |    String   |   是    |
| deployType     | 数据源部署类型 <br/><br/>SELF_MAINTENANCE(自建) <br/>ALIBABA_CLOUD_HOSTED(阿里云)   |    String   |  是   |
| region     |  数据源所在区域 <br/><br/>hangzhou <br/>shanghai <br/>beijing <br/>shenzhen <br/>qingdao <br/>zhangjiakou <br/>huhehaote <br/>hongkong <br/>singapore <br/>silicon_valley <br/>london <br/>mq_internet_access <br/>customer   |    String   |  是   |
| dataSourceType     | 数据源类型 <br/><br/>MySQL <br/>PolarDbMySQL <br/>PolarDbX  <br/>PostgreSQL <br/>Greenplum <br/>Oracle <br/>SQLServer <br/>Redis <br/>MongoDB <br/>Kafka <br/>RocketMQ <br/>RabbitMQ <br/>Hive <br/>ElasticSearch <br/>DRDS <br/>AdbForMySQL <br/>TiDB <br/>ClickHouse <br/>Kudu    |    String   |    是   |
| privateHost     | 内网host  |    String   |   否    |
| publicHost     | 公网host  |    String   |   否    |
| hostType     | 数据源默认网络类型 <br/><br/>PRIVATE(内网) <br/>PUBLIC(公网)  |    String   |   是    |
| instanceDesc     | 数据源描述  |    String   |   否    |
| version     | 数据源版本  |    String   |   否    |
| instanceId     | 实例id  |    String   |   是    |
| schemaJson     | 库表列结构(json),见 DataJob 相关 API 描述  |    String   |   否    |
| consoleJobId     | 当前异步任务id  |    Long   |   否    |
| consoleTaskState     | 当前异步任务状态 <br/><br/>  WAIT_START(等待启动) <br/>EXECUTE(执行中) <br/>SUCCESS(成功) <br/>FAILED(失败) <br/>CANCELED(已取消) <br/>SKIP(忽略)  |    String   |   否    |
| accountName     | 账号  |    String   |   否    |
| lifeCycleState     | 数据源状态 <br/><br/>CREATING(创建中) <br/>CREATED(已创建) <br/>DELETING(删除中) <br/>DELETED(已删除) <br/>LOCKED(已锁定)  |    String   |   是    |
| securityType     | 数据源安全密钥类型 <br/><br/>KERBEROS <br/>USER_PASSWD_WITH_TLS <br/>USER_PASSWD <br/>ONLY_USER <br/>ONLY_PASSWD <br/>NONE  |    String   |   是    |

## 响应示例

```json
{
  "requestId": "ca5fa39b-2b56-11ec-8c7e-27997c09a959",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "id": 15,
      "gmtCreate": "2021-05-07T10:11:47.000+0000",
      "gmtModified": "2021-06-07T09:50:28.000+0000",
      "uid": "4503980488230169",
      "owner": "liqiang",
      "deployType": "SELF_MAINTENANCE",
      "region": "customer",
      "dataSourceType": "PostgreSQL",
      "privateHost": "192.168.0.152:50402",
      "publicHost": "",
      "hostType": "PRIVATE",
      "instanceDesc": "12.4",
      "version": "12.4 (Debian 12.4-1.pgdg100+1)",
      "instanceId": "pg-3fjo4n2tmli9cfk",
      "schemaJson": null,
      "consoleJobId": 0,
      "consoleTaskState": null,
      "accountName": "postgres",
      "lifeCycleState": "CREATED",
      "securityType": "USER_PASSWD"
    },
    {
      "id": 1,
      "gmtCreate": "2021-03-26T04:07:23.000+0000",
      "gmtModified": "2021-09-14T11:11:39.000+0000",
      "uid": "4503980488230169",
      "owner": "liqiang",
      "deployType": "SELF_MAINTENANCE",
      "region": "customer",
      "dataSourceType": "MySQL",
      "privateHost": "127.0.0.1:4306",
      "publicHost": "",
      "hostType": "PRIVATE",
      "instanceDesc": "local target",
      "version": "5.7.27-log",
      "instanceId": "my-dc1l0m2cfdtrrhq",
      "schemaJson": null,
      "consoleJobId": 0,
      "consoleTaskState": null,
      "accountName": "root",
      "lifeCycleState": "CREATED",
      "securityType": "USER_PASSWD"
    }
  ]
}
```


