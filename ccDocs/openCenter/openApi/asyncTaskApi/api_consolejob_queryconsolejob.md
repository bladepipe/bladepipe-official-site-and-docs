---
id: api_consolejob_queryconsolejob
title: 异步任务详情
description: 接口描述：查询异步任务详情，包含任务描述、子步骤等，以便查询 任务创建 、删除任务 等操作状态
---

## 接口描述 

查询异步任务详情，包含任务描述、子步骤等，以便查询 **任务创建** 、**删除任务** 等操作状态

## 接口地址 

`/cloudcanal/console/api/v1/openapi/consolejob/queryconsolejob`

## 请求方式

`POST`       

## 请求参数

| 参数名称         | 参数说明     |     请求类型 |  是否必须      |  数据类型   |
| ------------ | -------------------------------- |-----------|--------|----|
| consoleJobId  |异步任务id,通常从创建的任务中获得 |   body    |   是   | long  |     

## 公共响应结果

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| code     |  1:成功 0:失败    |    string   |   是    |
| data     |      |    object   |   否    |
| msg      |      |    string   |   否    |
| requestId     |      |    string   |   是    |

## data 参数说明

data 中包含整个异步任务概况信息，以及每一个步骤的情况

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| id     |  主键    |    Long   |   是    |
| gmtCreate    | 创建时间     |    String   |   是    |
| gmtModified      |   修改时间   |    String   |    是   |
| jobToken     |   异步任务识别号   |    String   |  是     |
| label     |  异步任务类型  |    String   |   是    |
| dataJobName     | 异步任务关联任务名称   |    String   |   否    |
| dataJobDesc     | 异步任务描述  |    String   |   否    |
| workerName     | 该集群正常运行的机器总数  |    int   |   否    |
| workerDesc     | 该集群异常的机器总数  |    int   |   否    |
| dsInstanceId     | 拥有人名称  |    String   |   否    |
| datasourceDesc     | 拥有人名称  |    String   |   否    |
| taskState     | 任务状态 <br/><br/>  WAIT_START(等待启动) <br/>EXECUTE(执行中) <br/>SUCCESS(成功) <br/>FAILED(失败) <br/>CANCELED(已取消) <br/>SKIP(忽略)  |    String   |   是    |
| launcher     | 任务操作人  |    String   |   是    |
| launchTime     | 任务启动时间  |    String   |   否    |
| finishTime     | 任务结束时间  |    String   |   否    |
| userRoleType     | 执行人角色 <br/><br/>SYSTEM <br/>ORG_ADMIN |    String   |   是    |
| resourceType     | 关联的资源类型 <br/><br/>DATA_JOB <br/>CONSOLE_USER <br/>WORKER <br/>DATASOURCE  |    String   |   否    |
| resourceId     | 关联的资源id  |    Long   |   否    |

**taskVOList** 为步骤列表，如果失败，可重试或者忽略(如果可以忽略)

| 参数名称         | 参数说明                             |    类型(java) |  不为空 |
| ------------ | -------------------|-------|----------- |
| id     |  主键    |    Long   |   是    |
| gmtCreate    | 创建时间     |    String   |   是    |
| gmtModified      |   修改时间   |    String   |    是   |
| jobId     |  步骤关联的异步任务id   |    Long   |  是     |
| taskState     |  当前步骤状态 <br/><br/>WAIT_START(等待启动) <br/>EXECUTE(执行中) <br/>SUCCESS(成功) <br/>FAILED(失败) <br/>CANCELED(已取消) <br/>SKIP(忽略) |    String   |   是    |
| context     | 步骤关联的上下文信息   |    String   |   是    |
| host     | 步骤执行的机器地址  |    String   |   是    |
| executeOrder     | 执行顺序  |    int   |   是    |
| executeTime     | 步骤执行时间  |    String   |   否    |
| finishTime     | 步骤结束时间  |    String   |   否    |
| message     | 步骤如果执行异常，此处会展现相关异常信息  |    String   |   否    |
| cancelable     | 是否可忽略  |    Boolean   |   是    |
| stepName     | 步骤名称，带国际化  |    String   |   是    |

