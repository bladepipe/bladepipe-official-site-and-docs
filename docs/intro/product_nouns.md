---
id: product_nouns
title: Concepts
description: This topic explains the key terminologies and concepts used within BladePipe.
---

This topic introduces the core concepts used in BladePipe.
## DataSource

A DataSource represents a source or destination connector in your data pipeline. It can be a relational database (MySQL, PostgreSQL, Oracle), message queue (Kafka, RocketMQ), cache (Redis), real-time data warehouse (Greenplum, Doris, StarRocks), or big data product (Hive, Kudu). 

A DataSource holds connection attributes like the IP address, port, and authentication credentials. BladePipe assigns a unique ID to each DataSource, such as `my-59bi20aqxxxxx96`.

## DataJob

A DataJob defines the entire configuration for a data migration or synchronization process. It orchestrates a complete **ETL** workflow. A single DataJob can include multiple sequential or concurrent DataTasks. These tasks handle Schema Migration, Full Data migration, Incremental synchronization, and Verification and Correction.

For relational databases, a DataJob can synchronize one or more entire schemas. For message queues, it can synchronize multiple topics. BladePipe identifies each DataJob with a unique instance ID, such as `canal7yr4y7xxxx3`.

## DataTask

A DataTask represents a specific execution phase within a DataJob. Common DataTasks include Schema Migration, Full Data, Incremental, and Verification and Correction.

## Schema Migration

Schema Migration copies the table structures from the source DataSource to the target. BladePipe automatically converts data types and dialects for heterogeneous databases.

## Full Data

A Full Data task performs a complete extraction and load of the existing data. BladePipe scans the source DataSource sequentially. It then writes the data to the target in concurrent batches. This operation may take seconds to hours depending on the data volume.

## Incremental

An Incremental task handles continuous real-time data synchronization. The **CDC** engine reads database change logs and messages to capture modifications. It applies these changes to the target database instantly. With compatible targets, this synchronization achieves sub-second latency.

## Verification and Correction

This process ensures data consistency between your source and target. 

- **Data Verification**: BladePipe scans data in both databases in batches. It compares rows and columns in memory. It identifies inconsistencies and logs them into `diff.log` and `compare_rs.log` files.
- **Data Correction**: BladePipe reads the `compare_rs.log` file. It fetches the latest values from the source and overwrites the incorrect rows in the target.

## Custom Code

BladePipe allows you to execute custom transformation logic during any DataTask. You can upload custom Java code as a `.jar` package. This enables complex data filtering, masking, and enrichment within your pipeline.

## Cluster

A Cluster is the basic boundary for scheduling DataTasks across Workers. BladePipe schedules tasks only within a single Cluster. A single Cluster can span across different servers, data centers, availability zones, or regions. 

BladePipe assigns a unique name to each Cluster, such as `clusterl79txxxxku`.

## Worker

A Worker provides the computing resource to run your DataTasks. You can deploy Workers on physical servers, virtual machines, cloud instances (like AWS EC2), or local development machines. 

A single Worker belongs to exactly one Cluster.

## ConsoleJob

A ConsoleJob serves as the foundational unit for internal BladePipe orchestration. It handles long-running background processes, required retries, and state delays.

A ConsoleJob consists of multiple sequential steps. If a specific step fails, the ConsoleJob halts. It resumes the next step only after you resolve the issue and retry, or cancel the operation.
