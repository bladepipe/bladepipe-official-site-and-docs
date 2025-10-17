---
id: api_datajob_query
title: Query DataJob Detail
description: Query task details based on the task id
---

## Interface Overview 

Query task details based on the task id

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datajob/queryjob`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId | ID of the task |Body| True | Long | 

## Public Response Results

| ParameterName | Parameter Description  | NotNull | Type(Java)
| ------------ | -------------------|-------|----------- |
| code          | 1: Success, 0: Failure | True     | String |
| data          | Data returned (if any)                        | False    | Object |
| msg           | Error message (if any)                        | False    | String |
| requestId     | Unique identifier for the request and response| True     | String |

## Data Parameter Description

The result data contains basic DataJob information, the corresponding Task list, and basic data source information

| ParameterName | Parameter Description  | NotNull | Type(Java)
| ------------ |-----------|--------|----|
| dataJobId          | ID of the DataJob                                                              | True     | Long   |
| dataJobName        | Name of the DataJob                                                            | True     | Long   |
| dataJobDesc        | Description of the DataJob                                                     | True     | String |
| gmtCreated         | Time of creation                                                               | True     | String |
| userName           | Owner of the DataJob                                                           | True     | String |
| dataJobType        | Type of the DataJob. See [Get Task Type List](../constApi/api_constant_listdatajobtype.md) for more information | True     | Long   |
| dataTaskState      | Current phase of the DataJob. See [DataJob Phase List](../constApi/api_constant_listdatataskstates.md) for more information | True     | String |
| currTaskStatus |The status of current phase of the DataJob. [DataTask Status List](../constApi/api_constant_listdatataskstatuses.md) for more information | True ｜ String |
| sourceDsVO         | Information about the source data source. See [Data Source Information](../dataSourceApi/api_datasource_queryds.md) for more information | True     | String |
| targetDsVO         | Information about the target data source. See [Data Source Information](../dataSourceApi/api_datasource_queryds.md) for more information | True     | String |
| dataTasks          | List of tasks. See **dataTaskVO Parameter Description** for more information | True     | String |
| sourceSchema       | Schema information obtained by [Querying Task Schema Information](api_datajob_queryjobschema.md)      | False    | String |
| targetSchema       | Schema information obtained by [Querying Task Schema Information](api_datajob_queryjobschema.md)      | False    | String |
| mappingConfig      | Schema information obtained by [Querying Task Schema Information](api_datajob_queryjobschema.md)      | False    | String |
| filterDDL          | Whether to filter DDL synchronization. True indicates filtering, and false indicates not filtering | True     | Boolean|
| structMigration    | Whether to perform structure migration.                                        | True     | Boolean|
| initialSync        | Whether to initialize data (full migration) if it is a data synchronization task.| False    | Boolean|
| shortTermNum       | Number of days for short-term synchronization, if any.                         | False    | Int    |
| shortTermSync      | Whether to perform short-term synchronization if it is a data migration task.  | False    | Boolean|
| fsmId              | ID of the state machine.                                                        | True     | Int    |
| fsmActive          | Whether the state machine is active.                                            | False    | Boolean|
| consoleJobId       | ID of the asynchronous task that has been run or is currently running, and is the closest to the current time. | False    | Boolean|
| consoleTaskState   | State of the asynchronous task.                                                | False    | String |
| childJobs          | List of child tasks.                                                            | False    | Boolean|
| lifeCycleState     | Lifecycle <br/><br/>CREATING <br/>CREATED <br/>DELETING <br/>DELETED <br/>LOCKED | False    | Boolean|
| srcSchemaLessFormat| Schema type defined if the source is a message or cache.                         | False    | Boolean|
| dstSchemaLessFormat| Schema type defined if the target is a message or cache.                         | False    | String |
| dstCaseSensitiveType| Case-sensitive type of the target data source <br/>UpperCase <br/>LowerCase <br/>Sensitive <br/>NoSpecified | False | Boolean|
| haveException      | Whether an exception exists.                                                    | False    | Boolean|    

### DataTaskVO Parameter Description
| ParameterName | Parameter Description                                                                                                                           | NotNull | Type(Java)
| ------------ |-------------------------------------------------------------------------------------------------------------------------------------------------|--------|----|
| dataTaskId           | ID of the data task.                                                                                                                            | True     | Long   |
| gmtCreate            | Time of creation.                                                                                                                               | True     | String |
| gmtModified          | Time of the last modification.                                                                                                                  | True     | String |
| dataTaskType         | Type of the DataTask. <br/>BUILD_STRUCT<br/>FULL <br/>INCREMENT <br/>CHECK<br/>REVISE<br/>REVIEW | True     | String |
| dataTaskName         | Name of the data task.                                                                                                                          | True     | String |
| dataTaskStatus       | Current status of the task. See [Task Status List](../constApi/api_constant_listdatataskstatuses.md) for more information.                      | True     | String |
| dataJobId            | ID of the DataJob to which the task belongs.                                                                                                    | True     | Long   |
| dataJobName          | Name of the DataJob to which the task belongs.                                                                                                  | False    | String |
| filterDdl            | Whether to filter DDL synchronization. True indicates filtering, and false indicates not filtering.                                             | True     | Boolean|
| checkOnce            | Whether to perform one-time verification.                                                                                                       | True     | Boolean|
| checkPeriod          | Whether to perform periodical verification.                                                                                                     | True     | Boolean|
| fullPeriod           | Whether to perform periodic migration.                                                                                                          | True     | Boolean|
| fullPeriodCronExpr   | CronTab expression for periodic migration.                                                                                                      | False    | String |
| checkPeriodCronExpr  | CronTab expression for periodical verification.                                                                                                 | False    | String |
| lastCheckTime        | Time of the last verification.                                                                                                                  | False    | String |
| fullJvmHeapMb        | Heap memory (in MB) for the Java process launched during full migration.                                                                        | False    | Int    |
| incrementJvmHeapMb   | Heap memory (in MB) for the Java process launched during incremental synchronization.                                                           | False    | Int    |
| checkJvmHeapMb       | Heap memory (in MB) for the Java process launched during verification.                                                                          | False    | Int    |
| taskPosition         | Position of the task.                                                                                                                           | False    | String |
| healthLevel          | Health status of the task. Possible values are: Unhealthy, SubHealth, and Health.                                                               | False    | String |
| workerId             | ID of the machine where the task is mounted.                                                                                                    | False    | String |
| workerIp             | IP address of the machine where the task is mounted.                                                                                            | False    | String |
| clusterId            | ID of the cluster where the task is mounted.                                                                                                    | False    | Long   |
| dataDelayMs          | Delay (in milliseconds).                                                                                                                        | False    | Long   |
| nextFireTime         | Time of the next trigger.                                                                                                                       | False    | String |
| startTriggerTime     | Time of the first trigger after starting.                                                                                                       | False    | String |
| firstHeartbeatSendTime| Time of the first heartbeat sent after starting.                                                                                                | False    | String |

## Response Example

```json
{
  "requestId": "8e2e34f4-2cb8-11ec-a410-735664430ce2",
  "code": "1",
  "msg": "request success",
  "data": {
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
        "lastCheckTime": null,
        "fullJvmHeapMb": 2048,
        "incrementJvmHeapMb": 2048,
        "checkJvmHeapMb": 2048,
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
        "fullJvmHeapMb": 2048,
        "incrementJvmHeapMb": 2048,
        "checkJvmHeapMb": 2048,
        "taskPosition": "{\"dataDelayMillis\":0,\"dataTaskId\":1072,\"delayMillis\":764819,\"filePosition\":0,\"gmtCreate\":1634192406000,\"gmtModified\":1634192406000,\"id\":1072,\"maxPositionTimestamp\":0,\"positionTimestamp\":1634192406589,\"serverId\":0}",
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
    "childJobs": [],
    "lifeCycleState": "CREATED",
    "srcSchemaLessFormat": null,
    "dstSchemaLessFormat": null,
    "dstDsCaseSensitive": true,
    "haveException": false
  }
}
```