## 响应示例

```json
{
  "requestId": "36e910a4-2b4e-11ec-8c7e-4d8116d1099b",
  "code": "1",
  "msg": "request success",
  "data": {
    "id": 1081,
    "gmtCreate": "2021-10-08T05:15:05.000+0000",
    "gmtModified": "2021-10-08T05:15:13.000+0000",
    "jobToken": "b2a4424c-27f6-11ec-8a1c-e94c1c29eb93",
    "label": "DATA_JOB_CREATE",
    "dataJobName": "canalp417v2d81ir",
    "dataJobDesc": "123",
    "workerName": null,
    "workerDesc": null,
    "dsInstanceId": null,
    "datasourceDesc": null,
    "taskState": "SUCCESS",
    "launcher": "liqiang",
    "launchTime": "2021-10-08T05:15:06.000+0000",
    "finishTime": "2021-10-08T05:15:14.000+0000",
    "taskVOList": [
      {
        "id": 3409,
        "gmtCreate": "2021-10-08T05:15:05.000+0000",
        "gmtModified": "2021-10-08T05:15:13.000+0000",
        "jobId": 1081,
        "taskState": "SUCCESS",
        "context": "{\"consoleJobId\":0,\"dataJobId\":511,\"resources\":[]}",
        "host": "192.168.0.133",
        "executeOrder": 0,
        "executeTime": "2021-10-08T05:15:06.000+0000",
        "finishTime": "2021-10-08T05:15:13.000+0000",
        "message": null,
        "cancelable": true,
        "stepName": "\"MySQL->MySQL 结构迁移\""
      },
      {
        "id": 3410,
        "gmtCreate": "2021-10-08T05:15:05.000+0000",
        "gmtModified": "2021-10-08T05:15:13.000+0000",
        "jobId": 1081,
        "taskState": "SUCCESS",
        "context": "{\"consoleJobId\":0,\"dataJobId\":511,\"resources\":[]}",
        "host": "192.168.0.133",
        "executeOrder": 1,
        "executeTime": "2021-10-08T05:15:13.000+0000",
        "finishTime": "2021-10-08T05:15:14.000+0000",
        "message": null,
        "cancelable": false,
        "stepName": "\"分配任务执行机器\""
      },
      {
        "id": 3411,
        "gmtCreate": "2021-10-08T05:15:05.000+0000",
        "gmtModified": "2021-10-08T05:15:13.000+0000",
        "jobId": 1081,
        "taskState": "SUCCESS",
        "context": "{\"consoleJobId\":0,\"dataJobId\":511,\"resources\":[]}",
        "host": "192.168.0.133",
        "executeOrder": 2,
        "executeTime": "2021-10-08T05:15:14.000+0000",
        "finishTime": "2021-10-08T05:15:14.000+0000",
        "message": null,
        "cancelable": false,
        "stepName": "\"创建任务状态机\""
      },
      {
        "id": 3412,
        "gmtCreate": "2021-10-08T05:15:05.000+0000",
        "gmtModified": "2021-10-08T05:15:13.000+0000",
        "jobId": 1081,
        "taskState": "SUCCESS",
        "context": "{\"consoleJobId\":0,\"dataJobId\":511,\"resources\":[]}",
        "host": "192.168.0.133",
        "executeOrder": 3,
        "executeTime": "2021-10-08T05:15:14.000+0000",
        "finishTime": "2021-10-08T05:15:14.000+0000",
        "message": null,
        "cancelable": false,
        "stepName": "\"完成任务创建\""
      }
    ],
    "userRoleType": "SYSTEM",
    "resourceType": "DATA_JOB",
    "resourceId": 511
  }
}
```


