---
id: api_datajob_updatetransferobjnewfull
title: Modify DataJob (Full Data/Verification)
description: Edit the subscription of the task. This interface detects whether the current task is full or check.
---

## API Overview

Modify the subscription of a DataJob. It detects whether the current DataTask is Full Data or Verification.

## API Path

`/cloudcanal/console/api/v1/openapi/datajob/updatetransferobjectforfull`

## Request Method

`POST`       

## Request Parameters

| Parameter | Description     | Type | Required  |  Data Type  |
| ------------ | -------------------------------- |-----------|--------|----|
| dataJobId | DataJob ID | Body | Yes | long |
| structMigration | Whether to perform schema migration, such as table creation, database creation, topic creation, etc. | Body | No | boolean |
| initialSync | Whether to perform full data migration | Body | No | boolean |
| addMappingConfig | Newly added metadata mapping. Please refer to [Metadata Mapping](api_datajob_mapping.md)| Body | No | string |
| sourceAddConfig | Metadata added to the Source. Please refer to [Metadata Schema](api_datajob_schema.md)| Body | No | string |
| targetAddConfig | Metadata added to the Target. Please refer to [Metadata Schema](api_datajob_schema.md)| Body | No | string |
| mappingConfigWithoutAdd | Updated metadata mapping, excluding newly added ones. Please refer to [Metadata Mapping](api_datajob_mapping.md)| Body | Yes | string |
| srcSchemaWithoutAdd | Updated source metadata, excluding newly added ones. Please refer to [Metadata Schema](api_datajob_schema.md)| Body | Yes | string |
| dstSchemaWithoutAdd | Updated target metadata, excluding newly added ones. Please refer to [Metadata Schema](api_datajob_schema.md)| Body | No | string |

## Response Parameters

| Parameter | Description  | Type (Java) | Not Null |
| ------------ | -------------------|-------|----------- |
| code | 1: Success; 0: Fail | string | Yes |
| data | | Object | No |
| msg | | string | No |
| requestID | | string | Yes |

## Response Example

```json
{
  "requestId": "c5665d7c-2cb7-11ec-a410-bfd57df2q1ea",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


