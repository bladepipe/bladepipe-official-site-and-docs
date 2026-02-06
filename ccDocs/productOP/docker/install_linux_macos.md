---
id: install_linux_macos
title: 全新安装(Docker Legacy)
description: 本文档主要介绍如何在 Linux/MacOS 系统下，全新安装 CloudCanal Docker 版。
---

本文主要介绍如何在 Linux/MacOS 操作系统下安装 CloudCanal Docker 版。

## 安装步骤

### 硬件和系统准备

- **操作系统**：CentOS/RHEL 或 Ubuntu 或 MacOS
- **CPU架构**：x86 或 arm64v8
  
  :::info
  不支持 vmware、virtualbox 和 windows 的 linux 子系统。
  :::
- **最低配置**：
  - 2 核 CPU
  - 6 GB 内存


### 环境准备

部署前请确保以下端口未被占用：

  | 组件                  | 端口   |用途                       |
  | -------------------- | -------|--------------------------|
  | cloudcanal-mysql     |  25000 | 元数据库 mysql 对外映射端口  |
  | cloudcanal-prometheus|  19090 | prometheuse 监控指标查询端口|
  | cloudcanal-console   |  7007  | console 和 sidecar 通信端口|
  | cloudcanal-console   |  8111  | console web控制台端口      |
  | cloudcanal-sidecar   |  18787 | 任务 debug 端口（e.g.,自定义代码 debug） |

### 软件准备

登录机器，安装 **基础工具**。
  ```shell
  ## centos / rhel
  sudo yum update
  sudo yum install -y yum-utils
  sudo yum install -y lsof
  sudo yum install -y bc
  sudo yum install -y p7zip p7zip-plugins 
  
  ## ubuntu
  sudo apt update
  sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
  sudo apt-get install -y lsof
  sudo apt-get install -y bc
  sudo apt-get install -y p7zip-full
  
  ## MacOS
  ## download 7-zip from official website and install
  ```
  
### 安装包准备
1. 登录 [官方网站](https://www.clougence.com?src=cc-doc-install-linux)，点击 **下载私有部署版**，获取 **软件包下载链接**。

2. 下载安装包。
    ```shell
    wget -cO cloudcanal.7z "${软件包下载连接}"
    ```

3. 解压安装包。
    ```
    7z x cloudcanal.7z -o./cloudcanal_home
    cd cloudcanal_home/install_on_docker
    ```
   解压目录内容包括：
     - **镜像**
       - images 目录下四个 tar 结尾的压缩文件
     - **docker 容器编排文件**（位置：解压目录/install_on_docker/）
       - docker-compose.yml 文件
     - **脚本**（位置：解压目录/install_on_docker/）
    
    | 脚本                 | 用途                       |
    | ----------------------------- | -------------------------- |
    | ./install.sh                  | 全新安装 CloudCanal，其中会调用 `./scripts/precheck_install.sh` 做预检。  |
    | ./upgrade.sh                  | 升级 CloudCanal，清理相关内容后调用 `install.sh` 安装。 |
    | ./uninstall.sh                | 卸载 CloudCanal，包含停止容器、删除镜像、删除元数据库、删除相应的卷等操作。 |
    | ./stop.sh                     | 停止 CloudCanal 相关容器运行。|
    | ./start.sh                    | 启动 CloudCanal 相关容器。 |
    | ./restart.sh                  | 重启 CloudCanal 相关容器。 |
    | ./install_one_node.sh         | 新部署一个同步节点，具体请参考 [添加节点 (Docker)](../docker/ha_install.md)。|
    | ./scripts/precheck_install.sh | 预检脚本，检查依赖软件安装状况、端口占用状况等。 |
    | ./scripts/initDB.sh          | 更新 CloudCanal 元数据库。 |
    | ./support/install_xxx_docker.sh  | 辅助安装 Docker 和 Docker Compose 脚本。|
    | other                         | 其他辅助脚本。|

### 运行环境准备
1. 安装 Docker 和 Docker Compose，可参考 [官方文档](https://docs.docker.com/engine/install/) (版本 **17.x.x** 及以上)，也可直接使用安装包提供的脚本：
    ```shell
    ## centos / rhel,进入 install_on_docker 目录
    sh ./support/install_centos_docker.sh
    
    ## ubuntu,进入 install_on_docker 目录
    bash ./support/install_ubuntu_docker.sh
    
    ## amazon linux,进入 install_on_docker 目录
    sh ./support/install_amazon_linux_docker.sh
    
    ## MacOS,参考[docker MacOS 安装文档](https://docs.docker.com/desktop/install/mac-install/)
    ```

2. MacOS 系统请为 Docker 分配内存。
  ![f0f8aece-be13-44f6-be2b-d5fecd9a7b67-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/Linux-MacOS.png)

### 安装 CloudCanal

1. 执行安装脚本。
    ```shell
    ## centos / rhel / MacOS
    sh install.sh 
    
    ## ubuntu
    bash install.sh
    
    ## amazon linux
    sudo sh install.sh
    ```

2. 出现如下标识即安装成功。
 ![7b00e562-cd45-4905-a626-1356503d8213-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/operation-manual/Linux-MacOS2.png)

### 开始使用

1. 登录 CloudCanal 控制台：
   - 控制台地址(请使用 **Chrome** 浏览器访问): **http://`${你部署CloudCanal的机器ip}`:8111**
   - 默认账号: **test@clougence.com**
   - 默认密码: **clougence2021**
   - 默认验证码: **777777**

    :::info
    推荐参考以下文档修改系统敏感信息：
    - [修改账号密码](../dailyOP/change_on_premise_password.md)
    - [修改验证码](../dailyOP/change_verify_code_777777.md)
    - [修改 AccessKey & SecretKey](../dailyOP/change_ak_sk.md)
    :::

2. [免费许可证激活](../../license/license_use.md)。
   :::info
   若全新部署，且环境联通互联网，则自动免费激活社区版 15 天。

   也可登录官网获取免费社区版许可证。
   :::

3. [添加自建数据源](../../operation/datasource_manage/add_self_maintain_ds.md) 并 [创建一条数据同步任务](../../operation/job_manage/create_job/create_full_incre_task.md)。
