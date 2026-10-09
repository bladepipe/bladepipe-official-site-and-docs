---
id: oracle_dg_mode
title: Oracle Standby Sync Config
description: Configure the dictionary file directory on an Oracle DataGuard standby database to support BladePipe incremental synchronization tasks.
---

This document explains how to configure the LogMiner dictionary file directory for incremental synchronization on an Oracle source's DataGuard standby database so that BladePipe can parse archived logs correctly.

## Procedure

### Step 1: Create a Physical Directory on the Standby Database Server

Log in to the server as the Oracle installation user and create a directory to store dictionary files:

```shell
su - oracle
mkdir -p /u01/app/oracle/dic
```

### Step 2: Configure the Logical Directory and Permissions in Oracle

For **Oracle 19c**, run the following:

```sql
-- Create a logical directory
CREATE DIRECTORY DIC_DIR AS '/u01/app/oracle/dic';

-- Grant access
GRANT READ, WRITE ON DIRECTORY DIC_DIR TO PUBLIC;

-- View the directory configuration
SELECT * FROM SYS.DBA_DIRECTORIES;
```

For **Oracle 11g**, also set the `utl_file_dir` parameter and restart the database:

```sql
ALTER SYSTEM SET utl_file_dir='/u01/app/oracle/dic' SCOPE=SPFILE;

-- Takes effect after restarting the database
STARTUP FORCE;
```

### Step 3: Verify That the Directory Is Writable

Build a LogMiner dictionary file using PL/SQL:

```sql
BEGIN
  DBMS_LOGMNR_D.BUILD(
    dictionary_filename => 'logminer_dict.ora',
    dictionary_location => 'DIC_DIR',
    options => DBMS_LOGMNR_D.STORE_IN_FLAT_FILE
  );
END;
```

Verify that the file is generated in the directory. If no errors occur, the configuration is successful.

### Step 4: Configure the BladePipe DataSource

When adding a DataSource in the BladePipe console, set the following additional parameters:

- `isDataGuard=true`
- `dgDicLocation=DIC_DIR`

:::info
`dgDicLocation` must match the directory name specified in Oracle's `CREATE DIRECTORY` statement.
:::
