---
id: api_datasource_listds
title: List DataSources
description: Gets a list of data sources so that task creation selects the correct source and target data sources
---

## Interface Overview 

Gets a list of data sources so that task creation selects the correct source and target data sources.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datasource/listds`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|------|--------|
| dataSourceId | Data source ID | Body | False | Long |
| deployType | Data source deployment type<br/><br/>SELF_MAINTENANCE (self-built)<br/>ALIBABA_CLOUD_HOSTED (Alibaba Cloud hosted) | Body | False | String |
| hostType | Data source default network type<br/><br/>PRIVATE (intranet)<br/>PUBLIC (internet) | Body | False | String |
| lifeCycleState | Data source status<br/><br/>CREATING (creating)<br/>CREATED (created)<br/>DELETING (deleting)<br/>DELETED (deleted)<br/>LOCKED (locked) | Body | False | String |
| type | Data source type<br/><br/>MySQL<br/>PolarDbMySQL<br/>PolarDbX<br/>PostgreSQL<br/>Greenplum<br/>Oracle<br/>SQLServer<br/>Redis<br/>MongoDB<br/>Kafka<br/>RocketMQ<br/>RabbitMQ<br/>Hive<br/>ElasticSearch<br/>DRDS<br/>AdbForMySQL<br/>TiDB<br/>ClickHouse<br/>Kudu | Body | False | String | 

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: Success 0: Failure | String | True |
| data | - | Object | False |
| msg | - | String | False |
| requestId | - | String | True |

## Data Parameter

Data is an array where the fields in each set of data are described as follows:

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| id | Primary key | Long | True |
| gmtCreate | Creation time | String | True |
| gmtModified | Modification time | String | True |
| uid | Data source owner UID | String | True |
| owner | Data source owner | String | True |
| deployType | Data source deployment type<br/><br/>SELF_MAINTENANCE (self-built)<br/>ALIBABA_CLOUD_HOSTED (Alibaba Cloud hosted) | String | True |
| region | Data source region<br/><br/>hangzhou<br/>shanghai<br/>beijing<br/>shenzhen<br/>qingdao<br/>zhangjiakou<br/>huhehaote<br/>hongkong<br/>singapore<br/>silicon_valley<br/>london<br/>mq_internet_access<br/>customer | String | True |
| dataSourceType | Data source type<br/><br/>MySQL<br/>PolarDbMySQL<br/>PolarDbX<br/>PostgreSQL<br/>Greenplum<br/>Oracle<br/>SQLServer<br/>Redis<br/>MongoDB<br/>Kafka<br/>RocketMQ<br/>RabbitMQ<br/>Hive<br/>ElasticSearch<br/>DRDS<br/>AdbForMySQL<br/>TiDB<br/>ClickHouse<br/>Kudu | String | True |
| privateHost | Intranet host | String | False |
| publicHost | Internet host | String | False |
| hostType | Data source default network type<br/><br/>PRIVATE (intranet)<br/>PUBLIC (internet) | String | True |
| instanceDesc | Data source description | String | False |
| version | Data source version | String | False |
| instanceId | Instance ID | String | True |
| schemaJson | Library table column structure (JSON), see DataJob related API description | String | False |
| consoleJobId | Current asynchronous task ID | Long | False |
| consoleTaskState | Current asynchronous task status<br/><br/>WAIT_START (waiting to start)<br/>EXECUTE (executing)<br/>SUCCESS (successful)<br/>FAILED (failed)<br/>CANCELED (canceled)<br/>SKIP (ignored) | String | False |
| accountName | Account | String | False |
| lifeCycleState | Data source status<br/><br/>CREATING (creating)<br/>CREATED (created)<br/>DELETING (deleting)<br/>DELETED (deleted)<br/>LOCKED (locked) | String | True |
| securityType | Data source security key type<br/><br/>KERBEROS<br/>USER_PASSWD_WITH_TLS<br/>USER_PASSWD<br/>ONLY_USER<br/>ONLY_PASSWD<br/>NONE | String | True |

## Response Example

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


