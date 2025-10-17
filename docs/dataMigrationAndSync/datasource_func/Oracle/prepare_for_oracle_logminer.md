---
id: prepare_for_oracle_logminer
title: Oracle LogMiner
description: BladePipe uses LogMiner to synchronize the Oracle. This paper describes the preparation actions before synchronization.
---
BladePipe uses LogMiner to synchronize the incremental data in Oracle. This article describes the preparations before data synchronization.

## Step 1: Enable LogMiner
### Non-RAC Oracle
1. Log on to an Oracle database (e.g.,sqlplus) using a user with DBA permissions.
2. Query the database log mode.
   ```sql
   select dbid,name,log_mode from v$database;
   ```
  - If `ARCHIVELOG` is returned for log_mode, then skip the following steps.
  - If `NOARCHIVELOG` is returned for log_mode, then continue the following steps.
  

3. Shut down the database.
    ```sql
    shutdown immediate;
    ```

4. Start up and mount the database.
    ```
    startup mount;
    ```

5. Enable ARCHIVELOG mode and open the database.
    ```sql
    alter database archivelog;
    alter database open read write;
    ```

### RAC Oracle

1. Stop, start, and mount a database in the shell of one of the RAC Oracle nodes.
   ```
   srvctl stop database -d <database name>
   srvctl start database -d <database name> -o mount
   ```

2. Log on to the database (e.g.,sqlplus) using an account with DBA permissions and enable ARCHIVELOG mode.
   ```sql
   alter database archivelog;
   ```

3. In the shell of one of the RAC Oracle nodes, restart the database.
   ```
   srvctl stop database -d <database name>
   srvctl start database -d <database name>
   ```

4. Log on to the database (e.g.,sqlplus) using an account with DBA permissions and check if the database is in ARCHIVELOG mode.
   ```
   select log_mode from v$database;
   ```

## Step 2: Enable Supplemental Logging
1. Check if the supplemental logging is enabled at the database level.
   :::tip
   If 'YES' or 'Implicit' is returned for any of the following SQL fields, skip this step.
   :::

    ```sql
    select supplemental_log_data_min min, supplemental_log_data_pk pk,supplemental_log_data_ui ui, supplemental_log_data_all all_cols from v$database;
    ```

2. Enable minimal supplemental logging at the database level. 
  - Pluggable Database (PDB)
    ```sql
    alter session set container=cdb$root;

    alter database add supplemental log data;
    ```
  - Container Database (CDB)
    ```sql
    alter database add supplemental log data;
    ```
3. **(Option 1, Recommended)** Enable all column logging at the database level.
  - Pluggable Database (PDB)
    ```sql
    alter session set container=cdb$root;

    alter database add supplemental log data (all,primary key,unique) columns;
    ```
  - Container Database (CDB)
    ```sql
    alter database add supplemental log data (all,primary key,unique) columns;
    ```
   
    **(Option 2)** Enable supplemental logging at the table level in **Step 3**.
      ```sql
      alter table <schema name>.<table name> add supplemental log data (all,primary key,unique) columns;
      ```
   

## Step 3: Create a User and Grant Permissions

### Pluggable Database（PDB）
The version of Oracle is 12c, 18c, 19c or 21c.

1. Create a user under `cdb$root`, usually in the format `c##<custom name>`.
    ```sql
    alter session set container=cdb$root;
    create user <custom name> identified by <custom password> container=all;
    ```

2. Grant general permissions.
    ```sql
    grant create session, select_catalog_role,logmining, execute_catalog_role to <custom name> container=all;
    ```
    :::tip
    Not all Oracle versions have the permission `logmining`. If the Oracle version you used doesn't have the permission `logmining`, please delete `logmining` in the above statement. 
    :::

3. Grant permissions related to LogMiner.
    ```sql
    grant execute on sys.dbms_logmnr to <custom name>;
    grant execute on sys.dbms_logmnr_d to <custom name>;

    grant select on v_$logmnr_contents to <custom name>;
    grant select on v_$archived_log to <custom name>;
    grant select on v_$log to <custom name>;
    grant select on v_$logfile to <custom name>;
    grant select on v_$logmnr_logs to <custom name>;
    ```

4. Grant permissions related to tables.
    ```sql
    alter session set container=<pdb name>;

    grant select,alter on <schema>.<table> to <custom name>;
    ... select,alter(Autoopen and Complete Log) permissions for the table you want to migrate and synchronize. ...
    ```

### Container Database (CDB)
The version of Oracle is 11g, 12c, 18c, 19c or 21c.


1. Create a user.
    ```sql
    create user <custom name> identified by <custom password>;
    ```

2. Grant general permissions.
    ```sql
    grant create session, select_catalog_role, logmining, select any transaction, select any table to <custom name>;
    ```
    :::tip
    Not all Oracle versions have the permission `logmining`. If the Oracle version you used doesn't have the permission `logmining`, please delete `logmining` in the above statement. 
    :::

3. Grant permissions related to LogMiner.
    ```sql
    grant execute on sys.dbms_logmnr to <custom name>;
    grant execute on sys.dbms_logmnr_d to <custom name>;

    grant select on v_$archived_log to <custom name>;
    grant select on v_$logmnr_contents to <custom name>;
    grant select on v_$log to <custom name>;
    grant select on v_$logfile to <custom name>;
    grant select on v_$logmnr_logs to <custom name>;
    ```

4. Grant permissions related to tables.
    ```sql
    grant select,alter on <schema>.<table> to <custom name>;
    ... select the table you want to migrate to,alter(Autocomplete Log) permissions granted ...
    ```
