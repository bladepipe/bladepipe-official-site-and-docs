---
id: rn-bladepipe-0-8-0
title: BladePipe 0.8.0
---
Release Date: August 15, 2025

Version: 0.8.0

## Highlights
- Support **AWS DynamoDB**, **AWS ElastiCache (Valkey/Redis)**, and **GaussDB** as new source connectors.

## New Connections
- **AWS ElastiCache (Valkey/Redis) > AWS ElastiCache (Valkey/Redis) / Redis**: Full data migration, incremental data sync, data verification and correction.
- **Redis > AWS ElastiCache (Valkey/Redis)**: Full data migration, incremental data sync, data verification and correction.
- **AWS DynamoDB > MySQL / StarRocks**: Full data migration, incremental data sync, data verification and correction.
- **MySQL > AWS DynamoDB**: Schema migration, full data migration, incremental data sync, data verification and correction.
- **GaussDB > MySQL / Oracle / Doris / SelectDB**: Schema migration, full data migration, incremental data sync, data verification and correction, and DDL sync (add/drop/modify/rename/truncate columns).
- **GaussDB > ClickHouse**: Schema migration, full data migration, incremental data sync, data verification and correction, and DDL sync (add/drop/modify/rename/truncate columns).
- **ClickHouse > StarRocks / Doris / SelectDB**: Schema migration, full data migration, data verification and correction.
- **Yuque Documents > PostgreSQL (Vector)**: Schema migration and full data migration.

## New Features
- Support exactly-once semantics for Redis-Redis non-idempotent commands (e.g., incr/decr) (new parameter: *enableWriteDeReplay*).
- Support [Apache Paimon HDFS storage](../dataMigrationAndSync/datasource_func/Paimon/props_for_paimon_ds.md#general-configuration). Now it supports S3, HDFS, and local file storage.
- Support partial update for StarRocks (partialUpdateEnabled, partialUpdateMode) to reduce bandwidth in incremental sync.
- Support verification strategy control for Doris/StarRocks targets (new parameter: *checkFetchStrategy*, *checkRangeThreshold*) to optimize query performance based on primary key distribution.
- Enable to retrieve the latest file offset for MySQL / PostgreSQL.
- Support SSL authentication for PostgreSQL / RDS for PostgreSQL and MySQL / RDS for MySQL.
- Support composite primary key data verification for SQL Server sources.
- Support ClickHouse versions 25.4.x / 25.5.x / 25.6.x.
- Support tables where TABLE_TYPE=TABLE for StarRocks 3.4.x.
- Support single offset consumption in incremental sync for Dameng sources.
- Support TLS connection for Redis, with support for self-signed CA certificates.
- Add built-in DATE format support for Elasticsearch targets.
- Support configurable transaction auto-commit timeout for Oracle sources (new parameter: *autoCommitTxTimeoutSec*).
- Enable to set the number of Kafka target replica when creating a DataJob.
- Enable to [convert strings to datetime/date/time](../operation/job_manage/job_op/data_transform.md#supported-scripts) in the visualized interface.
- Support [MFA for on-premises deployment](../operation/system_manage/mfa_usage.md) to enhance account security.
- Support default cluster setting when creating DataJobs (new parameter: *defaultClusterName*) to prevent creation failures due to missing cluster assignment.

## Improvements
- Generate DEL commands before key splitting in Redis full data migration, preventing duplicate writes after DataJob restart.
- Search MySQL SECURITY_TYPE=DEFINER views based on permissions.
- Limit MetaHistory DDL records in MySQL sources to only DataJob-related tables when using whitelist-based Create DDL refresh.
- Improve SQL Server metadata retrieval to include custom field types.
- Disable the display of DB2 target database to be created in DataJob creation wizard.
- Add multi-DB incremental DataJob precheck for PostgreSQL sources.
- Enhance MariaDB table-level actions to include CREATE, ALTER, RENAME, TRUNCATE, and DROP.
- Move AK/SK management and third-party configurations to Settings > Profile > Security.
- Fix DataJob creation button layout with consistent “Next Step” position.

## Bug Fixes

- Fixed PostgreSQL publication slot not being deleted after merging sub-DataJobs when subscription is modified.
- Fixed missing target primary key in Kafka > MySQL/Iceberg subscription modifications and similar DataJob creation.
- Fixed the error reporting no modification is made in Kafka > MySQL/Iceberg subscription modifications when only primary keys are changed.
- Fixed console error when changing source DataSource type in similar DataJob creation.
- Fixed console error when changing DataSource type after schema mapping in similar DataJob creation and DataJob creation.
- Fixed src table detail is empty error for Aurora MySQL full database sync.
- Fixed the error arised from duplicate composite index entries in TiDB > TiDB schema migration.
- Fixed SSL/TLS certificate file invalidity when using same filename after the DataSource is changed.
- Fixed missing certificate file error for Kafka using TLS/Kerberos authentication.
- Fixed missing default target primary key in subscription modification for sources with schema.
- Fixed pagination reset issues in multiple list pages.
- Fixed missing autoInitReplication option for OpenGauss DataJob creation.
- Fixed Dameng SQL parsing error when field name contains TimeStamp.
- Fixed ineffective data cleansing conditions when modifying subscriptions without adding tables.
- Fixed NPE when removing tables in subscription modifications.
- Fixed Oracle metadata snapshot not refreshing and column position parsing errors.
- Fixed errors when renaming sub-accounts.
- Fixed MariaDB filter condition failure due to improper predicate pushdown UI.