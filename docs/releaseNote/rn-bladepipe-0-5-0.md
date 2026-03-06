---
id: rn-bladepipe-0-5-0
title: BladePipe 0.5.0
description: BladePipe 0.5.0 supports on-premise deployment, and building PGVector-based RAG chabots.
---

Release Date: April 25, 2025

Version: 0.5.0

## Highlights

- Support on-premise deployment.
- [Provide RAG services using PGVector and large languange models (data source type: RagApi)](https://www.bladepipe.com/docs/bestPractice/pg_vector_to_rag_api/), compatible with standard OpenAI protocols, and support operations using Cherry Studio.
- Support [data migration from files (data source type: SshFile, S3File, OssFile) to PostgreSQL and text embedding using embedding models](https://www.bladepipe.com/docs/bestPractice/file_to_aliyun_pg_vector/). Combined with RagApi, RAG applications based on private data can be built.
- Support PostgreSQL text embedding using embedding models and storing embeddings in PGVector. 
- Support MySQL text embedding using embedding models and storing embeddings in PGVector. 
- Support adding OpenAI, Alibaba Cloud DashScope, DeepSeek, HuggingFace, Cohere, LocalAI and other LLM type data sources for text embedding and RagApi services.

## New Connections

- Support Dameng -> MySQL/StarRocks/Doris schema migration, full data migration, incremental data sync, data verification and correction, DDL sync (insert/delete columns).
- Support Dameng -> ClickHouse schema migration, full data migration, incremental data sync, data verification, DDL sync (insert/delete columns).
- Support Dameng -> Kafka full data migration and incremental data sync.
- Support full data migration from file data sources (SshFile, S3File, OssFile) to PostgreSQL.
- Support full data migration from file data sources (SshFile, S3File, OssFile) to MySQL.
- Support Greenplum -> Hana schema migration and full data migration. It also supports scheduled full data migration and filtering conditions (in-program filtering/predicate pushdown).
- Support Greenplum -> Doris schema migration, full data migration, and data verification and correction.

## New Features

- Support [POSIX file system files obtained over SSH (SshFile), AWS S3 files (S3File), Alibaba Cloud OSS files (OssFile) data sources](https://www.bladepipe.com/docs/reference/file_schema_format/).
- Support full data migration from text files (txt, markdown, json, .java, .c, etc.), Excel, CSV to MySQL or PostgreSQL.
- Support MariaDB v11.8 (actually BladePipe is compatible with all 11.x versions).
- Support Aliyun RocketMQ v5.0.
- Add a static mode (multi-offset) for SQL Server CDC table, and DataJobs share a fixed CDC table name (db_schema_table_cc_static).
- Support configuring target RDB parallel write strategy in user preference setting (parameter: increParallelApplyStrategy).
- Support custom code for an Iceberg instance.
- Support filtering Redis keys using regular expression (new parameter: keyRegex).
- Allow setting the target primary key in a source MongoDB instance.
- At the table selection step of DataJob creation, users can search and manually select tables to meet the needs of limited database authorization and selecting a few tables from hundreds of thousands of tables for data replication.
- Allow to configure whether to obtain unique key information when creating a DataJob in user preference setting.
- Automatically select UPDATE & DELETE or making the table selectable for a table with unique keys but no primary keys when creating a DataJob, and automatically set the first unique key field as the target primary key on the column selection page.
- Support running BladePipe using JDK 17, and overall operating performace is optimized.
- Allow [clearing up Worker logs](../productOP/byoc/maintenance/clear_worker_log.md).

## Improvements

- Improve Redis offset, add count auxiliary index and allow dbIndex multiple offsets.
- Improve Alibaba Cloud RocketMQ connection test, which can detect whether the RocketMQ instance is alive.
- The offsets of a source Alibaba Cloud RocketMQ instance can be reset by timestamp.
- Optimize SQL Server metadata acquisition, showing the acquisition speed.
- Support multiple TiSession requests for a TiDB source to address DataJob Region processing bottleneck (parameter: maxPoolSize).
- Optimize large key sync in full data migration from Redis (new parameters: listValueShardSize, hashValueShardSize, setValueShardSize, zsetValueShardSize).
- Improve Redis offset, add count auxiliary indicators, and multiple offsets for dbIndex.
- Allow to manually create date type format when there's no format of data writing to ElasticSearch.
- Improve time zone conversion in data sync and time zone data verification and correction for a target ElasticSearch instance.
- Delete the default Worker in the first installation of BladePipe.
- Improve the display of data source list, easier to identify.

## Bug Fixes
- Fix the problem that the source Redis master node is unstable due to multiple restarts of a Redis -> Redis DataJob (new parameter: bindSocketPort).
- Fix the error that the Socket connection isn't closed when the Redis -> Redis DataJob is stopped.
- Fix the exception occurred in the incremental data sync when the Kafka Scram login mode and the raw message format are selected.
- Fix the problem that the DDL cannot be captured due to the uppercase table name on the TiDB source.
- Fix the problem that the number of tables cannot be displayed when modifying subscriptions.
- Fix the error of conversion of largeint type data by StarRocks DYNAMIC scanMode.
- Fix the null pointer error during PolarDbMySQL full data migration.
- Fix the exception occurred in subscription modification due to long Dbs in Hana, PostgreSQL, Dameng, TDengine, SQL Server.
- Fix the illegal groupid exception occurred in subscription modification of a source Alibaba Cloud RocketMQ instance.
- Fix the problem of configuration merge failure in subscription modification of a source Alibaba Cloud RocketMQ instance.
