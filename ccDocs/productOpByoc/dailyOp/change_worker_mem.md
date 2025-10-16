---
id: change_worker_mem
title: 调整 Sidecar 内存
description: CloudCanal SaaS 客户端可以调整运行时内存，从而改善运行稳定性
---

CloudCanal SaaS 客户端保姆进程（Sidecar）对于任务创建获取数据库元数据至关重要，默认客户端进程内存较小，在获取大量数据库元数据时可能碰到内存紧张的问题。

本文简单介绍如何调整这个进程的运行内存大小。

## 步骤

1. 登录 cloudcanal/worker 容器。
2. 找到启动脚本，路径如下：
    ```
    /home/clougence/cloudcanal/worker/bin/startSidecar.sh
    ```
3. 找到名字为 `JVM_HEAP_SIZE_MB` 的参数并修改，推荐 1 GB 或 2 GB。
4. 重启进程。
    ```
    sh startSidecar.sh
    ```