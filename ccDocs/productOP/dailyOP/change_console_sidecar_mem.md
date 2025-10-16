---
id: change_console_sidecar_mem
title: 调节系统组件内存
description: CloudCanal支持对控制台（console）或保姆进程（sidecar）调节内存，以应对大量库表或者某些情况。
---

控制台（console）或保姆进程（sidecar）有时候遇到大量库表或者某些情况，出现卡顿或 OOM （java内存溢出），需要调大内存以便稳定运行。可按以下步骤调整。

## 步骤
1. 登录控制台容器。
2. 找到启动脚本 `/home/clougence/cloudcanal/console/bin/startConsole.sh`。
3. 编辑脚本，找到`JVM_HEAP_SIZE_MB`变量，修改对应内存数量，建议 1~2 GB 即可。
4. 重启控制台进程。
    ```
    sh startConsole.sh
    ```
5. 登录保姆进程容器。
6. 找到启动脚本 `/home/clougence/cloudcanal/sidecar/bin/startSidecar.sh`。
7. 编辑脚本，找到`JVM_HEAP_SIZE_MB`变量，修改对应内存数量，建议 1~2 GB 即可。
8. 重启保姆进程。
    ```
    sh startSidecar.sh
    ```
