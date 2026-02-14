---
id: skip_ddl_error
title: Skip DDL Sync Exception
description: When a data pipeline is interrupted by a DDL synchronization exception, you can manually change the target structure and skip the error. 
---

## Function description

When a task is interrupted due to an exception in DDL synchronization to the peer end, you can manually change the peer end structure and skip the DDL synchronization exception to restore the task to normal.

## Operation instructions

- Manually execute DDL statements in the target database.
- **Task details** > **Function list** > **Parameter modification**.
- Search **ddlExceptionSkip** and change the parameter value to **true**.
- Click **Effective configuration**. The modification is successful and the task will automatically ignore the DDL write exception.
- After skipping the error, set the parameter **ddlExceptionSkip** to **false**.
