---
id: rn-bladepipe-1-0-0
title: BladePipe 1.0.0
---
Release Date: November 17, 2025

Version: 1.0.0

## Highlight
- Support for **Tencent Cloud TDSQL-C MySQL** as both source and target.

## New Connections
- **MySQL/SQL Server/Oracle > GaussDB**: schema migration, full data migration, incremental data sync, data verification and correction and evolution (add column, drop column, modify, rename, truncate).
- **OceanBase for MySQL > OceanBase for Oracle**: full data sync, incremental data sync, data verification and correction, schema migration and evolution (add column, drop column, modify, rename, truncate).
- **Tencent Cloud TDSQL-C MySQL > TDSQL-C MySQL**: full data sync, incremental data sync, data verification and correction, schema migration and evolution (add column, drop column, modify, rename, truncate).

## New Features
- Support for Oracle to retrieve the latest binlog position.
- Support for querying and cleaning relational-database table schema snapshots and change history.

## Improvements
- Change the Paimon default write parameter *write-only* to true, and improve sync performance via asynchronous compaction (parameters: *asyncCompactIntervalSec*, *fullCompaction*).
- For Oracle source: when parsing DML statements fails, the system now prints the current in-memory table schema to facilitate troubleshooting.
- For StarRocks, Doris and SelectDB targets: when performing data verification using IN (pk), retrievals are batched (parameter: *maxInSizePerQuery*).
- For OceanBase for MySQL/PolarDB MySQL/PolarDB-X sources in incremental tasks: types including bit, binary, varbinary, tinyblob, mediumblob, blob, longblob are now transferred as hexadecimal string format, unifying the logic for binary-type data in incremental sync.
- For OceanBase for MySQL/PolarDB MySQL/PolarDB-X > Kafka/RocketMQ/RabbitMQ/Pulsar sync: types including binary, varbinary, tinyblob, mediumblob, blob and longblob are now synchronized to the target side as hexadecimal string.
- For schema migration to a SQL Server target: optimize length configuration for VARCHAR, NVARCHAR, VARBINARY types to prevent the target field length defaulting to 1 when the source field type has no length.
- For PostgreSQL > MySQL/Doris/StarRocks in strong‐type mode: optimize verification of the JSON type.
- For TiDB source: when TiKV times out and disconnects gRPC, the task now restarts directly.
- For DaMeng source in incremental tasks: improve log printing for easier troubleshooting of slow log consumption on the source side.
- Improve user interaction of the action blacklist UI. Buttons are now clearer and more intuitive.


## Bug Fixes
- Fixed the issue in Kafka source when resetting binlog position: if the specified timestamp is outside the start range for certain partitions, the system would automatically roll back to the latest position for that partition.
- Fixed the issue where PostgreSQL source would execute incremental-sync related pre-checks even when creating a non-incremental sync task.
- Fixed the error occurred when parsing structured JSON data with PostgreSQL source in strong-type mode.
- Fixed the issue where modifying a subscription by deselecting an already subscribed table and then re-selecting it would cause loss of virtual‐column and data-cleaning configuration.
- Fixed the error occurred when modifying the subscription in case that in old tasks there were mapping rules but the column-mapping parameter was empty.
- Fixed the issue where automatic worker deployment had incorrect installation path retrieval.
- Fixed the issue where incremental sync trigger in HANA was not created.
- Fixed the sync failure caused by a time‐type error in HANA incremental sync single-table mode.
- Fixed the issue in HANA source when cleaning CDC table data: server closed connection and client did not reconnect, causing cleaning data failure.
- Fixed the issue that cleaning machine logs fails abnormally.
- Fixed the issue where DaMeng source task rerun did not reinitialise the binlog position.
- Fixed the issue where extra parameters in DaMeng data source didn't take effect.
- Fixed the issue where after setting target primary key, secondary data verification and correction still used source primary key as row identifier.
- Fixed the issue in sub-account page: if account name is very long, the label in the list would not display completely.
- Fixed the issue where after strong‐type data verification, final printed inconsistent binary-type value was null.
- Fixed the issue in OceanBase > MongoDB incremental sync where BIT type data to the target was inconsistent.
- Fixed the issue in OceanBase > MongoDB where BIT type data with value 0 was mis-judged as inconsistent.
- Fixed the issue during data verification where source BIT > target NUMBER type conversion produced a null-pointer exception.
- Fixed the issue when creating a task: when switching database in source side, the mapping for target database was not updated.