---
id: redis_loop_data_sync
description: introduces how BladePipe does Redis bidirectional synchronization and anti-loop
title: Redis Two-Way Sync
image: https://www.cloudcanalx.com/us/_nuxt/redis_Bidirectional.8c731420.png
---

## Overview

This topic introduces how BladePipe does Redis bidirectional synchronization and anti-loop, and the features include:

- Redis single-node, primary-standby, and clusters are supported.
- Supports anti-loop for data initialization.
- Supports anti-loop command expire or never expire settings.

## Highlights

### Anti-loop Command

BladePipe Redis bidirectional synchronization uses auxiliary command to determine the loop, when receiving normal command, calculate its hash code, build auxiliary command key, query whether auxiliary command exist, if it exists, it is a loop, filtering.

BladePipe has optimized batch and multi-threading for auxiliary commands pair-to-end writing and source-side queries, effectively improving synchronization performance.

Anti-loop compatibility data synchronization between Redis clusters, single nodes, and any combination of primary/standby nodes.

### Multi Redis Nodes Subscription

In order to simplify DataJob configuration, BladePipe adopts a single-task multi-Redis node subscription mode to achieve data migration and synchronization, which is more convenient and reliable.

## Procedure

### Step 1: Install BladePipe
Download and install BladePipe. 

### Step 2: Add DataSources
:::info
ApsaraDB for Redis is used in the following procedure.
:::

Log in to the [BladePipe Cloud](https://cloud.bladepipe.com). Click **DataSource** > **Add DataSource**, and add 2 Redis clusters.
:::tip
It is suggested to modify the description of the DataSource to prevent mistake the databases when you configure two-way DataJobs.
:::

### Step 3: Create Forward DataJob
:::info
In bidirectional synchronization, the forward task generally refers to the DataJob where the source database has data and the target database has no data, which involves the initialization of data at the target database.
:::

1. Click **DataJob** > **Create DataJob**.
2. In the first page, select the source and target DataSources, and click **Next Step**.
3. In the second page
   1. Select **Incremental**, then check **Full Data** option.
   2. Graying out starts automatically to set parameters after the DataJob is created.
   3. Click **Next Step**.
4. In the third page, click **Create DataJob**.
5. Click **Details** > **Functions** > **Modify DataJob Params**.
   1. Choose Source tab, set **deCycle** to true and set **deCycleEventExpireSec** to 1200 (sec,for expire anti-loop command).
   2. Click **Save** and start the DataJob.
6. Wait for the forward DataJob to initialize the data and synchronize normally.
  
:::tip
It is not recommended to create a reverse DataJob immediately after the forward synchronization DataJob is created, which involves the problem that when the repl-backlog-size setting is insufficient, the reverse DataJob starts to force FULL SYNC, resulting in new data being overwritten by old data.
:::


### Step 4: Create Reverse DataJob
1. Click **DataJob** > **Create DataJob**.
2. In the first page, select the source and target DataSources(**reverse selection of Forward DataJob**), and click **Next Step**.
3. In the second page
   1. Select **Incremental**, and DO NOT check **Full Data** option.
   2. Graying out starts automatically to set parameters after the DataJob is created.
   3. Click **Next Step**.
4. In the third page, click **Create DataJob**.
5. Click **Details** > **Functions** > **Modify DataJob Params**.
   1. Choose Source tab, set **deCycle** to true and set **deCycleEventExpireSec** to 1200 (sec,for expire anti-loop command).
   2. Click **Save** and start the DataJob.
6. The DataJobs run normally.


### Step 5: Verify the Data
- Make changes in the source database. There are changes in forward DataJob monitoring charts but reverse DataJob has no.
- Make changes in the target database. There are changes in reverse DataJob monitoring charts but forward DataJob has no.
- Wait for the both side anti-loop auxiliary commands to expire and check that the data is consistent.

## Limits

- The FULL SYNC control is not accurate enough for primary/standby switch or too old position, and there is a problem that old data overwrites new data due to FULL SYNC.
- Anti-loop command are currently limited: FULL DUMP, SET, HSET, DEL.

## Summary

This topic briefly introduces how to use BladePipe to build bidirectional synchronization of Redis to help users achieve remote multi-activity and disaster recovery goals.
