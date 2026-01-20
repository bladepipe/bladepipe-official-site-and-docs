---
id: rn-bladepipe-1-2-0
title: BladePipe 1.2.0
description: BladePipe 1.2.0 adds KingbaseES V8/V9 source support, new sync pipelines, CDC and DDL enhancements, performance improvements, and bug fixes.
---
Release Date: January 15, 2026

Version: 1.2.0

## Highlights
- Newly support KingbaseES V8/V9 as source.

## New Connections
- **KingbaseES V8/V9 > MySQL / StarRocks / Doris / SelectDB**: full data migration, incremental data sync, data verification, data correction, schema migration, and DDL sync (add column / drop column / modify / rename / truncate).
- **KingbaseES V8/V9 > ClickHouse**: full data migration, incremental data sync, data verification, schema migration, and DDL sync (add column / drop column / modify / rename / truncate).
- **OceanBase for MySQL > Oracle**: full data migration, incremental data sync, data verification, data correction, schema migration, and DDL sync (add column / drop column / modify / rename / truncate).
- **Doris / SelectDB > Doris / SelectDB**: full data migration, data verification, data correction, and schema migration.

## New Features
- Support OceanBase for MySQL / TiDB / PolarDB MySQL / TDSQL-C MySQL and other MySQL-protocol-compatible databases as the console metadata database.
- Support duplicate subscription detection when creating DataJobs or modifying existing DataJobs, making it easier for users to reduce the number of DataJobs.
- Support MySQL source RENAME_COL type DDL, and support synchronization of this type of DDL to StarRocks (≥ 3.3.2).
- Support skipping unsupported variable part events when parsing MySQL binlogs.
- Support virtual columns for Hana > Doris and OceanBase > StarRocks.
- Support [SQL Server source heartbeat](../dataMigrationAndSync/datasource_func/SqlServer/enable_sql_server_heartbeat.md), resolving latency issues when there is no write on the source.
- Support Doris / SelectDB > MySQL data verification and data correction.
- Support DB2 source metadata retrieval, making it easier for users to view subscription relationships.
- Support DB2 source performance parameter template whitelisting.
- Support setting the automatic commit time after transaction timeout on the Dameng source. (Parameter: *autoCommitTxTimeoutSec*)
- Support keeping a certain interval between the Dameng source consumption position and the latest Arch log. (Parameter: fallBackLsnStep)
- Support displaying the latest commit delay on the Dameng source to quickly determine DataJob latency caused by uncommitted transactions.
- When Doris is used as the target, schema migration supports configuring partition information, including: Automatic / manual RANGE partitions, LIST partitions.
- Support ElasticSearch target completion type.
- When creating DataJobs, table and field mapping rules support: CamelCase to snake_case, snake_case to CamelCase.
- Support canceling test connection when creating DataJobs or adding DataSources.

## Improvements
- Optimized MySQL source synchronization so that Online DDL uses DDL Convert logic by default, significantly improving compatibility of Online DDL synchronization.
- Optimized filtering of invalid default datetime / timestamp values during MySQL source schema migration.
- Optimized MySQL full migration for multiple schemas. Improved startup speed and reduced connection pool usage.
- Optimized MySQL source invalid date / datetime / timestamp data judgment logic.
- Optimized PostgreSQL full migration to support primary key–based pagination for tables with multiple primary keys (previously snapshot read).
- Optimized the time zone offset issue in SQL Server latency display.
- Optimized SQL Server source behavior for versions 2014 and below, setting SnapshotRead to true by default, and using snapshot read for scanning.
- Optimized metadata definition retrieval during SQL Server / Oracle DataJob startup, improving retrieval speed by 10x.
- Optimized MySQL source initialization in non-GTID mode, no longer storing GTID positions to prevent failures caused by excessively long position information.
- Optimized the default value of maxInSizePerQuery for Doris / StarRocks targets to 1024.
- Optimized DB2 source full scan using a unified architecture, consistent with other data sources.
- Optimized DB2 source behavior so that when snapshot read is enabled, position range retrieval is no longer performed, resolving timeout issues.
- Optimized DB2 source metadata reading using pagination to support retrieving metadata for a large number of tables.
- Optimized permission pre-checks for Hana source incremental DataTask, reducing the scope to the table level.
- Optimized Dameng source log printing, adding query time statistics for V$LOGMNR_CONTENTS.
- Optimized the subscription modification process by adding a secondary confirmation dialog.
- Optimized redirection to the DataJob list when entering an incorrect or non-existent route.
- Optimized backend behavior so that when multiple APIs return errors simultaneously, all error messages are collected and displayed in a single pageable dialog.
- Optimized display of pending creation status in database mapping tree view.
- Optimized frontend single-request timeout, extending it to 1 hour.
- Optimized display of connection information for Console and Worker automated O&M operations.
- Optimized batch blacklist behavior. If no new tables are added, the effective scope of newly added tables is disabled.
- Optimized table selection performance when creating DataJobs with a large number of tables (20,000+), improving browser stability during “select all”.


