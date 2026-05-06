---
id: api_worker_updateworkeralertconfig
title: Update Worker Alert Config
description: Update the alert configuration of a specified worker node
---

## Interface Overview

Update the alert configuration of a specified worker node, including phone, email, instant messaging, and SMS alert switches.

## Interface Address

`/cloudcanal/console/api/v1/openapi/worker/updateWorkerAlertConfig`

## Request Manner

`POST`

## Request Parameters

| ParameterName | Parameter Description | RequestType | Whether Required | DataType |
| ------------ | -------------------------------- |-----------|--------|----|
| workerId | Worker node ID | body | True | long |
| phone | Whether to enable phone alerts | body | False | boolean |
| email | Whether to enable email alerts | body | False | boolean |
| im | Whether to enable instant messaging alerts (e.g., DingTalk) | body | False | boolean |
| sms | Whether to enable SMS alerts | body | False | boolean |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: Success, 0: Failure | string | True |
| data | | object | False |
| msg | | string | False |
| requestId | | string | True |

## Request Example

```json
{
  "workerId": 1,
  "phone": false,
  "email": true,
  "im": true,
  "sms": false
}
```

## Response Example

```json
{
  "requestId": "ebd0b7dc-54ed-11ed-b820-5bd47d77dc8c",
  "code": "1",
  "msg": "request success",
  "data": null
}
```

## Notes

- Alert configuration changes take effect immediately.
- The corresponding alert channels (email server, DingTalk robot, etc.) must be configured in the system for alerts to be sent properly.
