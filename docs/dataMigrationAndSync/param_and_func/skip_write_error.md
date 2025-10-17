---
id: skip_write_error
title: Skip Write Exceptions
description: When the task fails to continue synchronization due to exceptions, and these exceptions can be slightly outdated, measures can be taken to skip the exception, so that the data caused by the exception can continue to synchronize without affecting the subsequent data written to the peer.
---

## Function
When the task fails to continue synchronization due to exceptions, and these exceptions can be ignored, measures can be taken to skip the exception, so that the data that causes the exception can be skipped. The synchronization continues and the subsequent data is written to the Target.

:::tip
When the skip write exception is enabled, any subsequent events that cause the exception are simply ignored. It is recommended that you restore the parameter configuration as soon as possible after skipping the data that caused the exception and correct the skipped data to avoid data inconsistencies.
:::

## Procedure

1. Go to the DataJob Details page. Click **Functions** > **Modify DataJob Params** in the upper-right corner.
2. Click **Core** tab and search **exceptionSkipMode**.
3. The default value is **NONE**, which means that no exceptions are ignored. If you want to ignore the exception when writing data to Target, modify the value to **ApplierHandlerException**.
4. Click **Save** in the upper-right corner to confirm the parameter and its new value. 
5. Click **Submit**. If the task is running, it will be restarted automatically. If it is stopped, the parameter change will take effect automatically after starting the task.
6. **Adjust this parameter after you skip exceptions that need to be ignored to prevent important exceptions from being skipped**.
