---
id: prepare_for_db2
title:  Required Privileges for Db2 CDC
description: To replicate data from Db2 via Change Data Capture(CDC) using BladePipe, a Db2 user needs to have certain privileges.
---

If you only need to migrate the existing data, you can skip this article.

### Enable Archive Logging for Database

1. Switch to the `db2inst1` user and connect to the database.
  ```bash
  su - db2inst1
  db2 connect to <db_name>
  ```

2. View the current primary log mode of the database.
    - If it returns OFF, archiving mode is not enabled
  ```bash
  db2 get db cfg for <db_name> | grep LOGARCHMETH1
  ```

3. Change the database log mode.
    - For details, see [Primary log archive method configuration parameter](https://www.ibm.com/docs/en/db2/11.5?topic=parameters-logarchmeth1-primary-log-archive-method) and [Secondary log archive method configuration parameter](https://www.ibm.com/docs/en/db2/11.5?topic=parameters-logarchmeth2-secondary-log-archive-method).
    - The ASN agent must have a closest starting point to read from. The following command may trim the data so that only the latest version is available. If you don't need to keep old versions of data, Please specify ```dev/null``` backup location.
  ```bash
  db2 update db cfg for <db_name> using LOGARCHMETH1 <backup_path>
  ```

4. Disconnect other applications from the database.
  ```bash
  db2 force applications all
  ```

5. After you change db2 to archive logs for the first time, the database is in `BACKUP PENDING` state and a full backup is required.
  ```bash
  db2 backup db <db_name>
  ```

6. Connect to the database and check whether the database is in archive logging mode.
  ```bash
  db2 connect to <db_name>
  db2 get db cfg for <db_name> | grep -i LOGARCHMETH1
  ```
### Initialize Db2 ASN Capture Program

1. Enable the archive mode for the database. When Db2 CDC is enabled at the same time, the add/delete/change operations of the user's subscribed tables are captured by Db2 ASN Capture and written to the CDC table, and then BladePipe scans the relevant tables for incremental synchronization.
2. The following script allows you to initialize the Db2 ASN Capture program with one click.
  ```bash
  # Install CDC starter tool
  /bin/bash -c "$(curl -fsSL https://gitee.com/clougence/db2-cdc-tools/raw/master/script/install.sh)"
  
  # Run the script. <db_name> Needs to be replaced with the database name
  bash ./cdc_tools/cdc_setup.sh <db_name>
  ```
