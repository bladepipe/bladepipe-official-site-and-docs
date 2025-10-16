---
id: operate_compose
title: 启动与停止组件
description: 本文介绍了如何启动、停止 CloudCanal 组件。
---
本文将介绍如何启动、停止 CloudCanal 组件。

CloudCanal 系统有 3 种组件：**控制台（Console）**、**保姆进程（Sidecar）**、**任务进程（Task）**。

任务进程无须用户管理，用户只需关注 **控制台（Console）** 和 **保姆进程（Sidecar）**。

## 启动组件

- 控制台（Console）
  ```shell
  ## TGZ 路径
  su - clougence -c "bash /home/clougence/cloudcanal/console/bin/startConsole.sh"
  
  ## Docker
  docker start cloudcanal-console
  ```

- 保姆进程（Sidecar）
  ```shell
  ## TGZ 路径
  su - clougence -c "bash /home/clougence/cloudcanal/sidecar/bin/startSidecar.sh"
  
  ## Docker
  docker start cloudcanal-sidecar
  ```

## 停止组件

- 控制台（Console）
  ```shell
  ## TGZ 路径
  su - clougence -c "bash /home/clougence/cloudcanal/console/bin/stopConsole.sh"
  
  ## Docker
  docker stop cloudcanal-console
  ```

- 保姆进程（Sidecar）
  ```shell
  ## TGZ 路径
  su - clougence -c "bash /home/clougence/cloudcanal/sidecar/bin/stopSidecar.sh"
  
  ## Docker
  docker stop cloudcanal-sidecar
  ```