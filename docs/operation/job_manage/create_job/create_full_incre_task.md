---
id: create_full_incre_task
title: Incremental 
description: It tells how to set up a data pipeline that covers scheme evolution, data migration and synchronization in BladePipe. 
---

With BladePipe, you can create a Full Data & Incremental DataJob in minutes. It includes schema migration, existing data migration, incremental data synchronization and other stages. Once the DataJob is started, BladePipe will automatically finish the multiple DataTasks in order.

This page introduces how to create a Full Data & Incremental DataJob.

## Select DataSource

1. Log in to the [BladePipe Cloud](https://cloud.bladepipe.com).
2. In the top navigation bar, click **DataJob**.
3. On the top of the page, click **Create DataJob**.
4. Select the **Cluster** for DataJob execution. 
  :::info
  If the cluster have multiple Workers, BladePipe will schedule the Workers for [DataJob Level 2 Disaster Recovery](../../../intro/product_arch.md#disaster-recovery). If it has only one Worker, BladePipe will adopt the plan for DataJob Level 2 Disaster Recovery.
  :::
5.  Select the source and target datasource instances and finish the related settings. Click **Test Connection**.
6. Select the source and target database or schema. BladePipe supports the migration and synchronization of multiple schemas. Then click **Next Step**.

## Select DataJob Properties

1. Select **DataJob Type**. Here taking the creation of Full Data & Incremental DataJob as an example, click **Incremental** and select **Full Data** option.
2. Select **Specification**.
  :::info
   When the memory of the worker is sufficient, you can choose a larger specification with better performance and higher stability. When there are many DataJobs, you can choose the specifications based on the reality, taking into account the worker utilization.
  :::
3. Configure the following DataJob information.
   
| Item | Description |
| :--- | :--- |
| **Synchronize DDL** | <ul><li> **Yes**: DDL is synchronized.</li>   <li> **No**: DDL is not synchronized.</li> </ul>|
| **Verification** | <ul><li>**No**: BladePipe doesn't verify data. </li><li> **One-time**: BladePipe verifies data once.</li>   <li> **Periodic**: BladePipe verifies data regularly according to the set cycle.</li> </ul>|
| **Correction Mode** | <ul><li> **Revise after Check**: The data will be automatically corrected after the verification is completed.</li>  <li> **NONE**: After the verification task is completed, the data will not be automatically corrected. If you need to correct the data, you can go to the DataJob Details page, and click **Functions** > **Create Correction DataJob**.</li></ul>|
| **Clean Target Data Before Full Data** | If enabled, the target data will be cleared up before full data initialization.|
| **Rebuild Target Schema** | If enabled, BladePipe will automatically rebuild the target schema in the target database. |
| **Start Automatically** | <ul><li>**Yes**: By default, the DataJob is automatically started upon it is created. </li>  <li>**No**: After creating a DataJob, you need to start it on the DataJob list page.</li></ul> |

4. Click **Next Step**.

## Select Tables

1. (Optional) If the target mapping rules need to be modified, click **Mapping Rules** and make the changes accordingly.
2. Select the tables to be synchronized.
   - Exact match: Enter the table name plus a semicolon (half-width) in the input box to filter tables. You can enter multiple table names separated by semicolons without spaces in between.
   - Fuzzy match: Enter characters in the input box to filter out tables with names containing these characters.
   - Filtering by categories: You can filter tables by conditions in the search box.
   
  :::tip
  Click the check box on the far left of the title row to select all tables on the current page. Click the Select All check box at the bottom left of the list to select all tables.    
  To select all tables by default when creating a DataJob, click **Settings** > **Preference** > **BladePipe** tab and set the value of parameter *jobTableDefaultSelectAll* to true.
  :::
3. Set the target table name.
    - Automatically generate table names based on mapping rules. If you modify the mapping rules, the table names will change accordingly.
    - After selecting the table, you can set the existing table name as the target table name in the **Target Table** column.
    - After selecting the table, you can enter a custom table name in the **Target Table** column and click the option with the Enter symbol, or press the Enter key to confirm.
    - Click **Batch Modify Target Names** to add prefixes and suffixes to table names in batches.
4. Filter actions.
    - Setting individually: After selecting the table, you can set the action to be synchronized for each table separately.
    - Setting in batches: You can select the action in batches above the list, or click **Action Filter** in the table list on the left to set it in batches.
5. Click **Next Step**.
   
## Select Columns

1. (Optional) If the target mapping rules need to be modified, click **Mapping Rules** and make the changes accordingly.
2. You can view all selected tables on the left side of the page, and search for tables in the search box and input box above the list.
3. Select and configure the columns to be synchronized.
    - Setting individually: Select the columns to be synchronized for each table, or click **Operation** to set filter conditions, target database update conditions, primary key of the target database, etc.
    - Setting in batches: Click **Batch Operation** in the upper-right corner to set target database update conditions, primary key of the target database, etc.   
    The following table describes the configurable items:

| Item | Description |
| :--- | :--- |
| **Set Virtual Column** | Add a virtual column to the target table and set the name, value, type, and length of the virtual column. |
| **Set Data Filtering** | Set data filtering conditions. For more information, see [Data Filtering](./create_data_filter_job.md) |
| **Add Update Condition** | Set the conditions to update the target tables. |
| **Set Target Primary Key** | Set the primary key of the target table. If the source table has no primary key but has a unique key, the unique key will be automatically set as the target primary key. |
| **Batch Filter Columns** | Filter columns in batches. |

4. (Optional) Upload custom code. For more information, see [Custom Code](./create_process_job.md).
5. Click **Next Step**.

## Confirm DataJob Creation

After confirming the DataJob configuration information, click **Create DataJob** at the bottom of the page.
:::info
If there are schemas, tables, or columns to be created in the Target instance during the DataJob creation process, BladePipe will automatically migrate the schemas. If not, there won't be schema migration.
:::

## View DataJob

1. On the DataJob list page, you can view the DataJob progress.
2. Click **Details** in the Operation column on the right side of the list to enter the DataJob Details page and view specific DataJob running information.

