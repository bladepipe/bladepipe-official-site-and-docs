---
id: solve_access_denied_schema
title: Access Denied for User to Schema in MySQL as Source
description: It describes how to resolve the insufficient permission error occurred when BladePipe tries to obtain the schema of a specified table in MySQL source.
---
This page describes how to resolve the insufficient permission error occurred when BladePipe tries to obtain the schema of a specified table in MySQL as Source.

## Issue
The following error message occurs in the DataJob log:
  ``` 
  Caused by: java.io.IOException: ErrorPacket [errorNumber=1044, fieldCount=-1, message=Access denied for user 'cloudcanal'@'11.0.0.0' to database 'performance_schema', sqlState=42000, sqlStateMarker=#]
  with command: show full tables from `performance_schema` where Table_type = 'BASE TABLE'
      at com.clougence.cloudcanal.mysql.worker.reader.vendor.driver.MysqlQueryExecutor.getResBody(MysqlQueryExecutor.java:88)
      at com.clougence.cloudcanal.mysql.worker.reader.vendor.driver.MysqlQueryExecutor.query(MysqlQueryExecutor.java:47)
      at com.clougence.cloudcanal.mysql.worker.reader.vendor.parse.conn.MysqlConnection.query(MysqlConnection.java:132)
      at com.clougence.cloudcanal.mysql.worker.reader.incre.RemoteTableMeta.dumpTableMeta(RemoteTableMeta.java:217)
      at com.clougence.cloudcanal.mysql.worker.reader.incre.RemoteTableMeta.rollback(RemoteTableMeta.java:174)
      at com.clougence.cloudcanal.mysql.worker.reader.vendor.parse.AbstractMysqlEventParser.processTableMeta(AbstractMysqlEventParser.java:153)
      at com.clougence.cloudcanal.mysql.worker.reader.vendor.parse.AbstractEventParser$1.run(AbstractEventParser.java:235)
  ```

## Cause
The permissions on some schema are insufficient when BladePipe tries to obtain the schema in a Incremental task.
  - The **SHOW DATABASES** permission is granted.
  - The **SELECT** permission is not granted, and thus the `SHOW FULL TABLES` statement can not be executed.

## Solution
1. Go to the Details page of the DataJob. Click **Functions** > **Modify Parameters**. 
2. Select the **Source** tab. Enter **userName** in the search box to query the user name of MySQL account.

3. Obtain the **host** of MySQL account.
  ```sql
  SELECT host FROM mysql.user WHERE user = '<userName>';
  ```

4. Grant the **SELECT** permission on the schema.
  ```sql
  GRANT SELECT ON *.* TO '<user>'@'<host>';
  ```