---
id: rn-bladepipe-1-3-0
title: BladePipe 1.3.0
description: BladePipe 1.3.0 expands database support with Vastbase G100, simplifies installation and upgrade, and delivers enhanced cleansing, performance gains, and stability fixes.
---
Release Date: February 6, 2026

Version: 1.3.0

## Highlights

- Newly support Vastbase G100 as a source.
- Support one-click installation via managed images ([Docker](../productOP/onPremise/installation/install_all_in_one_docker.mdx)/[K8s](../productOP/onPremise/installation/install_all_in_one_k8s.mdx)) with automatic activation for 15-day duration of community edition. No registration required.
- [Expanded data cleansing functions](../operation/job_manage/job_op/data_transform.md#data-type-conversion): `maskAll`, `regexReplaceAll`, `typeCast`, `ifNullReplace`, `timestampReplace`, `numberReplace`.

## New Pipelines

- **KingbaseES -> KingbaseES/Oracle/TiDB:** schema migration, full data migration, data sync, data verification, data correction, and DDL operations (add column/drop column/modify/rename/truncate).
- **KingbaseES -> Kafka:** full data migration, data sync.
- **Vastbase G100 -> MySQL/Dameng:** schema migration, full data migration, data sync, data verification, data correction, DDL (add column/drop column/modify/rename).
- **Dameng -> Vastbase G100/Oracle:** schema migration, full data migration, data sync, data verification, data correction, DDL (add column/drop column/modify/rename).
- **Oracle -> Dameng:** schema migration, full data migration, data sync, data verification, data correction, DDL (add column/drop column/modify/rename).
- **StarRocks -> Dameng:** schema migration, full data migration.
- **MongoDB -> OceanBase:** schema migration, full data migration, data sync.

## New Features

- Support Iceberg HDFS storage format. Besides, BladePipe supports S3 and MinIO formats.
- SQL Server source tasks will trigger an alert when the task offset is behind the CDC LSN offset.
- Support PostgreSQL JSONB -> ClickHouse STRING sync.
- Support executing DROP TABLE on multiple tables in MySQL source.
- Support ClickHouse JDBC data compression parameter configuration.
- Hana source supports manual creation of CDC tables and triggers. Only SELECT permission is required for the account.
- Support Dameng incremental source archiving switch and pre-check of archive mode.
- Support Dameng database's NVARCHAR data type.
- Support rebuilding target tables and clearing target data before full migration in Dameng targets.
- Support Kafka -> StarRocks data cleansing (currently only for Debezium Envelope format).
- Support migration of KingbaseES source views.
- Docker deployment supports custom username, email, password, subnet, gateway, and component addresses, resolving network conflicts and meeting personalized account requirements.
- Support direct download of DataJob log files for easier troubleshooting.
- Support scheduled refresh of DataJob and Worker logs.
- Support querying user preference parameters.
- Support viewing non-zero CLOUD billing items.
- Support writing different topics to tables in different schemas in pipelines from message-based sources (e.g., Kafka, RocketMQ, Pulsar) to relational databases or data warehouses.
- Support resetting offsets via Open API.

## Improvements

- Optimized full-data query logic for MySQL/SQL Server/Oracle/ClickHouse/PostgreSQL/KingbaseES sources; support batch queries on composite primary keys. 
  - SQLServer source adds `sendStringParametersAsUnicode`, `queryRecompileEnabled` parameters.
  - ClickHouse source adds `queryMaxMemoryUsageMb` parameter.
- Optimized minpk/maxpk retrieval before full sync on composite primary key tables to prevent timeout.
- Compare previous and current Key field values when parsing MQ source messages to more accurately determine data updates.
- Optimized wide table DataJobs to support updates/deletes and supplement dimension table data.
- Optimized DDL pre-checks for Doris/StarRocks/SelectDB targets.
- Optimized ClickHouse source Date/Date32 primary key migration.
- Optimized ClickHouse target handling of time and date values, adding `enableTimeRangeClamping` parameter to ensure values are within JDBC valid ranges.
- Oracle/PostgreSQL/MySQL/SQL Server view migration no longer queries data volume during initialization.
- Enrich search conditions for audit log query.
- Optimized blacklist selection interaction.
- Optimized DataJob operation buttons to remain consistent between DataJob list and DataJob details.
- Optimized language switching (Chinese/English) experience.
- Optimized light/dark mode switching speed.
- Optimized last step of DataJob creation to show data cleansing configuration.
- Optimized DataJob and Worker log display: auto-wrap long content to avoid horizontal scroll.
- Optimized exception log display: clickable view in DataJob or Worker sections.

## Bug Fixes

- Fixed full data migration errors after adding custom code in wide table DataJobs.
- Fixed sync row count discrepancies for tables missing data filter conditions after enabling predicate pushdown.
- Fixed Kerberos file mismatch after updating authentication files (krb5.conf and krb5.keytab).
- Fixed issue where PostgreSQL source full migration incorrectly identified NULL values as 0 for DOUBLE PRECISION/REAL types.
- Fixed issue where BladePipe applied unsaved table mapping rules to new tables after cancelling modification.
- Fixed DataJob reuse issues for subscription modification or creating similar DataJobs.
- Fixed Hana incremental single-table mode DataJob offset display issues.
- Fixed incorrect website link in popup when license activation failed.
- Fixed inability to configure Alibaba Cloud access permissions.
- Fixed issue where predicate pushdown parameters were not cleared when creating similar DataJobs from full migration DataJobs and switching to incremental mode.
- Fixed popup flickering issue when clearing DataJob metadata history or schema snapshots.
- Fixed TiDB source resource leak.
- Fixed TiDB source timezone serialization issues.
- Fixed TiDB KeepAlive overlong setting issue.
- Fixed SQL Server VARCHAR primary key query index invalidation.
- Fixed PostgreSQL -> MySQL rename column DDL sync errors.
- Fixed Dameng primary key conflict handling (DuplicateKeyCode = 6625).
- Fixed issue where Dameng source incremental sync collected data from unsubscribed tables when different Schemas had tables with the same name.
- Fixed issue where Dameng -> Dameng schema migration did not correctly migrate VARCHAR/CHAR type character lengths.
- Fixed consumption exception in Oracle source incremental sync caused by receiving two commit events for the same transaction.
- Fixed issue where PostgreSQL -> PostgreSQL schema migration incorrectly set BPCHAR/CHARACTER type length to 10485760.
- Fixed issue where table structure failed to load after selecting existing table for message-type target tables.
- Fixed Oracle incremental log file not updating with SCN offset.
- Fixed an issue where test connection state not cleared when Worker upgrade popup is closed.
- Fixed an issue where source and target tables were not displayed when creating similar DataJobs for Kafka/MQ pipelines to schema-based targets(e.g., PostgreSQL, Oracle).
- Fixed Doris/SelectDB metadata index duplicate insert issue.
- Removed unnecessary `performance_schema.user_variables_by_thread` permission requirement introduced by metadata database diversification support.
- Fixed pagination issue in view table structure history page.
- Fixed inability to batch modify filter conditions when modifying subscriptions for predicate pushdown DataJobs.
- Fixed OceanBase for MySQL expression constraint parse error during schema migration.
- Fixed inability to parse expression-constrained table structures during OceanBase for MySQL incremental sync.