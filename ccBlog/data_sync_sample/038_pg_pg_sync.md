---
id: pg_pg_sync
description: PostgreSQL 到 PostgreSQL 数据迁移同步,具备可视化创建、结构迁移、数据初始化、数据同步、自动化流程等能力
title: PostgreSQL 到 PostgreSQL 数据同步
date: 2024-10-17
authors: juantu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/pg_pg_sync.png 
slug: /data_sync_sample/pg_pg_sync
---

## 简述

PostgreSQL 是一个历史悠久且广泛使用的数据库，不仅具备标准的关系型数据库能力，还具有相当不错的复杂 SQL 执行能力。用户常常会将 PostgreSQL 应用于在线事务型业务，以及部分数据分析工作，所以 PostgreSQL 到 PostgreSQL 数据迁移同步成为了一个重要工作。

本文主要介绍如何通过 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-pg-pg-sync) 实现 PostgreSQL 到 PostgreSQL 数据迁移同步。

## 技术点
### 使用 PostgreSQL 逻辑复制机制

CloudCanal 使用 PostgreSQL 逻辑复制 (Logical) 机制实现对其增量数据的订阅。

发布（Publication）和同步任务一一关联，任务修改订阅后也会自动增减 Publication 中的表。

### Trigger 方式实现 DDL 同步

DDL 同步对于在线数据库灾备等场景必不可少，但 PostgreSQL 逻辑复制并未提供 DDL 操作。

为此，我们采用了行业通用的 Trigger 方式捕获 DDL 操作，并且自动写入一张普通表 `cc_pg_ddl_capture_tab`。CloudCanal 正常订阅该表即可获取 DDL 操作，和普通 DML 增量订阅机制一致，可准确地保障 DDL 和涉及表 DML 事件顺序。

![pg_ddl_capture](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/pg_pg_sync/pg_ddl_capture.png)

### 双向同步防循环能力

数据库多活能力要求常常出现在一些在线数据库核心应用场景中，对于数据同步工具，主要需要做到同步数据无循环。

对于 PostgreSQL 之间的多活同步防循环，我们采用同一事务标记操作方式实现。

通过一张额外的标记表，同步任务写入正常业务数据到对端时，在同一个事务中对标记表做操作。当任务从 PostgreSQL 中获取到该标记表事件时，则忽略当前事务所有操作，即达到防循环目的。

![pg_loop_sync](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/pg_pg_sync/pg_loop_sync.png)

## 操作示例

### 步骤 1: 修改 PostgreSQL 日志级别

1. 参考 **[PostgreSQL 需要的权限](/docs/dataMigrationAndSync/datasource_func/PostgreSQL/privs_for_pg)** 文档创建用户和授予权限。
2. 设置 PostgreSQL **wal_level** 为 **logical**。
  
  :::info
  自建数据库可修改 postgresql.conf，设置 wal_level=logical 和 wal_log_hints = on。
  :::

3. 设置同步账号网络权限。
  
  :::info
  自建数据库可修改 pg_hba.conf，添加以下配置：
  
  host replication 同步账号 CIDR网段 md5   
  host 同步库 同步账号 CIDR网段 md5   
  host postgres 同步账号 CIDR网段 md5
  :::

4. 重启 PostgreSQL 生效。

### 步骤 2: 安装 CloudCanal

请参考 [全新安装(Docker Linux/MacOS)](https://www.clougence.com/cc-doc/productOP/docker/install_linux_macos)，下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-hana-pg-sync)。

### 步骤 3: 添加数据源

登录 **CloudCanal 控制台**，点击 **数据源管理** > **新增数据源**。

### 步骤 4: 创建任务

1. 点击 **同步任务** > **创建任务**。
2. 选择源和目标数据源，并分别点击 **测试连接**。
3. 选择 **数据同步** 并勾选 **全量初始化**。

   :::info
   勾选 **同步 DDL** 将会自动创建对应的 DDL 捕获 trigger 和 event，需要较高权限。
   :::

4. 选择需要同步的索引。
5. 选择索引对应的列。

   :::info
   如果需要选择同步的列，可先行在对端创建好表即可。
   :::

6. 点击 **确认创建**。

   :::info
   任务创建过程将会进行一系列操作，点击 **同步设置** > **异步任务**，找到任务的创建记录并点击 **详情** 即可查看。
   
   PostgreSQL 源端的任务创建会有以下几个步骤：
   - 结构迁移
   - 初始化 DDL 捕获触发器和表
   - 初始化 PostgreSQL 增量复制位点
   - 分配任务执行机器
   - 创建任务状态机
   - 完成任务创建
   :::
   
7. 等待任务自动步骤流转。

   :::info
   当任务创建完成，CloudCanal 会自动进行任务流转，其中的步骤包括：
   - **结构迁移**: 将 PostgreSQL 源端的表结构迁移到对端，如果同名表在对端已存在，则忽略。
   - **全量数据迁移**: 已存在的存量数据将会完整迁移到对端，支持断点续传。
   - **增量数据同步**: 增量数据将会持续地同步到对端数据库，并且保持实时（秒级别延迟）。
   :::

## 总结
本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-es-es-sync) 进行 PostgreSQL 到 PostgreSQL 数据迁移同步。

PostgreSQL 作为流行的关系型数据库，通过 CloudCanal 数据迁移同步加持，让数据进出更加便利和顺畅。
