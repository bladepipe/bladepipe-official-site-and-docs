---
id: sync_cdc_cdc
title: SQL Server 源端同步模式说明
description: 介绍 CloudCanal 在 SQL Server 数据源下的动态 CDC 与静态 CDC 同步模式说明，以及适用场景。
---

本文介绍 CloudCanal 在 SQL Server 数据源下的 **动态 CDC** 与 **静态 CDC** 同步模式，及其适用场景。

## 动态 CDC 模式
- **自动管理 CDC**：源端执行 DDL（如新增列）时，自动重建并切换 CDC，无须手动干预。
- **高权限账号**：需使用 `db_owner` 角色账号（动态管理 CDC 实例）。
- **单任务限制**：订阅 DDL 时，同一张表只能被一个任务订阅。

## 静态 CDC 模式
- **DDL 限制**：
  - 当源端新增列时，**DDL 语句（如新增列）** 会自动同步，但 **新列数据** 无法捕获。若需捕获 **新列数据**，需要进行如下操作：
  1. [修改订阅](../../../operation/job_manage/job_op/edit_job)，剔除对应表。
  2. 禁用并重建 CDC。
  :::info
  capture_instance 格式要求 db_schema_table_cc_static
  ::: 
    ```sql
    -- 禁用表级 CDC
    EXEC sys.sp_cdc_disable_table
      @source_schema    = 'dbo',
      @source_name      = 'table',
      @capture_instance = 'db_schema_table_cc_static';
    
    -- 启用表级 CDC
    EXEC sys.sp_cdc_enable_table
      @source_schema         = 'dbo',
      @source_name           = 'table',
      @role_name             = NULL,
      @capture_instance      = 'db_schema_table_cc_static',
      @supports_net_changes  = 0;
      ```
  3. [修改订阅](../../../operation/job_manage/job_op/edit_job)，新增对应表，并勾选 **全量数据初始化**。

- **低权限支持**：运行账号仅需 CDC 表的 `SELECT` 权限。
- **支持备库**：可从只读备库同步数据，减轻主库压力。
- **多任务订阅**：订阅 DDL 时，同一张表可被多个任务订阅多次。
