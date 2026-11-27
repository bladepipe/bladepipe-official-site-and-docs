---
id: api_datajob_createwithpackage
title: Create DataJob with Custom Package
description: Create data migration, synchronization, verification, and correction tasks and upload a custom JAR package.
---

## Interface Overview

Create data migration, synchronization, verification, and correction tasks and upload a custom JAR package.

The task creation parameters are the same as those of [Create DataJob](api_datajob_create.md). Submit the JSON task parameters and the package file together using `multipart/form-data`.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/createwithpackage`

## Request Manner

`POST`

The request `Content-Type` is `multipart/form-data`. 

## Request Parameters

| ParameterName | Parameter Description | RequestType | Whether Required | DataType |
| -------- | -------- | -------- | -------- | -------- |
| data | The part's Content-Type is application/json. | multipart | True | object |
| customPkgFile | Only .jar files are supported. | multipart | False | file |

:::info
- For the fields in `data` and their meanings, see [Create DataJob Request Parameters](api_datajob_create.md#request-parameters).
:::

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| -------- | -------- | ---------- | ------ |
| code | 1: Success, 0: Failure | string | True |
| data | ID of the newly created DataJob | long | False |
| msg | Response message | string | False |
| requestId | Request ID | string | True |

## Request Example

DataJob creation parameters in a local `data.json` file and prepare the custom package `custom-code.jar`, then send the request:

```bash
curl --request POST \
  "${CONSOLE_URL}/cloudcanal/console/api/v1/openapi/datajob/createwithpackage" \
  --header "AccessKeyId: ${ACCESS_KEY_ID}" \
  --header "SignatureMethod: HmacSHA1" \
  --header "SignatureNonce: ${SIGNATURE_NONCE}" \
  --header "Signature: ${SIGNATURE}" \
  --form 'data=@./data.json;type=application/json' \
  --form 'customPkgFile=@./custom-code.jar;type=application/java-archive'
```

## Response Example

```json
{
  "requestId": "422622b9-2bf5-11ec-8b3e-172e4c81a5c3",
  "code": "1",
  "msg": "request success",
  "data": 123243
}
```
