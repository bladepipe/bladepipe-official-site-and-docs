---
id: rn-bladepipe-1-11-0
title: BladePipe 1.11.0
description: BladePipe 1.11.0 adds TDSQL PostgreSQL and MongoDB pipelines, new scan and schema checks, and fixes for data sync and migration.
---

Release Date: October 10, 2026

Version: 1.11.0

## New Pipelines

* **TDSQL PostgreSQL > Oracle / TDSQL PostgreSQL**: Full migration, incremental sync, data verification, data correction, and schema migration.
* **SQL Server / Oracle > TDSQL PostgreSQL**: Full migration, incremental sync, data verification, data correction, and schema migration.
* **MongoDB - MongoDB**: Two-way sync.

## New Features

* **SAP HANA > PostgreSQL / MySQL** now supports incremental sync with scheduled scans.
* **SQL Server > Oracle** now supports incremental sync with scheduled scans.
* **StarRocks > Kafka** now supports incremental sync with scheduled scans.
* Scheduled full migration jobs can now run once.
* Schema verification now supports MySQL, PolarDB for MySQL, Oracle, PostgreSQL, SQL Server, StarRocks, Doris, SelectDB, and TiDB tables.
* MySQL incremental sync now supports strong typing for better type compatibility.
* MySQL Binlog Dump now supports SSL certificate verification. Capability negotiation and handshake timeout issues were also fixed.
* PostgreSQL source jobs can now subscribe to multiple schemas in one database.
* Iceberg can now use Hive Metastore to manage catalog metadata.
* You can now split selected databases and tables into separate jobs. The original job settings are updated at the same time.
* Job settings now use switches for Boolean values and options for enum values. This helps prevent incorrect edits.
* For deployments outside containers, clients can now be upgraded or downgraded through a dedicated RSocket channel. SSH access and keys are not needed.
* Schema migration now supports the `COLLATE` attribute on OceanBase for MySQL targets.
* MongoDB full reads now support cursors. This prevents full sync failures or missing data when `_id` values have mixed types. (Parameter: `cursorRead`)

## Improvements

* Improved Oracle source LogMiner reads when source lag is high. BladePipe now adjusts the number of logs registered for each redo thread. (Parameter: `oraLogminerV2Enable`)
* Improved sync of Oracle source `BLOB` and `CLOB` values during transaction rollback, savepoint rollback, and long transactions. (Parameters: `oraLogminerV2Enable`, `oraLmLobEnable`)
* Oracle source jobs now show a chart of LogMiner mining time to help track query performance.
* Oracle target schema migration now creates a `UNIQUE INDEX` for a primary key to ensure uniqueness.
* Improved filtering of Online DDL temporary tables on MySQL incremental sources. This prevents jobs with expression-based subscriptions from syncing DML from temporary tables by mistake.
* Adjusted default `fullRingBufferSize` and `increRingBufferSize` settings for large jobs to reduce memory use.
* Fixed schema migration failures on older OceanBase for MySQL versions when metadata queries returned duplicate primary key columns.
* Worker alerts can now be found in alert logs.
* Added a check that partition settings match when the same Kafka topic maps to different tables.
* Improved the steps for resetting positions in jobs with multiple positions.
* Updated the job details page to make key information on the right easier to see.
* Made editing users, data sources, and job settings more consistent.

## Bug Fixes

* Fixed schema migration issue of identity columns from Oracle 12+ to Oracle 12+.
* Fixed lost Oracle source transactions that started before the saved position but committed after it during the first startup. (Parameters: `oraLogminerV2Enable`, `oraV2StartupReplay`)
* Fixed shifted sync columns caused by hidden columns on Oracle sources.
* Fixed incorrect schema and sync columns after an Oracle table was unsubscribed and subscribed again.
* Fixed an invalid `IGNORE_ROW_ON_DUPKEY_INDEX` index hint when composite primary key columns and unique index columns had different orders on Oracle.
* Fixed half-open connections that could occur when MySQL, PolarDB for MySQL, or OceanBase for MySQL sources rebuilt parsing metadata.
* Fixed a case-sensitive MySQL issue where a missing table could use columns from another table with the same name in a different case.
* Fixed the parsing of longitude and latitude axis order for `GEOMETRY` in strong typing mode on MySQL 8.0+.
* MySQL target write templates for spatial columns now use `ST_GeomFromText` consistently.
* Fixed migration of the MySQL `SET` type to PostgreSQL.
* Fixed data overflow when syncing MySQL unsigned `BIGINT` and high-precision `DECIMAL` values to SQL Server.
* Fixed duplicate columns caused by DDL metadata replay in incremental ANTLR `ddlParserMode` for MySQL and OceanBase for MySQL in Binlog mode.
* Fixed incorrect `ddlhistory` position-range filtering during metadata recovery for MySQL, PolarDB for MySQL, PolarDB-X, and OceanBase for MySQL in Binlog mode.
* Fixed an old timestamp being kept after a file-position reset for MySQL, PolarDB for MySQL, PolarDB-X, and OceanBase for MySQL in Binlog mode. This could make the read position differ from the metadata recovery boundary.
* Fixed startup after a file-position reset for MySQL, PolarDB for MySQL, PolarDB-X, and OceanBase for MySQL in Binlog mode. BladePipe now reads the timestamp from the reset position, so recovery uses the correct table schema and columns.
* Fixed backticks in metadata names for MySQL, PolarDB for MySQL, PolarDB-X, and OceanBase for MySQL in Binlog mode. They could cause snapshot checks to be skipped and an incorrect table schema to be saved.
* Fixed topic rename mapping from Dameng and Spanner to Kafka. Messages now go to the configured target topic.
* Fixed regular expression filters not working during Redis full migration.
* Fixed loop-prevention tables with schema names not being found in PostgreSQL two-way sync, or being filtered out too early by a whitelist.
* Fixed type conversion and bit-width errors when writing strongly typed `BIT` values to PostgreSQL targets.
* Fixed an extra `SET NOT NULL` clause in DDL generated when changing a column type on PostgreSQL incremental targets.
* Fixed time offsets and dates when syncing strongly typed PostgreSQL `TIME WITH TIME ZONE` values to StarRocks.
* Fixed MongoDB document field removal (`$unset`) not being synced.
* Fixed updates failing when a specified primary key was not used for MongoDB to relational database sync.
* Fixed missing SSL connection options for ClickHouse and options that were incompatible with the driver version.
* Fixed repeated scans in StarRocks full jobs caused by `LARGEINT` primary key overflow.
* Fixed out-of-memory errors in StarRocks full scans by enabling streaming reads.
* Fixed missing task JVM GC metrics caused by G1 GC metric names not being recognized.
* Fixed unstable partition-key calculation for binary primary keys such as `RAW`. Rows with the same primary key could be sent to different execution queues.
* Fixed child job merge errors when the main job had not finished restarting after a subscription change.
* Fixed Sidecar alerts being sent every minute when automatic scheduling was off.
* Fixed the page allowing a custom target table name for pipelines that do not support creating target tables.
* Fixed virtual-column primary keys becoming `null` when strong typing mode was enabled for incremental sync.
