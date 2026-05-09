---
id: api_user_queryuserinfo
title: Query User Info
description: Query basic user information by user UID
---

## Interface Overview

Query basic user information by user UID.

## Interface Address

`/cloudcanal/console/api/v1/openapi/user/queryuserinfo`

## Request Manner

`POST`

## Request Parameters

| ParameterName | Parameter Description | RequestType | Whether Required | DataType |
| -------- | -------- | -------- | -------- | -------- |
| uid | User UID | body | True | string |

## Public Response Results

| ParameterName | Parameter Description | Type(Java) | NotNull |
| -------- | -------- | ---------- | ------ |
| code | 1: Success, 0: Failure | string | True |
| data | | object | False |
| msg | | string | False |
| requestId | | string | True |

## Data Parameter Description

| ParameterName | Parameter Description | Type(Java) | NotNull |
| -------- | -------- | ---------- | ------ |
| username | Username | string | True |

## Response Example

```json
{
  "requestId": "c5665d7c-2cb7-11ec-a410-bfd57df2q1ea",
  "code": "1",
  "msg": "request success",
  "data": {
    "username": "admin"
  }
}
```
