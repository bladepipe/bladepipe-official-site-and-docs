---
id: zero
title: Replace Zero Time Values
description: Many databases do not support zero-valued time writing or require a special setting. This page tells how to configure zero-valued time to a specific value.
---

## Function
When the time is `0000-00-00 00:00:00`/ `0000-00-00`, many databases do not support this type of zero-valued time writing or require a special setting, e.g., MySQL safe mode does not allow 0 values to be written to without specific setting. At this time, in order to avoid the error of task writing, you can specify a time field compatible with the database to ensure that the data is written normally, such as 1970-01-01 00:00:00.


## Procedure

1. Go to the DataJob Details page. Click **Functions** > **Modify DataJob Params** in the upper-right corner.
2. Click **Source** or **Target** tab, and search **defaultZeroDate**.
3. Modify the default value to replace when a value of `0000-00-00 00:00:00`/ `0000-00-00` is encountered.
4. Click **Save** in the upper-right corner to confirm the parameter and its new value. 
5. Click **Submit**. If the task is running, it will be restarted automatically. If it is stopped, the parameter change will take effect automatically after starting the task.
