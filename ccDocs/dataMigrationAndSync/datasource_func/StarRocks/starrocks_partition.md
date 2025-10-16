---
id: starrocks_partition
title: StarRocks 对端结构迁移设置分区
description: 以 StarRocks 为对端，创建任务时如何设置分区以便结构迁移自动带上分区表达式
---

## 简述

StarRocks 表数据分区是常态，当作为 CloudCanal 数据迁移同步任务对端时，创建任务可设置分区以便结构迁移自动带上分区表达式。

CloudCanal 会自动验证分区表达式是否合法，根据 StarRocks 要求自动调整 PRIMARY KEY,DISTRIBUTED BY 字段，并调整建表语句中分区键排列顺序。

## 前置条件

- CloudCanal 版本 >= 3.3.0.0 并 < 4.2.0.0 (**不推荐**)
  - 支持简单的 RANGE 分区。
- CloudCanal 版本 >= 4.2.0.0 （**推荐**）
  - 全面支持 RANGE 分区、表达式分区、LIST 分区。 

## 操作步骤

1. 点击 **同步任务** > **创建任务**。
2. 在 **数据处理** 步骤中，可选择单独设置或批量设置分区：
   - 单独设置：在左侧选中具体表，点击 **操作** > **数据分区**，设置具体分区表达式。
   - 批量设置：点击 **批量操作** > **数据分区**，设置具体分区表达式。
    ```sql
    #e.g.,one
    PARTITION BY date_trunc('day', event_day)
    
    #e.g.,two
    PARTITION BY time_slice(event_day, INTERVAL 7 day)
    
    #e.g.,three
    PARTITION BY RANGE(event_day)(
    PARTITION p20200321 VALUES LESS THAN ("2020-03-22"),
    PARTITION p20200322 VALUES LESS THAN ("2020-03-23"),
    PARTITION p20200323 VALUES LESS THAN ("2020-03-24"),
    PARTITION p20200324 VALUES LESS THAN ("2020-03-25")
    )
    
    #...
    ```
    :::info
    填入表达式点击确认时，系统将自动验证语法的合法性，并提取分区字段，校验在表中是否存在。
    :::
3. 确认创建任务。