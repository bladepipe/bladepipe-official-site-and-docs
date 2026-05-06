---
id: api_datasource_updatealiyunrdsaksk
title: Update AliBaBa Cloud AK/SK
description: Update datasource AliBaBa Cloud AK/SK
---

## Interface Overview 

Update datasource AliBaBa Cloud AK/SK

## Interface Address 

`/cloudcanal/console/api/v1/openapi/datasource/updatealiyunrdsaksk`

## Request Manner

`POST`       

## Request Parameters

| ParameterName | Parameter Description     |  RequestType |  Whether Required  |  DataType  |
| ------------ |-------|-----------|--------|--------|
| dataSourceId | Target data source ID | Body | True | long |
| accessKey | AliBaBa Cloud AccessKey | Body | True | string |
| secretKey | AliBaBa Cloud SecretKey | Body | True | string |  

## Public response result

| ParameterName | Parameter Description | Type(Java) | NotNull |
| ------------ | -------------------|-------|----------- |
| code | 1: success, 0: failure | string | True |
| data | | Object | False |
| msg | | string | False |
| requestId | | string | True |

## Response Example

```json
{
  "requestId": "4f9f0b23-2b4a-11ec-8c7e-d98fc83f029e",
  "code": "1",
  "msg": "request success",
  "data": []
}
```


