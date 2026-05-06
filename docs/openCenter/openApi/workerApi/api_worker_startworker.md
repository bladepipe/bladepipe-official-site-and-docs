---
id: api_worker_startworker
title: Start Worker
description: Start a specified worker node
---

## Interface Overview

Start a specified worker node and update the node status to waiting-to-online.

## Interface Address

`/cloudcanal/console/api/v1/openapi/worker/startWorker`

## Request Manner

`POST`

## Request Parameters

| ParameterName | Parameter Description | RequestType | Whether Required | DataType |
| ------------ | -------------------------------- |-----------|--------|----|
| workerId | Worker node ID | body | True | long |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: Success, 0: Failure | string | True |
| data | | object | False |
| msg | | string | False |
| requestId | | string | True |

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

- After starting, the node status changes to `WAIT_TO_ONLINE` (waiting to go online).
- Once the Sidecar client on the node starts, it automatically updates the status to `ONLINE`.
