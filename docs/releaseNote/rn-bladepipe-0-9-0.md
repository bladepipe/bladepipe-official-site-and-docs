---
id: rn-bladepipe-0-9-0
title: BladePipe 0.9.0
description: BladePipe 0.9.0 supports AWS DynamoDB, AWS ElastiCache (Valkey/Redis) and GaussDB as new source connectors.
---
Release Date: October 15, 2025

Version: 0.9.0

:::info
For BYOC deployment, please [upgrade to the latest version](../productOP/byoc/installation/upgrade_worker_docker.md); otherwise, DataJob creation and subscription modifications may encounter compatibility issues.
:::

## Highlights
- Support the [**SaaS Managed mode**](../quick/quick_start_mgr.md), requiring no deployment. Users simply log in to BladePipe, then the service is ready for use. Current available regions include Singapore and California.
- Support DataSources such as MySQL, PostgreSQL, StarRocks, Doris, and ClickHouse to connect via [**SSH tunnels**](../operation/datasource_manage/set_ssh_tunnel.md), enabling secure and convenient data integration across the internet.
- Support for **PolarDB PostgreSQL > MySQL/PostgreSQL/Doris/SelectDB/StarRocks**, covering schema migration, full data migration, incremental data sync, data verification and correction, and DDL sync (add/drop/modify/rename/truncate columns).

## New Connections
- **MySQL > DeltaLake**: schema migration, full data migration, incremental data sync, data verification and correction, and DDL sync (add/drop/modify/rename columns).
- **MySQL > PolarDB PostgreSQL**: schema migration, full data migration, incremental data sync, data verification and correction, and DDL sync (add/drop/modify/rename/truncate columns).
- **ClickHouse > ClickHouse**: schema migration, full data migration, and data verification/correction (new parameter: *enableSelectFinal*).
- **ClickHouse > StarRocks/Doris/SelectDB**: strongly typed schema migration, full data migration, and data verification/correction.

## New Features
- Allow manually adding DataSources, including Alibaba Cloud RDS for MySQL/PostgreSQL/SQL Server, PolarDB MySQL/PolarDB-X, and AnalyticDB for MySQL/PostgreSQL.
- Capture TRUNCATE DDL operations from PostgreSQL sources.
- Enable column-based full data scanning for Dameng/GaussDB/TiDB/Hana/PostgreSQL sources.
- Support PostgreSQL > RocketMQ/RabbitMQ for both full data load and incremental data sync.
- Support SQL Server > Doris/SelectDB virtual columns and DDL sync (add/drop columns).
- Support Oracle > Doris/SelectDB virtual columns.
- Support synchronization of byte arrays (e.g., MySQL/PostgreSQL bit[n]) from sources to Oracle targets as Number type data.
- Support scheduled full data migration for MySQL > PostgreSQL/Aurora PostgreSQL.
- Support custom Array and String data types for PostgreSQL.
- Support synchronization of PostgreSQL array types (smallint, int, bigint, oid, numeric, etc.) to MySQL/OceanBase for MySQL.
- Add action blacklist filtering, covering five categories (data, column, index, DDL, table changes) and sixteen subtypes for fine-grained control.
- Introduce DataJob parameter template management, including create, query, and delete operations.
- Allow saving current DataJob parameters as reusable templates (e.g., for performance tuning).
- Allow selecting parameter templates during DataJob creation or modification.
- Automatically refresh TiDB GC time to prevent data loss from GC timeout.
- Add DynamoDB metadata retrival.
- Automatically retry Dameng incremental DataJobs when timeout parsing fails (new parameter: *lmTimeoutRetry*).
- Enable Console auto-upgrade and auto-start.
- Support deleting non-existent databases or tables from subscriptions.
- Added new OpenAPIs: startWorker, stopWorker, modifyMemOverSoldPercent, updateWorkerAlertConfig, deleteWorker, detachIncreJob.

## Improvements
- Enhanced SQL Server source with snapshot read support; Predicate Pushdown no longer reads min/max primary key values.
- Improved exception logs for StarRocks/Doris/SelectDB writes, adding schema and table info.
- Simplified Iceberg configuration by allowing direct AK/SK input.
- Optimized Online DDL conversion, mapping temporary-table operations to standard DDL to reduce redundant operations (new parameter: *onlineDdlConvert*, *onlineDdlBackupDb*).
- Optimize OnlineDDL Ghost temporary table subscription rules by supporting configurable regex patterns for temporary tables, resolving the issue of being unable to subscribe to temporary tables in the` ~yourtablename_{timestamp}_gho / ~yourtablename_gho` format (new parameter: *onlineDdlTempTableRegex*).
- Updated default authentication for RDS for MySQL to account/password.
- Improved Dameng DSC incremental DataJob handling, disabling table-level offsets during initialization to avoid errors.
- Locked Dameng parameter *isDscNode* after DataJob creation to prevent accidental modification.
- Enhanced Dameng offset submission to prevent data latency when subscribed tables have no changes.
- Improved TiDB partitioned table sync, ensuring compatibility with parallel consumption in DataJob groups.
- Added detailed TiDB logging when *printDetailLog* is enabled for easier troubleshooting.
- Improved PostgreSQL BYTEA > MySQL/OceanBase LONGBLOB type mapping.
- Optimized OceanBase MySQL & Oracle tenant DDL execution timeout, setting the default timeout to 8 hours.
- Correlated OceanBase Oracle tenant full scan SQL timeout with the parameter *soTimeoutSec*.
- Released bladepipe-openapi-sdk v1.0.2, eliminating manual URI input and supporting more API endpoints.
- Optimized the product UI performance to prevent excessive browser memory usage and potential crashes when displaying a large number of databases, tables, and columns.
- Improved viewing experience for task and worker logs.
- Enhanced editing for JSON-type parameters.
- Refined navigation for the “Sync Settings” page. Now it requires a secondary menu click to reduce accidental operations.

