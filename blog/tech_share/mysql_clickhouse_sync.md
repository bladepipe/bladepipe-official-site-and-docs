---
id: mysql_clickhouse_sync
description: Introduce how to synchronize MySQL Data to ClickHouse
title: Move Data from MySQL to ClickHouse in Minutes
date: 2024-10-18
authors: junyu 
tags:
  - tutorials
image: /img/blog/tutorials/mysql_clickhouse_sync.png 
---

## Overview

This article explains how to move data from relational databases to ClickHouse with [BladePipe](https://www.bladepipe.com). By default, it uses ReplacingMergeTree as the ClickHouse table engine. The key features of the connection include:

- Add `_version` and `_sign` fields to ensure accurate merging in ClickHouse.
- All DML statements are written as INSERT statements, ensuring good synchronization performance.
- Support for DDL synchronization.

## Highlights

### Schema Migration

When performing schema migration with ClickHouse as the target database, the default table engine selected is **ReplacingMergeTree**. If replication is involved, **ReplicatedReplacingMergeTree** is automatically chosen.

The sort key for ClickHouse tables defaults to the **primary key fields** of the source table. If the source table has no primary key, **tuple()** is used as sort key.

Additional fields `_version` and `_sign` are added as merge fields. During synchronization, BladePipe automatically fill in these fields based on the DML statements to ensure data consistency between the source and target.

```sql
# e.g.,
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

### Data Writing

In both Full Data migration and Incremental data synchronization, all DML statements are converted into INSERTs, which are written in standard batches.

- The `_version` field values increment according to the order of data changes.
- The `_sign` field values are set to **0** for Insert and Update statements, and **1** for Delete statements.

The two additional fields comply with [the ClickHouse ReplacingMergeTree definition](https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replacingmergetree).

## Procedure

### Step 1: Install BladePipe

Follow the instructions in [Install Worker (Docker)](https://www.bladepipe.com/docs/productOP/byoc/installation/install_worker_docker) or [Install Worker (Binary)](https://www.bladepipe.com/docs/productOP/byoc/installation/install_worker_binary) to download and install a BladePipe Worker.

### Step 2: Add DataSources

1. Log in to the [BladePipe Cloud](https://cloud.bladepipe.com).
2. Click **DataSource** > **Add DataSource**, and add 2 DataSources.

### Step 3: Create a DataJob
1. Click **DataJob** > [**Create DataJob**](https://doc.bladepipe.com/operation/job_manage/create_job/create_full_incre_task).
2. Select the source and target DataSources, and click **Test Connection** to ensure the connection to the source and target DataSources are both successful.
3. In the **Advanced** configuration of the target DataSource, choose the table engine as **ReplacingMergeTree** (or **ReplicatedReplacingMergeTree**).

4. Select **Incremental** for DataJob Type, together with the **Full Data** option.
   
   :::info
   In the **Specification** settings, make sure that you select a specification of at least **1 GB**.

   Allocating too little memory may result in Out of Memory (OOM) errors during DataJob execution.
   :::

5. Select the tables to be replicated. 
6. Select the columns to be replicated. 
7. Confirm the DataJob creation. 
8. Wait for the DataJob to automatically run.
   
   :::info
   Once the DataJob is created and started, BladePipe will automatically run the following DataTasks:
   - **Schema Migration**: The schemas of the source tables will be migrated to ClickHouse.
   - **Full Data Migration**: All existing data of the source tables will be fully migrated to ClickHouse.
   - **Incremental Synchronization**: Ongoing data changes will be continuously synchronized to the target database.
   :::

### Step 4: Verify the Data

1. Stop data write in the source database and wait for ClickHouse to merge data.
   :::info
   Due to the unpredictable timing of ClickHouse's automatic merging, you can manually trigger a merging by running the `OPTIMIZE TABLE xxx FINAL;` command. Note that there is a chance that this manual merging may not always succeed.

   Alternatively, you can run the `CREATE VIEW xxx_v AS SELECT * FROM xxx FINAL;` command to create a view and perform queries on the view to ensure the data is fully merged.
   :::

2. [Create a Verification DataJob](https://www.bladepipe.com/docs/operation/job_manage/create_job/create_period_verification_correction_job). Once the Verification DataJob is completed, review the results to confirm that the data in ClickHouse are the same as the data in MySQL.