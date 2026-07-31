---
id: rn-bladepipe-1-9-0
title: BladePipe 1.9.0
description: BladePipe 1.9.0 adds new PostgreSQL, Oracle, Iceberg, Redshift, and StarRocks pipelines, and improving Oracle write performance significantly.
---
Release Date: July 31, 2026

Version: 1.9.0

## Highlights
+ Support staging-table merge writes to **Oracle** targets during incremental synchronization, **significantly improving target-side write performance**. New parameters: `useStagingMerge` and `stagingSchema`.
+ Support staging-table merge writes to **OceanBase for Oracle** targets during full migration and incremental synchronization, **significantly improving target-side write performance**. New parameters: `useStagingMerge` and `stagingSchema`.

## New Pipelines
+ **PostgreSQL -> Oracle**: schema migration, full migration, incremental synchronization, data verification, data correction, and DDL synchronization (`ADD COLUMN`, `DROP COLUMN`, `MODIFY`, `RENAME`, and `TRUNCATE`).
+ **Iceberg -> Redshift / MySQL**: schema migration, full migration, and incremental synchronization through scheduled scans and upserts.
+ **MySQL / PostgreSQL / Aurora PostgreSQL / SQL Server -> Redshift**: schema migration, full migration, and incremental synchronization.
+ **PostgreSQL / Aurora PostgreSQL / SQL Server -> Iceberg**: schema migration, full migration, and incremental synchronization.

## New Features

+ Support Oracle 21c, 23c, 23ai, and 26ai.
+ Support periodic incremental synchronization from SshFile / OssFile / S3File / GoogleDrive / Yuque. Files are migrated automatically when changes are detected, and documents that no longer exist at the source are skipped by default.
+ Added support for automatically setting source-table primary keys as Identifier Fields on Iceberg targets during schema migration.
+ Support scheduled-scan incremental synchronization from Dameng to StarRocks.
+ Added case-insensitive automatic mapping of target tables on the table-mapping page.
+ Added support for configuring the initial consumption strategy for Kafka sources. Available options: `earliest` and `latest`. New parameter: `kafkaAutoOffsetReset`.
+ Added support for configuring database heartbeat mode for PolarDB MySQL and PolarDB-X sources. New parameter: `dbHeartbeatMode`.
+ Added support for filtering alert logs by notification method.
+ Added support for parsing `TRUNCATE` events from PostgreSQL / KingbaseES / Vastbase sources.
+ Added support for synchronizing tables without a primary key from StarRocks / Doris / SelectDB, but you have to specify the target primary key mannually.

## Improvements
+ Improved the replication-stream heartbeat mechanism for PostgreSQL / KingbaseES / Vastbase sources to prevent disconnections due to WAL Sender timeout when DataJob processing is blocked. New parameter: `replicationHeartbeatSec`.
+ Fixed write-performance degradation caused by ineffective batched `INSERT` execution on OceanBase for Oracle targets.
+ Improved Oracle target write performance by resolving unstable JDBC binding types that caused batched `INSERT` / `MERGE` execution to become ineffective.
+ Improved the performance of locating Binlog positions by timestamp for MySQL, OceanBase for MySQL, PolarDB MySQL, PolarDB-X, TDSQL-C MySQL, and TDSQL MySQL sources. New parameter: `fastTimestampSeekEnabled`, disabled by default.
+ Improved metadata retrieval performance for TiDB, ADB MySQL, GreptimeDB, PolarDB, TDSQL MySQL, TDengine, StarRocks, DeltaLake, Iceberg, and Paimon.
+ Improved subscription updates so that child DataJobs inherit the `keyConflictStrategy` parameter from the parent DataJob.
+ Improved full-scan support for MySQL 5.7 views.
+ Improved phone alert logs by adding DataJob information.
+ Improved the Add DataSource workflow so that sensitive fields are displayed in encrypted form.
+ Added a prompt in the Create DataJob and Modify Subscription workflows when not all columns are selected.
+ Improved the Create Similar DataJob workflow by preventing users from proceeding until database information has finished loading.
+ Improved duplicate-click prevention for buttons across the system.
+ Improved the “Search and select manually” mode so that previously selected items remain selected after another filter is applied.
+ Improved the “Search and select manually” mode to support filtering both source and target tables at the same time.

