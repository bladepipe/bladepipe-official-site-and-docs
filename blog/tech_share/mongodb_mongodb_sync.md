---
id: mongodb_mongodb_sync
description: Step-by-step guide to building a MongoDB-to-MongoDB data pipeline with BladePipe for real-time synchronization and replication.
title: Move Data from MongoDB to MongoDB in 3 Steps
date: 2025-12-28
authors: mumu 
tags:
  - tutorials
image: /img/blog/tutorials/mongodb_mongodb_sync.png 
---

MongoDB is a widely used document-oriented database known for schema flexibility and strong scalability across operational workloads.

**MongoDB-to-MongoDB replication is usually used for migration, environment duplication, cross-cluster synchronization, or low-downtime cutovers**, and the most practical pattern is a full initial load plus ongoing oplog-based incremental sync.

This tutorial shows how to quickly create a stable and efficient MongoDB-to-MongoDB pipeline using [BladePipe](https://www.bladepipe.com). In this tutorial, MongoDB instances are configured as replica sets.

## Highlights

### Sync Data from MongoDB

Incremental data in the source MongoDB can be obtained from the `oplog.rs` collection in the `local` database (replica sets are required).

An event includes the following subdocuments (there are slight differences in different MongoDB versions). BladePipe delivers the data changes by parsing event records:

| Subdocument Name | Description                                     |
| ----------------- | ------------------------------------------------------------ |
| op                | Operation type. BladePipe supports operations including c (control operation), i (INSERT), u (UPDATE), d (DELETE). |
| ns                | Namespace in the format of `dbName.collectionName`. If `collectionName` is `$cmd`, it indicates an operation on the corresponding database. |
| ts                | Timestamp of the operation, in seconds.                        |
| o                 | Changed data. It shows the mirroring of data after INSERT/UPDATE operations, and the mirroring of data before DELETE operations. Note that this subdocument in MongoDB 4.x is different from that in other versions. |
| o2                | Present only in UPDATE events. It can be regarded as the primary key or identifier for locating data. |

Now BladePipe supports data movement from **shards** and **replica sets** of **MongoDB**. The supported MongoDB version is **7.x** and below.

### Supported Data Types in MongoDB

In a full data migration from MongoDB or a data synchronization by consuming oplog, data type conversion is crucial for data processing with custom code and data write to target data sources. For this reason, BladePipe is iteratively expanding its support for MongoDB data types.

The supported data types in full data reading from MongoDB include: **null, ObjectId, Date, Number, String**.

The supported data types in incremental data synchronization from MongoDB oplog include: **ObjectId, Date, Number, String, Integer, Long, BigInteger, Double, BigDecimal**.

The supported data types are expanding along with the requests from the increasing users. 

## When MongoDB-to-MongoDB Sync Makes Sense

This pattern is usually useful when you need:

- low-downtime migration between MongoDB environments
- continuous sync between production and downstream clusters
- test or analytics environments refreshed from operational MongoDB data
- cluster replacement without a long write freeze

## Procedure

### Step 1: Install BladePipe

Follow the [instructions](/docs/productOP/onPremise/installation/install_all_in_one_docker.mdx) to install BladePipe.

### Step 2: Add DataSources

1. Visit `http://${ip}:8111` to the BladePipe Console.
2. Click **DataSource** > **Add DataSource**, and add 2 DataSources.
   ![](../assets/blog/tech_share/mongodb_mongodb/mo_mo_1.png)

### Step 3: Create a DataJob

1. Click **DataJob** > [**Create DataJob**](https://www.bladepipe.com/docs/operation/job_manage/create_job/create_full_incre_task/).

2. Select the source and target DataSources, and click **Test Connection** to ensure the connection to the source and target DataSources are both successful.
   
   ![](../assets/blog/tech_share/mongodb_mongodb/mo_mo_2.png)
3. Select **Incremental** for DataJob Type, together with the **Full Data** option.
   
   ![](../assets/blog/tech_share/mongodb_mongodb/mo_mo_3.png)
4. Select the collections to be replicated.
   
   ![](../assets/blog/tech_share/mongodb_mongodb/mo_mo_4.png)
5. Confirm the DataJob creation.
   
   :::info
   The DataJob creation process involves several steps. Click **Sync Settings** > [**ConsoleJob**](https://www.bladepipe.com/docs/operation/job_setting/console_job_manage/), find the DataJob creation record, and click **Details** to view it.
   
   The DataJob creation with a source MongoDB instance includes the following steps:
   - Schema Migration 
   - Allocation of DataJobs to BladePipe Workers 
   - Creation of DataJob FSM (Finite State Machine) 
   - Completion of DataJob Creation
   :::

6. Wait for the DataJob to automatically run.
   :::info
   Once the DataJob is created and started, BladePipe will automatically run the following DataTasks:
    - **Schema Migration**: The schemas of the source collections will be migrated to the target instance.
    - **Full Data Migration**: All existing data from the selected source collections will be fully migrated to the target instance.
    - **Incremental Synchronization**: Ongoing data changes will be continuously synchronized to the target instance.
   :::
  
    ![](../assets/blog/tech_share/mongodb_mongodb/mo_mo_6.png)

## FAQ

**What is MongoDB-to-MongoDB replication used for?**

It is commonly used for migration, cluster refresh, environment cloning, and ongoing synchronization between MongoDB deployments.

**How does incremental MongoDB sync work?**

Incremental sync typically reads change events from MongoDB oplog records, which is why replica set or shard-based configurations are usually required.

**What is the best way to migrate MongoDB with low downtime?**

The safest pattern is usually a full initial copy followed by ongoing incremental oplog-based synchronization, so the target stays close to the source before cutover.
