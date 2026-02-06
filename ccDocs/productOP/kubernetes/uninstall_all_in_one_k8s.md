---
id: uninstall_all_in_one_k8s
title: 完全卸载(K8s 托管镜像)
description: 本文介绍如何从 K8s 中卸载 CloudCanal
---

本文介绍如何从 K8s 中卸载 CloudCanal。

## 步骤

1. 登录 **K8s master** 机器。

2. 执行以下脚本。
  
   ```bash
   curl -fsSL https://tgzdownload.clougence.com/support/uninstall_on_k8s.sh | bash 
   ```
   :::info
   如果不需要清理镜像，可在命令最后添加 ` -s -- not_del_images`。
   :::
   
1. 成功 **卸载**。