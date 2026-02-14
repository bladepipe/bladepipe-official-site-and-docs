---
id: rn-bladepipe-0-3-0
title: BladePipe 0.3.0
description: BladePipe 0.3.0 supports MySQL-Pulsar pipeline, and REST + S3 formats for target Iceberg instances.
---

Release Date: January 21, 2025

Version: 0.3.0

## New Connections
* Support [MySQL - Pulsar](https://doc.bladepipe.com/dataMigrationAndSync/connection/mysql2?target=Pulsar) full data migration and incremental data sync.
* Support [Pulsar - MySQL](https://doc.bladepipe.com/dataMigrationAndSync/connection/pulsar2?target=MySQL) and [Pulsar - Pulsar](https://doc.bladepipe.com/dataMigrationAndSync/connection/pulsar2?target=Pulsar) incremental data sync.
* Support OceanBase - RocketMQ full data migration and incremental data sync.

## New Features
* Support REST + S3 for target Iceberg DataSource. 
* Support creation of custom table attributes and table partitions for target Iceberg DataSource.
* Allow to clear target tables (without deleting stored data) and re-create target tables for Iceberg DataSource.
* Support time zone conversion for target Iceberg DataSource. No conversion is done by default (parameters: enableTimeZoneProcess, Timezone).
* Support MongoDB 8.X version as both source and target DataSource.
* Support [ChangeStream heartbeat for source MongoDB and AWS DocumentDB DataSources](../dataMigrationAndSync/datasource_func/MongoDB/open_mongodb_heartbeat) (parameters: dbHeartbeatEnable, dbHeartbeatCollection, dbHeartbeatIntervalSec).
* Support Unique Index in schema migration from Oracle to Oracle. 
* Support RANGE COLUMNS partition in MySQL - MySQL schema migration.
* Migrate schema (including clearing target tables and re-creating target tables) from TiDB to TiDB and from MySQL to TiDB using new architecture.
* Support data filtering conditions are added ​​to the end of the query statement for source TiDB DataSource (parameter: fullDataSqlConditionEnabled).
* Migrate AUTO_MERGE_ON and UNLOAD_PRIORITY attributes in HANA - HANA schema migration.
* In a DataJob with a source HANA DataSource, when scanning a CDC table, BladePipe won't scan to the latest transaction number to avoid missing data in certain cases (parameter: fallBackTxStep).
* Support Full DataTask subscription modification open API: updateTransferObjectForFull.
* Support offset reset under Binlog mode for a source OceanBase DataSource.
* Support offset reset for a source SQL Server DataSource.
* Support all minor versions of Oracle 19.X.
* Set verification strategy in data verification for certain character types, including TRIM_START / TRIM_END / TRIM / NO_TRIM (parameter: checkFixedCharStrategy).
* Support full data migration of certain types of multidimensional array in PostgreSQL.
* Keep table names consistent when mapping multiple tables from the Source to the Target.
* Check whether the input bar is empty when resetting GTID.

## Improvements
* Improve the CHECK_POS heartbeat mechanism at a source MySQL. Calculate the latency EndPos directly from the Binlog offset, and avoid using SQL calculation to reduce the impact on the database.
* In an Incremental DataJob with a source TiDB instance, BladePipe tries again automatically after gRPC timeout to avoid DataJob restart.
* In an Incremental DataJob with a source TiDB instance, BladePipe limits the traffic when requesting Region to avoid excessive pressure on TiKV (parameter: requestRegionQuote).
* Display three more fields (schema migration, clear the target data in scheduled/re-run DataJobs/re-create target tables) at the last step of DataJob creation.
* Add a second confirmation when modifying subscriptions.
* Display the generated expression in the virtual column list.
* When the version of a source SQL Server is 2014 and below, SnapshotRead is set to be true by default, and the scanning is done by snapshot.
* Improve the HANA trigger template. Allow users to configure the trigger. Users can choose whether to remove exception capture, thereby improving the execution efficiency of the trigger.
* Improve the display of the table-level offset for source HANA DataSource.

## Bug Fixes
* Fix the error occurred when parsing table schema in advanced data filtering, because the source schema contains special symbols. 
* Fix the problem that data cannot be consumed after Truncate statement is executed on the source TiDB 8.4 partitioned tables.
* Fix the problem that partition information is not synchronized after BladePipe starts TiDB - TiDB partition migration.
* Fix the error caused by multi-partition concurrency when writing data to a target Iceberg instance.
* Fix the error occurred on the table selection page during DataJob creation caused by the repeated constraint name and index name when BladePipe obtains Oracle's metadata. 
* Fix the problem of inconsistent field case mapping on the subscription modification page with a source HANA instance.
* Fix the exception on table list acquisition when there is a VIRTUAL type table in a source HANA instance.
* Fix the parsing error caused by inconsistent nullable attribute of field after detection when parsing Binlog on a source MySQL instance.
* Fix the error of disconnection to oblogclient due to the failure of ObForOracle to parse DDL (new parameter: ddlParsingExceptionSkip).
* Fix the problem that StarRocks does not filter the external table, causing exception on metadata acquisition.
* Fix the issue that the JSONB type written to a target PostgreSQL instance is Null by default.
* Fix the issue that the data type is incorrect, and the precision and the dimension are lost when migrating schema of PostgreSQL array.
* Fix the issue that the PostgreSQL CHAR and BPCHAR character array carries extra quotes after incremental sync.
* Fix the issue that the data verification on PostgreSQL array is inconsistent.
* Fix the issue that the schema is not mapped from AuroraMySQL to the target instance during DDL synchronization.
* Fix the issue that in a DataJob with a target MQ instance, the configuration of batchWriteSize parameter doesn't match the exact number of records of data in a single message.
* Fix the issue that NPE occurs during non-ACL verification when synchronizing data from RocketMQ 4.x.
* Fix the issue that the Console forwarding request loop causes the web page to get stuck.
* Fix the issue that the offset reset form is not aligned, and the advanced settings don't match offset types in the DataJob details.
* Fix the issue that BladePipe doesn't check whether the input is empty or not when uploading a new code package.
* Fix the issue that when user has uploaded a code package in a DataJob, and uploads another code package in the left of DataJob details page, the input is not checked to be non-empty.
* Fix incorrect display for different offset reset configuration.
* Fix the problem of displaying incorrect number of tables when setting virtual primary key in batches.
* Fix the problem of Console startup failure caused by fast startup of Prometheus components when installing Docker version.
* Fix the error occurred when searching bound DataTasks in a cluster without any DataTasks.
* Fix the problem that alert configuration doesn't take effect when permissions on all resource are enabled.





