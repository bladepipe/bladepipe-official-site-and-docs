---
id: redis_redis_sync
description: Redis 到 Redis 数据迁移同步,具备可视化创建、结构迁移、数据初始化、数据同步、自动化流程等能力
title: Redis 到 Redis 数据同步
date: 2024-12-27
authors: junyu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/redis_redis_sync.png 
slug: /data_sync_sample/redis_redis_sync
---

## 简述


本文主要介绍如何通过 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-redis-redis-sync) 实现 Redis 到 Redis 数据迁移同步。

## 技术点

### 基于 PSync 协议同步
CloudCanal 基于 **PSync** 协议实现 Redis 到 Redis 的数据同步，同步流程如下：
1. CloudCanal 与 Redis Master 建立 Socket 长连接。
2. 发送 Auth 命令验证身份（如果有）。
3. CloudCanal 向 Redis Master 发送 **PSync** 命令，伪装成一个 **Redis Slave** 节点。
4. Redis Master 节点持续向 CloudCanal 伪装的 Redis Slave 节点推送 **二进制数据流**。
5. CloudCanal 将二进制数据流解析为 Redis 命令，发送给目标端执行。

![redis_sync_redis_1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/43_redis_redis_sync/redis_redis_sync_1.png)

### 双向同步防循环能力

CloudCanal 采用辅助命令实现 Redis 之间的双向同步防循环。

当收到正常指令，CloudCanal 计算其 hash 值，构建辅助指令 Key，反向查询辅助指令是否存在，如果存在则为循环。随后，CloudCanal 反向删除对应辅助命令，如果删除成功，过滤即可。

对于对端写入以及源端查询辅助指令，CloudCanal 进行了批量和多线程优化，同步性能得到有效提升。

![redis_sync_redis_2](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/43_redis_redis_sync/redis_redis_sync_2.png)

### 过滤超大 Key 能力

在实际的 Redis 业务使用中，由于历史遗留问题或维护不当，可能会出现一些体积过大的 Key。

在数据同步场景下，这些超大 Key 容易引发任务同步异常。CloudCanal 提供了灵活的任务参数配置，支持过滤超出指定大小的 Key。

## 操作示例

### 步骤 1: 安装 CloudCanal

请参考 [全新安装(Docker Linux/MacOS)](https://www.clougence.com/cc-doc/productOP/docker/install_linux_macos)，下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-redis-redis-sync)。

### 步骤 2: 添加数据源

登录 **CloudCanal 控制台**，点击 **数据源管理** > **新增数据源** 。

### 步骤 3: 创建任务

1. 点击 **同步任务** > [**创建任务**](https://www.clougence.com/cc-doc/operation/job_manage/create_job/create_full_incre_task)。
2. 配置源和目标数据源。
    1. 选择源和目标实例，并分别点击 **测试连接**。
    2. 在源端实例下方 **高级配置** 中选择 **启用 DB 映射** ：是 / 否。
       :::info
       当启用 DB 映射时，需要确保源端 Redis 实例与目标端 Redis 实例 DB 数量相同。
       :::
3. 选择 **数据同步** 并勾选 **全量初始化**。

4. 点击 **确认创建**。

   :::info
   任务创建过程将会进行一系列操作，点击 **同步设置** > [**异步任务**](https://www.clougence.com/cc-doc/operation/job_setting/console_job_manage)，找到任务的创建记录并点击 **详情** 即可查看。

   Redis 源端的任务创建会有以下几个步骤：
    - 分配任务执行机器
    - 创建任务状态机
    - 完成任务创建
   :::

5. 等待任务自动流转。

   :::info
   当任务创建完成，CloudCanal 会自动进行任务流转，其中的步骤包括：
    - **全量数据迁移**: 已存在的存量数据将会完整迁移到对端。
    - **增量数据同步**: 增量数据将会持续地同步到对端数据库，并且保持实时（秒级别延迟）。
   :::

## 总结

本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-redis-redis-sync) 进行 Redis 到 Redis 数据迁移同步，打通数据流动的渠道，实现端到端的精准数据传输。
