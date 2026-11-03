---
id: rn-bladepipe-1-12-0
title: BladePipe 1.12.0
description: BladePipe 1.12.0 adds TDSQL PostgreSQL pipelines and Kudu support, expands database compatibility, and includes data sync improvements and bug fixes.
---

Release Date: November 2, 2026

Version: 1.12.0

## Highlights

* Improved datasource version handling. New and unrecognized database versions are no longer restricted, including versions built temporarily from database source code or versions whose version numbers have not yet been finalized.

## New Pipelines

* **TDSQL PostgreSQL > StarRocks / Doris / SelectDB**: Full migration, incremental sync, data verification, data correction, and schema migration.

## New Features

* Kudu targets now support schema migration, full migration, incremental sync, data verification, and data correction. Full migration can now drop and recreate the target table before loading data.
* Kudu incremental sync now supports `CREATE TABLE`, `DROP TABLE`, adding and dropping columns, table and column renames, setting and removing default values, and table and column comments. Duplicate DDL replay is handled, and target metadata is refreshed after DDL execution.
* Kudu targets now support batch writes, with flushes triggered by row count, elapsed time, or data volume. (Parameter: `enableBatchWrite`; enabled by default for new jobs.)
* Full migration queries for MySQL, OceanBase for MySQL, PolarDB for MySQL, and PolarDB-X for MySQL can now specify `FORCE INDEX` hints to improve performance with complex filter conditions.
* Schema verification is now supported for Dameng, OceanBase for MySQL, and OceanBase for Oracle tables.
* Sidecars can now report their runtime time zone. New jobs can use the cluster's unique time zone as the default source time zone. (Parameter: `src_timezone_from_worker_enabled`; disabled by default.) This improves support for deployments in other regions.
* PostgreSQL DDL sync now supports a new parser, expanding the range of supported DDL statements.
* Added support for additional type mappings from PostgreSQL to Doris.
* MySQL `TINYBLOB` and `BLOB` types now map to `VARBINARY` when syncing to StarRocks 3.0 or later.
* Oracle `RAW` values can now be migrated and synced to ClickHouse `String` columns.
* Full migration for PolarDB for MySQL, PolarDB-X for MySQL, and OceanBase for MySQL now supports pagination and resume for tables with composite primary keys.
* Redis incremental jobs can now filter RDB events. (Parameter: `skipIncreRdb`.)
* TiDB can now sync multiple databases to Kafka, increasing the number of tables supported by a single job.
* Elasticsearch targets now support syncing multiple databases, such as selecting multiple schemas when syncing from MySQL or PolarDB for MySQL to Elasticsearch. This increases the number of tables supported by a single job.
* MySQL-to-Oracle subscription updates can now add databases.
* OceanBase and OceanBase for Oracle now support TLS connections with username and password authentication.
* OceanBase now supports incremental sync in binlog mode over SSL.
* Added expression-based table mapping rules for more flexible, consistent table naming and simpler table selection.
* Added case-insensitive column mapping rules.
* Multiple positions can now be updated in batches when using multi-position mode.

## Improvements

* Improved DDL sync from heterogeneous databases to StarRocks and Doris. Index additions, modifications, and deletions are now filtered out by default. `CREATE TABLE`, `ADD COLUMN`, and `MODIFY COLUMN` statements now include the source column's converted default value when one is present.
* Improved Oracle DDL parsing to expand Oracle-to-Oracle DDL sync support, including `COMMENT TABLE/COLUMN`, `SET DEFAULT`, `SET NOT NULL` / `SET NULL`, and `SET IDENTITY` / `DROP IDENTITY`.
* Improved DDL error handling for StarRocks and Doris targets. Errors caused by changing default values or reducing type lengths are now skipped automatically and logged.
* PostgreSQL DDL sync now filters `CREATE TABLE` statements by default.
* Improved Oracle LogMiner V2 handling of transaction start positions, SCN windows, log session recovery, matching of certain transaction identifiers, and rollbacks.
* Improved strongly typed writes to ClickHouse by unifying date/time, numeric, and nested Array/Map handling across JDBC and RowBinary write paths.
* Improved ClickHouse data verification. Tables using engines such as ReplacingMergeTree and CollapsingMergeTree are now queried with `FINAL` so verification compares the logical data after merges.
* StarRocks full and incremental flush logs now include table names.
* Incremental sync now refreshes target schema metadata after DDL execution on MySQL, TiDB, OceanBase for MySQL, StarRocks, Doris, PostgreSQL, Oracle, and KingbaseES targets. This provides accurate target write types for subsequent DML.
* Improved execution of batches containing only `UPDATE` events in StagingMerge mode to increase efficiency.
* Improved strongly typed writes to StarRocks targets, fixing writes of Map, Array, Struct, and Varbinary values.
* Improved strongly typed writes to Doris targets, fixing precision loss for LargeInt, Decimal, and DecimalV3 values.
* Redis jobs that previously combined full and incremental sync are now split into separate full migration and incremental sync jobs.
* Improved Redis bidirectional sync loop prevention by filtering loop-prevention commands earlier, reducing load on Redis instances.
* Improved SQL Server source catch-up checks so slow remote queries do not block job start or stop operations.
* Improved sub-job configuration inheritance when subscriptions are modified. Sub-jobs now retain the parent job's time zone, write strategy, datasource connection, and capture settings.
* Job exports now include parameters related to performance, making diagnosis and optimization more efficient.
* The Console upgrade page now provides guidance for special values entered in the installation package path.
* The table schema history view on the job details page is no longer limited to incremental stages; other tabs can now also display schema history.
* Improved the interaction for selecting a time when resetting positions.
* More information from `dbs` in job configuration is now displayed in the UI.
* Improved bulk blacklist configuration. Blacklist rules can now be applied to selected tables.
* Improved job logging. Execution-thread logging can now be toggled and is disabled by default. Log levels have been removed from commit logs to reduce disk usage.

