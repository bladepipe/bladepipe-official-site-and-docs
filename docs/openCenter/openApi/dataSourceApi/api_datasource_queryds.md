---
id: api_datasource_queryds
title: Query DataSources
description: Gets a list of data sources so that task creation selects the correct source and target data sources
---

## Interface Overview

Gets a list of data sources so that task creation selects the correct source and target data sources

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datasource/queryds`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| dataSourceId | ID of the data source | Body | True | long |   

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success, 0: failure | string | True |
| data | | Object | False |
| msg | | string | False |
| requestId | | string | True |

## Data Parameter

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| id | Primary key | long | True |
| gmtCreate | Creation time | string | True |
| gmtModified | Modification time | string | True |
| uid | UID of the data source owner | string | True |
| owner | Data source owner | string | True |
| deployType | Data source deployment type<br/><br/>SELF_MAINTENANCE (self-built)<br/>ALIBABA_CLOUD_HOSTED (Alibaba Cloud) | string | True |
| region | Data source region<br/><br/>hangzhou<br/>shanghai<br/>beijing<br/>shenzhen<br/>qingdao<br/>zhangjiakou<br/>huhehaote<br/>hongkong<br/>singapore<br/>silicon_valley<br/>london<br/>mq_internet_access<br/>customer | string | True |
| dataSourceType | Data source type<br/><br/>MySQL<br/>PolarDbMySQL<br/>PolarDbX<br/>PostgreSQL<br/>Greenplum<br/>Oracle<br/>SQLServer<br/>Redis<br/>MongoDB<br/>Kafka<br/>RocketMQ<br/>RabbitMQ<br/>Hive<br/>ElasticSearch<br/>DRDS<br/>AdbForMySQL<br/>TiDB<br/>ClickHouse<br/>Kudu | string | True |
| privateHost | Private host | string | False |
| publicHost | Public host | string | False |
| hostType | Default network type of the data source<br/><br/>PRIVATE (private network)<br/>PUBLIC (public network) | string | True |
| instanceDesc | Description of the data source | string | False |
| version | Version of the data source | string | False |
| instanceId | Instance ID | string | True |
| schemaJson | Library table column structure (JSON), see DataJob related API description | string | False |
| consoleJobId | Current asynchronous task ID | long | False |
| consoleTaskState | Current asynchronous task status<br/><br/>WAIT_START (waiting to start)<br/>EXECUTE (executing)<br/>SUCCESS (success)<br/>FAILED (failure)<br/>CANCELED (canceled)<br/>SKIP (skipped) | string | False |
| accountName | Account | string | False |
| lifeCycleState | Data source status<br/><br/>CREATING (creating)<br/>CREATED (created)<br/>DELETING (deleting)<br/>DELETED (deleted)<br/>LOCKED (locked) | string | True |
| securityType | Data source security key type<br/><br/>KERBEROS<br/>USER_PASSWD_WITH_TLS<br/>USER_PASSWD<br/>ONLY_USER<br/>ONLY_PASSWD<br/>NONE | string | True |

## Response Example

```json
{
  "requestId": "d149a192-2b59-11ec-8c7e-131faed755bd",
  "code": "1",
  "msg": "request success",
  "data": {
    "id": 83,
    "gmtCreate": "2021-09-22T11:04:47.000+0000",
    "gmtModified": "2021-09-22T11:04:47.000+0000",
    "uid": "4503980488230169",
    "owner": "liqiang",
    "deployType": "SELF_MAINTENANCE",
    "region": "customer",
    "dataSourceType": "RabbitMQ",
    "privateHost": "192.168.0.152:5672",
    "publicHost": "",
    "hostType": "PRIVATE",
    "instanceDesc": "152rmq",
    "version": null,
    "instanceId": "rbq-j657097rx978hrx",
    "schemaJson": null,
    "consoleJobId": 0,
    "consoleTaskState": null,
    "accountName": "mqadmin",
    "lifeCycleState": "CREATED",
    "securityType": "USER_PASSWD"
  }
}
```


