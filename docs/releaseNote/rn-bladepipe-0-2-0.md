---
id: rn-bladepipe-0-2-0
title: BladePipe 0.2.0
---

Release Date: December 13, 2024 

Version: 0.2.0

## Highlights
- Support schema migration, full data migration, incremental data sync and DDL sync (insert and delete columns, modify data types, modify column name, and allow nullable columns) [from MySQL to **Iceberg**](https://doc.bladepipe.com/dataMigrationAndSync/connection/mysql2?target=Iceberg). 

## New Connections
- Support schema migration, full data migration, incremental data sync, data verification and correction from PolarDB-X 2.0 to Doris.
- Support full data migration and incremental data sync from OceanBase for Oracle to Kafka.

## New Features
- Support TiDB 8.x as a Source and Target DataSource.
- Support SelectDB 4.0.
- Support for data sync at Auto mode of a source PolarDB-X 2.0 instance.
- Support ClickHouse Cloud (modify the parameter value of *useSSL* to true when adding a ClickHouse DataSource).
- Support for primary key mapping from MongoDB to MySQL/StarRocks (map _id to a column with a specified  string type), facilitating to create target tables.
- Support virtual columns when moving data from Oracle/MySQL/SQL Server to Kafka.
- Allow to add databases to be created when modifying subscription in a MySQL -> StarRocks connection.
- Support a data transformation expression as the value in virtual column. 
- Allow to modify subscription in a sub-DataJob of data verification and correction. 
- Allow to modify subscription during the interval of a scheduled data migration DataJob or verification DataJob. 
- Allow to reset the offset by file position at OceanBase Binlog mode.
- Allow to export audit logs as Excel files(add a permission to export audit logs). 

## Improvements
- Filter Delete events with null value in a DataJob with a source TiDB instance.
- Improve the default length value setting (255/65535) of Char/Varchar without length setting or with 0 length when migrating data to Doris/SelectDB. 
- Change the default time type mapping from Datetime to Datetime64 when mapping to ClickHouse.
- Allow to fill in DocumentDB cluster endpoint.
- Improve audit logs of various update operations, making them easier to read with some necessary information added.

## Bug Fixes

- Fix the issue that when a DataJob with a PolarDB-X instance is initialized, the Binlog file offset is not obtained, resulting in a long initialization time.
- Fix the issue that synchronizing data from PolarDB-X fails resulted from SQL parsing errors.
- Fix the issue that some new parameters for OceanBase don't take effect.
- Fix the issue that BladePipe doesn't filter views when obtaining schema information from a StarRocks instance.
- Fix the issue that BladePipe doesn't filter views when obtaining schema information from a Doris/OceanBase instance. 
- Fix the issue that an error appears when BladePipe retries to write data to StarRocks/Doris.
- Fix the issue that when migrating an empty table from MySQL to StarRocks, the progress is stuck at 99.9% and cannot be completed.
- Fix the issue that synchronizing data to SQL Server fails because the Update/Delete statement of a table without a primary key contains null data.
- Fix the issue that some data is not transformed when data in the tables is synchronized to a target instance and data in some of the tables is configured to be transformed while the others is not configured. 
- Fix the issue that the data written to ADB for MySQL in Clob type (Text/Longtext) is null.
- Fix the issue that virtual column synchronization has an exception at the MUTI_SQL mode of a target PostgreSQL instance.
- Fix the issue that data filtering fails because the filtering condition contains multiple conditions.
- Fix the issue that an error appears when migrating schema from AWS DocumentDB.
- Fix the issue that ChangeStream pushes empty Update events in a DataJob with a source MongoDB instance.
- Fix the issue that the Host is null when connecting the target DataSource via a public endpoint to delete DataJobs and clean up the resources.
- Fix the issue that the partition key is not set on the target Hive instance but is displayed as set.
- Fix the issue that the Timestamp type of data written to Hive cannot be viewed.
- Fix the issue that the __op field is null when migrating data to Hive.
- Fix the issue that the virtual column is not re-rendered after being deleted when creating a similar DataJob.
- Fix the issue that when setting data transformation in batches, deleting the data transformation configuration of a single table results in the removal of data transformation configuration of all tables.
- Fix the issue that when adding virtual columns in batches, the virtual column tab will not be automatically switched to.
- Fix the issue that when modifying subscriptions for certain connections (source databases with Schema, currently known connections are Hana -> MySQL/Oracle -> Doris), removing a table causes the columns of other tables to be empty, thus updating the table subscription.
- Fix the issue that when merging a sub DataTask into the main DataJob after modifying subscriptions, the virtual column and data transformation configuration in the sub DataTask may be invalid (e.g., the main DataJob is configured with virtual columns, and the sub DataTask is configured with data transformation).