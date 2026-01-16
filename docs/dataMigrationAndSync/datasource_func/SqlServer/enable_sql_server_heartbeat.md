---
id: enable_sql_server_heartbeat
title: Enable SQL Server Source Heartbeat
description: Enable SQL Server source heartbeat to resolve false latency alerts during incremental sync when source data remains unchanged, ensuring accurate monitoring display.
---

import SqlServerCdcGeneratorEn from '@site/src/components/SqlServerCdcGeneratorEn';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document explains how to enable the heartbeat function during the incremental data synchronization phase when there is no write on the source, in order to display the correct latency in the console.

## Overview
In scenarios where SQL Server serves as the source for data synchronization, extended periods without data changes can cause latency display issues in the console.

Enabling the heartbeat function addresses this by **periodically generating new update events**, ensuring that latency metrics are displayed accurately.

Two heartbeat modes are currently supported:

- **CHECK_POS Mode:** BladePipe periodically checks the source database and creates new heartbeat events without writing data.
- **SEND_SQL Mode:** BladePipe periodically executes SQL statements on a designated source-side heartbeat table to generate new update events.

## Prerequisites
- BladePipe version ≥ 1.2.0.
- Required permissions vary by mode:

<Tabs groupId="mode">
  <TabItem value="CHECK_POS" label="CHECK_POS Mode" default>
   - The source database account must have **SELECT** permission.
  </TabItem>
  <TabItem value="SEND_SQL" label="SEND_SQL Mode">
   - The source database account must have **UPDATE** permission.
   - The source database account must have the **db_owner** role (if automatic CDC enablement is required).
  </TabItem>
</Tabs>

## Procedure
<Tabs groupId="mode">
  <TabItem value="CHECK_POS" label="CHECK_POS Mode" default>
    1. Navigate to the DataJob details page, click **Functions** > **Modify Params**.
    2. Select the **Source** tab, and modify the following parameters:
        - Set **dbHeartbeatEnable** to true.
        - Set **dbHeartbeatMode** to CHECK_POS.
    3. Click **Save** in the top-right corner.
  </TabItem>
  <TabItem value="SEND_SQL" label="SEND_SQL Mode">
   Assume the SQL Server database is `[cc_test_db]`and the heartbeat table is `[dbo].[cc_hb_tab]`

1. Create the heartbeat table on the source SQL Server and insert an initial record, for example:
    ```sql
    -- Assuming the heartbeat table is [dbo].[cc_hb_tab], execute the following statements:
    CREATE TABLE [dbo].[cc_hb_tab] (
        [gmt_modified] datetime NULL
    );

    INSERT INTO [dbo].[cc_hb_tab] ([gmt_modified]) VALUES (CURRENT_TIMESTAMP);
    ```
2. On the DataJob details page, go to **Functions** > **Modify Params** > **Source** tab, and check the value of the **dataCaptureMode** parameter to check the CDC table mode for the heartbeat table:
    - If the value is **CDC_DYNAMIC**: Dynamic CDC mode.
    - If the value is **CDC_STATIC**: Static CDC mode.
    :::info
    BladePipe supports automatically enabling CDC for the heartbeat table. Ensure the account connecting to the source database has the **db_owner** role and that the **dbHearBeatCdcAutoInit** parameter under **Source** tab is set to **true**. Otherwise, proceed with the following steps.
    :::

3. Create the corresponding CDC table for the heartbeat table, or use the  **[Interactive SQL Server CDC SQL Statement Generator](#interactive-sql-server-cdc-sql-generator)** at the bottom of this page to generate the required SQL statement for BladePipe to capture update events:
   - If the source CDC table mode is **Dynamic CDC Mode**, execute the following statement:
    ```sql
    -- Assuming the database is [cc_test_db] and the heartbeat table is [dbo].[cc_hb_tab], execute the following statement:
    EXEC [cc_test_db].sys.sp_cdc_enable_table
        @source_schema = N'dbo',
        @source_name = N'cc_hb_tab',
        @role_name = NULL,
        @capture_instance = N'dbo_cc_hb_tab_0',
        @supports_net_changes = 0
    ```
   - If the source CDC table mode is **Static CDC Mode**, execute the following statement:
    ```sql
    -- Assuming the database is [cc_test_db] and the heartbeat table is [dbo].[cc_hb_tab], execute the following statement:
    EXEC [cc_test_db].sys.sp_cdc_enable_table
        @source_schema = N'dbo',
        @source_name = N'cc_hb_tab',
        @role_name = NULL,
        @capture_instance = N'cc_test_db_dbo_cc_hb_tab_cc_static',
        @supports_net_changes = 0
    ```
4. Navigate to the task details page, click **Functions** > **Modify Params**.
5. Select the **Source** tab, and modify the following parameters:
     - Set **dbHeartbeatEnable** to true.
     - Set **dbHeartbeatMode** to SEND_SQL.
     - Set **dbHeartbeatTable** to the heartbeat table path, e.g., **[dbo].[cc_hb_tab]**.
     - Set **dbHeartbeatIntervalSec** to an integer between 5 and 60, which specifies the heartbeat table update interval.
6. Click **Save** in the top-right corner.

## Interactive SQL Server CDC SQL Generator
<SqlServerCdcGeneratorEn />
  </TabItem>
</Tabs>