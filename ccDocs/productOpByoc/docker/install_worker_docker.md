---
id: install_worker_docker
title: 安装 SaaS BYOC 客户端
description: 安装 CloudCanal SaaS BYOC 客户端到私有环境机器
---

CloudCanal SaaS 支持 BYOC(Bring Your Own Cloud) 模式，运维平台共享，运行数据迁移同步任务客户端的机器需要用户提供。

本文简要介绍如何通过 Docker 快速安装客户端。

## 准备工作

### 硬件和系统准备

| **项目** | **要求**                   |
|------------|-------------------------------|
| 操作系统 | CentOS/RHEL, Ubuntu, MacOS, Alibaba Cloud Linux, Amazon Linux    |
| CPU 架构 | x86, arm64                    |
| CPU 核数  | 最小 4 核，推荐 8 核               |
| 内存      | 最小 8 GB，推荐 16 GB                          |
| 硬盘      | 无具体要求 |

### 安装 Docker

参考 **[Docker 官方文档](https://docs.docker.com/get-docker)** 安装。

镜像加速参考 [第三方文档](https://gitee.com/sensemaker/docker-easy)。

## 步骤 
1. 任务机器上运行以下脚本安装 CloudCanal 客户端，此步骤会要求你输入客户端配置，所以停留在此处开始第 2 步。
   ```shell
   /bin/bash -c "$(curl -fsSL https://download.clougence.com/cloudcanal/docker/install_run.sh)"
   ```
2. 登录 **[CloudCanal 云平台](https://cloudcanal.clougence.com)**。
3. 点击 **同步设置** > **同步机器**。
4. 点击 **新增集群**，填写相应信息并确定。如已有集群，可以忽略此步。
5. 点击目标集群的 **机器列表**。
6. 点击 **新增机器** > **创建机器**。 
7. 点击 **查看配置文件** > **获取短信验证码**。输入手机收到的验证码，并点击 **确定**。
8. 复制显示的配置，并返回第 1 步直接粘贴，等待客户端安装完成。
   ```
   cloudcanal.auth.ak=***
   cloudcanal.auth.sk=***
   cloudcanal.sidecar.wsn=***
   cloudcanal.console.domain=***
   ```
9. 刷新机器列表，当对应状态变为 **在线** 且状态点变为 **绿色**，即安装成功。