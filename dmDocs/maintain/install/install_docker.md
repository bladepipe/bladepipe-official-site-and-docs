---
id: install_docker
title: Docker 容器
description: 本文档主要介绍如何在 Linux/MacOS 系统下，全新安装 CloudDM Team Docker 版。
---

本文档主要介绍如何在 Linux/MacOS 系统下，全新安装 CloudDM Team Docker 版。

## 前置条件

1. 在开始之前请确保已经完成了所有 **[准备工作](../prepare/prepare_install)**。
2. 请确保 Docker 容器可以正常工作，请参考 **[Docker 官方安装文档](https://docs.docker.com/engine/install/)**。
3. 服务器已准备好安装包并位于 `/home/clougence/clouddm.7z`。
4. 已部署过 CloudDM Team Docker 版的机器只能进行 **[升级安装](../upgrade/upgrade_docker)**。

## 安装包结构

Docker 安装包在解压后包含如下主要内容：
- **镜像**
  - 位于 解压目录/images 目录下四个 tar 结尾的文件。
- **Docker 容器编排文件**
  - 位于 解压目录/install_on_docker/docker-compose.yml 文件。
- **安装运维脚本**
  - 位于 解压目录/install_on_docker/ 目录。

安装运维脚本由如下几个文件组成：

| 脚本           | 用途                                                         |
|--------------|------------------------------------------------------------|
| install.sh   | 全新安装 CloudDM Team, 其中会调用 ./scripts/precheck_install.sh 做预检 |
| upgrade.sh   | 升级安装 CloudDM Team, 清理相关内容后调用 install.sh 安装                 |
| uninstall.sh | 卸载 CloudDM Team，包含停止容器、删除镜像、删除元数据库、删除相应的卷等操作               |
| stop.sh      | 停止 CloudDM Team 相关容器运行                                     |
| start.sh     | 启动 CloudDM Team 相关容器                                       |
| restart.sh   | 重启 CloudDM Team 相关容器                                       |

## 安装操作步骤

```shell title='1. 登录服务器并解压安装包'
cd /home/clougence/
7z x clouddm.7z -o./clouddm_home
cd clouddm_home/install_on_docker
```

```shell title='2. 运行 install.sh 安装脚本'
## centos
sh install.sh

## ubuntu
bash install.sh

## amazon linux
sudo sh install.sh
```

## 安装成功标志

成功安装后会由如下标志性提示。

1. 醒目的 _**SUCCESS**_ 状态提示。
2. 出现 _**CloudDM Team version is ready!**_ 字样。
3. 提示控制台访问地址：_**http://\{ip\}:8222**_
   - 默认账号: test@clougence.com
   - 默认密码: clougence2021
   - 默认验证码: 777777

## 安装的内容

在安装成功后 CloudDM Team Docker 版会在您的环境中新增如下内容：

1. 名称为 “clouddm-network” 的 Docker 网络配置。
   ```text title='命令 docker network ls 命令可以找到这个网络'
    NETWORK ID     NAME              DRIVER    SCOPE
    994aad97e4ac   clouddm-network   bridge    local
   ```
2. 加载了三个新镜像。
   ```text title='命令 docker images 命令可看到新镜像'
    REPOSITORY                  TAG       IMAGE ID       ...
    clougence/clouddm-sidecar   1.2.0.0   cf94d1f4cd6d   ...
    clougence/clouddm-console   1.2.0.0   2b82d36cf234   ...
    clougence/clouddm-mysql     1.2.0.0   c46bbfe65f12   ...
   ```
3. 运行了三个新容器。
   ```text title='命令 docker ps 可看到新容器'
    CONTAINER ID   IMAGE                              ...   NAMES
    42ac5a025545   clougence/clouddm-sidecar:1.2.0.0  ...   clouddm-sidecar
    1704128be21c   clougence/clouddm-console:1.2.0.0  ...   clouddm-console
    f20e4c4b8006   clougence/clouddm-mysql:1.2.0.0    ...   clouddm-mysql
   ```
4. 创建三个新的卷。
   ```text title='命令 docker volume ls 可以找到这些卷'
    DRIVER    VOLUME NAME
    local     cg_dm_mysql_volume
    local     install_on_docker_clouddm_console_volume
    local     install_on_docker_clouddm_sidecar_volume
   ```
5. 在 “install_on_docker” 目录下会创建两个文件夹分别指向 Console 和 Sidecar 容器的 _data 目录。
   ```text title='命令 ls -al | grep .*_data 可以看到连接目录'
    lrwxrwxrwx ... console_data -> /var/lib/docker/volumes/install_on_docker_clouddm_console_volume/_data/
    lrwxrwxrwx ... sidecar_data -> /var/lib/docker/volumes/install_on_docker_clouddm_sidecar_volume/_data/
   ```
6. 容器会对外开放 26000/8222/8008 三个端口。
