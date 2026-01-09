---
id:  open_sqlserver_heartbeat
title: 打开 SQL Server 源端心跳
description: 数据同步任务增量阶段，如果源端数据长时间没有变更，页面会提示延迟增加，可以开启心跳功能，让页面正确显示延迟时间
---

import SqlServerCdcGenerator from '@site/src/components/SqlServerCdcGenerator';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

本文介绍增量数据同步阶段，在源端无任何写入的情况下，如何开启心跳功能，让页面正确显示延迟时间。

## 简述
SQL Server 作为源端的数据同步场景中，如果长时间无变更，会导致页面显示延迟。

通过开启心跳功能，**定时生成新的更新事件**，从而使延迟时间显示正常。

目前支持两种心跳模式：
- **CHECK_POS 模式**：CloudCanal 只定期检查源端数据库，创建新的心跳事件。
- **SEND_SQL 模式**：CloudCanal 会向源端心跳表定期执行 SQL 语句，从而创建新的更新事件。

## 前置条件

<!-- TODO: 需要确定本月版本号 -->
- CloudCanal 版本 >= 5.3.0.0。
- 不同模式下，账号所需权限不同：

<Tabs groupId="mode">
  <TabItem value="CHECK_POS" label="CHECK_POS 模式" default>
   - 源端数据源账号需要具有 **SELECT** 权限。
  </TabItem>
  <TabItem value="SEND_SQL" label="SEND_SQL 模式">
   - 源端数据源账号需要具有 **UPDATE** 权限。
   - 源端数据源账号需要具有 **db_owner** 角色（如果需要自动启用 CDC）。
  </TabItem>
</Tabs>


## 操作步骤

<Tabs groupId="mode">
  <TabItem value="CHECK_POS" label="CHECK_POS 模式" default>
    1. 进入任务详情页，点击 **功能列表** > **修改参数**。
    2. 选择 **源数据源配置** 页签，修改以下参数值：
        - 参数 **dbHeartbeatEnable** 设置为 true。
        - 参数 **dbHeartbeatMode** 设置为 CHECK_POS。
    3. 在右上角点击 **生效配置**。
  </TabItem>
  <TabItem value="SEND_SQL" label="SEND_SQL 模式">
   假设 SQL Server 的数据库为 `[cc_test_db]`，心跳表为 `[dbo].[cc_hb_tab]`

1. 在源端 SQL Server 创建心跳表并插入一条数据，例如：
    ```sql
    -- 假设心跳表为 [dbo].[cc_hb_tab] ，则执行以下语句
    CREATE TABLE [dbo].[cc_hb_tab] (
        [gmt_modified] datetime NULL
    );

    INSERT INTO [dbo].[cc_hb_tab] ([gmt_modified]) VALUES (CURRENT_TIMESTAMP);
    ```
2. 在任务详情页的 **功能列表** > **修改参数** > **源数据源配置** 页签中查看 **dataCaptureMode** 参数值，检查源端心跳表的 CDC 表模式：
    - 参数值为 **CDC_DYNAMIC**：动态 CDC 模式
    - 参数值为 **CDC_STATIC**：静态 CDC 模式
    :::info
    CloudCanal 支持对心跳表自动启用 CDC。请确保连接到源端数据库的账号具有 **db_owner** 角色，并且 **源数据源配置** 中 **dbHearBeatCdcAutoInit** 参数值为 **true**。否则请继续执行本小节后续步骤。
    :::

3. 为心跳表创建对应的 CDC 表，或者使用本页底部的 **[交互式编辑 SQL Server CDC SQL 语句](#交互式编辑-sql-server-cdc-sql-语句)** 生成器，生成对应的 SQL 语句，用于 CloudCanal 捕获更新事件：
   - 如果源端 CDC 表模式为 **动态 CDC 模式**，则执行以下语句：
    ```sql
    -- 假设数据库为 [cc_test_db]，心跳表为 [dbo].[cc_hb_tab] ，则执行以下语句
    EXEC [cc_test_db].sys.sp_cdc_enable_table
        @source_schema = N'dbo',
        @source_name = N'cc_hb_tab',
        @role_name = NULL,
        @capture_instance = N'dbo_cc_hb_tab_0',
        @supports_net_changes = 0
    ```
   - 如果源端 CDC 表模式为 **静态 CDC 模式**，则执行以下语句：
    ```sql
    -- 假设数据库为 [cc_test_db]，心跳表为 [dbo].[cc_hb_tab] ，则执行以下语句
    EXEC [cc_test_db].sys.sp_cdc_enable_table
        @source_schema = N'dbo',
        @source_name = N'cc_hb_tab',
        @role_name = NULL,
        @capture_instance = N'cc_test_db_dbo_cc_hb_tab_cc_static',
        @supports_net_changes = 0
    ```
4. 进入任务详情页，点击 **功能列表** > **修改参数**。
5. 选择 **源数据源配置** 页签，修改以下参数值：
     - 参数 **dbHeartbeatEnable** 设置为 true。
     - 参数 **dbHeartbeatMode** 设置为 SEND_SQL。
     - 参数 **dbHeartbeatTable** 设置为心跳表路径，例如 **[dbo].[cc_hb_tab]**。
     - 参数 **dbHeartbeatIntervalSec** 设置心跳表更新间隔为 5 到 60 之间的整数。
6. 在右上角点击 **生效配置**。

## 交互式编辑 SQL Server CDC SQL 语句

<SqlServerCdcGenerator />
  </TabItem>
</Tabs>

