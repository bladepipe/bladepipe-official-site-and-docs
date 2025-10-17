---
id: solve_schedule_task_fail
title: DataJob Scheduling Failure
description: This article describes how to resolve the issue of a failed schedule DataTask when creating DataJob in BladePipe.
---
This page introduces how to solve the issue that a DataJob is failed to be scheduled to a worker when creating it.

## Issue
When creating a DataJob, the details of ConsoleJob show a failure at the step of scheduling DataJob.

## Cause
  - Click **Sync Settings** > **Sync Worker** > **Workers**. An exception icon occurs, indicating the failure of scheduling the DataJob to a worker.
  - The available memory of the worker is smaller than the memory that the DataJob is to utilize.

## Solution
  - If an exception icon occurs, restart the worker to recover it.
  - If the available memory of the worker is smaller than the memory that the DataJob is to utilize, try the following operations:
     - At the second step of Create DataJob, choose a smaller task specification, and **do not select Verification**.
     - **Delete some paused or unused DataJobs** from the DataJob list to prevent memory preallocation.
     - If there is actually much memory available on the worker, try to [**Overcommit Worker Memory**](../operation/job_setting/worker/oversell_mac_memory.md).
    :::warning
    A big overcommit ratio may cause an insufficient memory actually available for running DataJobs, and thus the DataJobs may be killed by the operating system. Please perfrom this operation with caution.
    :::
  - After the above operations, retry the failed ConsoleJob without the need to recreate it.