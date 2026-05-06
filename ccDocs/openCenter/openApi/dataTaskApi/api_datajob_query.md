---
id: api_datajob_query
title: 查询任务详情
description: 接口描述：根据任务id查询任务详情
---

## 接口描述 

根据任务id查询任务详情

## 接口地址 

`/cloudcanal/console/api/v1/openapi/datajob/queryjob`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId  |任务id|   body    |   是   |  long |  

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

结果数据包含 DataJob 的基本信息，以及具体对应的 Task 列表和数据源基本信息

| 参数名称         | 参数说明      |  不为空     | 数据类型    |
| ------------ |-----------|--------|---------|
| dataJobId  | DataJob id  |   是   | long    |  
| dataJobName  | DataJob 名称 |    是   | string    |   
| dataJobDesc  | DataJob 描述  |   是   | string  |   
| gmtCreated  | 创建时间|   是   | string  | 
| userName  | 拥有者  |    是   | string  |      
| dataJobType  | DataJob 类型, 参考 [获取任务类型列表](../constApi/api_constant_listdatajobtype.md) |   是   | string  |     
| dataTaskState  |当前任务阶段，参考 [任务阶段列表](../constApi/api_constant_listdatataskstates.md)  |   是   | string  |
| currTaskStatus |当前任务阶段的状态，参考 [任务状态列表](../constApi/api_constant_listdatataskstatuses.md) | 是 ｜ string |
| sourceDsVO  |源端数据源信息，参考 [数据源信息](../dataSourceApi/api_datasource_queryds.md)  |   是   | string  |     
| targetDsVO  |目标端数据源信息，参考 [数据源信息](../dataSourceApi/api_datasource_queryds.md)  |   是   | string  |    
|dataTasks | Task 列表，参考 **dataTaskVO 参数说明** |   是   | string  |  
| sourceSchema  |单独通过 [查询任务schema信息](api_datajob_queryjobschema.md) 查询  |   否   | string  |   
| targetSchema  |单独通过 [查询任务schema信息](api_datajob_queryjobschema.md) 查询   |   否   | string  |    
| mappingConfig |单独通过 [查询任务schema信息](api_datajob_queryjobschema.md) 查询  |   否   | string  |   
| filterDdl  |是否过滤 DDL 同步,true 表示过滤， false 表示不过滤 |   是   | boolean |
| structMigration  |是否做结构迁移    |   是   | boolean |
| initialSync  |如果是数据同步任务，是否需要初始化数据(全量迁移) |   否   | boolean |
| shotTermNum  |如果有短期同步，持续多少天 |   否   | int     |
| shotTermSync  |如果是数据迁移任务，是否需要短期同步 |   否   | boolean |     
| fsmId  |状态机id  |    是   | long    |     
| fsmActive  |状态机是否活跃|     否   | boolean |  
| consoleJobId  |曾运行过或正在运行，距离当前时间最近的异步任务 id  |   否   | long    |     
| consoleTaskState  | 异步任务状态 |   否   | string  |     
| childJobs  | 子任务列表 |   否   | string  |     
| lifeCycleState  | 生命周期 <br/><br/>CREATING(创建中) <br/>CREATED(已创建) <br/>DELETING(删除中) <br/>DELETED(已删除) <br/>LOCKED(锁定)|   否   | string  |     
| srcSchemaLessFormat  |如果源端是消息或者缓存，定义的schema类型 |   否   | string  |     
| dstSchemaLessFormat  |如果目标端是消息或者缓存，定义的schema类型|   否   | string  |
| dstDsCaseSensitive  | 目标数据源大小写敏感类型|   否   | boolean | 
| haveException  |是否存在异常   |   否   | boolean |     

### dataTaskVO 参数说明
| 参数名称         | 参数说明     |  不为空      | 数据类型    |
| ------------ |-----------|--------|---------|
| dataTaskId  |Task id   |   是   | long    |          
| gmtCreate  |创建时间   |   是   | string  |            
| gmtModified  |上次更改时间    |   是   | string  |          
| dataTaskType  |Task 类型 <br/><br/>BUILD_STRUCT(结构迁移) <br/>FULL(全量迁移) <br/>INCREMENT(增量同步) <br/>CHECK(校验) <br/>REVISE(订正) <br/>REVIEW(未使用)   |   是   | string  |    
| dataTaskName  |Task 名称 |   是   | string  | 
| dataTaskStatus  |Task 状态，参考 [任务状态列表](../constApi/api_constant_listdatataskstatuses.md)  |   是   | string  |  
| dataJobId  |所属的 DataJob id   |   是   | long    |  
| dataJobName  |所属的 DataJob 名称 |   否   | string  | 
| filterDdl  |是否过滤 DDL  |   是   | boolean | 
| checkOnce  |是否单次校验   |   是   | boolean | 
| checkPeriod  |是否是周期性校验   |   是   | boolean | 
| fullPeriod  |是否是周期性迁移   |   是   | boolean | 
| fullPeriodCronExpr  |周期性迁移 CronTab 表达式   |   否  | string  | 
| checkPeriodCronExpr  |周期性校验 CronTab 表达式   |   否  | string  |
| checkPeriodNum  |周期性校验次数   |   否  | int     |
| lastCheckTime  |上次校验时间   |   否  | string  | 
| fullJvmHeapMb  |全量任务启动的 java 进程堆内存,MB    |   否  | int     | 
| incrementJvmHeapMb  |增量任务启动的 java 进程堆内存,MB   |   否  | int     | 
| checkJvmHeapMb  |校验任务启动的 java 进程堆内存,MB   |   否  | int     | 
| taskPosition  |任务位点    |   否  | string  | 
| healthLevel  |任务健康状况 <br/><br/>Unhealthy(异常) <br/>SubHealth(亚健康，无法判定死活) <br/>Health(正常)   |   否  | string  | 
| workerId  |挂载的机器id |   否  | long    | 
| workerIp  |挂载的机器ip   |   否  | string  | 
| clusterId  |挂载集群id   |   否  | long    | 
| dataDelayMs  |延迟时间,毫秒   |   否  | long    | 
| nextFireTime  |下一次触发时间  |   否  | string  | 
| startTriggerTime  |开始触发时间  |   否  | string  | 
| firstHeartbeatSendTime  |启动后第一次返回心跳包时间  |   否  | string  | 

## 响应示例

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


