---
id: get_log
title: 获取日志文件
description: CloudCanal SaaS 客户端提供了运行日志以协助排查问题。本文介绍了如何获取这些日志。
---

当发生错误时，如果无法从控制台页面判断，可能需要提供相应的日志文件。本文将介绍如何获取日志文件。

CloudCanal SaaS 客户端有 2 种日志：**保姆进程日志**、**任务日志**。

## 步骤

- 获取保姆进程（sidecar）日志

  ```shell  
  ## Docker
  docker cp cloudcanal-worker:/home/clougence/logs/cloudcanal/sidecar/sidecar.log ./
  ```

  ```shell
  ## Docker
  docker cp cloudcanal-worker:/home/clougence/logs/cloudcanal/sidecar/sidecar_rs_error.log ./
  ```

- 获取任务（task）日志
  
  ```shell  
  ## Docker
  docker cp cloudcanal-worker:/home/clougence/logs/cloudcanal/tasks/任务名称/任务名称_任务类型.log
  ```
  :::info
  任务类型包括：
    - FULL：全量数据迁移任务。
    - INCREMENT：增量数据同步任务。
    - CHECK：数据校验任务。
    - REVISE：数据订正任务。
  :::
