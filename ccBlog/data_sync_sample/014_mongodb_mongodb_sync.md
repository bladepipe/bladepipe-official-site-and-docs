---
id: mongodb_mongodb_sync
description: CloudCanal 数据同步链路创建示例-MongoDB 到 MongoDB
title: MongoDB 到 MongoDB 数据同步
date: 2022-10-16
authors: junyu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/mongodb_mongodb_sync.png 
slug: /data_sync_sample/mongodb_mongodb_sync
---
## 简述
MongoDB 是一种广泛使用的文档型数据库，对于 schema 要求低、可扩展性强，让其在很多场景普遍适用。

本文主要介绍如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-mongodb-mongodb-sync) 快速构建一条稳定高效运行的 MongoDB 到 MongoDB 数据同步链路。示例中 MongoDB 均为副本集(Replica Set)。

## 技术点

### MongoDB 源端增量技术

CloudCanal 通过 local 库的 oplog.rs 集合（collection）获取增量变更数据（需要搭配副本集），其中事件包含以下子文档（不同版本 MongoDB 有些许差异）。CloudCanal 通过解析事件记录同步增量数据。

| 子文档名称 | 数据含义                                                                                        |
|---------------|---------------------------------------------------------------------------------------------|
| op            | 操作类型，CloudCanal 支持的类型包括 c (控制操作) i (INSERT) u (UPDATE) d (DELETE)                           |
| ns            | 命名空间(namespace)，格式为 dbName.collectionName，其中 collectionName 可以为 $cmd，表示在对应数据库上的操作    |
| ts            | 执行操作的时间戳，单位秒                                                                                |
| o             | 变更的数据，对应 INSERT/UPDATE 后镜像数据，DELETE 为前镜像数据<br/>需要注意的是，MongoDB 4.x 版本和其他版本在这个文档有所不一样 |                                                                                          |
| o2            | 只在 UPDATE 事件中有值，可以理解为主键或者定位数据的标识符                                                           |

CloudCanal 支持 MongoDB 分片模式及副本集数据同步，兼容 MongoDB 最高至 8.x 版本。

### MongoDB 的数据类型支持
无论直接从 MongoDB 做全量迁移，还是消费 oplog 进行增量同步，类型转换对自定义代码处理和下游数据源写入都有重要意义。CloudCanal 从 2021 年 8 月份支持 MongoDB 开始，经历多个版本迭代，逐步丰富了对 MongoDB 数据类型的支持。

从 MongoDB 全量读取支持的类型包括: **null、ObjectId、Date、Number、String**。

从 MongoDB oplog 增量同步支持的类型包括：**ObjectId、Date、Number、String、Integer、Long、BigInteger、Double、BigDecimal**。

随着越来越多用户使用 CloudCanal，支持的数据类型还在不断扩展中。

## 操作示例

### 步骤 1: 安装 CloudCanal

请参考 [全新安装(Docker Linux/MacOS)](https://www.clougence.com/cc-doc/productOP/docker/install_linux_macos)，下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-hana-pg-sync)。

### 步骤 2: 添加数据源

登录 **CloudCanal 控制台**，点击 **数据源管理** > **新增数据源**。

### 步骤 3: 创建任务

1. 点击 **同步任务** > [**创建任务**](https://www.clougence.com/cc-doc/operation/job_manage/create_job/create_full_incre_task)。
2. 配置源和目标数据源，并分别点击 **测试连接**。
3. 选择 **数据同步** 并勾选 **全量初始化**。
4. 选择需要同步的集合。
5. 点击 **确认创建**。

   :::info
   任务创建过程将会进行一系列操作，点击 **同步设置** > [**异步任务**](https://www.clougence.com/cc-doc/operation/job_setting/console_job_manage)，找到任务的创建记录并点击 **详情** 即可查看。
   
   MongoDB 源端的任务创建会有以下几个步骤：
   - 结构迁移
   - 分配任务执行机器
   - 创建任务状态机
   - 完成任务创建
   :::
   
6. 等待任务自动流转。

   :::info
   当任务创建完成，CloudCanal 会自动进行任务流转，其中的步骤包括：
   - **结构迁移**: MongoDB 源端的集合定义将会迁移到对端，如果同名集合在对端已经存在，则会忽略。
   - **全量数据迁移**: 已存在的存量数据将会完整迁移到对端。
   - **增量数据同步**: 增量数据将会持续地同步到对端数据库，并且保持实时（秒级别延迟）。
   :::


## 总结
本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-mongodb-mongodb-sync) 进行 MongoDB 到 MongoDB 数据迁移同步。
