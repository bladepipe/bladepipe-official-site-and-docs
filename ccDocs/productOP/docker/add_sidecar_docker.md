---
id: add_sidecar_docker
title: 添加节点(Docker 托管镜像)
description: 本文介绍如何通过 Docker 托管镜像安装 CloudCanal
---

本文介绍如何通过 Docker 托管镜像新增一个 CloudCanal sidecar 节点。

## 前置条件

- 已安装 Docker 和 [Docker Compose](https://docs.docker.com/compose/install/)，可参考 [最小化 Docker 安装](../dailyOP/minimal_docker_for_centos.md) 文档。
- 通过 Docker 已安装 CloudCanal，可参考 [安装 CloudCanal (托管镜像)](install_all_in_one_docker.mdx) 文档。

## 步骤

1. 替换以下指令 **&lt;version&gt;** 为安装版本号，并执行。

   ```bash
   curl -fsSL https://tgzdownload.clougence.com/support/add_one_docker_node.sh | bash -s -- <version> ./cc_home
   ```
   :::info
   `<version>`：需要安装的 sidecar 版本，和控制台版本保持一致。
   :::

1. 成功安装 **Sidecar**。

   ```bash
   Install new sidecar SUCCESS , enter sidecar container,edit global_conf and restart.
   ```

2. 登录私有部署 CloudCanal 控制台，点击 **同步设置** > **机器列表**。
3. 点击 **新增机器** > **生成机器唯一标识**。
4. 选择刚生成的机器信息，**查看配置文件**，复制完整配置，并将其中 `cloudcanal.console.domain` 修改为控制台节点 IP。
   :::info
   默认验证码：777777
   :::
5. 回到安装节点，执行 `docker exec -it cloudcanal-sidecar /bin/bash` 登录容器。
6. 执行 `su - clougence` 切换用户。
7. 修改 `/home/clougence/cloudcanal/global_conf/conf.properties`，将复制的配置完整粘贴进去。
8. 进入 `/home/clougence/cloudcanal/sidecar/bin/` 目录，执行 `./startSidecar.sh` 启动节点。

