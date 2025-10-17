---
id: rn-bladepipe-0-1-0
title: BladePipe 0.1.0
---

Release Date: October 31, 2024 

Version: 0.1.0

## New Features
  
- Support the schema migration, data migration and synchronization from and to TiDB 4.x version.
- Support MySQL -> MySQL/TiDB RANGE partition schema migration and the added or deleted DDL synchronization from MySQL partition to MySQL partition.
- Support the data transformation through the configuration of expression in the data pipeline from MySQL to MySQL/StarRocks/TiDB and from PostgreSQL to MySQL. It supports 11 common expressions, and more expressions are to be supported.
- Allow reading data from all BE nodes of StarRocks in parallel (new DataJob parameters: scanMode, feHttpAddr, beThriftAddr, scanMaxRetries, keepAliveMin, queryTimeout, memLimit).
- Enable to modify the mode of writing data to MongoDB. The default replacement part (UPSERT_PART) can be modified to the entire row replacement (UPSERT_ALL) (new DataJob parameter: writeStrategy).
- Support the generation of INSERT SQL according to the field definition of the target table when migrating full data to Oracle and TiDB (parameter: useDeflnFullTask).

## Improvements

- Support the synchronization of tables with unique keys but no primary keys to StarRocks and Redis.
- Improve data synchronization from PostgreSQL. Because DDL synchronization from PostgreSQL needs the creation of Event Trigger, which requires high privileges, so DDL synchronization is not selected by default when creating DataJobs.
- Add a Loading style to Add DataSource button when adding a data source.

## Bug Fixes

- Fix the problem that the progress of data correction with a target StarRocks instance was slugguish and could not be completed. 
- Fix the problem that two records appeared in the target StarRocks instance when the primary key was changed in the source instance.
- Fix the problem that the sub-list type was written as a string type in a MongoDB -> MongoDB pipeline.
- Correct the calculation of verification range with a string type primary key in StarRocks / Doris.
- Fix the problem that some data was not scanned because one of the threads in the Oracle RAC had not been archived for a long time.
- Improve the verification with a source SQLServer, PostgreSQL, and Db2 instance when there's a space for padding in the char type field.
- Clean up the publication in PostgreSQL when deleting a DataJob with a source PostgreSQL instance.