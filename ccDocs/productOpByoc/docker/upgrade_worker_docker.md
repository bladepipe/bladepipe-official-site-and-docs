---
id: upgrade_worker_docker
title: 升级 SaaS BYOC 客户端
description: 升级私有环境部署的 CloudCanal SaaS BYOC 客户端
---

本文简要介绍如何升级 Docker 安装的 CloudCanal SaaS BYOC 客户端。

镜像拉取加速参考 [第三方文档](https://gitee.com/sensemaker/docker-easy) 。

## 步骤

1. 在你安装 CloudCanal SaaS BYOC 客户端的机器上，执行以下脚本进行升级。
    ```shell
    /bin/bash -c "$(curl -fsSL https://download.clougence.com/cloudcanal/docker/upgrade.sh)"
    ```

2. 登录 **[CloudCanal 云平台](https://cloudcanal.clougence.com)**。
3. 点击 **同步设置** > **同步机器** > **机器列表**。确认升级的机器状态是否为 **在线** ，且状态点为 **绿色**。