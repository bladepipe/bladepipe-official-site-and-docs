---
id: privs_for_dameng
title: Required Privileges for Dameng
description: Account permissions required by BladePipe when Dameng is used as a source or target data source for data migration or synchronization.
---

This article describes the account permissions required by BladePipe when Dameng is used as a source or target data source for data migration or synchronization.

If the Dameng account used when adding the data source already has DBA privileges, the following specific privilege applications can be ignored.

## As a Source

- Metadata query permissions for databases/tables/columns.
  ```sql
  CREATE USER test_user IDENTIFIED BY "xxxx";
  GRANT SELECT ANY TABLE TO test_user;
  GRANT SELECT ON DBA_TAB_COLS TO test_user;
  GRANT SELECT ON DBA_COL_COMMENTS TO test_user;
  ```
- [Preparation for Dameng LogMiner Sync](prepare_for_dameng_logminer.md) for implementing incremental data synchronization.

## As a Target

- Metadata query permissions for databases/tables/columns.
  ```sql
  CREATE USER test_user IDENTIFIED BY "xxxx";
  GRANT SELECT ANY TABLE TO test_user;
  GRANT SELECT ON DBA_TAB_COLS TO test_user;
  GRANT SELECT ON DBA_COL_COMMENTS TO test_user;
  ```
- **CREATE TABLE**, **CREATE INDEX**, and **COMMENT ON [TABLE/COLUMN]** permissions for creating table structures on the target during schema migration.
- **ALTER TABLE** permissions for synchronizing DDL changes from the source.
- **INSERT**, **UPDATE**, and **DELETE** permissions for the corresponding Dameng tables for synchronizing source data changes.
