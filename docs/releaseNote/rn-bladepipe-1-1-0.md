---
id: rn-bladepipe-1-1-0
title: BladePipe 1.1.0
description: BladePipe 1.1.0 supports regular-expression-based table selection, and data migration and synchronization from AWS RDS Oracle.
---
Release Date: December 10, 2025

Version: 1.1.0

## Highlights
- Support for [selection of tables by regular expression across MySQL - MySQL/StarRocks/Doris/SelectDB/PostgreSQL pipelines](../operation/job_manage/create_job/create_regex_table_job.md), enabling the migration and sync for scalable tables.
- Introduce dark mode for the BladePipe console to provide a more comfortable user experience.

## New Connections
- **TDSQL MySQL > TDSQL MySQL**: schema migration, full data migration, incremental data sync, data verification and correction and schema evolution (add column, drop column, modify, rename, truncate).

## New Features
- Support full load and incremental sync from AWS RDS Oracle.
- Introduce sampling rate configuration (parameter: *checkSamplePercent*) for data validation on Oracle/PostgreSQL/SQL Server sources. Support custom filtering conditions. Do not support resumption from where it stops. 
- Support multi-schema migration for MySQL - PostgreSQL.
- Enhance TiDB change subscription stability. Multiple DataJobs can now subscribe to the same table on TiDB sources, significantly reducing the likelihood of exceptions when handling large numbers of region tables.
- Support CHANGE COLUMN DDL sync for MySQL/OceanBase for MySQL - OceanBase for MySQL.
- Enable sync of MySQL - MySQL geospatial data types.
- Enable DataJob-level latency alert WebHooks, allowing users with large numbers of DataJobs to set individual alert notifications for critical pipelines.
- Support uploading DataJob logs and worker logs to S3 or OSS (configurable in Settings > Preference), improving troubleshooting efficiency.
- Allow to export DataJob parameters as Excel files, useful for debugging.
- Allow to export performance charts for full data tasks, incremental tasks, and worker monitoring.
- Enhance batch operation blacklist application scope when changing subscription. It is now applicable to both already-subscribed tables and newly added tables.
- Add preview support when saving DataJob parameters as templates and when applying templates to DataJobs.
- Add open APIs to query DataJobs by source/target table metadata (/schema/listTransObjsByMeta).

## Improvements
- Improve DataJob deletion behavior to prevent any additional operations while a DataJob is in the Deleting state.
- Enhance DataJob parameter template management, including creation, viewing, and deletion flows for a smoother configuration experience.
- Refine the whitelist rules for parameter template configuration items.
- Improve the UX for selecting target tables during the table-filtering step when creating a new DataJob.


## Bug Fixes
- Fixed an issue where unsigned Decimal types were parsed incorrectly in incremental DataJobs with a TiDB source.
- Fixed missing display of parameters to be created in DataJob configuration.
- Corrected inaccurate prompts shown when the system was in an inactive state.
- Resolved incorrect API calls when modifying mapping rules or renaming tables in “search & manual selection” mode in the table selection step.
- Fixed incorrect UI rendering on the final step of creating DataJobs for message sources.
- Fixed an issue where the operation blacklist button was not hidden when creating DataJobs for message sources.
- Fixed an issue where the action filter button was not hidden in the database list when creating DataJobs for message targets.
- Resolved an issue where BladePipe failed to load the Topic list when testing connection to Kafka.
- Fixed incorrect aggregation primary key generation when virtual columns were defined as the target primary keys.
- Corrected invalid IM signature verification under Preference.
- Fixed an issue of error messages not showing when updating email, phone, or password in personal profile settings.
- Fixed a FSM issue where DataJobs could still start even if async operations (create/re-run/delete) failed.
- Resolved missing explanations for why certain tables could not be selected during DataJob creation.
- Fixed missing Next/Previous buttons when condition pushdown was enabled.
- Fixed the MySQL “Get Latest Offset” confirm button becoming unclickable after retrieving the latest binlog position.
- Resolved incremental sync writing empty data when a virtual column conflicted with an existing column on the target side.
- Fixed Dameng DDL parsing errors (e.g., ADD LOGIC LOG) that caused structure snapshot failures.
- Fixed Dameng source-side data filtering rules not taking effect.
- Resolved missing instance ID when manually adding Alibaba Cloud DataSources, which caused failures in auto-create DB, whitelist updates, and other OpenAPI-dependent operations.
- Corrected incorrect operation blacklist display when viewing table mappings in old DataJobs.
- Fixed a browser crash issue caused by excessively long single-line logs.
- Fixed an issue where the user could not confirm subscription updates when adding new schemas to MQ/Elasticsearch targets.
