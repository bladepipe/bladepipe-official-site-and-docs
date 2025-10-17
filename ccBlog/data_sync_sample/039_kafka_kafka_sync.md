---
id: kafka_kafka_sync
description: Kafka 到 Kafka 数据迁移同步,具备可视化创建、结构迁移、数据同步、自动化流程等能力
title: Kafka 到 Kafka 数据同步
date: 2024-10-29
authors: juantu
tags:
  - data_sync_sample
image: /img/ccBlog/data_sync_sample/kafka_kafka_sync.png 
slug: /data_sync_sample/kafka_kafka_sync
---
## 简述

Kafka 为处理实时数据提供了一个统一、高吞吐、低延迟的平台，其持久化层本质上是一个“按照分布式事务日志架构的大规模发布/订阅消息队列”，这使它作为企业级基础设施来处理流式数据非常有价值。因此实现 Kafka 到 Kafka 的数据同步也成了一项重要工作。

本篇文章主要介绍如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-hana-pg-sync) 构建一条 Kafka 到 Kafka 的数据同步链路。


## 技术点

### 消费者消息推送

在任务创建后，CloudCanal 会自动创建消费组，并订阅需要同步消息的 Topic。CloudCanal 从源端拉取到消息后，会将消息推送到目标端。

### 心跳机制

在源端 Kafka 未产生消息时，CloudCanal 便无法正常感知消息的延时时间。

我们采用心跳模式解决这个问题。在 [打开 Kafka 源端心跳](https://www.clougence.com/cc-doc/dataMigrationAndSync/datasource_func/Kafka/open_kafka_heartbeat) 后，CloudCanal 会监测所有分区的消费位点，若所有分区的最新的位点与当前位点差值均小于设定的最长位点间隔（通过 dbHeartbeatToleranceStep 参数设置），则会产生一条包含当前系统时间的心跳记录。CloudCanal 在消费到该记录后，会根据其包含的时间计算延迟。

## 操作示例

### 步骤1: 配置 Kafka 权限

参考 [Kafka 需要的权限](https://www.clougence.com/cc-doc/dataMigrationAndSync/database/privs_for_kafka) 文档，设置 CloudCanal 需要的账号权限。

### 步骤2: 安装 CloudCanal

请参考 [全新安装(Docker Linux/MacOS)](https://www.clougence.com/cc-doc/productOP/docker/install_linux_macos)，下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-hana-pg-sync)。

### 步骤 3: 添加数据源

登录 **CloudCanal 控制台**，点击 **数据源管理** > **新增数据源** 。

### 步骤4: 创建任务

1. 点击 **同步任务** > [**创建任务**](https://www.clougence.com/cc-doc/operation/job_manage/create_job/create_full_incre_task)。

2. 选择源和目标数据源，并分别点击 **测试连接**。

3. 选择同步的 [**消息格式**](https://www.clougence.com/cc-doc/reference/kafka_msg_format_type)。

   :::info

   倘若没有特定的消息格式，请选择 **原始消息格式**。

   :::

4. 选择 **增量同步**。

5. 选择需要同步的 Topic。

6. 点击 **确认创建**。

   :::info
   任务创建过程将会进行一系列操作，点击 **同步设置** > [**异步任务**](https://www.clougence.com/cc-doc/operation/job_setting/console_job_manage)，找到任务的创建记录并点击 **详情** 即可查看。

   Kafka 源端的任务创建会有以下几个步骤：

   - 结构迁移
   - 分配任务执行机器
   - 创建任务状态机
   - 完成任务创建
   :::

7. 等待任务自动流转。

   :::info
   当任务创建完成，CloudCanal 会自动进行任务流转，其中的步骤包括：

   - **结构迁移**: Kafka 源端会自动为对端创建 Topic，如果目标 Topic 在对端已存在，则会忽略。
   - **增量数据同步**: 增量数据将会持续地同步到对端数据库，并且保持实时（秒级别延迟）。
   :::



## 总结

本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-hana-pg-sync) 进行 Kakfa 到 Kafka 数据迁移同步，助力企业快速构建数据管道，增强数据分析能力。
