---
id: adjust_task_spec
title: Adjust DataJob Specification
description: The task specification in BladePipe mainly affects the memory size allocated by the task process. The memory size for different task phases such as full and incremental is specified when the task is created. During the course of the task operation, the user is allowed to readjust the specification by parameter tuning.
---

## Function
The task specification in BladePipe mainly affects the memory size allocated by the task process.
The memory size for different task phases such as full and incremental is specified when the task is created.
During the course of the task operation, the user is allowed to readjust the specification by parameter tuning.

## Procedure

1. Go to the DataJob Details page. Click **Functions** > **Modify DataJob Params** in the upper-right corner.
2. Click **Core** tab and search **specId** at the top of the page.
3. Modify the parameter value to the desired specification. You can refer to the Reference column for guidance.
4. Click **Save** in the upper-right corner to confirm the parameter and its new value. 
5. Click **Submit**. If the task is running, it will be restarted automatically. If it is stopped, the parameter change will take effect automatically after starting the task.
