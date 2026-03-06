---
id: rn-bladepipe-0-0-1
title: BladePipe 0.0.1
description: BladePipe 0.0.1 supports various new connections, like PostgreSQL to PostgreSQL data sync, MySQL to ClickHouse data pipelines, etc.
---

Release Date: October 15, 2024 

Version: 0.0.1

## New Connections

- Support PostgreSQL -> PostgreSQL schema migration, data synchronization, data synchronization, data verification and correction.
- Support MySQL -> Clickhouse schema migration, data synchronization, data synchronization, data verification.
- Support MySQL -> ElasticSearch schema migration, data synchronization, data synchronization, data verification and correction, DDL synchronization.
- Support Elasticsearch -> Elasticsearch schema migration, data migration, data synchronization (alpha) with the [plug-in](https://github.com/ClouGence/cloudcanal-es-trigger) installed.
- Support MySQL -> Kafka schema migration, data synchronization, data synchronization.
- Support Kafka -> Kafka schema migration, data synchronization.
- Support Hana -> MySQL schema migration, data synchronization, data synchronization, data verification and correction.
- Support the connections from and to AWS DocumentDB the same with those of MongoDB, and data can be synced between AWS DocumentDB and MongoDB.

## New Features

- Support `_sign`, `_version` fields for ClickHouse ReplaceMergeTree. All operations are converted to INSERT with clear version information to enhance synchronization performance.
- Support the setting of heartbeat at a PostgreSQL source instance (new parameters: dbHeartbeatEnable, dbHeartbeatOp, dbHeartbeatIntervalSec).
- Support latency alert notification and recovery notification (via IM and email).
- Support batch adding table prefixes and suffixes to target tables.
- Support the setting of float type precision (parameter checkFloatNumScale) and time precision (parameter checkTimePrecision) in data verification.
- Support for printing data to logs by row in data migration and synchronization to facilitate troubleshooting and avoid log freezes on the page (parameter printDataInLog).
- Support for custom code in data migration, synchronization, verification and correction.
- Support data difference verification for twice, greatly reducing verification errors caused by data latency.