## Bug Fixes
- Fixed connection issues when adding an Oracle data source with the username configured as username as role (e.g. sys as sysdba).
- Fixed an issue where duplicate rows could not be inserted on the target during incremental synchronization for Oracle tables without constraints.
- Fixed an issue where Oracle index columns were incorrectly retrieved due to missing owner restrictions, causing columns with the same index name in other schemas to be retrieved.
- Fixed an issue where parsing BC timestamp with/without time zone data failed when strong typing was enabled for PostgreSQL incremental synchronization.
- Fixed an issue where incremental synchronization DataJobs for OceanBase / OceanBase for Oracle entered infinite reconnection after the LogProxy service process exited. (Added parameter: *logProxyMaxReconnectTimes*)
- Fixed an issue where failure to parse DDL on OceanBase for Oracle caused the log listening client to stop while the DataJob process remained running.
- Fixed an issue where the main DataJob could not be started after DB2 source subtask merging.
- Fixed an issue where modifying the DB2 source position did not take effect.
- Fixed missing script display when adding virtual columns with expression-based values.
- Fixed an issue where unsupported target columns were selected during data processing after switching the target when creating similar DataJobs.
- Fixed an issue where parameters were missing when calling the interface to cancel Worker automatic upgrades.
- Fixed metadata mapping errors when synchronizing table names containing uppercase letters under MySQL source case-insensitive configuration.
- Fixed an issue where UK identifiers were not displayed for Doris source table information.
- Fixed an issue where schema migration partition information was lost when multiple spaces existed between PARTITION BY in StarRocks partition configuration.
- Fixed an issue where abnormal state machine states during SQL Server DataJob creation caused positions to fail to initialize.
- Fixed an issue where Worker automatic deployment used high-privilege accounts, resulting in incorrect deployment directory permissions.
- Fixed an error when retrieving DataJob lists via paginated API calls with an empty sort order.
- Fixed an issue where DDL add-column execution failed for ElasticSearch targets.
- Fixed an issue where editing a single database was ineffective in database mapping tree view.
- Fixed an issue where console O&M action forms could be submitted before validation was completed.
- Fixed rendering issues when position information in DataJob details was excessively long.
- Fixed an issue where error interfaces could be clicked repeatedly in a short period, triggering a large number of requests.
- Fixed an issue where dialogs were not closed when navigating back in the browser.
- Fixed a 404 issue with the partition expression API.
- Fixed an issue where unsupported target tables were selected during table selection after switching targets when creating similar DataJobs.
- Fixed incomplete database mapping validation when creating similar DataJobs, which previously allowed proceeding to the next step without full validation.
- Fixed an issue where target table information was not refreshed after switching target schemas during DataJob creation or similar DataJob creation.
- Fixed an issue where message-based source DataJobs showed target tables in pending creation status after clicking “select all”.
- Fixed console errors when modifying subscriptions for message-based sources to PostgreSQL / SQL Server.
- Fixed missing dropdown options for target mapping when adding Topics during subscription modification from message-based sources to Oracle.
- Fixed an issue where PostgreSQL full migration caused index invalidation due to implicit type conversion of primary key fields (smallint / integer / numeric / bigint).
- Fixed an issue where UPDATE events could not be synchronized when strong typing was enabled for PostgreSQL incremental synchronization.
- Fixed inconsistency between PostgreSQL source and target when strong typing was enabled and writing BC Timestamp with time zone.