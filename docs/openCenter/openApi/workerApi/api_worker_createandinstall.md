---
id: api_worker_createandinstall
title: Add Worker
sidebar_position: 1
description: Provisioning machines for task scheduling or database information retrieval purposes leveraging operational machines.
---

## Interface Overview 

Provisioning machines for **task scheduling** or **database information** retrieval purposes leveraging operational machines.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/worker/createandinstall`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | ---------------------------- |-----------|------|----|
| cloudOrIdcName  |SELF_MAINTENANCE <br/>ALIBABA_CLOUD |   Body    | True    |String  |     
| clusterId  | Cluster id |   Body    | True    |Long  |    
| region  | The region where the cluster is located. <br/><br/>hangzhou <br/>shanghai <br/>beijing <br/>shenzhen <br/>qingdao <br/>zhangjiakou <br/>huhehaote <br/>hongkong <br/>singapore <br/>silicon_valley <br/>london <br/>mq_internet_access <br/>customer |   Body    | True    |String  |
| executeTag  | Remote execution mode<br/><br/>DEFAULT_REMOTE|   Body    | True    |String  |
| remoteUser  | Remote machine username |   Body    | False    |String  |
| remotePassword  | The remote machine password. |   Body    | False    |String  |   
| remoteIp  | Machine ip |   Body    | False    |String  |   

## Common Response Result.

| ParameterName | Parameter Description     |    Type(Java) |  NotNull |
| ------------ | ----------------|-------|----------- |
| code     |  1: Success<br/>0: Failure |    String   |   True    |
| data     |      |    Object   |   False    |
| msg      |      |    String   |   False    |
| requestId     |      |    String   |   True    |

## Response Example

```json
{
  "requestId": "89a71b85-2cb7-11ec-a410-1100c6102ca7",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


