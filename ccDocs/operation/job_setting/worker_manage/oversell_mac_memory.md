---
id: oversell_mac_memory
title: 超卖节点内存
description: 本文介绍如何在CloudCanal上对机器调整超卖参数。
---
本文介绍如何调整机器超卖参数，解决任务因机器内存不足而创建失败的问题。
## 简述
CloudCanal 创建任务或修改订阅时会预先占用内存，调度机制默认预留 10% 内存，所以有时会因为系统判定机器内存不足导致创建失败/修改订阅失败。

针对这种问题，通用解决方案包括 **调小创建任务的内存规格**、**摘除停止的增量任务**、**降低已跑任务的规格**、**删除不需要的任务** 等。

若这些方式都不行，且实际机器内存有足够空间（运行任务并没有完全占用预分配内存），这时可通过修改配置来 **超卖 CloudCanal 机器内存**。

## 注意事项
若超卖比例过大，可能导致该机器上的实际运行任务内存不足，被操作系统强制终止，请谨慎设置。

## 操作步骤
1. 点击 **同步设置** > **同步机器**。
2. 选择对应的集群，在右侧操作栏点击 **机器列表**。
3. 选择对应的机器，点击 **机器描述** 旁的 ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/function/mac_oversell_1.png) 图标。
4. 点击 **机器超卖比例** 旁的 ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/function/mac_oversell_2.png) 图标，并修改数值，点击 **确定**。
   