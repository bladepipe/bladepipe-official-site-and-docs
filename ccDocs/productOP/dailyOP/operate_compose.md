---
id: operate_compose
title: 启动与停止组件
description: 本文介绍了如何启动、停止 CloudCanal 组件，以及如何配置组件开机自启。
---
本文将介绍如何启动、停止 CloudCanal 组件，以及如何配置组件开机自启。

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

## 配置开机自启

### TGZ 部署

TGZ 安装目录下的 `checkConsole.sh` 和 `checkSidecar.sh` 脚本会定期检查 Console 和 Sidecar 的运行状态，并在组件异常停止时自动将其拉起。配置开机自启时，需要使用操作系统的进程管理服务托管检查脚本。以下为 systemd 配置示例。

:::info
以下配置以 `/home/clougence` 为安装目录。如果实际安装目录不同，请相应修改 `WorkingDirectory` 和 `ExecStart`。
:::

1. 创建 `/etc/systemd/system/cloudcanal-console-checker.service` 文件，并写入以下内容。

    ```ini
    [Unit]
    Description=CloudCanal Console Checker
    After=network-online.target
    Wants=network-online.target

    [Service]
    Type=simple
    User=clougence
    Group=clougence
    WorkingDirectory=/home/clougence/cloudcanal/console/bin
    ExecStart=/bin/bash /home/clougence/cloudcanal/console/bin/checkConsole.sh
    Restart=always
    RestartSec=10
    KillMode=process

    [Install]
    WantedBy=multi-user.target
    ```

2. 创建 `/etc/systemd/system/cloudcanal-sidecar-checker.service` 文件，并写入以下内容。

    ```ini
    [Unit]
    Description=CloudCanal Sidecar Checker
    After=network-online.target
    Wants=network-online.target

    [Service]
    Type=simple
    User=clougence
    Group=clougence
    WorkingDirectory=/home/clougence/cloudcanal/sidecar/bin
    ExecStart=/bin/bash /home/clougence/cloudcanal/sidecar/bin/checkSidecar.sh
    Restart=always
    RestartSec=10
    KillMode=process

    [Install]
    WantedBy=multi-user.target
    ```

3. 重新加载 systemd 配置，设置开机自启并启动服务。

    ```shell
    sudo systemctl daemon-reload
    sudo systemctl enable cloudcanal-console-checker
    sudo systemctl enable cloudcanal-sidecar-checker
    sudo systemctl start cloudcanal-console-checker
    sudo systemctl start cloudcanal-sidecar-checker
    ```

4. 查看服务状态。

    ```shell
    sudo systemctl status cloudcanal-console-checker
    sudo systemctl status cloudcanal-sidecar-checker
    ```
