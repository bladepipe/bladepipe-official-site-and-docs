---
id: create_virtual_col_job
title: Add Virtual Columns
description: Learn how to add virtual columns during data synchronization to accomplish multi-source data aggregation and advanced ETL data integration. 
---

BladePipe allows you to add virtual columns to your target database during the creation of a DataJob. This functionality is essential for advanced data transformation requirements, such as establishing multi-source data aggregation.

This topic describes how to configure and add virtual columns to a data synchronization pipeline.

## Supported Virtual Columns

| Virtual Column Type | Description | Valid Operations |
| --- | --- | --- |
| Specific Value | Specify a definitive number or string to map as a new column in your target database schema. | INSERT, UPDATE, DELETE |
| The Time When Data Sync | Utilize the exact timestamp that the data reaches BladePipe to generate a new column. Used for robust data sync time tracking. | INSERT, UPDATE, DELETE |
| Source InstID_Schema_Table_PkValues | Concatenate the Source Instance ID, Schema, Table, and Primary Key to map a new column. | INSERT, UPDATE, DELETE |
| Source Schema_Table_PkValues | Concatenate the Schema, Table, and Primary Key to map a new column. | INSERT, UPDATE, DELETE |
| Source Table_PkValues | Concatenate the Table and Primary Key to map a new column. | INSERT, UPDATE, DELETE |
| Conversion Expression | Execute a predefined script to convert existing data. For supported rules, see [Transform Data](../job_op/data_transform.md). | INSERT, UPDATE, DELETE |

## Add Virtual Columns

To configure your virtual columns, follow these steps:

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
2. Configure your virtual columns via one of two methods:
   - **Configure Individually**: Alongside your selected table, click **Operation** > **Set Virtual Column**. Specify the column's name, value, mapping type, and length.
   - **Configure via Batch**: Click **Batch Operation** > **Set Virtual Columns** to rapidly define uniform virtual columns across multiple tables.
3. After configuring the virtual columns, click **Next**.

:::info
- BladePipe supports adding multiple virtual columns to a single table.
- If the target table does not exist, BladePipe automatically generates the virtual columns during schema migration.
- If the target table already exists, you must manually create the corresponding virtual columns within your target database schema before initiating the DataJob.
:::

### Confirm

1. On the **Creation** page, review your DataJob configurations.
2. Click **Create DataJob**.

### Monitor

1. View your DataJob progress in the DataJob list.
2. Click **Details** in the operation column to track specific execution metrics and properties.