---
id: api_constant_listspecs
title: DataJob Specification
description: Gets a list of data task specifications to select when creating a task.
---

## Interface Overview 

Gets a list of data task specifications to select when creating a task.

## Interface Address

`/cloudcanal/console/api/v1/openapi/constant/listspecs`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| dataJobType    | Data job type<br/><br/>MIGRATION <br/>SYNC <br/>CHECK (Data verification)<br/>REVISE <br/>STRUCT_MIGRATION  | Body   | True     | String |
| initialSync    | Whether to perform data initialization  when dataJobType is SYNC | Body   | False    | Boolean |
| shortTermSync  | Whether to perform limited-time incremental data synchronization when dataJobType is MIGRATION | Body   | False    | Boolean |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure | String | True     |
| data       |             | Object | True     |
| msg        |             | String | True     |
| requestId  |             | String | True     |

## Data Parameters

The data is an array, and array elements are specification entities

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| id           | Specification ID | String | True     |
| specKind     | Specification series | String | True     |
| specKindCn   | Specification name in Chinese | String | True     |
| spec         | Specification | String | True     |
| description  | Specification description | String | True     |
| fullMemoryMb | Full memory usage (MB) | Integer | True     |
| increMemoryMb| Incremental memory usage (MB) | Integer | True     |
| checkMemoryMb| Verification memory usage (MB) | Integer | True     |

## Response Example

