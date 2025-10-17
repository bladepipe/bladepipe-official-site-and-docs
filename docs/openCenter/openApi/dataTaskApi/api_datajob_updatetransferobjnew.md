---
id: api_datajob_updatetransferobjnew
title: Modify DataJob (Incremental)
description: Edit the subscription information of the task. This interface detects whether the current task is in the incremental synchronous catch-up phase.
---

## API Overview

Modify the subscription of a DataJob. It detects whether the current task is the Incremental. If it is a DataJob of whole database sync, this API is invalid.

After a successful call, if there are new objects to be sync, a sub DataTask of the current DataJob will be generated.

## API Path

`/cloudcanal/console/api/v1/openapi/datajob/updatetransferobject`

## Request Method

`POST`       

## Request Parameters

| Parameter | Description     | Type | Required  |  Data Type  |
| ------------ | -------------------------------- |-----------|--------|----|
| dataJobId | DataJob ID | Body | Yes | Long |
| structMigration | Whether to perform schema migration, such as table creation, database creation, topic creation, etc. | Body | No | Boolean |
| initialSync | Whether to perform full data migration | Body | No | Boolean |
| addMappingConfig | Newly added metadata mapping. Please refer to [Metadata Mapping](api_datajob_mapping.md)| Body | No | String |
| sourceAddConfig | Metadata added to the Source. Please refer to [Metadata Schema](api_datajob_schema.md)| Body | No | String |
| targetAddConfig | Metadata added to the Target. Please refer to [Metadata Schema](api_datajob_schema.md)| Body | No | String |
| mappingConfigWithoutAdd | Updated metadata mapping, excluding newly added ones. Please refer to [Metadata Mapping](api_datajob_mapping.md)| Body | Yes | String |
| srcSchemaWithoutAdd | Updated source metadata, excluding newly added ones. Please refer to [Metadata Schema](api_datajob_schema.md)| Body | Yes | String |
| dstSchemaWithoutAdd | Updated target metadata, excluding newly added ones. Please refer to [Metadata Schema](api_datajob_schema.md)| Body | No | String |

## Response Parameters

| Parameter | Description  | Type (Java) | Not Null |
| ------------ | -------------------|-------|----------- |
| code | 1: Success; 0: Fail | String | Yes |
| data | | Object | No |
| msg | | String | No |
| requestID | | String | Yes |

## Response Example

```json
{
  "requestId": "c5665d7c-2cb7-11ec-a410-bfd57df2q1ea",
  "code": "1",
  "msg": "request success",
  "data": null
}
```


