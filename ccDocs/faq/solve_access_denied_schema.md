---
id: solve_access_denied_schema
title: MySQL 源端 Schema 权限不足报错
description: 同步任务 Dump MySQL 表结构，获取某个 Schema 下的表结构时，权限不足报错。
---
:::info
本文档同样适用于 MySQL 系数据源。
:::

本文介绍 MySQL 为源端时，如何解决获取某个 Schema 下的表结构时，权限不足报错的问题。

## 现象描述
任务日志中出现如下报错：
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

## 问题排查
同步任务尝试获取表结构时，发现某个 **Schema** 权限不足：
  - 有 **SHOW DATABASES** 权限。
  - 没有 **SELECT** 权限，无法执行 `SHOW FULL TABLES` 语句。

## 解决方法
1. 进入任务详情页，点击 **功能列表** > **参数修改**。

2. 在 **源数据源配置** 页签下搜索 **userName**，获取 MySQL 用户的 **userName**。

3. 获取 MySQL 用户的 **host**。
  ```sql
  SELECT host FROM mysql.user WHERE user = '<userName>';
  ```
4. 执行授权 Schema 的 **SELECT** 权限。
  ```sql
  GRANT SELECT ON *.* TO '<user>'@'<host>';
  ```