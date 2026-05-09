---
id: api_worker_modifymemoversoldpercent
title: Modify Memory Oversell Ratio
description: Modify the memory oversell ratio of a specified worker node
---

## Interface Overview

Modify the memory oversell ratio of a specified worker node to control the number of tasks that can be created on the node.

## Interface Address

`/cloudcanal/console/api/v1/openapi/worker/modifyMemOverSoldPercent`

## Request Manner

`POST`

## Request Parameters

| ParameterName | Parameter Description | RequestType | Whether Required | DataType |
| ------------ | -------------------------------- |-----------|--------|----|
| workerId | Worker node ID | body | True | long |
| memOverSoldPercent | Memory oversell ratio, range 50–400. 100 means no overselling; values greater than 100 indicate overselling. | body | True | int |

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

## memOverSoldPercent Value Description

| Value Range | Description |
|---------|------|
| 50 | Use only 50% of physical memory |
| 100 | No overselling; use 100% of physical memory |
| 200 | Oversell by 1×; logically allocate up to 200% of physical memory |
| 400 | Oversell by 3×; logically allocate up to 400% of physical memory |

## Notes

- An excessively high memory oversell ratio may cause OOM (Out of Memory) on the node.
- It is recommended to set the oversell ratio based on actual task load.
- Changes take effect immediately but do not affect memory already allocated to existing tasks.
