---
id: api_datasource_deleteds
title: Delete DataSource
description: Delete the data source, provided that no data tasks depend on the data source, otherwise an error is reported.
---

## Interface Overview

Delete the data source, provided that no data tasks depend on the data source, otherwise an error is reported.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datasource/deleteds`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| dataSourceId  | Target data source ID  | Body       | True             | Long     |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code          | 1: Success<br/>0: Failure         | String     | True    |
| data          |                                   | Object     | False   |
| msg           |                                   | String     | False   |
| requestId     |                                   | String     | True    |

## Response Example

```json
{
  "requestId": "4f9f0b23-2b4a-11ec-8c7e-d98fc83f029e",
  "code": "1",
  "msg": "request success",
  "data": []
}
```


