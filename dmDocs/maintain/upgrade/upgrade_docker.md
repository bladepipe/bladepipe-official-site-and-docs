---
id: upgrade_docker
title: Docker 容器
description: 本文档主要介绍如何在 Linux/MacOS 系统下，升级安装 CloudDM Team Docker 版。
---

本文档主要介绍如何在 Linux/MacOS 系统下，升级安装 CloudDM Team Docker 版。

## 前置条件

1. 在开始之前请确保已经完成了所有 **[准备工作](../prepare/prepare_install)**。
2. 请确保 Docker 容器正在运行。
3. 服务器已准备好新版本的安装包并位于 `/home/clougence/clouddm.7z`。

## 安装包结构

Docker 安装包在解压后包含如下主要内容：
- **镜像**
    - 位于 解压目录/images 目录下四个 tar 结尾的压缩文件。
- **Docker 容器编排文件**
    - 位于 解压目录/install_on_docker/docker-compose.yml 文件。
- **安装运维脚本**
    - 位于 解压目录/install_on_docker/ 目录。

安装运维脚本由如下几个文件组成

| 脚本           | 用途                                                         |
|--------------|------------------------------------------------------------|
| install.sh   | 全新安装 CloudDM Team, 其中会调用 ./scripts/precheck_install.sh 做预检 |
| upgrade.sh   | 升级安装 CloudDM Team, 清理相关内容后调用 install.sh 安装                 |
| uninstall.sh | 卸载 CloudDM Team，包含停止容器、删除镜像、删除元数据库、删除相应的卷等操作               |
| stop.sh      | 停止 CloudDM Team 相关容器运行                                     |
| start.sh     | 启动 CloudDM Team 相关容器                                       |
| restart.sh   | 重启 CloudDM Team 相关容器                                       |

## 升级操作步骤

```shell title='1. 登录服务器并解压安装包'
cd /home/clougence/
7z x clouddm.7z -o./clouddm_home
cd clouddm_home/install_on_docker
```

```shell title='2. 运行 upgrade.sh 升级脚本'
## centos
sh upgrade.sh

## ubuntu
bash upgrade.sh

## amazon linux
sudo sh upgrade.sh
```

```text title='3. 升级安装过程中的提示'
Network clouddm-network is already exist,continue install may have unknown problems.

出现提示后在 “Agree to continue? (Y/N):” 后面输入 “y” 回车继续。
```

## 升级成功标志

1. 醒目的 _**SUCCESS**_ 状态提示。
2. 出现 _**CloudDM Team version is ready!**_ 字样。
3. 提示控制台访问地址 _**http://\{ip\}:8222**_

## 升级的内容

在升级成功后 CloudDM Team Docker 版会在您的环境中做如下变更：

1. 以下三个镜像从老版本升级到新版本。
   ```text title='命令 docker images 可看到新版本镜像'
    REPOSITORY                  TAG       IMAGE ID       ...
    clougence/clouddm-sidecar   1.3.0.0   cf94d1f4cd6d   ...
    clougence/clouddm-console   1.3.0.0   2b82d36cf234   ...
    clougence/clouddm-mysql     1.3.0.0   c46bbfe65f12   ...
   ```
3. 以下三个容器会被终止并删除，在镜像更新后会重新启动新版本的三个容器。
   ```text title='命令 docker ps 可看到新版本容器'
    CONTAINER ID   IMAGE                              ...   NAMES
    42ac5a025545   clougence/clouddm-sidecar:1.3.0.0  ...   clouddm-sidecar
    1704128be21c   clougence/clouddm-console:1.3.0.0  ...   clouddm-console
    f20e4c4b8006   clougence/clouddm-mysql:1.3.0.0    ...   clouddm-mysql
   ```
4. 名称为 “cg_dm_mysql_volume” 的卷的数据会被保留，sidecar、console 的卷数据会被删除。
   ```text title='命令 docker volume ls 可以找到这些卷'
    DRIVER    VOLUME NAME
    local     cg_dm_mysql_volume                       (被保留数据的卷)
    local     install_on_docker_clouddm_console_volume
    local     install_on_docker_clouddm_sidecar_volume
   ```
5. 在 “install_on_docker” 目录下的两个软链接会被重新创建。
   ```text title='命令 ls -al | grep .*_data 可以看到连接目录'
    lrwxrwxrwx ... console_data -> /var/lib/docker/volumes/install_on_docker_clouddm_console_volume/_data/
    lrwxrwxrwx ... sidecar_data -> /var/lib/docker/volumes/install_on_docker_clouddm_sidecar_volume/_data/
   ```
