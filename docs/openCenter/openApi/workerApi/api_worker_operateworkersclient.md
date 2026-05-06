---
id: api_worker_operateworkersclient
title: Operate Worker
sidebar_position: 1
description: Manipulating machines includes installing, uninstalling, upgrading, and starting the client.
---

## Interface Overview 

Manipulating machines includes installing, uninstalling, upgrading, and starting the client.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/worker/operateworkersclient`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
|-----------|-----------|-----------|------|------|
| clusterId  | Cluster ID            | Body     | True     | Long   |
| workers    | List of machines to operate | Body | True     | List   |

## Workers Parameter Description

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
|-----------|---------|-----------|------|------|
| workerId        | Machine ID                             | Body     | True     | Long   |
| cloudOrIdcName  | Cloud service provider or IDC name     | Body     | True     | string |
| actionType      | Action type                            | Body     | True     | string |
| remoteUser      | Remote user name                       | Body     | False    | string |
| remotePassword  | Remote password                        | Body     | False    | string |  

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ---- | ------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure | string |True
| data       |             | Object |False
| msg        |             | string |False
| requestId  |             | string |True

## Response Example

```json
{
  "requestId": "89a71b85-2cb7-11ec-a410-1100c6102ca7",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


