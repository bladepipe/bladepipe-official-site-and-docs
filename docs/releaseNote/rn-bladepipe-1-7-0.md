---
id: rn-bladepipe-1-7-0
title: BladePipe 1.7.0
description: BladePipe 1.7.0 introduces stronger task alerting, Kafka and DynamoDB enhancements, broader database support, performance optimizations, and critical bug fixes for more reliable data migration and sync.
---
Release Date: May 29, 2026

Version: 1.7.0

## Highlights

- Significantly enhanced task alerting with support for bulk configuration, configurable alert frequency, and exception alert whitelist filtering.
- Substantially optimized the full data load partition parallel scanning logic for KingbaseES Source, delivering noticeable performance improvements.

## New Features

- Added support for consuming flattened message formats from Kafka Source. 
- Added support for OceanBase MySQL Binlog GTID positions for smoother master-slave switching.
- Added support for virtual columns in AuroraMySQL -> StarRocks.
- Added support for creating wide-table DataJobs for Dameng -> Dameng.
- Added support for Aliyun fully-managed SelectDB 5.x.
- Added heartbeat detection support for AWS DynamoDB Source.
- Added support for multi-schema migration and synchronization from AWS DynamoDB -> MySQL/StarRocks.
- Added support for enabling `receive.log` on AWS DynamoDB Source to simplify data loss troubleshooting.
- Added SSL connection support for TiDB to support TiDB Cloud public network access, where SSL is mandatory.
- Added support for viewing previous execution duration when rerunning Full Data / Verification / Correction tasks.
- Added support for specifying the `dataJobLevel` parameter when creating DataJobs through Open API.
- Added support for user preference parameter `kafkaPositionMode` to define the default position mode (single position or multi-position, Open API compatible).
- Added support for binding multiple IM webhook alert addresses to a single task.

## Improvements

- Optimized the full data migration Dynamic query mode for StarRocks/Doris/SelectDB sources: no longer retrieves maxpk/minpk position information.
- Optimized the IGNORE `keyConflictStrategy` for Oracle (11.2+) target writes by using the `ignore_row_on_dupkey_index` hint.
- Optimized UI behavior to hide DDL operations when Sync DDL is disabled.
- Improved table search performance when creating tasks or modifying subscriptions across very large number of table.
- Optimized search and manual selection mode to prioritize displaying unchecked tables in search results.
- Improved subscription modification workflow by restricting operations on mappings for existing tables and columns.
- Optimized Yuque cookie refresh to keep document content continuously vectorized.
- Changed the default value of `obIncreMode` for newly added OceanBase DataSource Instances from LogProxy to Binlog.
- Optimized timestamp-based position reset for OceanBase source: file position information is now cleared properly.
- Isolated Arrow / Netty dependencies in the StarRocks plugin to prevent Netty classloading conflicts with upper-layer projects.
- Fixed alert suppression behavior where different exceptions occurring within a short time window (controlled by the `taskAlertInhibitMin` system parameter) could prevent subsequent alerts from being sent.

## Bug Fixes

- Fixed pagination issues on the table schema history page.
- Fixed an issue where newly added tables in Kafka Source subscription updates were not automatically mapped for creation on Target.
- Fixed filtering issues in database-table mappings for Kafka -> MySQL tasks.
- Fixed an issue where subscribed tables were not displayed in table search results when modifying Kafka Source subscriptions.
- Fixed startup failures in new K8s deployments caused by missing Console configuration.
- Fixed incorrect Replace SQL generation for Oracle, PostgreSQL, Dameng, and related DataSources when Source and Target table primary keys differed, which could result in duplicate Target data.
- Fixed incorrect primary key metadata retrieval in Oracle Source Correction tasks.
- Fixed execution failures in Oracle Source Correction tasks for multi-primary-key tables caused by Oracle’s 1000-placeholder limit.
- Fixed `400 BAD_REQUEST` errors when editing alerts.
- Fixed an issue in container deployment mode where task logs were displayed in UTC instead of host machine time.
- Fixed write failures for OceanBase for Oracle Target tables without primary keys caused by MERGE syntax usage.
- Fixed an issue where alert reporting could be interrupted when a task exited unexpectedly, resulting in lost exception alerts.
