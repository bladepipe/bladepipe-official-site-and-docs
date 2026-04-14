---
id: create_full_incre_task
title: Full Data & Incremental
description: It describes how to set up a data pipeline covering schema evolution, full data migration, and incremental synchronization in BladePipe.
---

BladePipe allows you to create a **Full Data& Incremental DataJob** in just a few minutes. This pipeline handles schema migration, initial full data migration, and continuous incremental synchronization. Once you start the DataJob, BladePipe orchestrates these DataTasks sequentially and automatically.

## Step 1: Select DataSources

1. Log in to BladePipe.
2. In the top navigation bar, click **DataJob**.
3. Click **Create DataJob**.
4. Select a **Cluster** to execute the DataJob.
  :::info
  If the cluster contains multiple Workers, BladePipe will automatically schedule tasks to ensure **[DataJob dual-level disaster recovery](../../../intro/product_arch.md#disaster-recovery)**. If it has only one Worker, BladePipe will maintain single-level disaster recovery.
  :::
5. Select the source and target data sources, then click **Test Connection** to ensure connectivity.
6. Select the specific databases or schemas for both the source and target. You can select multiple schemas simultaneously.
7. Click **Next**.

## Step 2: Configure DataJob

1. For the **DataJob Type**, select **Incremental**, and make sure that the **Initial Load** option is checked.
2. Select the **Specification** size.
  :::info
  Larger specifications provide better performance and stability. Balance your specification sizes against your available Worker memory and the aggregate number of running DataJobs.
  :::
3. Configure the DataJob settings:
   
| Function | Description |
| :--- | :--- |
| **Sync DDL** | <ul><li> **Yes**: Synchronize DDL.</li>   <li> **No**: Do not synchronize DDL.</li> </ul>|
| **Verification** | <ul><li>**No**: BladePipe doesn't verify data. </li><li> **One-time**: BladePipe verifies data once.</li>   <li> **Scheduled**: BladePipe verifies data regularly according to the set cycle.</li> </ul>|

In Advanced settings:
| Function | Description |
| :--- | :--- |
| **Migrate partition** | If enabled, BladePipe will migrate the source partitions to the target. |
| **Clear Target Data Before Full Data** | If enabled, the target data will be cleared up before full data initialization.|
| **Rebuild Target Schema** | If enabled, BladePipe will automatically rebuild the target schema in the target database. |
| **Start Automatically** | If enabled, the DataJob starts automatically upon creation. |
| **Use param template** | If enabled, you can select a parameter template to use for this DataJob. |

4. Click **Next**.

## Step 3: Select Tables

1. Select the tables you want to synchronize.
   - **Exact match**: Enter exact table names separated by semicolons without spaces.
   - **Fuzzy match**: Enter partial characters to instantly find matching table names.
   
  :::tip
  You can bulk-select all tables on the current page or across all pages using the master checkboxes.     
  To intuitively auto-select all tables for future DataJobs, navigate to **Settings > Preference > BladePipe** and enable *jobTableDefaultSelectAll*.
  :::
2. Configure the target table names.
    - By default, target names generate automatically. 
    - You can manually type a custom name into the **Target Table** column and press **Enter**.
    - You can click **Batch Operation** > **Modify Target Name** to broadly apply prefixes or suffixes.
3. To filter actions, click **Open Action Blacklist**.     
   You can set the actions not to be synchronized for each table separately or in batches (Click **Batch Operation** > **Action Blacklist**).
4. Optional: Click **Mapping Rules** to adjust the automatic target-naming conventions.
5. Optional: Click **Advanced** > **View Duplicate Subscriptions** to check whether the selected tablea are subscribed in other existing DataJobs.
6. Click **Next**.

## Step 4: Map and Process Columns

1. Optional: If the target mapping rules need to be modified, click **Mapping Rules** and make the changes accordingly.
2. View your selected tables on the left pane. Use the search bar to rapidly locate specific tables.
3. Select the columns to be synchronized and apply transformations.
   - **Configure Individually**: Click **Operation** to set explicit filter conditions, designate a custom primary key logic, etc.
   - **Configure in Batches**: Click **Batch Operation** to apply update conditions, primary keys across multiple tables, etc.
   
| Feature | Description |
| :--- | :--- |
| **Set Virtual Column** | Define virtual columns (name, type, value) injected directly into the target table during synchronization. See [Add Virtual Columns](../create_job/create_virtual_col_job.md) |
| **Data Transform** | Transform data based on built-in scripts. See [Data Transform](../job_op/data_transform.md).  |
| **Target Primary Key** | Assign a primary key for the target. If the source lacks a primary key but holds a unique key, BladePipe assigns the unique key by default. See [Set Target Primary Key](../create_job/create_target_pk_job.md) |
| **Data Filtering** | Use where-like queries to sync only specific rows. See [Data Filtering](./create_data_filter_job.md). |
| **Set Update Condition** | Configure precise rules indicating when the target rows should be overwritten. |
| **Wide Table** | Create a wide table in a UI-driven manner. See [Wide Table](../job_op/visual_widetable_create.md).  |
| **Batch Filter Columns** | Exclude or include columns systematically across multiple tables. |

4. Optional: To inject complex Java logic, click **Upload Custom Code**. See [Custom Code](./create_process_job.md).
5. Click **Next**.

## Step 5: Confirm Creation

1. Verify the full configuration summary. 
2. Click **Create DataJob** to deploy your pipeline.

:::info
If you configured schema structures that do not exist in the target database, BladePipe automatically initiates the schema migration phase to build them before transferring data.
:::

## Step 6: Monitor DataJob

1. Navigate to the main DataJob list to track your pipeline's progress in real-time. 
2. Click **Details** to dive deep into monitoring metrics, specific logs, and individual DataTask states.

