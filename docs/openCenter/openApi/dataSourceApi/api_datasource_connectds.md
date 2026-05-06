---
id: api_datasource_connectds
title: Connect DataSource
description: Link the data source to confirm the connectivity between the selected cluster machine and the datasource.
---

## Interface Overview

Link the data source to confirm the connectivity between the selected cluster machine and the datasource.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datasource/connectds`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| clusterId    | Cluster ID for connecting to the data source  | Body   | True     | Long                                                                             |
| dataSourceId | Target data source ID                         | Body   | True     | Long                                                                             |
| hostType     | Selected network type for the data source<br/><br/>PRIVATE (intranet)<br/>PUBLIC (public network) | Body   | True     | string |       

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code          |  1: Success<br/>0: Failure           | String     | True    |
| data          |                        | Object     | False   |
| msg           |               | String     | False   |
| requestId     |             | String     | True    |

## Response Example

```json
{
  "requestId": "4f9f0b23-2b4a-11ec-8c7e-d98fc83f029e",
  "code": "1",
  "msg": "request success",
  "data": []
}
```


