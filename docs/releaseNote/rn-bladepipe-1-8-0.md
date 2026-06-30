---
id: rn-bladepipe-1-8-0
title: BladePipe 1.8.0
description: BladePipe 1.8.0 improves binlog parsing, adds PolarDB for MySQL to OceanBase support, and enhances DataJob stability across major databases.
---
Release Date: June 30, 2026

Version: 1.8.0

## Highlights

- Optimized incremental data parsing for MySQL, PolarDB-X, PolarDB for MySQL, and OceanBase for MySQL sources in binlog mode. This significantly reduces CPU usage when parsing wide tables on the source side.
- Optimized the incremental DataJob data format for MySQL, PolarDB for MySQL, Oracle, PostgreSQL, and SQL Server sources to reduce DataJob memory usage. New parameters: `updateImageMode` and `deleteImageMode`.

## New Pipeline

- Added support for **PolarDB for MySQL > OceanBase for MySQL**, including schema migration, full data load, incremental sync, data verification, data correction, and DDL sync (add column / drop column / modify / rename / truncate). 

## New Features

- Supported field concatenation in data transformation and virtual columns.
- Supported PolarDB-X 2.0 distributed database versions 5.4.21 and 8.4.
- Added command whitelist filtering for Redis sources. New parameter: `skipCommands`.
- Added support for setting the DataJob offset by timestamp for Dameng sources.
- Supported data verification and data correction for SelectDB sources.
- Added support for specifying the archive destination name when Oracle sources use LogMiner to read multiple archive log locations. New parameter: `archiveDestName`.
- Added support for parsing source DDL with the Antlr-based parser for OceanBase for MySQL sources.
- Added support for clearing target data before full migration or rerun for CloudBerry targets.
- Added “Select All” support for batch operations on blacklist rules.
- Added support for configuring target primary keys for TiDB and KingbaseES sources.
- Added support for using `force index` as a query hint during TiDB full data queries.

## Improvements

- Improved HANA CDC trigger data cleanup logic to avoid deleting unconsumed transaction data.
- Improved the download and parsing process for RDS backup binlogs.
- Improved performance when creating similar DataJobs in multi-database mode.
- Improved StarRocks partition settings. When the target table already exists, the partition configuration is now disabled in the UI.
- Optimized default parameters for Kafka sources and StarRocks targets to improve synchronization performance.
- Improved MySQL, TiDB, PolarDB-X, PolarDB for MySQL, PostgreSQL, KingbaseES, and Vastbase sources by forcibly killing query processes after query failures.
- During DataJob creation, the target data no longer fetches table PK/UK information.
- Improved Dynamic mode for StarRocks, Doris, and SelectDB by fetching and parsing data in batches. New parameter: `dynamicScanBatchSize`.
- Improved parsing of `unknown` type hints for schema and table names in PostgreSQL-compatible databases.
- Improved frontend validation for Oracle sources in incremental + LogMiner mode when source table names exceed 30 characters.

## Bug Fixes

- Fixed inaccurate `source` timestamp fields in HANA CDC output messages.
- Fixed schema migration failures when the vector extension is enabled in a non-public schema in PostgreSQL.
- Fixed an issue where JDBC cursor reads did not take effect when MySQL full migration or verification query filters contained semicolons, which could lead to OOM errors.
- Fixed errors when KingbaseES targets executed `UPDATE` statements without a primary key and without data changes.
- Fixed Jackson deserialization failures when RSocket or metadata payloads contained large fields over 20 MB.
- Fixed an issue where, after changing target names during DataJob creation or when adding subscribed tables, the page status was not updated to “To be created” until a manual refresh.
- Fixed false data verification mismatches for the PolarDB-X `BIT` type.
- Fixed an issue where the Redis target parameter for skipping write errors did not take effect.
- Fixed potential data loss caused by increasing LSN values after frequent restarts of incremental DataJobs for Dameng sources.
- Fixed a dependency conflict with JDK 17.01 in Docker images that prevented the Console from starting properly.
- Fixed an issue where DDL synchronization for Dameng sources incorrectly filtered DDL statements when the original SQL used lowercase table names.
- Fixed an issue where incremental data for some tables could be filtered out when a single TiDB Region contained multiple tables, causing missing data on the target side.
- Fixed an issue where subscription status could become inconsistent during TiDB Region split or Leader switch scenarios, preventing incremental data from being received normally.
- Fixed an issue where old `tableId` or `partitionId` subscriptions were not cleaned up in time after TiDB source DDL or partition table changes, which could lead to abnormal states.
- Fixed inaccurate time calculation for writing `apply_commit.log` commit logs after asynchronous writes to Kafka or Pulsar targets.
- Fixed unsupported parser behavior when OceanBase for MySQL sources used `SKIP_INDEX(SUM)` type indexes.
- Fixed a null pointer exception when Oracle sources in strongly typed incremental synchronization mode encountered `null` values from the source.
- Fixed an issue where data correction DataJobs corrected columns that were not subscribed. New parameter: `reviseAllSrcColumns`.
- Fixed inconsistencies between the actual page size limit and error messages in some paginated APIs.
- Fixed an issue where the MySQL Antlr parser could not parse statements using backticks in options, such as `row_format = `dynamic``.
- Fixed an issue where the Oracle Antlr parser could not parse statements such as `alter table "DRAGONPASS"."TBLDRAGONDETAIL" shrink space CHECK;`.
- Fixed potential data loss in full synchronization for relational database sources when the source table had a primary key but the primary key column was not selected in wide-table column pruning scenarios.
- Fixed an issue where pressing Enter did not confirm table creation.
- Fixed an issue where, in expression mode, a DataJob could not be submitted after all existing expressions were deleted and new expressions were added during subscription modification.
