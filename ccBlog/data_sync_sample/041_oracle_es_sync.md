---
id: oracle_es_sync
description: Oracle 到 ElasticSearch 数据迁移同步,具备可视化创建、结构迁移、数据初始化、数据同步、自动化流程等能力
title: Oracle 到 Elasticsearch 数据同步
date: 2024-11-20
authors: mumu
tags:
  - data_sync_sample
image: /img/ccBlog/data_sync_sample/oracle_es_sync.png 
slug: /data_sync_sample/oracle_es_sync
---

## 简述
Elasticsearch 是一个分布式的实时搜索与数据分析引擎，具有强大的可扩展性和高度的灵活性。[CloudCanal](https://www.clougence.com?src=cc-doc-blog-es-sync-detail) 对于 [Elasticsearch](https://www.elastic.co/) 的支持经过了多轮迭代，支持版本从 6.x 和 7.x 一路扩展到 8.x，并适配了其丰富多样的 API。

同时 CloudCanal 对 Oracle 源端同步技术进行了多处优化，大幅提升了数据同步的稳定性和可靠性。

本文主要介绍如何快速构建一条 Oracle 到 Elasticsearch 的数据同步链路。

## 技术点

### Oracle 基于 LogMiner 的实时同步
CloudCanal 在 Oracle 源端的增量同步中，通过 LogMiner 分析 redo 日志，并结合多轮优化，显著提升了同步的稳定性与效率，已在用户生产环境中成功验证。主要特点包括：

- Oracle RAC 支持与优化：专为 Oracle RAC 场景优化，确保数据同步的完整性和一致性。
- 标准化 LogMiner 解析：默认采用 LogMiner 标准方法（ADD_FILE）解析 redo 日志，并提供 CONTINUOUS_MINE 作为补充（取决于 Oracle 版本）。
- 全事件消费模式：支持全事件消费，保障同步过程中的稳定性。
- 超大事务处理：本地缓存超大变更数据，处理源端 Oracle 超过百万级的变更。
- 位点回溯：在消费出错时，支持使用时间戳、SCN 回溯位点，增强容错能力。
- 数据校验与订正：提供定时的数据校验和订正机制，确保数据质量稳定。

经过以上优化，CloudCanal 在 Oracle 同步场景中表现更加稳健可靠，适应各种复杂的数据同步需求。

### 自动创建 Elasticsearch 索引和映射结构

CloudCanal 迁移同步任务支持自动将源端数据库表结构映射成 Elasticsearch 索引，该过程中允许用户在 **列** 级别上，个性化设置自己需要的索引和映射（Mapping）结构。这些设置包括：
- 每个列可以指定是否需要索引。
- 可以对 **TEXT** 类型的列设置 Elasticsearch 映射中的分词器（标准分词器）。
- 自定义设置索引分片数、副本数。

### 生成内置 _id 并指定路由字段

在写入 Elasticsearch 时，**_id** 字段用于唯一标识每个文档（Doc）。数据路由基于 _id 值，确保数据分片定位一致。CloudCanal 数据同步默认遵循以下策略生成 _id：

- **单主键表**：对于单一主键表，默认使用源端关系表的主键列值作为 _id。
- **多主键表**：对于多主键表，通过分隔符 `$` 连接多个主键列的值，组合成唯一 _id（可以通过参数 `pkSeparator` 自定义分隔符）。
- **无主键表**：若表无主键，则将所有列的值用 `$` 连接，生成唯一的 _id。

此默认设置确保了每条数据在 Elasticsearch 中具有唯一的标识，同时提供稳定的分片路由。

## 操作示例

### 步骤 1: 安装 CloudCanal

请参考 [全新安装(Docker Linux/MacOS)](https://www.clougence.com/cc-doc/productOP/docker/install_linux_macos)，下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-oracle-es-sync)。

### 步骤 2: 添加数据源

登录 **CloudCanal 控制台**，点击 **数据源管理** > **新增数据源** 。

### 步骤 3: 创建任务

1. 点击 **同步任务** > [**创建任务**](https://www.clougence.com/cc-doc/operation/job_manage/create_job/create_full_incre_task)。
2. 配置源和目标数据源。
   1. 选择源和目标实例，并分别点击 **测试连接**。
   2. 在源端实例下方 **高级配置** 中选择增量模式：**LogMiner** / **物化视图**。
   3. 在目标实例下方 **高级配置** 中选择时区配置：**+08:00**（默认）。
3. 选择 **数据同步** 并勾选 **全量初始化**。
4. 选择需要同步的表。
5. 选择表对应的列。

   :::info
   如果需要选择同步的列，可先行在对端创建好索引。
   :::

6. 点击 **确认创建**。

   :::info
   任务创建过程将会进行一系列操作，点击 **同步设置** > [**异步任务**](https://www.clougence.com/cc-doc/operation/job_setting/console_job_manage)，找到任务的创建记录并点击 **详情** 即可查看。

   Oracle 源端的任务创建会有以下几个步骤：
   - 结构迁移
   - 初始化 Oracle 表级补全日志
   - 初始化 Oracle LogMiner 位点
   - 分配任务执行机器
   - 创建任务状态机
   - 完成任务创建
   :::
   
7. 等待任务自动流转。

   :::info
   当任务创建完成，CloudCanal 会自动进行任务流转，其中的步骤包括：
   - **结构迁移**: Oracle 源端的表定义将会迁移到对端，如果同名索引在对端已经存在，则会忽略。
   - **全量数据迁移**: 已存在的存量数据将会完整迁移到对端。
   - **增量数据同步**: 增量数据将会持续地同步到对端数据库，并且保持实时（秒级别延迟）。
   :::

## 总结
本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-oracle-es-sync) 进行 Oracle 到 Elasticsearch 数据迁移同步，帮助企业增强数据分析及实时搜索能力，提升数据的价值。
