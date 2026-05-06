---
id: api_datajob_queryjobposition
title: Query DataJob Position
description: Query the position information of a task by task ID. Currently only supports CHECK tasks.
---

## Interface Overview

Query the position information of a task by task ID. Currently only supports CHECK (verification) type tasks, returning table-level verification results.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/queryjobposition`

## Request Manner

`POST`

## Request Parameters

| ParameterName | Parameter Description | RequestType | Whether Required | DataType |
| ------------ | -------------------------------- |-----------|--------|----|
| jobId | DataJob ID | body | True | long |
| dataJobType | Task type. Currently only supports CHECK. See [Get Task Type List](../constApi/api_constant_listdatajobtype.md) | body | True | string |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: Success, 0: Failure | string | True |
| data | | object | False |
| msg | | string | False |
| requestId | | string | True |

## Data Parameter Description

| ParameterName | Parameter Description | NotNull | Type(Java) |
| ------------ |-----------|--------|----|
| tableCheckResultMap | Table verification result map. Key is the JSON-serialized string of TableUnit; value is a verification position object. | False | map |

### TableUnit (Map Key) Description

The map key is the JSON-serialized string of a TableUnit object, for example: `{"dbName":"test_db","tableSchema":"public","tableName":"table1"}`

| ParameterName | Parameter Description | NotNull | Type(Java) |
| ------------ |-----------|--------|----|
| dbName | Database name | False | string |
| tableSchema | Schema name | False | string |
| tableName | Table name | True | string |

### RdbCheckPositionDTO (Map Value) Description

Verification position object containing table-level verification progress and result information.

#### Basic Information

| ParameterName | Parameter Description | NotNull | Type(Java) |
| ------------ |-----------|--------|----|
| taskId | Task ID | False | string |
| jobId | Job ID | False | string |
| taskName | Task name | False | string |
| dbName | Database name | False | string |
| schema | Schema name | False | string |
| tableName | Table name | False | string |

#### Progress Information

| ParameterName | Parameter Description | NotNull | Type(Java) |
| ------------ |-------|--------|----|
| handledRecordCount | Number of processed records | True | long |
| maxCount | Maximum number of records | True | long |
| percentage | Progress percentage (0-100) | False | decimal |
| elapsedTimeMs | Elapsed time (milliseconds) | True | long |
| finished | Whether the table verification is complete | True | boolean |

#### Primary Key Information

| ParameterName | Parameter Description | NotNull | Type(Java) |
| ------------ |-----------|--------|----|
| currentPk | Current primary key value being processed | False | string |
| minPkNumeric | Minimum primary key value (numeric) | False | decimal |
| maxPkNumeric | Maximum primary key value (numeric) | False | decimal |

#### Verification Results

| ParameterName | Parameter Description | NotNull | Type(Java) |
| ------------ |----------|--------|----|
| loss | Number of records missing on the target (present in source but not in target) | False | long |
| diff | Number of records inconsistent with target (present on both sides but with different content) | False | long |
| checkStage | Verification stage | False | string |

#### Other Fields

| ParameterName | Parameter Description | NotNull | Type(Java) |
| ------------ |-----------|--------|----|
| fileBlockIndex | File block index | True | long |
| included | Whether the first record is included | True | boolean |

## Response Example

```json
{
  "code": "1",
  "msg": "request success",
  "data": {
    "tableCheckResultMap": {
      "{\"tableName\":\"worker_stats\",\"tableSchema\":\"dingtax\"}": {
        "taskId": "622",
        "jobId": "266",
        "taskName": "canalsubnt1b4uqw_CHECK",
        "dbName": null,
        "schema": "dingtax",
        "tableName": "worker_stats",
        "handledRecordCount": 36352,
        "maxCount": 157458,
        "percentage": 23.09,
        "elapsedTimeMs": 22624,
        "included": true,
        "finished": false,
        "loss": 0,
        "diff": 0,
        "checkStage": "INITIAL_CHECK"
      }
    }
  },
  "requestId": "5d589cc0-ce71-11f0-8388-cf86e7c30fd4"
}
```

## Notes

- This API currently only supports `dataJobType` = `CHECK` (verification tasks).
- Calling this API for other task types will return an error.
- `loss` indicates records present in the source but missing on the target.
- `diff` indicates records present on both sides but with inconsistent data content.
- When `finished` is `true` and both `loss` and `diff` are `0`, the table verification has passed.
