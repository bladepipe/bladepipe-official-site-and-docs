---
id: api_datajob_listbypage
title: Query DataJob List (Paged)
description: Query the DataJob list by page with multiple filter conditions
---

## Interface Overview

Query the DataJob list by page, supporting multiple filter conditions and sort options.

## Interface Address

`/cloudcanal/console/api/v1/openapi/datajob/listbypage`

## Request Manner

`POST`

## Request Parameters

| ParameterName | Parameter Description | RequestType | Whether Required | DataType |
| ------------ |---|-----------|--------|----|
| pageNum | Page number, starting from 1 | body | True | int |
| pageSize | Number of items per page, min 1, max 20 | body | True | int |
| dataJobId | DataJob ID | body | False | long |
| dataJobName | DataJob name, supports fuzzy search | body | False | string |
| dataJobType | DataJob type. See [Get Task Type List](../constApi/api_constant_listdatajobtype.md) | body | False | string |
| desc | Task description, supports fuzzy search | body | False | string |
| sourceInstanceId | Source data source ID | body | False | long |
| targetInstanceId | Target data source ID | body | False | long |
| workerId | Worker node ID | body | False | long |
| workerIp | Worker node IP | body | False | string |
| dataTaskStatus | Task status. See [Task Status List](../constApi/api_constant_listdatataskstatuses.md) | body | False | string |
| orderType | Sort field. Options: GMT_CREATE (creation time), PROCESS (task progress) | body | False | string |
| orderAsc | Whether to sort in ascending order. true for ascending, false for descending | body | False | boolean |
| transferObjName | Sync object name, supports fuzzy search | body | False | string |
| specifiedUid | Specified user ID for querying tasks of a specific user | body | False | string |

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
| jobVos | DataJob list. See [Query DataJob Detail](api_datajob_query.md) for field descriptions | True | array |
| allJobCounts | Total number of tasks matching the criteria | True | long |
| uidUsernameVos | User information list containing user ID to username mappings | False | array |

### uidUsernameVos Element Description

| ParameterName | Parameter Description | NotNull | Type(Java) |
| ------------ |-----------|--------|----|
| uid | User ID | True | string |
| username | Username | True | string |
