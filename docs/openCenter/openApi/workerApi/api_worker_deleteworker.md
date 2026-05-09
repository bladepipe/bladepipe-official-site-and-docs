---
id: api_worker_deleteworker
title: Delete Worker
description: Delete a specified worker node
---

## Interface Overview

Delete a specified worker node.

## Interface Address

`/cloudcanal/console/api/v1/openapi/worker/deleteWorker`

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

- Ensure no running tasks exist on the node before deleting it.
- Deletion is irreversible — proceed with caution.
- If tasks are still mounted on the node, the deletion operation may fail.
