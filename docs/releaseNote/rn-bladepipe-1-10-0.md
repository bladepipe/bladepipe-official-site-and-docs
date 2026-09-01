---
id: rn-bladepipe-1-10-0
title: BladePipe 1.10.0
description: BladePipe 1.10.0 adds new pipelines for Google Ads and more, with major improvements to SAP HANA, Oracle and PostgreSQL source CDC performance.

---
Release Date: August 31, 2026

Version: 1.10.0

## Highlights

* **SAP HANA** sources now support non-blocking handling of uncommitted transactions during table-level CDC. Changes are automatically replayed after the transaction is committed or rolled back. (New parameter: `uncommittedTxMode`)
* **PostgreSQL** 17+ sources now support failover-enabled replication slots, allowing CDC to continue after a primary/standby switchover without rebuilding the slot.
* **Oracle** CDC adds a new `ADD_FILE_ARCHIVE_WINDOW` mode that dynamically includes additional archive logs around the current mining range to provide sufficient transaction context. Queries are also narrowed to the actual SCN range for better LogMiner performance.

## New Pipelines

* **[Google Ads](../dataMigrationAndSync/datasource_func/GoogleAds/configure_and_authorize_google_ads.md) > MySQL**: Incremental sync via scheduled scans with upsert support.
* **PostgreSQL > PolarDB for MySQL**: Schema migration, full migration, CDC, data verification, data correction, and DDL sync, including add/drop/modify/rename columns and truncate operations.
* **TDSQL MySQL / TDSQL-C MySQL > StarRocks / Doris**: Full migration, CDC, data verification, data correction, schema migration, and DDL sync, including add/drop/modify/rename columns and truncate operations.
* **TDSQL MySQL / TDSQL-C MySQL > Kafka**: Full migration and CDC.
* **Dameng / KingbaseES / GaussDB > Elasticsearch**: Full migration, CDC, data verification, and schema migration.

## New Features

* Doris > Oracle scheduled incremental sync can now use `DATETIME` or `DATETIMEV2` columns as periodic filter fields.
* Doris targets now support column default values during schema migration and DDL sync for supported numeric and string types.
* OceanBase for MySQL > OceanBase for MySQL schema migration now preserves table partition definitions.
* PostgreSQL sources now support the non-intrusive `CHECK_POS` heartbeat mode.

* SQL Server target verification automatically splits large queries to avoid exceeding parameter limits. (New parameter: `maxInSizePerQuery`)

* MySQL > SQL Server DDL sync now skips index and comment operations that have already been applied during pre-checks, preventing duplicate DDL execution errors on the target.

* Log downloads now use a dedicated communication channel, isolated from critical operations such as DataJob scheduling for improved stability.

* Live log viewing (`tail`) now uses a dedicated communication channel, improving stability without affecting DataJob scheduling.

* Console monitoring metrics collected from Sidecars now use a dedicated communication channel, isolated from critical DataJob operations.

* MFA now supports custom user and service identifiers.

## Improvements

* Improved SAP HANA trigger-check performance.

* Creating a similar DataJob from an SAP HANA source now preserves advanced configuration settings.

* Improved Kafka source offset lookup compatibility. Brokers earlier than Kafka 0.11 can now retrieve partition end offsets and committed consumer-group offsets.

* Improved Kafka source offset reset behavior:

  * Supports retries for active consumer groups.
  * Automatically falls back to the latest offset when a timestamp is out of range.
  * Fixes an incorrect timeout unit.

* Oracle CDC now exposes the number of remaining archive log files to be processed.

* Doris full migration now retrieves row counts from metadata instead of scanning the entire table.

* StarRocks full migration now retrieves row counts from metadata instead of scanning the entire table.

* Improved `dstWholeReplace` writes for MySQL, ADB for MySQL, PolarDB for MySQL, and TDSQL-C MySQL targets by splitting incremental events based on column structure.

* Improved KingbaseES compatibility when system `search_path` settings prevent direct access to system tables.

* KingbaseES now explicitly converts index ordinal types for compatibility with strict function-argument matching.

* Dameng CDC now filters DML events with empty table names from LogMiner output.

* Elasticsearch target verification now ignores property order in `OBJECT` fields.

* GaussDB adds replication-stream heartbeats to prevent WAL sender disconnections during processing stalls. (New parameter: `replicationHeartbeatSec`)

* Improved log downloads with streaming support so large files no longer block the page.

* DataSource endpoint, username, password, and related settings are now managed from a single edit entry point.

* Resetting AK/SK now requires secondary confirmation to reduce accidental operations.

* Full migration filter pushdown now applies only to tables with configured filters. Tables without filters continue to use paginated scanning.

* Async DataJob operation records now show the exact sub-account username.

* Improved DataJob parameter templates.

* BladePipe now warns users when creating a DataJob for a table without a primary key if no target primary key has been configured.

## Bug Fixes

* Upgraded Fastjson in DataJob runtime components to version 1.2.84 to address a security issue.

* Fixed an issue where SQL Server CDC could miss changed columns when the CDC update mask did not correctly flag them.

* Fixed an issue where removed Kafka topics could remain in stored offsets after updating subscriptions for multi-offset DataJobs.

* Fixed an issue where Paimon, Delta Lake, and Iceberg full or incremental writes could not skip failed records according to DataJob settings. Hudi full-load asynchronous flush errors can now also be skipped.

* Fixed PostgreSQL > MySQL `interval` type mapping. It is now mapped to `varchar`.

* Fixed nullable constraints on target primary-key-related columns when writing to OceanBase for Oracle.

* Fixed JSONB escape parsing for MySQL.

* Fixed `DROP TABLE` DDL sync compatibility with SQL Server versions earlier than 2016.

* Fixed PostgreSQL > MySQL-family pipelines where:

  * Boolean values could be lost.
  * Floating-point arrays containing `NaN` or `Infinity` could fail to write.

* Fixed an issue where PostgreSQL target DDL sync could unintentionally add a `NOT NULL` constraint when changing a column type.

* Fixed replication slots not being removed after KingbaseES/Vastbase sub-DataJobs were merged.

* Fixed TDSQL-C MySQL CDC failing to locate binlog files after a primary/standby switchover.

* Fixed incorrect fractional-second precision detection for Dameng `TIMESTAMP WITH LOCAL TIME ZONE` caused by undecoded `DATA_SCALE` metadata.

* Fixed GaussDB CDC losing the sign of `MONEY` values.

* Fixed MySQL, PolarDB for MySQL, and TDSQL-C MySQL batch writes where `TINYTEXT`, `TEXT`, `MEDIUMTEXT`, or `LONGTEXT` values could be written as empty strings when the character-stream length was not specified.

* Fixed a Dameng full migration SQL syntax error that could occur when filter pushdown was enabled but no filter condition was configured.

* Fixed PostgreSQL > MySQL full migration writing empty arrays as `"]"`.

* Fixed loss of table comments during MySQL → SQL Server DDL sync.

* Fixed an issue where removing the final alert method from DataJob alert settings did not take effect.

* Fixed stale values in the database-mapping dropdown when creating a similar DataJob.

* Fixed an error when adding multiple rows at once and selecting databases one by one in multi-database DataJob creation.

* Fixed quoted field names in filter conditions not being recognized correctly.

* Fixed an incorrect “To be created” status when updating a subscription and first selecting a target column that did not exist while the target table itself already existed.

* Fixed an issue where rapidly closing multiple error dialogs could cause some error messages to be lost.

