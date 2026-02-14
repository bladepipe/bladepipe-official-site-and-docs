---
id: write_time_limit
title: Limit Write Requests
description: Users can limit write volume to the target to maintain stable performance of the target system.
---

## Function
When the amount of data written to the target database is large, the target database load may be high, which may affect other applications from reading and writing the target database. In order to avoid a large number of data written to the database, you can enable the write stream limiting function to reduce the write frequency.

## Procedure

1. Go to the DataJob Details page. Click **Functions** > **Modify DataJob Params** in the upper-right corner.
2. Click **Target** tab and search **limitWriteRps**.
3. Modify the maximum RPS when writing. BladePipe will throttle the writes to the Target according to the maximum value set when performing the write.
4. Click **Save** in the upper-right corner to confirm the parameter and its new value. 
5. Click **Submit**. If the task is running, it will be restarted automatically. If it is stopped, the parameter change will take effect automatically after starting the task.
