---
id: get_log
title: Get Component Logs
description: BladePipe offers various system logs (Console, Worker and DataJob) to help troubleshoot errors. This article explains how to obtain component logs.
---

When an error occurs, if its root cause cannot be found in the BladePipe, it may be necessary to provide the related system logs.

There are three types of BladePipe system logs:**console** log, **worker** log, and **task** log.

Generally, for an error occurred in DataJob creation, the worker log needs to be checked, and for an error occurred in DataJob execution, the task log needs to be viewed.

## Procedure

- The **console** log file full path.
  ```shell
  /home/bladepipe/logs/bladepipe/console/console.log
  ```

- The **worker** log file full path.
  ```shell
  /home/bladepipe/logs/bladepipe/worker/sidecar.log
  ```

- The **task** log file full path.
  ```shell
  ## Full
  /home/bladepipe/logs/bladepipe/tasks/${taskName}/${taskName_FULL}.log
  
  ## Incremental
  /home/bladepipe/logs/bladepipe/tasks/${taskName}/${taskName_INCREMENT}.log
  ```
