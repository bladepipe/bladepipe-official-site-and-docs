---
id: privs_for_oracle
title:  Required Privileges for Oracle
description: To replicate data from or to Oracle using BladePipe, an Oracle user needs certain privileges. 
---

## Overview
When performing Oracle-to-Oracle data migration and synchronization, BladePipe requires certain account permissions to be granted. If the Oracle account used when adding the dataSource already has DBA permission, then the specific permission requests below can be ignored.

## Oracle As Source

-  GRANT CONNECT,SELECT_CATALOG_ROLE to xxxxx
  - Purpose: Library/table/column meta information query
- Oracle `SELECT` permission for tables
  - Purpose：Full Data

### Incremental(LogMiner)

- See Documentation [ORACLE LogMiner Preparation](prepare_for_oracle_logminer.md)

## Oracle As Target

- GRANT `CONNECT,SELECT_CATALOG_ROLE` to xxxxx
  - Purpose: Query database/table/column meta information
- `CREATE TABLE`、`CREATE INDEX`、`COMMENT ON [TABLE/COLUMN]`
  - Purpose: Create a table schema on the Target during schema migration
- `ALTER TABLE`
  - Purpose: Synchronize DDL from the Source
- Corresponding Oracle table `INSERT`, `UPDATE`, `DELETE`
  - Purpose: Synchronize Source data changes
