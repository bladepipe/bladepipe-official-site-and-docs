---
id: minimal_docker_for_centos
title: 最小化安装 Docker (CentOS) 
description: 本文主要介绍如何快速在 CentOS 上安装一个单节点 Docker 服务。
---

本文主要介绍如何快速在 CentOS 上安装一个 Docker 服务。

## 资源准备
    
- 准备一个能够访问公网的机器。
  
  | 节点角色        | 推荐配置                     | 操作系统和 CPU 架构                                         |
  |-------------|--------------------------|---------------------------------------------------|
  | docker_node | 4 核心，16GB 内存，100GB 磁盘 | Alibaba Linux / CentOS / Rockey Linux 8 等，AMD64 |

## 步骤

1. 登录节点并执行以下脚本。
   
   ```bash
   /bin/bash -c "$(curl -fsSL https://tgzdownload.clougence.com/support/install_centos_docker.sh)"
   ```

2. 等待安装完成，执行 `docker ps` 命令验证是否成功安装。