---
id: mysql_clickhouse_sync
description: 介绍 CloudCanal 如何将关系型数据库中数据同步到 ClickHouse
title: MySQL 到 ClickHouse 同步
---

## 简述

本文主要介绍 [CloudCanal](https://www.clougence.com?src=cc-doc-mysql-clickhouse-sync) 如何将关系型数据库中数据同步到 ClickHouse，默认使用 ReplacingMergeTree 作为 ClickHouse 表引擎，链路特点包括：

- 新增 `_version`、`_sign` 字段，以便 ClickHouse 准确合并。
- DML 操作均以 INSERT 写入，同步性能良好。
- 支持 DDL 同步。

## 技术点

### 结构迁移

以 ClickHouse 为对端的结构迁移，默认选择 ReplacingMergeTree 作为表引擎，如果带有副本，则自动选择 ReplicatedReplacingMergeTree。

ClickHouse 表 sort key 默认选择源端表主键字段，如源端表无主键，则选择 tuple()。

额外新增 `_version`、`_sign` 作为合并字段，同步过程中 CloudCanal 根据数据操作自动填充值，确保链路两端数据一致。 

如下示例:

```
 CREATE TABLE console.worker_stats
(
    `id` Int64,
    `gmt_create` DateTime,
    `worker_id` Int64,
    `cpu_stat` String,
    `mem_stat` String,
    `disk_stat` String,
    `_sign` UInt8 DEFAULT 0,
    `_version` UInt64 DEFAULT 0,
    INDEX `_version_minmax_idx` `_version` TYPE minmax GRANULARITY 1
)
ENGINE = ReplacingMergeTree(`_version`,`_sign`)
ORDER BY id
SETTINGS index_granularity = 8192
```

### 数据写入

全量迁移和增量同步所有操作均转换成 INSERT，并以标准 batch 写入。

- `_version` 字段值按照数据变更顺序进行自增。

- `_sign` 字段中 INSERT & UPDATE 操作值为 0，DELETE 操作值为 1。

新增字段符合 [ClickHouse ReplacingMergeTree 定义](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replacingmergetree)。

## 操作示例
### 步骤 1: 安装 CloudCanal

请参考 [全新安装(Docker Linux/MacOS)](https://www.clougence.com/cc-doc/productOP/docker/install_linux_macos)，下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-hana-pg-sync)。

### 步骤 2: 添加数据源

登录 **CloudCanal 控制台**，点击 **数据源管理** > **新增数据源**。

### 步骤 3: 创建任务
1. 点击 **同步任务** > **[创建任务](https://www.clougence.com/cc-doc/operation/job_manage/create_job/create_full_incre_task)**。
2. 选择源和目标数据源，并分别点击 **测试连接**。
3. 目标端侧点开 **高级选项**，选择表引擎为 ReplacingMergeTree (或 ReplicatedReplacingMergeTree)。
4. 选择 **数据同步** 并勾选 **全量初始化**。

   :::info
   建议规格至少选择 1 GB。过小的规格可能导致任务运行时 OOM。
   :::

5. 选择需要同步的表、列。
6. 点击 **确认创建**，完成任务创建。
   
### 步骤 4: 验证数据
1. 停止源端写入负载，并等待 ClickHouse 合并。
    :::info
    因 ClickHouse 自动合并时机不定，可能会导致数据校验显示不准。
    
    可执行 `optimize table xxx final` 进行手动合并（有一定概率无法成功）。
    
    另外也可执行 `create view xxx_v as select * from xxx final` 命令，创建视图，对视图进行查询，以确保数据完全合并。
    :::

2. 创建一个校验任务，任务完成后显示，源对端数据完全一致。

## 总结

本文简要介绍了 [CloudCanal](https://www.clougence.com?src=cc-doc-mysql-clickhouse-sync) 实现 MySQL到 ClickHouse 数据迁移同步的能力，帮助业务快速构建实时数据分析环境。
