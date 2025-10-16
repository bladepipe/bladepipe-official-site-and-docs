---
id: rn-bladepipe-0-7-0
title: BladePipe 0.7.0
---
Release Date: July 8, 2025

Version: 0.7.0

## Highlights
- Support **Google Drive (Docs/Sheet) -> PostgreSQL** schema migration, full migration, and vector embedding.
- Support **MySQL -> Apache Paimon** schema migration, full migration, incremental data sync, data verification and correction, and DDL sync (add/drop/modify/rename columns, truncate tables).
- Support **Kafka -> Apache Paimon** full migration and incremental data sync.
- Support **Doris/SelectDB -> MySQL** schema migration and full migration.

## New Connections
- Support **MongoDB -> ClickHouse** full migration and incremental data sync.
- Support **PolarDbMySQL -> Elasticsearch** schema migration, full migration, incremental data sync, data verification and correction, and DDL sync (add columns).

## New Features
- Support **visual wide table** construction for **PostgreSQL/SQL Server/Oracle/MariaDB to MySQL**.
- Support **visual wide table** construction for **PostgreSQL to StarRocks/Doris/SelectDB**.
- Support **visual columns** for **PostgreSQL/MariaDB to StarRocks/Doris/SelectDB**.
- Support **JSONB** data type sync from **PostgreSQL to StarRocks/Doris/SelectDB**.
- Support **index migration** for **MongoDB/DocumentDB to MongoDB/DocumentDB**.
- Add RagApi **ReRank** capability to reorder query results for higher relevance(parameters: enabledPromptFunctions/contentReRankPrompt).
- Add RagApi cross-domain configuration (parameter: httpCorsConfig).
- Add disableRag parameter for RagApi requests. Setting it to true means skipping the RAG workflow for that request.
- Allow users to customize properties during raw message format sync from RocketMQ to RocketMQ (parameter: messagePropertiesKey).
- Introduce KEY_UPGRADE_TABLE write strategy for MySQL(in bidirectional pipeline)/AdbForMySQL/Dameng/Hana/OceanBase/ObForOracle/Oracle/PolarDbMySQL/PolarDbX/PostgreSQL/SQL Server/TiDB targets, resolving data conflicts caused by unique key updates (automatically downgrade batch writes from primary key level to table level if unique field changes are detected).
- Support DDL keyword replacement for Dameng (parameter: sqlReplaceKeywords) to bypass parsing errors for unsupported DDLs.
- Add an option to enable/disable "auto-initialize table replication properties" in advanced settings during PostgreSQL source DataJob creation, giving users control over initialization timing.
- Support custom installation package names for automatic On-Prem deployment/upgrades, simplifying package management (versioned packages can be directly used without renaming).
- Support automatic token refresh for seamless login experience (parameter: clougence.rdp.login.expire.sec).
- Add an entry to the DataJob details page for querying specific write partitions for Kafka/RocketMQ targets.


## Improvements
- Optimize RagApi context injection, compression, and extended default Prompt format for improved model performance (parameter: enabledPromptFunctions).
- Optimize RagApi to automatically select vector tables for query based on user questions, improving relevance (parameters: enabledPromptFunctions/knowledgeSelectPrompt).
- Improve SQL Server source dynamic mode, modifying filterDDL parameter for checking.
- Improve MySQL source DateTime type Zero date data (0000-00-00 hh:mm:ss) to be fully converted to a valid time (0000-01-01 00:00:00).
- Optimize Redis source sync protocol to be compatible with RDB Version 12 (support Redis source versions 7.4 and above).

## Bug Fixes

- Fix issues in wide tables such as missing data from lookup tables, duplicate column names, and data loss due to identical associated field values in the same batch.
- Fix incompatibility with the DashScope Qwen-max model.
- Fix an issue where subscriptions could not be modified if only large model settings were changed (without modifying tables and columns).
- Fix an issue where a DataJob restart after DDL execution in SQL Server dynamic mode caused subscriptions to old CDC tables, leading to missing columns.
- Fix an issue where Kafka -> Kafka source and target partitions had to be identical.
- Fix an issue where Kafka source partitions could not be correctly obtained.
- Fix excessive connection creation during Dameng incremental data sync.
- Fix a null pointer error for unsupported DDLs in Dameng incremental data sync.
- Fix performance degradation of the metadata database caused by Dameng source DataJob restarts.
- Fix an issue where MySQL/TiDB/PolarDB MySQL targets inaccurately parsed source `Create Table ... Like ...` DDLs, causing DDLs to be skipped.
- Fix a string out-of-bounds error during data verification for Doris/SelectDB targets.
- Fix an error during page testing for data cleaning expressions returning numeric results (e.g., return cast(@params['col'] as integer) / 1000).
- Fix an intermittent issue where MySQL to Kafka DataJob creation/subscription modification could incorrectly obtain Topic partitions.
- Fix an error when adding Workers if BladePipe Enterprise was not activated.
- Fix an error during MySQL -> Tunnel schema migration.
- Fix an issue where system partition columns were filtered during table structure generation in incremental sync for Oracle source partitioned tables, preventing parsing errors.
- Fix data misalignment when MongoDB/DocumentDB source had an 'id' column and _id was mapped to 'id'.
- Fix an error when syncing uppercase fields from TiDB to StarRocks (parameter: cdcUseOriginalCase).