---
id: rn-bladepipe-1-5-0
title: BladePipe 1.5.0
description: BladePipe supports reverse ETL, new connector - Google Spanner, and more pipelines such as DynamoDB to Kafka.
---
Release Date: March 31, 2026

Version: 1.5.0

## Highlights
- Support **StarRocks / Doris / Redshift > MySQL** [scheduled scan](../operation/job_manage/create_job/create_retl_job.md). Users can specify an incremental field to achieve incremental sync. Before each scan, users can choose to truncate the target or rename and create tables.
- Support **Elasticsearch > Elasticsearch** scheduled scan. Users can specify an incremental field to achieve incremental sync.
- Support scheduled **file-to-PostgreSQL migration** (OSS / S3 / POSIX) with vector embedding. Users can clean up the file embeddings in the target before each scan to achieve incremental sync.

## New Pipelines
- **[Google Spanner > StarRocks / Doris / ClickHouse](../dataMigrationAndSync/connection/spanner.mdx)**: schema migration, full load, incremental sync, verification and correction.
- **Vastbase > Doris / StarRocks / Oracle**: schema migration, full load, incremental sync, verification,  correction, and DDL changes (add/drop/modify/rename columns).
- **DynamoDB > Kafka**: schema migration, full load, and incremental sync.

## New Features
- Support strongly typed CDC from **Oracle to Oracle / MySQL / PostgreSQL / SQL Server**. This allows strong compatibility to complex types.
- Support INTERVAL YEAR TO MONTH and INTERVAL DAY TO SECOND types in **Oracle > Oracle** pipeline.
- Support Oracle **BLOB** type CDC (parameter *useTypedField* and *oraLmLobEnable* set to be true).
- Support strongly typed full load, CDC, verification and correction from **SQL Server to Oracle / MySQL / PostgreSQL / SQL Server**. This allows strong compatibility to complex types.
- - Support printing raw data receiving logs for **TiDB / Oracle sources** (parameter: *enableReceiveLog*).
- - Support Kafka multi-offset mode to reduce latency fluctuation caused by different consumption speed across partitions.
- Support creating auto-increment sequence in a CDC table for Hana.
- Support partition table migration and sync for KingbaseES.
- Support for **ElasticSearch 9.x**.
- Support **OceanBase 4.5.0.0**.
- Support **MCP protocol**. You can get the MCP link in profile security settings.
- Support OpenAPI access in profile security settings for tools like Postman or Curl.
- Support filtering and page size control in table lists for schema and full load.
- Support target name mapping rules to remove prefixes and suffixes when creating DataJobs.
- Support Online DDL in incremental sync under regular expression mode.
- Support voice alert verification. Users can check voice alert history in the system.
- Support batch permission grant for sub-accounts.
- Support custom column width in DataJob list.
- Support removing columns that are not existed in the source during subscription modification.


## Improvements
- Improve MySQL incremental metadata parsing using **Antlr** (parameter: *ddlParserMode*). The parsing capability is optimized.
- Improve ClickHouse write performance by **30%** with binary mode support (parameter: *ckWriteMode*).
- Improve Kafka latency detection with backlog offset metrics.
- Improved `apply_commit.log` content for Kafka targets in raw format, with added offset logging for messages without primary keys to help quickly troubleshoot potential data loss issues.
- Improve MySQL / OceanBase for MySQL full load by skipping min/max PK query when snapshotRead or pushdown conditions is enabled.
- Improve TiDB source failure detection to avoid infinite reconnect loops.
- Improve KingbaseES MySQL compatibility for DATETIME, TIMESTAMP, TINYINT, BLOB, SET, ENUM types.
- Improve KingbaseES Oracle compatibility for INTERVAL_YEAR_TO_MONTH, INTERVAL_DAY_TO_SECOND, ROWID and UROWID types.
- Improve KingbaseES SQL Server compatibility for TIME DATETIME2 and SMALLDATETIME types.
- Improve KingbaseES metadata compatibility for older versions.
- Improve type mapping from MySQL unsigned tinyint/smallint/mediaint to Dameng.
- Improve full load Select query to skip blacklisted columns for MySQL / PostgreSQL / Vastbase / Kingbase sources.
- Improve table schema fetch at DataJob start for Doris / StarRocks / OceanBase for MySQL / OceanBase for Oracle.
- Improve OceanBase for Oracle index fetch speed.
- Improve Oracle table query by sorting names in ascending order.
- Improve TiDB virtual column display. 
- Improve Docker/K8s install scripts to match host timezone.
- Improve BYOC client container timezone to match the Console's timezone.
- Improve log cleanup. You can set the retention, and background jobs will remove expired logs.
- Improve DataSource filtering by deployment type.
- Improve DataJob list pagination with larger page size.

