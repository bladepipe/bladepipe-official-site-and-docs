---
id: rn-bladepipe-0-4-0
title: BladePipe 0.4.0
---

Release Date: March 14, 2025

Version: 0.4.0

## New Connections
- Support **TDengine - MySQL** schema migration, full data migration, incremental data sync, data verification and correction.
- Support **MySQL - GreptimeDB** schema migration, full data migration, incremental data sync, data verification and correction.
- Support **TiDB - Greenplum** schema migration, full data migration, incremental data sync, data verification and correction, and DDL sync (add/drop/modify columns/empty table)
- Support **TiDB - PostgreSQL** schema migration, full data migration, incremental data sync, data verification and correction, and DDL sync (add/drop/modify columns/empty table)
- Support **Greenplum - OceanBase** schema migration, full data migration, and data verification and correction.
- Support **StarRocks - StarRocks** schema migration, and full data migration.
- Support **Kafka - Iceberg** incremental data sync.


## New Features
- Support predicate pushdown in target Hana, PostgreSQL, Greenplum, SQL Server, Oracle, PolarDB-X, ObForOracle, PolarDB MySQL, and StarRocks instances during full data migration.
- Support timestampz data type in target Iceberg instances.
- Support DDL sync of Truncate, Create Table, Drop Table to target Iceberg instances.
- Allow to select target primary keys in a connection with a source Hana instance. 
- Allow to clear up data in a target PostgreSQL instance before full data migration.
- Support SASL / SCRAM authentication for Kafka.
- Add the parameter clientCustomProps for Kafka to add or override the configuration of producers and consumers.
- Support multi-DataJob distributed execution of data migration, sync, verification and correction ([parallel DataJob groups](../operation/job_manage/job_op/job_group#parallel-datajob-group)), significantly improving the data replication performance.
- Support [DataJob groups](../operation/job_manage/job_op/job_group), including business groups (e.g., multiple kafka source DataJobs, data aggregation DataJobs, and DataJobs for the same business purpose) and parallel groups, facilitating DataJob management.
- Support data filtering conditions for Date field (advanced mode, filtering in BladePipe).


## Improvements
- Use a more secure mechanism to clear data in the CDC table.
- After the subscription of a source Hana table is cancelled, the offset for the table will be removed automatically.
- Add a recent commit timestamp for a source Oracle instance to figure out whether the latency is caused by uncommitted transactions or heavy traffic during incremental data sync.
- Periodically print the longest uncommitted transaction ID of a source Oracle instance, the number of change events of the transaction, and other information, so as to facilitate timely processing.
- Optimize type mapping. Map MySQL bit(1) to Doris / StarRocks as tinyint. If the bit length definition > 1, BladePipe will maintain hexadecimal string writing.
- Optimize type mapping. Map TiDB bit(1) to Doris / StarRocks as tinyint. If the bit length definition > 1, BladePipe will maintain hexadecimal string writing.
- The schema mapping parameter mappingDef is modifiable, satisfying the need of replacing and updating in some scenarios.
- Add the open API for getting DataJob list (datajob/list and datajob/queryjob), and add DataJob current status (currTaskStatus).
- Optimize DataJob replay open API. Add autoStart request parameter to meet the demand like verification sub-DataJobs that do not need to start automatically (triggered by the incremental phase of the main DataJob).
- Optimize IM alert validation interface determination.
- Optimize the sensitivity of IM alerts to interface call errors for each platform.


## Bug Fixes
- Fix the error of synchronizing ENUM type as number in OceanBase(Binlog) / PolarDB / PolarDB-X source.
- Fix the issue that if the subscription of a source MySQL table is cancelled and then resumed, the data is missing after sync.
- Fix the error that a table is not created in the target instance due to a CREATE TABLE pre-check error during MySQL full database sync.
- Fix the issue of probabilistically misplaced key due to restarting DataJob after Redis DB mapping is enabled.
- Fix the error of offset saving of time type primary key when migrating full data from Oracle.
- Improve the write performance of Oracle tables with time type as the primary key.
- Fix a write failure issue caused by long data of Oracle Blob type.
- Fix a parsing error caused by inconsistent nullable field attribute after detection when parsing Binlog in PolarDB MySQL / PolarDB-X sources.
- Fix the error of filtering the mandatory type with precision when fetching metadata of default value for PostgreSQL schema migration.
- Fix the issue of invalid Kafka dependency version switching.
- Fix the problem of getting metadata of StarRocks tables without filtering the table with engine type OLAP_EXTERNAL.
- Fix the error of creating similar DataJobs after the username and password of a datasource are changed .
- Fix the pre-check error when creating DataJobs with a source Greenplum instance.
- Fix the issue that in a connection with StarRocks / Doris / SelectDB / Iceberg as the target, the first batch setting of data partition is overwritten by the second batch setting.
- Fix the issue of residual archiving of component and DataJob logs.





