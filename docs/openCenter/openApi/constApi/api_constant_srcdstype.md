---
id: api_constant_srcdstype
title: Source DataSource Type
description: Retrieve the data source type of the source endpoint to enable task creation selection.
---

## Interface Overview 

Retrieve the data source type of the source endpoint to enable task creation selection.

## Interface Address 

`/cloudcanal/console/api/v1/openapi/constant/srcdstype`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ | -------------------------------- |-----------|--------|----|
| deployType     | Data source deployment type<br/><br/>SELF_MAINTENANCE <br/>ALIBABA_CLOUD_HOSTED  | Body   | True    | string |   

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code       | 1: Success<br/>0: Failure | string | True     |
| data       |             | Object | False    |
| msg        |             | string | False    |
| requestId  |             | string | True     |

## Data Parameters

The data is an array, and array elements are data source types

## Response Example

```json
 {
   "requestId": "116fa5ee-2be4-11ec-b616-d37c8ae46be7",
   "code": "1",
   "msg": "request success",
   "data": [
     "MySQL",
     "PostgreSQL",
     "Greenplum",
     "Oracle",
     "Kafka",
     "RocketMQ",
     "MongoDB"
   ]
 }
```