## Bug Fixes
+ Fixed an issue where the DataJob position was not updated when synchronizing incrementally from Kafka to StarRocks in multi-position mode.
+ Fixed duplicate accumulation of synchronized row counts when updating positions across multiple DynamoDB shards.
+ Fixed table-name search filtering for Kafka, RabbitMQ, and other messaging pipelines in “List all and select manually” mode.
+ Fixed an issue in the Create DataJob workflow where switching from expression mode to another mode after returning to the previous step caused the data-cleaning step to be skipped.
+ Fixed an issue where switching to expression mode and then switching back during DataJob creation could result in a configuration error after the DataJob was created successfully.
+ Fixed an issue where modifying the GTID did not take effect when resetting the position of a MySQL source.
+ Fixed failures when parsing `Date` fields in `epoch_millis` or `epoch_second` format from Elasticsearch sources.
+ Fixed an issue where PostgreSQL enum types were not recognized, preventing data synchronization.
+ Fixed parsing errors when synchronizing BC date values from PostgreSQL sources.
+ Fixed full synchronization failures when PostgreSQL `DECIMAL` fields contained `Infinity`, `-Infinity`, or `NaN`.
+ Fixed an issue where an IP address could not be obtained when all host network interfaces were in bridge mode. Standard network interfaces are now preferred, with bridge-interface IPv4 addresses used only when no valid standard-interface IP is available.
+ Fixed an issue where executing DDL to modify a primary-key type or comment on MySQL / OceanBase for MySQL sources could overwrite and remove primary-key information from real-time metadata, causing subsequent data inconsistencies.
+ Fixed incomplete file listing when an S3File bucket contained more than 1,000 files.
+ Fixed an issue where an incorrect verification code did not produce the proper prompt when resetting MFA.
+ Fixed abnormal decimal values when Oracle full migration used `getString` to read `NUMBER` values with nonstandard encoding.
+ Fixed inconsistent primary-key query order when performing data validation, rechecks, or data correction on tables with composite primary keys.
+ Fixed validation SQL failures when a primary-key column name was a database keyword.
+ Fixed an issue where heartbeat messages were filtered out in `PARSED_ENTRY` mode for MySQL, OceanBase for MySQL, PolarDB MySQL, and PolarDB-X sources, causing heartbeats to become ineffective.
+ Fixed an issue where `CHECK_POS` heartbeats for MySQL, OceanBase for MySQL, PolarDB MySQL, and PolarDB-X compared only the Binlog offset, causing identical offsets in different Binlog files to be incorrectly treated as zero lag.
+ Fixed failures when constructing position heartbeats for MySQL, OceanBase for MySQL, PolarDB MySQL, and PolarDB-X sources in `PROTOBUF` non-GTID mode when the GTID was empty.
+ Fixed a potential error in locating the transaction start position when MySQL, OceanBase for MySQL, PolarDB MySQL, PolarDB-X, TDSQL-C MySQL, and TDSQL MySQL sources resumed incremental synchronization from a saved position.
+ Fixed an issue where active Binlog download requests and download threads did not exit promptly when stopping a DataJob with a MySQL RDS source.
+ Fixed MCP tool invocation failures when BladePipe was deployed behind a load-balancing proxy.
+ Fixed missing spaces after separators in TiDB `JSON` data during incremental synchronization.
+ Fixed occasional `ConcurrentModificationException` errors caused by a thread-unsafe `TableUnit` cache during concurrent Kafka parsing on JDK 17.
+ Fixed Arrow `MemoryUtil` initialization failures during StarRocks full reads on JDK 17.
+ Fixed DataJob startup failures for PolarDB-X and OceanBase for MySQL caused by configuration compatibility issues.
+ Fixed schema migration syntax errors caused by retaining `DEFAULT` values when mapping `TEXT` / `BLOB` columns to MySQL-compatible targets.
+ Fixed an issue where unsupported statements in Oracle-source DDL interrupted incremental synchronization. Such statements can now be identified and skipped correctly.
+ Fixed an issue where the Elasticsearch index metadata whitelist did not take effect during DataJob creation.
+ Fixed Sidecar startup failures during automatic upgrades or installation when the `clougence` user did not exist on the target machine.
+ Fixed inaccurate process PID detection during automatic Sidecar upgrades, which could prevent Sidecars or DataJobs from stopping correctly.
+ Fixed Sidecar startup failures when automatic upgrades or deployments were executed with the `root` account and the `clougence` user’s environment variables were not inherited.
