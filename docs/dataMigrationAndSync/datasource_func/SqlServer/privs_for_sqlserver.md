---
id: privs_for_sqlserver
title:  Required Privileges for SQL Server
description: BladePipe needs to provide some permissions for the account when doing the data migration synchronization of SQLServer as source/peer.
---

## Overview
BladePipe needs some permissions to be granted for the account when doing the data migration synchronization with SQL Server as Source/Target. If you are using a SQL Server account that already has DBA/SA permissions when adding a DataSource, you can ignore the following part.

## Account Creation
You can skip this step if you already have an account ready for data synchronization

1. Create a bladepipe login account to connect to the database.
    ```sql
    CREATE LOGIN [bladepipe] WITH PASSWORD=N'bladepipe', DEFAULT_DATABASE=[master], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
    ```

2. Authorized bladepipe login account can connect to the database.
    ```sql
    GRANT CONNECT SQL TO [bladepipe]
    ```


## As the Source
1. Switch to the xxx source database to prepare for the next assignment of database users.
    ```sql
    USE [xxx]
    ```

2. Assign database users with the same name to bladepipe login accounts.
    ```sql
    CREATE USER [bladepipe] FOR LOGIN [bladepipe]
    ```

3. Enable CDC for xxx data, this command requires the sysadmin server role and should be operated by the DBA alone.
    ```sql
    exec [xxx].sys.sp_cdc_enable_db
    ```

4. Assign the db_owner identity to the bladepipe login account, which is required by the new task to create the CDC table.
    ```sql
    ALTER ROLE [db_owner] ADD MEMBER [bladepipe]
    ```


## As the Target
If you already have the db_owner identity of the xxx database, the following authorization actions are not required.


1. Switch to the xxx target database to prepare for the next assignment of database users.
    ```sql
    USE [xxx]
    ```

2. Assign database users with the same name to bladepipe login accounts.
    ```sql
    CREATE USER [bladepipe] FOR LOGIN [bladepipe]
    ```

3. Create a table structure on the opposite side during schema migration.
    ```sql
    GRANT CREATE TABLE TO [bladepipe]
    GRANT ALTER TO [bladepipe]
    ```

4. Set table/column remark information during schema migration, and synchronize source table/column renamed DDL during incremental DDL synchronization.
    ```sql
    GRANT EXECUTE TO [bladepipe]
    ```

5. Grant **INSERT**, **UPDATE**, **DELETE** permissions.
    ```sql
    GRANT INSERT TO [bladepipe]
    GRANT UPDATE TO [bladepipe]
    GRANT DELETE TO [bladepipe]
    ```

### Schema-Level Permission

If you already have the db_owner identity for the xxx database, you do not need the following authorization. 


**Single SCHEMA Permission**
1. Create tables under SCHEMA.
    ```sql
    GRANT ALTER ON SCHEMA::[my_schema] TO [bladepipe]
    GRANT EXECUTE ON SCHEMA::[my_schema] TO [bladepipe]
    ```

2. Grant **INSERT**, **UPDATE**, **DELETE** permissions.
    ```sql
    GRANT INSERT ON SCHEMA::[my_schema] TO [bladepipe]
    GRANT UPDATE ON SCHEMA::[my_schema] TO [bladepipe]
    GRANT DELETE ON SCHEMA::[my_schema] TO [bladepipe]
    ```

**Whole SCHEMA Permission**
1. Create tables under SCHEMA.
    ```sql
    GRANT ALTER ON SCHEMA::* TO [bladepipe]
    GRANT EXECUTE ON SCHEMA::* TO [bladepipe]
    ```

2. Grant **INSERT**, **UPDATE**, **DELETE** permissions.
    ```sql
    GRANT INSERT ON SCHEMA::* TO [bladepipe]
    GRANT UPDATE ON SCHEMA::* TO [bladepipe]
    GRANT DELETE ON SCHEMA::* TO [bladepipe]
    ```

