---
id: api_worker_stopworker
title: Stop Worker
description: Stop a specified worker node
---

## Interface Overview

Stop a specified worker node and update the node status to waiting-to-offline.

## Interface Address

`/cloudcanal/console/api/v1/openapi/worker/stopWorker`

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

- After stopping, the node status changes to `WAIT_TO_OFFLINE` (waiting to go offline).
- Once the Sidecar client on the node stops, it automatically updates the status to `OFFLINE`.
- Ensure no tasks are mounted on the node before stopping it; otherwise, the operation may fail. Tasks can be migrated to other nodes in advance via manual scheduling.
