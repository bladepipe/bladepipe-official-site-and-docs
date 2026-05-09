---
id: rn-bladepipe-1-6-0
title: BladePipe 1.6.0
description: BladePipe supports Snowflake, CloudBerry and Hologres as target data sources. The JDK is upgraded to JDK 17.
---
Release Date: May 9, 2026

Version: 1.6.0

## Highlights
- **MySQL / PostgreSQL / Oracle > Snowflake**: schema migration, full migration, incremental sync, data verification, and DDL sync (add column / drop column / modify).
- **PostgreSQL > CloudBerry**: schema migration, full migration, incremental sync, data verification, data correction, and DDL sync (add column / drop column / modify / rename / truncate).
- **GreenPlum > CloudBerry**: schema migration, full migration, data verification, and data correction.
- **MySQL > Hologres**: schema migration, full migration, incremental sync, data verification, data correction, and DDL sync (add column/truncate).

## Compatibility

- Runtime environment upgraded to **JDK 17**. [TGZ deployments require switching the JDK version](../productOP/onPremise/installation/install_all_in_one_binary.md#environment-preparation). Docker/K8S deployments are not affected.

## New Pipelines

- **KingbaseES > OceanBase for Oracle**: schema migration, full migration, incremental sync, data verification, data correction, and DDL sync (add column / drop column / modify / rename / truncate).
- **OceanBase for Oracle > KingbaseES**: schema migration, full migration, incremental sync, data verification, data correction, and DDL sync (add column / drop column / modify / rename / truncate).
- **MySQL / PolarDB MySQL > DuckDB**: schema migration, full migration, incremental sync, and data verification.
- **OpenGauss > Doris**: schema migration, full migration, incremental sync, data verification, and data correction.

## New Features

- Added support for Oracle source tables without primary keys, using ROWID as the unique identifier.
- Added predictive DDL detection for Oracle targets, including DROP PRIMARY KEY and ADD PRIMARY KEY operations.
- Added sync support for Oracle source-side PRIMARY KEY additions and deletions.
- Added strong type mapping support for OpenGauss.
- Added support for OpenGauss 6.x.
- Added support for modifying subscriptions of sub-DataJobs during the full load stage.
- Added support for batch configuration of target column names during DataJob creation, including removing specific strings and adding/removing prefixes or suffixes.
- Added support for exporting key DataJob information for faster troubleshooting.
- Added support for exporting subscription lists from Database/Table Mapping to quickly create similar DataJobs across BladePipe clusters.
- Added `subStringIndex` and `subStringBetweenIndex` scripts for data cleansing and virtual columns to support more flexible string extraction.
- Added TLS authentication support for self-hosted SQL Server, AWS SQL Server, Azure SQL Server, self-hosted MariaDB, AWS MariaDB, Azure Database for MariaDB, Aurora MySQL, and Azure Database for MySQL data sources, improving security for internet-based migration and sync.
- Added CA certificate authentication support for Aurora PostgreSQL and Azure Database for PostgreSQL data sources, improving security for internet-based migration and sync.
- Added support for VastBase source-side view sync.
- Added support for scheduled incremental sync from VastBase > Dameng.
- Added support for setting a default database for KingbaseES data sources to simplify authorization.
- Added strong type mapping support for Dameng targets for better type compatibility.

## Improvements

- Upgraded console dependencies such as Spring Boot to address security issues.
- Optimized default filtering of StarRocks generated columns.
- Optimized Oracle source-side incremental DDL parsing by using Antlr as the default parser for newly created DataJobs.
- Optimized Oracle source-side in-memory metadata tracking with Antlr as the default DDL parsing engine for newly created DataJobs.
- Optimized Oracle source-side DROP compatibility, resolving issues where DROP statements were internally rewritten as RENAME operations (new parameter: `rewriteRecycleRenameToDrop`).
- Optimized MySQL incremental offset detection, with automatic fallback to the first binlog offset for new instances with empty binlogs.
- Optimized KingbaseES support for subscribing to secondary partition tables.
- Optimized Elasticsearch target-side Date type writing, allowing manual selection of existing target-side formats.
- Increased the maximum interval for scheduled scan sync to 24 hours.
- Improved the interaction experience when configuring scheduled scan times.
- Improved validation messages for invalid extra parameter configurations when adding data sources.
- Added the ability to cancel long-running table/column fetching operations during DataJob creation or subscription modification.
- Optimized the subscription modification workflow by preventing changes to already mapped tables/columns. Target-side changes now require removing and re-adding mappings.
- Added support for filtering tables by serial number range during DataJob creation, enabling faster table selection.
- Optimized Elasticsearch target DataJob creation by disabling timezone configuration by default.
- Improved the DataJob rerun interaction with a secondary confirmation dialog and risk warnings when clearing target data or rebuilding target tables.

## Bug Fixes

- Fixed connection failures caused by OSS data source dependency issues.
- Fixed the issue where the `soTimeoutSec` parameter was ineffective for DB2 source-side full data migration.
- Fixed incorrect LIMIT syntax for DB2 source-side full data migration on versions earlier than 11.
- Fixed the 8-hour time difference issue for Datetime/Timestamp sync from TiDB to OceanBase.
- Fixed false-positive INTERVAL type mismatch issues in OpenGauss/PostgreSQL > OpenGauss/PostgreSQL data verification.
- Fixed field type retrieval errors by OID during startup of low-version PostgreSQL incremental sync.
- Fixed an issue where DDL capture table update/delete events were incorrectly synchronized downstream during PostgreSQL, KingbaseES, and VastBase incremental sync.
- Fixed parsing errors in MySQL DDL sync when names contained backticks, for example: `KEY ``user_id`` (user_id)`.
- Fixed parsing errors in the new MySQL DDL parser when default values contained binary notation such as `b1`.
- Fixed expression index column parsing failures during KingbaseES source-side schema migration.
- Fixed the inability to upload truststore files when adding Dameng data sources with TLS connections.
- Fixed localization display issues when resetting positions for AWS source-side tasks.
- Fixed missing primary key information in target-side persistence logs for scheduled scan sync.
- Fixed the issue where LLM-related configurations were lost when modifying subscriptions for full data migration tasks.
- Fixed interaction issues in forms for configuring single-table and batch LLM embeddings.
- Fixed the issue where configurations were cleared after unsubscribing and reselecting tables during subscription modification.
- Fixed route refresh logic to prevent automatic redirection to the DataJob list page on any route refresh.
- Fixed the issue where pressing Enter on the Settings page triggered an unintended page refresh.
- Fixed semicolon-based batch filtering in Database/Table Mapping.
- Fixed abnormal tooltip display for blacklist status in Database/Table Mapping operations.
- Fixed the issue where selected tables disappeared immediately after selection when filtering unselected tables during DataJob creation, reducing the risk of accidental operations.
- Fixed errors when switching the target side to ClickHouse while creating similar tasks.
- Fixed the issue where MySQL instances were displayed by default when switching network types during DataJob creation without any target-side data sources configured.
- Fixed the issue where DataJob parameter templates could not be saved properly.
- Relaxed restrictions on modifying JSON-type parameters during DataJob parameter editing.