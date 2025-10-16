---
id: api_datajob_list
title: List DataJobs
description: Query task list
---

## Interface Overview

Query task list

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datajob/list`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | ------------------------------- |-----------|--------|----|
| dataJobId       | Task ID                             | Body     | False       | Long   |
| dataJobName     | DataJob name (can be queried fuzzily) | Body     | False       | String |
| dataJobType     | DataJob type, refer to [Get Task Type List](../constApi/api_constant_listdatajobtype.md) | Body | False | String |
| desc            | Task description (can be queried fuzzily) | Body | False | String |
| sourceInstanceId | Source data source ID              | Body     | False       | Long   |
| targetInstanceId | Target data source ID              | Body     | False       | Long   |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code          | 1: Success, 0: Failed | String | True     |
| data          | Response data        | Object | False    |
| msg           | Error message (if any) | String | False    |
| requestId     | Request ID           | String | True     |

## Data Parameter Description

An array of DataJob information, including basic information, corresponding Task lists, and data source information. See [Query Task](api_datajob_query.md) for specific field information.

## Response Example

```json
{
  "requestId": "3cd0d7cc-2cc2-11ec-a410-d707b3e070b8",
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "dataJobId": 517,
      "dataJobName": "canal1v004a007dd",
      "dataJobDesc": "zzzz",
      "userName": "liqiang",
      "dataJobType": "SYNC",
      "dataTaskState": "FULL",
      "currTaskStatus": "RUNNING",
      "sourceDsVO": {
        "id": 61,
        "gmtCreate": "2021-09-10T03:42:39.000+0000",
        "gmtModified": "2021-09-10T03:58:30.000+0000",
        "uid": "4503980488230169",
        "owner": "liqiang",
        "deployType": "SELF_MAINTENANCE",
        "region": "customer",
        "dataSourceType": "MySQL",
        "privateHost": "127.0.0.1:3306",
        "publicHost": "",
        "hostType": "PRIVATE",
        "instanceDesc": "local_source",
        "version": "5.7.27-log",
        "instanceId": "my-6716s8rryux1366",
        "autoCreateAccount": "NOT_CREATE",
        "schemaJson": null,
        "consoleJobId": 0,
        "consoleTaskState": null,
        "accountName": "origin",
        "lifeCycleState": "CREATED",
        "securityType": "USER_PASSWD"
      },
      "targetDsVO": {
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
        "autoCreateAccount": "NOT_CREATE",
        "schemaJson": null,
        "consoleJobId": 0,
        "consoleTaskState": null,
        "accountName": "root",
        "lifeCycleState": "CREATED",
        "securityType": "USER_PASSWD"
      },
      "sourceSchema": null,
      "targetSchema": null,
      "mappingConfig": null,
      "filterDdl": false,
      "structMigration": false,
      "initialSync": true,
      "shotTermSync": false,
      "shotTermNum": 0,
      "gmtCreated": "2021-10-14T06:20:06.000+0000",
      "dataTasks": [
        {
          "dataTaskId": 1071,
          "gmtCreate": null,
          "gmtModified": null,
          "dataTaskType": "FULL",
          "dataTaskName": "canal1v004a007dd_FULL",
          "dataTaskStatus": "RUNNING",
          "dataJobId": 517,
          "dataJobName": null,
          "filterDdl": false,
          "checkOnce": false,
          "checkPeriod": false,
          "fullPeriod": false,
          "fullPeriodCronExpr": null,
          "checkPeriodCronExpr": null,
          "checkPeriodNum": 0,
          "lastCheckTime": null,
          "fullJvmHeapMb": 0,
          "incrementJvmHeapMb": 0,
          "checkJvmHeapMb": 0,
          "taskPosition": "{\"dataTaskId\":1071,\"gmtCreate\":1634192406000,\"gmtModified\":1634192406000,\"id\":1071,\"totalToTrans\":0,\"trans\":0,\"transPercent\":0.00}",
          "healthLevel": "Unhealthy",
          "workerId": 1,
          "workerIp": "192.168.0.133",
          "clusterId": 1,
          "dataDelayMs": 0,
          "nextFireTime": null,
          "startTriggerTime": "2021-10-14T06:25:34.000+0000",
          "firstHeartbeatSendTime": null
        },
        {
          "dataTaskId": 1072,
          "gmtCreate": null,
          "gmtModified": null,
          "dataTaskType": "INCREMENT",
          "dataTaskName": "canal1v004a007dd_INCREMENT",
          "dataTaskStatus": "INIT",
          "dataJobId": 517,
          "dataJobName": null,
          "filterDdl": false,
          "checkOnce": false,
          "checkPeriod": false,
          "fullPeriod": false,
          "fullPeriodCronExpr": null,
          "checkPeriodCronExpr": null,
          "checkPeriodNum": 0,
          "lastCheckTime": null,
          "fullJvmHeapMb": 0,
          "incrementJvmHeapMb": 0,
          "checkJvmHeapMb": 0,
          "taskPosition": "{\"dataDelayMillis\":0,\"dataTaskId\":1072,\"delayMillis\":4923195,\"filePosition\":0,\"gmtCreate\":1634192406000,\"gmtModified\":1634192406000,\"id\":1072,\"maxPositionTimestamp\":0,\"positionTimestamp\":1634192406589,\"serverId\":0}",
          "healthLevel": "Health",
          "workerId": 1,
          "workerIp": "192.168.0.133",
          "clusterId": 1,
          "dataDelayMs": 0,
          "nextFireTime": null,
          "startTriggerTime": "9999-09-09T02:00:00.000+0000",
          "firstHeartbeatSendTime": null
        }
      ],
      "fsmId": 446,
      "fsmActive": true,
      "consoleJobId": 1094,
      "consoleTaskState": "SUCCESS",
      "childJobs": null,
      "lifeCycleState": "CREATED",
      "srcSchemaLessFormat": null,
      "dstSchemaLessFormat": null,
      "dstDsCaseSensitive": false,
      "haveException": false
    }
  ]
}
```