```json
{
  "taskId": 0,
  "code": "1",
  "msg": "request success",
  "data": [
    {
      "id": 1,
      "specKind": "IncreEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.increenhance.large.full.xlarge.incre",
      "description": "1 KB/record , record count < 20 m, incre tps < 1k",
      "fullMemoryMb": 1024,
      "increMemoryMb": 2048,
      "checkMemoryMb": 1024
    },
    {
      "id": 2,
      "specKind": "IncreEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.increenhance.large.full.2xlarge.incre",
      "description": "1 KB/record , record count < 20 m, incre tps < 2k",
      "fullMemoryMb": 1024,
      "increMemoryMb": 3072,
      "checkMemoryMb": 1024
    },
    {
      "id": 3,
      "specKind": "IncreEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.increenhance.large.full.3xlarge.incre",
      "description": "1 KB/record , record count < 20 m, incre tps < 10k",
      "fullMemoryMb": 1024,
      "increMemoryMb": 4096,
      "checkMemoryMb": 1024
    },
    {
      "id": 4,
      "specKind": "IncreEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.increenhance.xlarge.full.2xlarge.incre",
      "description": "1 KB/record , record count < 200 m, incre tps < 2k",
      "fullMemoryMb": 2048,
      "increMemoryMb": 3072,
      "checkMemoryMb": 2048
    },
    {
      "id": 5,
      "specKind": "IncreEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.increenhance.xlarge.full.3xlarge.incre",
      "description": "1 KB/record , record count < 200 m, incre tps < 10k",
      "fullMemoryMb": 2048,
      "increMemoryMb": 4096,
      "checkMemoryMb": 2048
    },
    {
      "id": 6,
      "specKind": "FullEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.fullenhance.large.full.small.incre",
      "description": "1 KB/record , record count < 20 m, incre tps < 0.2k",
      "fullMemoryMb": 1024,
      "increMemoryMb": 512,
      "checkMemoryMb": 1024
    },
    {
      "id": 7,
      "specKind": "FullEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.fullenhance.xlarge.full.small.incre",
      "description": "1 KB/record , record count < 200 m, incre tps < 0.2k",
      "fullMemoryMb": 2048,
      "increMemoryMb": 512,
      "checkMemoryMb": 2048
    },
    {
      "id": 8,
      "specKind": "FullEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.fullenhance.2xlarge.full.small.incre",
      "description": "1 KB/record , record count < 500 m, incre tps < 0.2k",
      "fullMemoryMb": 3072,
      "increMemoryMb": 512,
      "checkMemoryMb": 3072
    },
    {
      "id": 9,
      "specKind": "FullEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.fullenhance.3xlarge.full.small.incre",
      "description": "1 KB/record , record count < 2 b, incre tps < 0.2k",
      "fullMemoryMb": 4096,
      "increMemoryMb": 512,
      "checkMemoryMb": 4096
    },
    {
      "id": 10,
      "specKind": "FullEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.fullenhance.xlarge.full.large.incre",
      "description": "1 KB/record , record count < 200 m, incre tps < 0.5k",
      "fullMemoryMb": 2048,
      "increMemoryMb": 1024,
      "checkMemoryMb": 2048
    },
    {
      "id": 11,
      "specKind": "FullEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.fullenhance.2xlarge.full.large.incre",
      "description": "1 KB/record , record count < 500 m, incre tps < 0.5k",
      "fullMemoryMb": 3072,
      "increMemoryMb": 1024,
      "checkMemoryMb": 3072
    },
    {
      "id": 12,
      "specKind": "FullEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.fullenhance.3xlarge.full.large.incre",
      "description": "1 KB/record , record count < 2 b, incre tps < 0.5k",
      "fullMemoryMb": 4096,
      "increMemoryMb": 1024,
      "checkMemoryMb": 4096
    },
    {
      "id": 13,
      "specKind": "FullEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.fullenhance.2xlarge.full.xlarge.incre",
      "description": "1 KB/record , record count < 500 m, incre tps < 1k",
      "fullMemoryMb": 3072,
      "increMemoryMb": 2048,
      "checkMemoryMb": 3072
    },
    {
      "id": 14,
      "specKind": "FullEnhance",
      "specKindCn": "Incremental enhancement",
      "spec": "cloudcanal.fullenhance.3xlarge.full.xlarge.incre",
      "description": "1 KB/record , record count < 2 b, incre tps < 1k",
      "fullMemoryMb": 4096,
      "increMemoryMb": 2048,
      "checkMemoryMb": 4096
    },
    {
      "id": 15,
      "specKind": "Balance",
      "specKindCn": "Balanced type",
      "spec": "cloudcanal.balance.large.full.large.incre",
      "description": "1 KB/record , record count < 20 m, incre tps < 0.5k",
      "fullMemoryMb": 1024,
      "increMemoryMb": 1024,
      "checkMemoryMb": 1024
    },
    {
      "id": 16,
      "specKind": "Balance",
      "specKindCn": "Balanced type",
      "spec": "cloudcanal.balance.xlarge.full.xlarge.incre",
      "description": "1 KB/record , record count < 200 m, incre tps < 1k",
      "fullMemoryMb": 2048,
      "increMemoryMb": 2048,
      "checkMemoryMb": 2048
    },
    {
      "id": 17,
      "specKind": "Balance",
      "specKindCn": "Balanced type",
      "spec": "cloudcanal.balance.2xlarge.full.2xlarge.incre",
      "description": "1 KB/record , record count < 500 m, incre tps < 2k",
      "fullMemoryMb": 3072,
      "increMemoryMb": 3072,
      "checkMemoryMb": 3072
    },
    {
      "id": 18,
      "specKind": "Balance",
      "specKindCn": "Balanced type",
      "spec": "cloudcanal.balance.3xlarge.full.3xlarge.incre",
      "description": "1 KB/record , record count < 2 b, incre tps < 10k",
      "fullMemoryMb": 4096,
      "increMemoryMb": 4096,
      "checkMemoryMb": 4096
    },
    {
      "id": 19,
      "specKind": "Balance",
      "specKindCn": "Balanced type",
      "spec": "cloudcanal.balance.small.full.small.incre",
      "description": "1 KB/record , record count < 10 m, incre tps < 0.2k",
      "fullMemoryMb": 512,
      "increMemoryMb": 512,
      "checkMemoryMb": 512
    }
  ]
}
```


