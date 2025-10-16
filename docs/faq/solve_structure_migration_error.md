---
id: solve_structure_migration_error
title: Skip Schema Migration Exception
description: This page describes how to skip schema migration exception.
---
This page describes how to skip a schema migration exception.

## Issue
A red triangle icon occurs during schema migration, which prompts that "**There is an exception in this DataJob. Click to view details**".

## Cause
Some data types are not supported for schema migration, or bugs occur (welcome to report the bugs in our forum). In these cases, you can skip the schema migration exception.


## Solution
1. Open [Schema Migration Log](../operation/job_manage/job_op/job_log.md) and locate the DDL statements that cause the exception.
2. Copy the DDL statements, and modify them to the right ones according to the actual situation. Then execute the modified DDL statements in the target database.
3. Go to the DataJob list page. Click the icon ![5](../assets/console_job/5.png) next to the DataJob ID, and click **Retry** in the upper-right corner of the failed ConsoleJob.