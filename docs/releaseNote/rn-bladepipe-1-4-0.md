---
id: rn-bladepipe-1-4-0
title: BladePipe 1.4.0
description: BladePipe 1.4.0 expands database support to Lindorm, and adds AWS Amazon MSK to StarRocks and other pipeline support.
---
Release Date: March 16, 2026

Version: 1.4.0

## Highlights

- Add **Alibaba Cloud Lindorm** (new Lindorm Wide Table Engine) as a target data source, enabling the **MySQL -> Lindorm** pipeline. 

## New Pipelines

- **AWS Amazon MSK -> StarRocks:** incremental sync.
- **AWS DocumentDB -> OceanBase for MySQL:** full data migration, incremental sync.
- **SQL Server -> TiDB:** schema migration, full migration, incremental sync, data verification and correction, and DDL sync (add/drop columns).

## New Features

- Support **MySQL 9.x**.
- Support [IAM authentication for AWS Amazon MSK](../dataMigrationAndSync/datasource_func/Kafka/kafka_iam_auth.md).
- Support passing custom Kafka configurations (customClientProps) in the data source, enabling more flexible authentication methods and configuration options.
- Add heartbeat support for HANA source under multi-offset mode (table-level incremental tables).
- Support for Vastbase G100 v2.2.
- Add keyword search support for DataJob parameters (dbs, including database/table/column metadata).
- Add support for editing Worker description.

## Improvements

- Optimize TiDB full-load query performance by introducing TiKV SQL hints, preventing failures caused by single-query memory limits (new parameter: storageEngineQueryHint).
- Upgrade Paimon driver to version 1.3.1.
- Optimize Kafka -> StarRocks partial column update scenarios, fixing issues when multiple topics write to the same table.
- Improve MySQL -> MySQL schema migration to automatically skip computed indexes, preventing migration errors.
- Improve DataJob detail page behavior to automatically refresh after DataJob reruns.
- Optimize the DataSource display format in the DataJob list.
- Improve the inactivate state guidance flow, making it clearer and easier to understand.
- Optimize behavior when accessing non-existent DataJob detail pages, which now redirect to the DataJob list page.
- Improve scheduled verification sub-DataJobs by disabling to append correction feature.

## Bug Fixes

- Fixed an issue during upgrade from older versions where some action whitelist entries were incorrectly mapped to the blacklist due to special mapping rules.
- Fixed an issue where MySQL -> MySQL schema migration would incorrectly append DEFAULT CURRENT_TIMESTAMP to the last DATETIME column.
- Fixed an issue where UNSIGNED attributes were lost for FLOAT/DOUBLE types in MySQL -> MySQL schema migration.
- Fixed FLOAT and REAL type mapping issues in SQL Server -> Doris / GaussDB / MySQL / Oracle / PostgreSQL / StarRocks pipelines.
- Fixed an issue where SQL Server -> MySQL incremental sync wrote 0 values for DATETIMEOFFSET and SMALLDATETIME types.
- Fixed an issue where SQL Server -> MySQL incremental TIMESTAMP sync produced inconsistent data.
- Fixed precision loss issue in time-related data types during SQL Server schema migration.
- Fixed an issue where full-load DataJobs could not complete when Dameng full-load filter pushdown was enabled but no filtering condition was configured.
- Fixed an issue where Vastbase -> MySQL/Dameng DATE types were incorrectly mapped to timestamps.
- Fixed an issue where verification DataJobs failed when parsing the MONEY type in Vastbase.
- Fixed SQL compatibility issues when retrieving OID mappings in Vastbase.
- Fixed an issue where modifying subscriptions failed after deleting source tables when DDL replication was disabled for HANA / SQL Server / PostgreSQL / Dameng / TDengine sources.
- Fixed an issue where DDL operations on the source side caused failures in parallel DataJob groups.
- Fixed DataJob group user isolation issues, preventing users from viewing or operating DataJob groups across permissions.
- Fixed checkbox style issues in Firefox.
- Fixed an issue where previously unchecked columns were automatically reselected during subscription modification.
- Fixed an issue where renaming the target table incorrectly inserted “To be Created” into the table name.
- Fixed UI display issues on the DataJob detail page when DataJob descriptions were very long.
- Fixed an issue where modifying subscriptions in DocumentDB/MongoDB sources (only modifying _id) incorrectly returned “No Changes”.
- Fixed column selection dropdown display issues in MySQL -> Kafka pipelines.
- Fixed an issue where pagination and data became inconsistent after refreshing the offset page.
- Fixed an issue where language switching (Chinese/English) did not take effect in the sync settings menu.
- Fixed an issue where creating similar DataJobs incorrectly inherited previously unchecked columns when the target table was set to “To be Created”.

