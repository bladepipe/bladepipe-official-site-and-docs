---
id: create_target_pk_job
title: Set Target Primary Keys
description: Learn how to set target primary keys during data synchronization to accurately map and manage your target database tables.
---

BladePipe allows you to define target primary keys for tables in your target database during the creation of a DataJob. Assigning accurate primary key mappings is essential for maintaining robust data consistency.

This topic describes how to configure and define target primary keys within your data synchronization pipeline.

## Set Target Primary Keys

To set up your primary key constraints, follow these steps:

### Select DataSources

1. In the navigation bar, click **DataJob** > **Create DataJob**.
2. Configure settings for both the source and target databases, and then click **Test Connection** for each.
3. Select your designated database or Schema.
4. Click **Next**.

### Configure the DataJob

1. On the **DataJob** configuration page, select your DataJob type. BladePipe selects **Incremental** alongside **Initial Load** by default.
2. Select your desired DataJob specification. The default specifications are suitable for most scenarios.
3. Click **Next**.

### Select Tables

1. On the **Tables** page, choose the tables you want to migrate.
2. If necessary, click **Open Action Blacklist** to filter out specific DDL or DML operations.
3. Click **Next**.

### Configure Columns

1. On the **Data Processing** page, select a table from your list, and check the columns you want to synchronize.
2. Configure your target primary key via one of two methods:
   - **Configure Individually**: Alongside your selected table, click **Operation** > **Target Primarykey**. Choose the column to act as your primary key.
   - **Configure via Batch**: Click **Batch Operation** > **Set Target Primarykey** to rapidly define uniform primary keys across multiple tables.

:::info
You can use [Virtual Columns](./create_virtual_col_job.md) as your target primary key.
:::
### Confirm

1. On the **Creation** page, review your DataJob configurations.
2. Click **Create DataJob**.

### Monitor

1. View your DataJob progress in the DataJob list.
2. Click **Details** in the operation column to track specific execution metrics and properties.
