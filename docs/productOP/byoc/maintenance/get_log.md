---
id: get_log
title: Get Component Logs
description: BladePipe offers various system logs (Worker and DataJob) to help troubleshoot errors. This article explains how to obtain component logs.
---

When an error occurs, if its root cause cannot be found in the BladePipe Cloud, it may be necessary to provide the related system logs.

There are two types of BladePipe system logs: **worker** log, and **task** log.

Generally, for an error occurred in DataJob creation, the worker log needs to be checked, and for an error occurred in DataJob execution, the task log needs to be viewed.

## Procedure

- Get the **worker** log.
  ```shell
  docker cp bladepipe-worker:/home/bladepipe/logs/bladepipe/worker/sidecar.log ./
  ```

- Get the **task** log.
  ```shell
  docker cp bladepipe-worker:/home/bladepipe/logs/bladepipe/tasks/${taskName}/${taskName_FULL}.log ./
  
  docker cp bladepipe-worker:/home/bladepipe/logs/bladepipe/tasks/${taskName}/${taskName_INCREMENT}.log ./
  ```
