---
id: oracle_clickhouse_sync
description: 介绍 CloudCanal 如何将 Oracle 数据同步到 ClickHouse
title: Oracle 到 ClickHouse 同步
---

## 简述

本文主要介绍 [CloudCanal](https://www.clougence.com?src=cc-doc-oracle-clickhouse-sync) 如何将 Oracle 中的数据同步到 ClickHouse，默认使用 ReplacingMergeTree 作为 ClickHouse 表引擎，链路特点包括：

- 支持 ReplaceMergeTree **_sign**, **_version** 字段
- 支持 DDL 同步

## 技术点

### Oracle 基于 LogMiner 的实时同步
CloudCanal 在 Oracle 源端的增量同步中，通过 LogMiner 分析 redo 日志，并结合多轮优化，显著提升了同步的稳定性与效率，已在用户生产环境中成功验证。主要特点包括：

- Oracle RAC 支持与优化：专为 Oracle RAC 场景优化，确保数据同步的完整性和一致性。
- 标准化 LogMiner 解析：默认采用 LogMiner 标准方法（ADD_FILE）解析 redo 日志，并提供 CONTINUOUS_MINE 作为补充（取决于 Oracle 版本）。
- 全事件消费模式：支持全事件消费，保障同步过程中的稳定性。
- 支持超大事务处理：本地缓存超大变更数据，处理源端 Oracle 超过百万级的变更。
- 位点回拉支持：在消费出错时回溯位点，增强数据恢复能力。
- 数据校验与订正：提供定时的数据校验和订正机制，确保数据质量稳定。

这些优化使 CloudCanal 在 Oracle 同步场景中表现更加稳健可靠，适应复杂的数据同步需求。

### 优化 ReplacingMergeTree

在 CloudCanal 的早期实现中，数据同步到 ClickHouse 的 **ReplacingMergeTree** 表时，采用了以下策略：

- 将 Oracle 数据库中的 Insert 和 Update 操作统一转换为 **Insert** 操作。
- 对于 Delete 操作，则通过 **ALTER TABLE DELETE** 语句单独处理。

虽然这种方式有效，但在遇到大量 **Delete** 操作时，容易导致同步性能下降，影响数据的实时性。

CloudCanal 在最新版本中对同步逻辑进行了优化，支持 **ReplacingMergeTree** 表引擎中的 **_sign** 和 **_version** 字段。

其中，所有 **Insert**、**Update** 和 **Delete** 操作都会被转换为带有版本信息的 **Insert** 操作。

### 结构迁移
在执行 Oracle 数据向 ClickHouse 的结构迁移时，CloudCanal 默认选择 ReplacingMergeTree 作为表引擎，并自动为表添加 _sign 和 _version 字段：

```sql
CREATE TABLE `console`.`worker_stats`
(
  `id` Int64,
  `gmt_create` DateTime,
  `worker_id` Int64,
  `cpu_stat` String,
  `mem_stat` String,
  `disk_stat` String,
  `_sign` UInt8 DEFAULT 0,
  `_version` UInt64 DEFAULT 0,
   INDEX `_version_minmax_idx` (`_version`) TYPE minmax GRANULARITY 1
) ENGINE = ReplacingMergeTree(`_version`, `_sign`) ORDER BY `id`
```

### 数据导入

#### 操作转换
在数据导入过程中，CloudCanal 采用如下的转换策略：

- 源端的 **Insert** 操作：
    ```sql
    # 插入新数据，_sign 设置为 0
    INSERT INTO <schema>.<table> (columns, _sign, _version) VALUES (..., 0, <new_version>);
    ```
- 源端的 **Update** 操作（会转换为两条 **Insert**）：
    ```sql
    # 逻辑删除旧数据，_sign 设置为 1
    INSERT INTO <schema>.<table> (columns, _sign, _version) VALUES (..., 1, <new_version>);
 
    # 插入新数据，_sign 设置为 0
    INSERT INTO <schema>.<table> (columns, _sign, _version) VALUES (..., 0, <new_version>);
    ```
- 源端的 **Delete** 操作：
    ```sql
    # 逻辑删除旧数据，_sign 设置为 1
    INSERT INTO <schema>.<table> (columns, _sign, _version) VALUES (..., 1, <new_version>);
    ```

#### 数据版本
在写入数据时，CloudCanal 会维护每个表的版本信息：

- 版本初始化：在进行第一次写入时，CloudCanal 会通过以下 SQL 语句获取当前表的最新版本号。
    ```sql
    SELECT MAX(`_version`) FROM `console`.`worker_stats`;
    ```

- 版本递增：每次写入新数据时，CloudCanal 都会基于上次获取的最大版本号递增，确保每次写入操作都有一个独立且递增的版本号。

查询时，通过添加 **final** 关键字来过滤未删除的行，从而确保查询结果的数据准确性。

```sql
SELECT `id`, `gmt_create`, `worker_id`, `cpu_stat`, `mem_stat`, `disk_stat`
FROM `console`.`worker_stats` final;
```

## 操作示例
### 步骤 1: 安装 CloudCanal

请参考 [全新安装(Docker Linux/MacOS)](https://www.clougence.com/cc-doc/productOP/docker/install_linux_macos)，下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-hana-pg-sync)。

### 步骤 2: 添加数据源

登录 **CloudCanal 控制台**，点击 **数据源管理** > **新增数据源**。

### 步骤 3: 创建任务
1. 点击 **同步任务** > **创建任务**。
2. 选择源和目标数据源，并分别点击 **测试连接**。
3. 目标端侧点开 **高级选项**，确保表引擎为 ReplacingMergeTree (或 ReplicatedReplacingMergeTree)。
4. 选择 **数据同步** 并勾选 **全量初始化**。

   :::info
   建议规格至少选择 1 GB。过小的规格可能导致任务运行时 OOM。
   :::

5. 选择需要同步的表、列。
6. 点击 **确认创建**，完成任务创建。

   :::info
   任务创建过程将会进行一系列操作，点击 **同步设置** > **异步任务**，找到任务的创建记录并点击 **详情** 即可查看。
   
   Oracle 源端的任务创建会有以下几个步骤：
   - 结构迁移
   - 初始化 Oracle 表级补全日志
   - 初始化 Oracle logminer 位点
   - 分配任务执行机器
   - 创建任务状态机
   - 完成任务创建
   :::
   
7. 等待任务自动步骤流转。

   :::info
   当任务创建完成，CloudCanal 会自动进行任务流转，其中的步骤包括：
   - **结构迁移**: 将源端的表结构迁移到对端，如果同名表在对端已存在，则忽略。
   - **全量数据迁移**: 已存在的存量数据将会完整迁移到对端，支持断点续传。
   - **增量数据同步**: 增量数据将会持续地同步到对端数据库，并且保持实时（秒级别延迟）。
   :::

### 步骤 4: 验证数据
1. 停止源端写入负载，并等待 ClickHouse 合并。

    :::info
    因 ClickHouse 自动合并时机不定，可能会导致数据校验显示不准。
    
    可执行 `optimize table xxx final` 进行手动合并（有一定概率无法成功）。
    
    另外也可执行 `create view xxx_v as select * from xxx final` 命令，创建视图，对视图进行查询，以确保数据完全合并。
    :::

2. 创建一个校验任务，任务完成后显示，源对端数据完全一致。

## 总结

本文简要介绍了 [CloudCanal](https://www.clougence.com?src=cc-doc-oracle-clickhouse-sync) 实现 Oracle 到 ClickHouse 数据迁移同步的能力，帮助业务快速构建实时数据分析环境。
