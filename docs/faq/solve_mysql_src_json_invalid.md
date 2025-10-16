---
id: solve_mysql_src_json_invalid
title: Solve MySQL Source JSON Invalid
description: This article provides solutions to resolve the issue of MySQL source JSON invalid writing.
---
This article provides solutions to resolve the issue of MySQL source JSON invalid writing.

## Issue
MySQL source DataJob interrupted, and the log shows:
```
Caused by: com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: 
Invalid JSON text: The document root must not be followed by other values.
```

## Cause
The issue is caused by unescaped special characters in the JSON field values, resulting in truncation of the JSON data.

## Solution
1. Go to the DataJob Details page. Click **Function** > **Modify DataJob Params** > **Source** tab. 
2. Modify the value of **needJsonEscape** to **true**.
3. Click **Save** in the upper-right corner and confirm.
