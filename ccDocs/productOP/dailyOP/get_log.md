---
id: get_log
title: 获取组件日志
description: CloudCanal 提供了多种系统日志，帮助排查错误。本文介绍了如何获取组件日志。
---

当发生错误时，如果无法从控制台页面判断，可能需要提供相应的日志。本文将介绍如何获取日志文件。

CloudCanal 系统有 3 种日志：**控制台日志**、**保姆进程日志**、**任务日志**。

一般创建流程报错侧重查看 **控制台日志** 和 **保姆进程日志**，数据迁移同步过程报错着重看 **任务日志**。

## 步骤
- 获取控制台（console）日志
  
  ```shell
  ## TGZ 路径
  /home/clougence/logs/cloudcanal/console/console.log
  
  ## Docker
  docker cp cloudcanal-console:/home/clougence/logs/cloudcanal/console/console.log ./
  
  ## Kubernetes
  kubectl cp -ncloudcanal console-0:/home/clougence/logs/cloudcanal/console/console.log ./console.log
  ```

- 获取保姆进程（sidecar）日志

  ```shell
  ## TGZ 路径
  /home/clougence/logs/cloudcanal/sidecar/sidecar.log
  
  ## Docker
  docker cp cloudcanal-sidecar:/home/clougence/logs/cloudcanal/sidecar/sidecar.log ./
  
  ## Kubernetes
  kubectl cp -ncloudcanal sidecar-0:/home/clougence/logs/cloudcanal/sidecar/sidecar.log ./sidecar.log
  ```

  ```shell
  ## TGZ 路径
  /home/clougence/logs/cloudcanal/sidecar/sidecar_rs.log
  
  ## Docker
  docker cp cloudcanal-sidecar:/home/clougence/logs/cloudcanal/sidecar/sidecar_rs.log ./

  ## Kubernetes
  kubectl cp -ncloudcanal sidecar-0:/home/clougence/logs/cloudcanal/sidecar/sidecar_rs.log ./sidecar_rs.log
  ```

- 获取任务（task）日志
  
  ```shell
  ## TGZ 路径
  /home/clougence/logs/cloudcanal/tasks/任务名称/任务名称_任务类型.log
  
  ## Docker
  docker cp cloudcanal-sidecar:/home/clougence/logs/cloudcanal/tasks/任务名称/任务名称_任务类型.log
  
  ## Kubernetes
  kubectl cp -ncloudcanal sidecar-0:/home/clougence/logs/cloudcanal/tasks/任务名称/任务名称_任务类型.log
  ```
  :::info
  任务类型包括：
    - FULL：全量数据迁移任务。
    - INCREMENT：增量数据同步任务。
    - CHECK：数据校验任务。
    - REVISE：数据订正任务。
  :::