## Bug Fixes

* Removed the Fastjson2 dependency to address a security issue.
* Fixed heartbeat, batch position merging, and snapshot reporting issues in HANA, SQL Server, Kafka, DynamoDB, Redis, TDengine, and shared position management.
* Fixed an issue where pending Futures were not cancelled when stopping Kudu, Paimon, and Delta Lake jobs.
* Fixed Spanner source jobs in `NEW_ROW_AND_OLD_VALUES` mode omitting unchanged fields from before-images.
* Fixed table-level data filters not taking effect on GaussDB for MySQL, Lindorm, and TDSQL PostgreSQL sources.
* Fixed DB2 source jobs applying the same data filter to same-named tables in different schemas.
* Fixed TiDB connection creation and DDL connection timeouts and SSL settings not inheriting the common datasource configuration.
* Fixed Elasticsearch targets failing jobs when they could not skip `RENAME` DDL statements.
* Fixed Redis target writes failing for the `EVALSHA` command.
* Fixed Redis Sentinel and Cluster failover recovery not resuming from the acknowledged consumption position, which could skip unconsumed data.
* Fixed the scheduled data-counting thread remaining active after a Redis source job stopped.
* Fixed data loss in Dameng incremental sync when transaction IDs and LSNs arrived out of order and transaction cache entries were incorrectly cleared.
* Fixed before- and after-image pairing failures in HANA source CDC tables when different transactions had the same `__$DATA_ID`.
* Fixed trigger detection for HANA sources using manually created triggers.
* Fixed type detection when converting MySQL DDL, such as `text` columns with a `CHARACTER SET` clause.
* Fixed MySQL strongly typed full reads of `DATE` values being affected by the Worker time zone, and empty `SET` values being parsed as a set containing an empty string.
* Fixed the MySQL Binlog parser dropping trailing zero bytes from binary values.
* Fixed the MySQL source DDL ANTLR parser failing on complex `CREATE TABLE` statements containing `CHECK` constraints.
* Fixed the MySQL source DDL ANTLR parser not extracting enum values from `ENUM` and `SET` DDL, which caused errors when syncing to targets.
* Fixed parallel column parsing mismatches when subsequent DDL modified metadata shared by the MySQL source DDL ANTLR parser.
* Fixed `CREATE TABLE IF NOT EXISTS` overwriting existing metadata and misaligning data columns in the MySQL source DDL ANTLR parser.
* Fixed false-positive full data verification results caused by inconsistent FLOAT read protocols when JDBC parameters were configured on MySQL-family targets, including MySQL, PolarDB for MySQL, PolarDB-X for MySQL, TDSQL MySQL, TDSQL-C MySQL, and OceanBase for MySQL.
* Fixed subscription resource cleanup errors when a table was dropped on a PostgreSQL, KingbaseES, VastDB, or HANA source and then removed from the job subscription.
* Fixed Dameng 7 queries filtering out regular columns when `HIDDEN_COLUMN` was `NULL` in system metadata.
* Fixed a NullPointerException when starting a job if Dameng column precision or length metadata was empty.
* Fixed a NullPointerException when an async job started before its transaction committed when OceanBase for MySQL was used as the CloudCanal metadata database.
* Fixed automatically created verification jobs not inheriting the template's effective settings when creating a job with a configuration template.
* Fixed Oracle source data parsing errors caused by mismatches between column positions and historical schemas when replaying DDL for columns added with defaults or hidden columns.
* Fixed character-set handling when writing Oracle `NCHAR` and `NVARCHAR2` values and paginating reads by primary keys that use the national character set.
* Fixed Oracle `LONG` columns being read as binary data in strongly typed source mode.
* Fixed Oracle source time-zone values being parsed with the wrong offset during the repeated hour at the start of daylight saving time.
* Fixed changes to `logminerPasswd` after Oracle job creation not taking effect.
* Fixed Oracle version detection for versions 23 and later.
* Fixed PostgreSQL full migration failing when a strongly typed source primary key included a `date` column.
* Fixed PostgreSQL schema migration not supporting expression-based unique indexes.
* Fixed connection pool cache conflicts between OceanBase and OceanBase for Oracle.
* Fixed SQL Server static CDC table mode automatically selecting newly added source columns when subscriptions were modified.
* Removed the unsupported PolarDB for PostgreSQL option from the PostgreSQL target list.
* Fixed jobs failing to start or rerunning a completed stage when stopped at the completion boundary of full migration, data verification, or data correction.
* Fixed frequent missing `favicon.ico` errors in Console logs.
* Fixed incorrect job configuration displayed on the final step of schema migration job creation.
* Fixed log downloads from using HTTP when Console was behind a reverse proxy with TLS termination configured at the proxy.
* Fixed async jobs waiting indefinitely after the last sub-job was set to "Ignore and Continue."
* Fixed the job log dialog reopening automatically after it was closed.
* Fixed unsupported columns remaining selected when creating a similar job and changing its target datasource.
* Fixed displayed target primary keys not matching the actual values when setting target primary keys in bulk.
