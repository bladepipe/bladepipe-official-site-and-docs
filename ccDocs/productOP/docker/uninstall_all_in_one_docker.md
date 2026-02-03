---
id: uninstall_all_in_one_docker
title: 完全卸载(Docker 托管镜像)
description: 本文介绍如何卸载通过 Docker 安装的 CloudCanal.
---

本文介绍如何卸载通过 Docker 安装的 CloudCanal。

## 步骤

1. 登录安装 CloudCanal 的机器。

2. 执行以下脚本。
  
   ```bash
   curl -fsSL https://tgzdownload.clougence.com/support/uninstall_on_docker.sh | bash 
   ```
   :::info
   如果不需要清理镜像，可在命令最后添加 ` -s -- not_del_images`。
   :::
   
3. 成功 **卸载** CloudCanal。