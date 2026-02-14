---
id: rn-bladepipe-0-6-0
title: BladePipe 0.6.0
description: BladePipe 0.6.0 supports PostgreSQL & Oracle & SQL Server-Iceberg pipelines, and creating wide tables in a visual way.
---
Release Date: June 5, 2025

Version: 0.6.0


## New Connections
- Support **Dameng -> Dameng** schema migration, full data migration, incremental data sync, data verification and correction, DDL sync (insert/delete columns).
- Support **TiDB -> SelectDB** schema migration, full data migration, incremental data sync, data verification and correction, DDL sync (insert/delete columns).
- Support **PostgreSQL & Oracle & SQL Server -> Iceberg** schema migration, full data migration, incremental data sync.
- Support **SshFile & S3File & OssFile -> StarRocks & MongoDB Atlas & Elasticsearch** pipelines to create vectors.
- Support **StarRocks & MongoDB Atlas & Elasticsearch -> RagApi** pipelines to provides RAG service.

## New Features

- [Create wide tables from MySQL to MySQL/StarRocks/Doris/SelectDB in a visual way](../operation/job_manage/job_op/visual_widetable_create)(Left Join).
- Support scheduled full data migration from Dameng & SQL Server.
- Support Redis &lt;-&gt; Redis LPop, RPop, LTrim, Publish, ZRemRangeByRank, ZRemRangeByLex instructions.
- Allow to add custom virtual columnSQL in Server - Oracle pipeline.
- Support Kafka securityProtocol PLAINT_TEXT authentication method.
- Allow to filter data through regular expressions in Redis -> Redis data verification.
- Allow not to convert time zones for DATETIME type data when moving data to MySQL (new parameter: convertDateTimeTimeZone).
- Enable to modify subscription when moving data from databases with vector capabilities to RagApi (modify chat models).
- Support Anthropic and AWS Bedrock for data embedding and RagApi services.
- Allow to create different vectors according to different embedding models (dimensions below 2000 or below 4000) when moving data from files to PostgreSQL.
- Add MCP tool filter parameter (filterToolNames) and tool call failure policy parameter (failIfOneServerFails).
- Enable to set the timeout parameter for LLM requests to dynamically adjust the request timeout, with a default of 300 seconds.
- Allow to modify subscription in the stage of Full Data with the file source.
- Enable to import completed Full Data DataJobs so that users can rerun DataJobs.

## Improvements

- Improve the frequency of KeyDiff reporting and fix the problem of accumulating differences between sharded clusters during Redis -> Redis sync.
- Improve the batch scanning logic in Redis -> Redis data verification.
- Fix the problem that the FSM may be incorrect when rerunning DataTasks. Delay the execution of asynchronous tasks such as mounting and activation by 1 second.
- Fix the problem that the FSM may be incorrect when adding additional correction DataTasks. Delay the execution of the created asynchronous tasks by 1 second.


## Bug Fixes
- Fix the pop-up error in Data Processing page when creating a MySQL -> ClickHouse DataJob.
- Fix the String length (20030999) exceeds the maximum length (20000000) error on source MySQL.
- Fix the DDL compatibility problem in a TiDB -> StarRocks pipeline (add columns/subtract columns/modify columns).
- Fix the index length overflow problem caused by not specifying the index column prefix of PK/UK/INDEX in TiDB -> TiDB schema migration.
- Fix the inaccurate data verification problem after the time zone conversion of the Timestamp primary key on source TDengine.
- Make sslMode configuration take effect when creating a DataJob with PostgreSQL.
- Fix the decimal type precision problem in SQL Server -> StarRocks schema migration.
- Fix the problem that the result returned when obtaining the unique key of the StarRocks table is empty.
- Fix the error occurred when saving the general parameter subAccountPwdVerifyExpr when the subAccountAuthType parameter is PASSWORD.
- Fix the problem that the value synced from empty Array type is NULL in a MongoDB -> MongoDB pipeline. 
- Fix the error reported when the field comment contains '\' in the schema migration to MySQL.
- Fix the problem that the PostgreSQL heartbeat configuration is not effective.
- Fix the problem that the dimension parameter is not copied when creating a similar DataJob from files to a vector database.
- Fix the problem that the replicated table is displayed as 0 in the vector database -> RagApi schema migration.
- Reduce the redundant schema migration log size when the unified target table name is set in a file -> vector database DataJob.
- Fix the problem that Ollama and ZhipuAI thinking displayed is inaccurate.
- Fix the exception of cluster data migration during the source Redis cluster data verification.
- Fix the exception occurred when adding data verification and correction DataTask to Redis -> Redis sync DataJob.
- Fix the problem that the table name mapping is invalid in MySQL -> Iceberg DDL sync.
- Fix the display problem of the associated tasks.
- Fix the problem that when the parameter modification (adding a data source, modifying the data source parameters, etc.) is canceled, all the parameters of other switch types will be canceled.