## Bug Fixes
- Fixed an issue where Prometheus charts did not update automatically during auto-refresh.
- Fixed an issue where the “Last Updated” field in the worker list details always displayed 1970-01-01 08:00:00.
- Fixed an issue where the advanced configuration section on the ElastiCache > ElastiCache DataJob creation page incorrectly displayed RDB-related options.
- Fixed an issue in Oracle source correction DataJobs where in(?,?,?) exceeded the allowed length limit.
- Fixed an issue where subscription modifications for Doris/SelectDB targets did not copy the main DataJob parameter *deleteOpCol*, causing incremental sync failures in sub-DataJobs.
- Fixed an issue where changing primary keys in Doris sources caused duplicate data in targets.
- Fixed an issue where modifying subscriptions or creating similar DataJobs did not inherit the column mapping rule COLUMN_COLUMN from the main DataJob.
- Fixed a schema migration error in PostgreSQL sources when tables contained expression indexes.
- Fixed an issue in Dameng incremental DataJobs where DDL SQL statements were truncated.
- Fixed an issue in Dameng incremental DataJobs where redo SQLs were executed out of order.
- Fixed an initialization issue in Dameng incremental DataJobs where the system could not locate the DUAL table.
- Fixed an issue preventing Dameng DSC incremental DataJobs from consuming events properly.
- Fixed an issue where modifying subscriptions for Dameng DSC incremental DataJobs did not copy the main DataJobs parameter *isDscNode*, resulting in incremental sync errors for sub-DataJobs.
- Fixed a parsing error in PostgreSQL DDL when handling ADD COLUMN statements that included the COLUMN keyword.
- Fixed a parsing error in PostgreSQL DDL when altering column types using the USING keyword.
- Fixed an issue with duplicate DDL detection errors on StarRocks/Doris targets.
- Fixed an issue in TiDB targets where the conflict strategy IGNORE did not take effect in ROW mode.
- Fixed an issue in TiDB > Kafka (Canal format) DataJobs where the es field was empty.
- Fixed an issue where ALTER TABLE partition_table ADD PARTITION PARTITIONS 20 in TiDB sources did not trigger subscription updates for new partitions.
- Fixed a restart failure issue when merging sub-DataJobs for SQL Server sources.
- Fixed schema migration errors when using Alibaba Cloud RocketMQ as the target.
- Fixed a connection test error when using RabbitMQ as the target.
- Fixed residual cache issues when creating similar DataJobs.
- Fixed infinite recursion caused by a failure to read the keyword configuration file.
- Fixed an issue where the DataSource list was not displayed after refreshing the DataJob list page following a search by source or target DataSource ID.
- Fixed console monitoring errors in Console.
- Fixed an issue where shared Prometheus charts could not be displayed in Console.
- Fixed an issue where the subscriptions for completed Full Data DataJobs (dataTaskState: COMPLETE) could not be modified.
- Fixed an issue where sub-accounts were stuck on the login page after signing in.
- Fixed an issue where sub-accounts with audit-only permissions could not navigate after login.
- Fixed an issue where adding a virtual column to a new table and then batch-adding columns with the same name caused DataJob errors due to duplicate configuration.
- Fixed an issue where setting a virtual column with the same name as an existing column, then batch-setting target primary keys or cleansing rules, caused incorrect table count results.
- Fixed an issue where modifying subscriptions to add databases succeeded even when the selected source database did not exist in the target and no target database was selected.
- Fixed an issue where concurrent offset edits during reruns caused inconsistent DataJob states.
- Fixed a pagination issue when viewing worker logs after log structure adjustments.
- Fixed an issue in Kafka targets where, after modifying mapping rules, partitions were not aligned with existing topic partitions.
- Fixed an issue in Kafka targets where pressing Enter after manually entering a table name did not align partitions with existing topics.
- Fixed an issue where different Dameng DSC instances operating on the same table caused out-of-order incremental data.
- Fixed an issue in Dameng DSC initialization where offset gaps between instances were excessively large.
- Fixed an issue where Paimon write retries caused files loss.
