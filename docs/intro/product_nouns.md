---
id: product_nouns
title: Glossary
description: It introduces the terminologies in BladePipe.
---

This article introduces the terminologies in BladePipe.

## DataSource

It refers to relational databases (MySQL/PostgreSQL/Oracle, etc.), message-oriented middleware (Kafka/RocketMQ, etc.), caching (Redis, etc.), real-time data warehouses (Greenplum/Doris/StarRocks, etc.), big data products (Hive/Kudu, etc.) or their corresponding cloud products. It generally contains attributes such as **IP and port for connection**, **login authentication information**, etc.

A DataSource is typically represented by an ID in a format similar to my-59bi20aqxxxxx96.

## DataJob

It refers to the configuration for a data migration and synchronization process. It may include a set of Schema Migration, Full Data, Incremental, and Verification and Correction processes (DataTasks) that run successively or simultaneously.

For relational databases, the maximum scope of table synchronization in a DataJob is single/multiple schemas, and for message-oriented middleware, it is multiple topics.

A DataJob is typically represented by an instance ID in a format similar to canal7yr4y7xxxx3.

## DataTask

A DataJob consists of multiple DataTasks, such as Schema Migration, Full Data, Incremental, Verification and Correction.

## Schema Migration

It refers to the migration of the schema from the source DataSource to the target DataSource. For heterogeneous data sources, there is usually type or specific dialect conversion.

## Full Data

It refers to single/scheduled data migration based on the DataJob configuration. BladePipe sequentially scans the data in the source DataSource, and concurrently write it to the target data sources in batches. It usually takes seconds to hours to complete such operations.

## Incremental

It refers to the synchronization of incremental data based on the DataJob configuration. BladePipe uses the data change logs of the source database, trigger-type incremental data, messages, etc. to capture change data in near real time and write it to the target database. If the target database has real-time writing capabilities, the incremental data can be synchronized with sub-second latency.

## Verification and Correction

It refers to single/scheduled data verification and correction.

Data verification refers to batch scanning of data in the source and target databases, comparing data row by row and column by column in memory, reporting missing and inconsistent data, and recording them in diff.log and compare_rs.log files.

Data correction refers to scanning of the latest data rows in the source data source one by one based on the compare_rs.log, and writing them to the target data source in an overwritten manner to correct the data.

## Custom Code

During Full Data, Incremental, and Verification and Correction DataTasks, BladePipe allows users to upload custom code (Java code, in the format of jar packages) to transform, filter, and supplement data.

## Cluster

The basic unit of DataTask scheduling between Workers (DataTasks are only scheduled in a single cluster). A cluster can involve Workers at different rack servers, data centers, availability zones, and even regions.

A cluster is generally represented by a cluster name in a format similar to clusterl79txxxxku.

## Worker

A Worker is used to run DataTasks, which can be on-premises virtual machines (VMs), physical machines, cloud virtual machines (ECS, EC2, etc.), and development machines (Macs, etc.).

A Worker belongs to only one cluster.

## ConsoleJob

ConsoleJob is the basic component for BladePipe governance, used for long processes, retries required, state waits and so on.

A ConsoleJob generally consists of 1~n steps, and a specific task is completed in each step. If a step fails, the ConsoleJob will not execute the next step until this step is retried after the problem is solved or this step is cancelled.
