---
id: print_message_detail
title: Print Message Details
description: When you need to troubleshoot data synchronization issues, you can enable the parameters to print the details of the message.
---

## Function
When you need to troubleshoot data synchronization issues, you can enable the parameters to print the details of the message. Print message details in large amounts of data will take up a lot of disk space, so please take caution to use this function in online environment. Please close the test environment in time to avoid wasting disk space.

## Procedure

1. Go to the DataJob Details page. Click **Functions** > **Modify DataJob Params** in the upper-right corner.
2. Click **Source** or **Target** tab, and search **printDataInLog**.
3. Modify the parameter value to **true**.
4. Click **Save** in the upper-right corner to confirm the parameter and its new value. 
5. Click **Submit**. If the task is running, it will be restarted automatically. If it is stopped, the parameter change will take effect automatically after starting the task.
6. The details of synchronization messages are printed in the task log after the task restarts, with each message detail starting with the string [HANDLE DATA]. Task log path is the `/home/bladepipe/logs/bladepipe/tasks/${taskName}_${taskType}_TYPE.log`
