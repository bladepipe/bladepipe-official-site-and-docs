---
id: privs_for_tidb
title:  Required Privileges for TiDB
---
This article describes the permissions required by BladePipe for database accounts when TiDB is used as the Source or Target DataSource for migrating or synchronizing data.

## As the Source
- **Fulll Data Migration**: The **SELECT** permission.
- **Incremental Data Synchronization**: The **SELECT** permission of **INFORMATION_SCHEMA** and MySQL databases.

## As the Target
**Fulll Data Migration/Incremental Data Synchronization**: The **INSERT**, **UPDATE**, **DELETE**, **DDL** permissions.