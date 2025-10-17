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
    cd tar_gz
    
    cat wgettgz.sh
    ```

    **wgettgz.sh 脚本内容：**
    ```bash  
    #!/bin/bash
    echo "Begin to download cc.tgz"
    cd ~/tar_gz
    rm -rf ~/tar_gz/cloudcanal*
    wget "$1" -O cc.tgz
    if [ $? -eq 0 ];then
        echo "Download successful"
        tar xaf cc.tgz
    else
        echo "Download fail, please check."
    fi
    
    sh wgettgz.sh "{the CloudCanal download url from www.clougence.com}" 
    ```

### 更新控制台 (Console)

1. 在 **tar_gz** 目录新建 **upgrade_console.sh** 脚本并编辑。
    ```bash 
    cat upgrade_console.sh
    ```

    **upgrade_console.sh 脚本内容：**
    ```bash
    #!/bin/bash

    # check the user clougence
    if [ "$(whoami)" != "clougence" ]; then
        echo "Error: as 'clougence' user to execute this script."
        exit 1
    fi

    cd /home/clougence/tar_gz
    if [ ! -f "/home/clougence/tar_gz/cloudcanal-console.tar.gz" ];then
        echo "File not exist, extract package first."
        exit
    else
        tar xavf cloudcanal-console.tar.gz
    fi
    
    # stop current console
    cd /home/clougence/cloudcanal/console/bin && sh stopConsole.sh
    
    # backup directory check and build
    BACKUP_DIR="/home/clougence/backup"
    
    if [ ! -d "$BACKUP_DIR" ]; then
        mkdir -p "$BACKUP_DIR"
        echo "Directory $BACKUP_DIR is been created successfully."
    else
        echo "Directory $BACKUP_DIR is exist."
    fi
    
    # backup the old deployment
    TODAY=$(date +%F)
    TARGET_DIR="$BACKUP_DIR/console_$TODAY"
    SOURCE_DIR="/home/clougence/cloudcanal/console"
    
    if [ -d "$TARGET_DIR" ]; then
        rm -rf "$TARGET_DIR"
        echo "Same date backup is been deleted: $TARGET_DIR"
    else
        echo "$TARGET_DIR have no same date backup,continue."
    fi

    mv "$SOURCE_DIR" "$TARGET_DIR"
    
    # update console
    cp -r /home/clougence/tar_gz/cloudcanal/console /home/clougence/cloudcanal
    
    ORIGIN_CONF="$TARGET_DIR/conf/business-output.properties"
    cp "$ORIGIN_CONF" /home/clougence/cloudcanal/console/conf/
    
    # start console
    cd /home/clougence/cloudcanal/console/bin && sh startConsoleAndUpdDb.sh
    ```

2. 执行脚本。
    ```bash
    sh upgrade_console.sh
    ```

3. （**可选**）如果升级出现错误且无法提供正常服务，可进行如下 **回滚** 操作。
    ```bash
    cd /home/clougence/cloudcanal/
    
    mv console console_error_`date +%F`
    
    mv /home/clougence/backup/console_`date +%F` ./console
    
    cd console/bin && sh startConsole.sh
    ```

### 更新任务运行机器 (Sidecar)

#### 自动升级

1. 打通 **控制台 (Console)** 和 **任务运行机器 (Sidecar)** 的 **SSH** 访问权限。

2. 登录控制台，点击 **同步设置** > **同步机器** > **机器列表** > **更多** > **升级客户端**。

3. 输入节点的 **用户名密码** 或 **密钥地址** 即可进行升级。

4. （**可选**）如果升级出现错误且无法提供正常服务，可进行 **回滚** 操作：点击 **同步设置** > **同步机器** > **机器列表** > **更多** > **回滚客户端**。

#### 手动升级

1. 在 **tar_gz** 目录新建 **upgrade_sidecar.sh** 脚本。
    ```bash
    cat upgrade_sidecar.sh 
    
    #!/bin/bash
    cd /home/clougence/tar_gz
    rm -rf cloudcanal cloudcanal-*
    if [ ! -f "/home/clougence/tar_gz/cloudcanal.tgz" ];then
        echo "file not exist,please check!!!!!!!"
        exit
    else
        tar xavf cloudcanal.tgz
        tar xaf cloudcanal-core.tar.gz && tar xaf cloudcanal-sidecar.tar.gz && tar xaf cloudcanal-ds.tar.gz
    fi
    
    source /etc/profile
    cd /home/clougence/cloudcanal
    
    mkdir /home/clougence/backup/cloudcanal_`date +%F`
    
    mv /home/clougence/cloudcanal/{cloudcanal,ds_lib,release_info,sidecar} /home/clougence/backup/cloudcanal_`date +%F`
    cp -r /home/clougence/tar_gz/cloudcanal/{cloudcanal,ds_lib,release_info,sidecar} /home/clougence/cloudcanal
    
    jps -l|grep -E 'task|SidecarApplication'|awk '{print $1}'|xargs kill -9
    
    cd /home/clougence/cloudcanal/sidecar/bin && sh startSidecar.sh
    ```

2. 执行脚本。
    ```bash
    sh upgrade_sidecar.sh
    ```

3. （**可选**）如果升级出现错误且无法提供正常服务，可进行如下 **回滚** 操作。
    ```bash
    mkdir /home/clougence/cloudcanal/cloudcanal_error_`date +%F`
    
    mv /home/clougence/cloudcanal/{cloudcanal,ds_lib,release_info,sidecar} /home/clougence/cloudcanal/cloudcanal_error_`date +%F`
    
    mv /home/clougence/cloudcanal/cloudcanal_`date +%F`/{cloudcanal,ds_lib,release_info,sidecar} /home/clougence/cloudcanal
    
    jps -l|grep -E 'task|SidecarApplication'|awk '{print $1}'|xargs kill -9
    
    cd /home/clougence/cloudcanal/sidecar/bin && sh startSidecar.sh
    ```
