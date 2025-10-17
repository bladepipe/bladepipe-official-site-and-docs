---
id: api_consolejob_queryconsolejob
title: View ConsoleJob
description: The secret credential obtained from BladePipe.
---

## Interface Summary 

Querying async job detail inclusive of job description, sub-steps etc. to ascertain the status of operations such as **task creation** and **task deletion**

## Interface Address 

`/cloudcanal/console/api/v1/openapi/consolejob/queryconsolejob`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| consoleJobId  |The asynchronous job identifier, typically obtained from the created job |   Body    |   True   | Long  |     

## Common Response Result

| ParameterName | Parameter Description     |    Type(Java) |  NotNull |
| ------------ | -------------------|-------|----------- |
| code     |  1: Success<br/>0: Failure    |    String   |   True    |
| data     |      |    Object   |   False    |
| msg      |      |    String   |   False    |
| requestId     |      |    String   |   True    |

## Data Parameter Description

The **data** incorporates the entire overview of the asynchronous job in tandem with the status of each step.

| Parameter Name | Parameter Description     |    Type(Java) |  NotNull |
| ------------ | -------------------|-------|----------- |
| id     |  Primary Key    |    Long   |   True    |
| gmtCreate    | CreatTime     |    String   |   True    |
| gmtModified      |   ModifyTime   |    String   |    True   |
| jobToken     |   Asynchronous task identifier   |    String   |  True     |
| label     |  Asynchronous task type  |    String   |   True    |
| dataJobName     | Asynchronous task related task name   |    String   |   False    |
| dataJobDesc     | Asynchronous task description  |    String   |   False    |
| workerName     | The total number of machines operating normally within that cluster  |    int   |   False    |
| workerDesc     | The aggregate number of anomalous/faulty machines within that cluster  |    int   |   False    |
| dsInstanceId     | Owner name  |    String   |   false    |
| datasourceDesc   | Owner name  |    String   |   false    |
| taskState     | Task state <br/><br/>  WAIT_START <br/>EXECUTE <br/>SUCCESS <br/>FAILED <br/>CANCELED <br/>SKIP  |    String   |   True    |
| launcher     | Task operator  |    String   |   true    |
| launchTime     | Task activation time  |    String   |   false    |
| finishTime     | Task completion time  |    String   |   false    |
| userRoleType     | Task performer role <br/><br/>SYSTEM <br/>ORG_ADMIN |    String   |   True    |
| resourceType     | Related resource type <br/><br/>DATA_JOB <br/>CONSOLE_USER <br/>WORKER <br/>DATASOURCE  |    String   |   False    |
| resourceId     | Related resource identifier  |    Long   |   False    |

**TaskVOList** denotes the step list, which can be retried or disregarded (if possible) in the event of failure.

| ParameterName | Parameter Description     |    Type(Java) |  NotNull |
| ------------ | -------------------|-------|----------- |
| id     |  Primary Key     |    Long   |   True    |
| gmtCreate    | CreatTime     |    String   |   True    |
| gmtModified      |   ModifyTime   |    String   |    True   |
| jobId     |  Asynchronous task associated step identifier   |    Long   |  True     |
| taskState     |  Current step state <br/><br/>WAIT_START <br/>EXECUTE <br/>SUCCESS <br/>FAILED <br/>CANCELED <br/>SKIP |    String   |   True    |
| context     | The context pertaining to the associated step   |    String   |   True    |
| host     | Address of the machine executing the step  |    String   |   True    |
| executeOrder     | Sequential execution order  |    Int   |   True    |
| executeTime     | Step execution time  |    String   |   False    |
| finishTime     | The timestamp for step completion.  |    String   |   False    |
| message     | In the event of anomalous step execution, the relevant exception information will be presented here.  |    String   |   False    |
| cancelable     | Non-ignorable  |    Boolean   |   True    |
| stepName     | The step name with internationalization.  |    String   |   True    |

## Response Example

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
        "stepName": "\"MySQL->MySQL Data Migration\""
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
        "stepName": "\"Allocating task performing machines\""
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
        "stepName": "\"Instantiating the task state machine\""
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
        "stepName": "\"Task creation complete\""
      }
    ],
    "userRoleType": "SYSTEM",
    "resourceType": "DATA_JOB",
    "resourceId": 511
  }
}
```


