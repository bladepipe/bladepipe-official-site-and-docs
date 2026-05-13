---
id: upgrade_tgz
title: 版本升级(TGZ)
description: 本文档主要介绍如何升级 TGZ 方式部署的 CloudCanal 节点
---

本文档主要介绍 TGZ 部署方式，更新升级 CloudCanal 版本。

## 前置条件

已通过 TGZ 方式部署 CloudCanal 控制台。

如还未安装, 请先按 [全新安装(TGZ Linux)](firstinstall_with_tgz) 文档进行安装。

## 步骤

### 获取新安装包

1. 在 [官网](https://www.clougence.com) 获取新安装包下载链接。

2. 部署机器切换到 clougence 用户。
    ```bash
    sudo su - clougence
    ```

3. 将安装包下载到待更新的服务器 tar_gz 目录。
    ```bash
    cd ~/tar_gz
    
    wget "{从官网获取的下载地址}" -O cloudcanal.tgz
    ```

### 自动升级
- 打通 **控制台 (Console)** 到 **任务运行机器 (Sidecar)** 的 **SSH** 登录权限。

    :::info
    若两者部署在同一台服务器，也需确保在该机器上执行 `ssh clougence@127.0.0.1` 可以正常登录，自动升级会通过该 SSH 通道执行升级脚本。
    :::
#### 升级控制台（Console）
1. 登录控制台，点击 **同步设置** > **控制台** > **升级**。

2. 输入节点的 **用户名密码** 或 **密钥地址** 即可进行升级。

#### 升级任务运行机器 (Sidecar)

1. 登录控制台，点击 **同步设置** > **同步机器** > **机器列表** > **更多** > **升级客户端**。

2. 输入节点的 **用户名密码** 或 **密钥地址** 即可进行升级。

3. （**可选**）如果升级出现错误且无法提供正常服务，可进行 **回滚** 操作：点击 **同步设置** > **同步机器** > **机器列表** > **更多** > **回滚客户端**。


### 手动升级
- 下载手动升级脚本包并解压

    ```shell
    wget -cO "cc_upgrade_scripts.tgz" "https://cloudcanal-scripts.oss-cn-hangzhou.aliyuncs.com/scripts/cc_upgrade_scripts.tgz"
  
    mkdir -p ~/tar_gz/scripts

    tar -zxvf cc_upgrade_scripts.tgz -C ~/tar_gz/scripts
    ```
#### 升级控制台（Console）

- 执行升级脚本 
    ```shell
    bash ~/tar_gz/scripts/upgrade_console.sh
    ```
- （**可选**）如果升级出现错误且无法提供正常服务，执行 **回滚** 脚本即可。
    ```shell
    bash ~/tar_gz/scripts/rollback_console.sh
    ```
#### 升级任务运行机器 (Sidecar)

- 执行升级脚本
    ```shell
    bash ~/tar_gz/scripts/upgrade_sidecar.sh
    ```
- （**可选**）如果升级出现错误且无法提供正常服务，执行 **回滚** 脚本即可。
    ```shell
    bash ~/tar_gz/scripts/rollback_sidecar.sh
    ```