## Bug Fixes

- Fixed an encoding issue for Oracle NVARCHAR2 on the target, where non-ASCII characters (such as Chinese) were displayed incorrectly.
- Fixed event loss in Oracle CDC when processing large volumes of CSF segmented events.
- Fixed an issue in Oracle CDC (archive mode) where the checkpoint SCN hitting a redo log boundary could cause the DataJob to pause indefinitely.
- Fixed an issue where Oracle CDC could pause indefinitely when the checkpoint hit redo log boundaries in archive mode.
- Fixed a null pointer error caused by empty redo SQL in Oracle CDC logminer DML events.
- Fixed a precision loss issue for TIME type during full load and CDC from SQL Server.
- Fixed an issue where JSON type sync did not work correctly for StarRocks and Doris targets.
- Fixed invalid data type verification for StarRocks and Doris (e.g., bit/binary/time/decimal to varchar).
- Fixed an error when multiple primary keys were configured on the target during verification for StarRocks and Doris targets.
- Fixed an issue where removing tables from a subscription in Vastbase did not properly remove them from publication.
- Fixed an issue where the “DDL sync enabled” flag always showed as disabled for Vastbase and Kingbase sources.
- Fixed an infinite loop issue during full load for tables without primary keys in Vastbase.
- Fixed a position rollback issue in TiDB source caused by historical region heartbeat events.
- Fixed DataJob latency issues in TiDB source during region split and TiKV leader switch scenarios.
- Fixed an issue where null values in time fields caused parsing errors in TiDB CDC.
- Fixed an error when syncing tables with unsigned bigint primary keys in TiDB source.
- Fixed an issue in Kafka > StarRocks where data cleaning results were not cleared after unselecting a table.
- Fixed an issue where data cleaning conditions were not displayed in the final confirmation step for Kafka > StarRocks pipeline.
- Fixed an issue where DataJobs could not proceed when only removing data cleaning rules during subscription modification in Kafka > StarRocks.
- Fixed an error when writing unsigned bigint values into OceanBase.
- Fixed a “Request Entity Too Large” error in Elasticsearch caused by incorrect batch size calculation during incremental writes.
- Fixed an issue where OceanBase for MySQL CDC DataJobs failed due to missing tenant configuration, now defaulting to sys tenant.
- Fixed type conversion failures for date fields in strong type mode across some source and target systems.
- Fixed full load errors for unsigned tinyint, smallint, and mediumint types from MySQL.
- Fixed initialization failures for partition tables in PostgreSQL and KingbaseES CDC DataJobs.
- Fixed an issue where unique key (UK) metadata could not be retrieved from PostgreSQL, KingbaseES, and Vastbase.
- Fixed schema migration failures caused by hidden system columns included in primary keys, unique keys, or indexes in KingbaseES.
- Fixed an issue where async DataJobs could not be scheduled correctly when Console IP changed due to network switch (new console config: *console.config.cluster.uid*).
- Fixed a license activation issue where the system could not be activated if the timezone was not Asia/Shanghai and the license start time was earlier than current time.
- Fixed an issue where the whitelist dialog in the DataSource page could not be reopened after closing.
- Fixed an issue where full load initialization could not be toggled when creating a similar DataJob.
- Fixed an issue where DataJob specifications did not update correctly when switching DataJob types in similar verification and correction DataJobs.
- Fixed an issue where sub-accounts without permission could still access the state machine page via direct URL.
- Fixed layout misalignment after expanding or collapsing the table mapping section.
- Fixed unclear messaging when modifying subscriptions during the correction phase, and clarified the scope and conditions.
- Fixed an issue where community edition (TGZ deployment) could not add new Workers.


