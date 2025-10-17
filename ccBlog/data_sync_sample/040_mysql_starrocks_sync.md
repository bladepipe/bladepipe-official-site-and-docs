---
id: mysql_starrocks_sync
description: CloudCanal 数据同步链路创建示例-MySQL 到 StarRocks
title: MySQL 到 StarRocks 数据同步
date: 2024-11-13
authors: mumu
tags:
  - data_sync_sample
image: /img/ccBlog/data_sync_sample/mysql_starrocks_sync.png
slug: /data_sync_sample/mysql_starrocks_sync
---
## 简述

## 简述
本文介绍如何通过 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-mysql-elasticsearch-sync) ，五分钟内创建一条**长期稳定运行**的 MySQL -> StarRocks 实时数据迁移同步链路。

## 技术点

### 写入StarRocks采用StreamLoad导入方式
CloudCanal 采用了 StarRocks StreamLoad 方式进行导入，源端数据和变更转成字节流，以通过 HTTP 协议批量写入 StarRocks。

基于 StreamLoad 方式，写入对端的操作均为 INSERT，CloudCanal 自动将 INSERT / UPDATE / DELETE 转成 INSERT 语句，并填入 __op 值(删除标识符)，StarRocks 将自动进行数据合并。

## 操作示例

### 步骤 1: 安装 CloudCanal

请参考 [全新安装(Docker Linux/MacOS)](https://www.clougence.com/cc-doc/productOP/docker/install_linux_macos)，下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-hana-pg-sync)。

### 步骤 2: 添加数据源

登录 **CloudCanal 控制台**，点击 **数据源管理** > **新增数据源**。

### 步骤 3: 创建任务

1. 点击 **同步任务** > [**创建任务**](https://www.clougence.com/cc-doc/operation/job_manage/create_job/create_full_incre_task)。
2. 选择源和目标数据源，并分别点击 **测试连接**。
3. 选择 **数据同步** 并勾选 **全量初始化**。
4. 选择需要同步的表。
5. 选择表对应的列。

   :::info
   如果需要选择同步的列，可先行在对端创建好表结构。
   :::

6. 点击 **确认创建**。

   :::info
   任务创建过程将会进行一系列操作，点击 **同步设置** > [**异步任务**](https://www.clougence.com/cc-doc/operation/job_setting/console_job_manage)，找到任务的创建记录并点击 **详情** 即可查看。

   MySQL 源端的任务创建会有以下几个步骤：
   - 结构迁移
   - 初始化位点
   - 分配任务执行机器
   - 创建任务状态机
   - 完成任务创建
   :::

7. 等待任务自动流转。

   :::info
   当任务创建完成，CloudCanal 会自动进行任务流转，其中的步骤包括：
   - **结构迁移**: Hana 源端的表定义将会迁移到对端，如果同名表在对端已经存在，则会忽略。
   - **全量数据迁移**: 已存在的存量数据将会完整迁移到对端。
   - **增量数据同步**: 增量数据将会持续地同步到对端数据库，并且保持实时（秒级别延迟）。
   :::

## 总结

本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-hana-pg-sync) 进行 MySQL 到 StarRocks 数据迁移同步，助力企业快速构建数据管道，增强数据分析能力。
