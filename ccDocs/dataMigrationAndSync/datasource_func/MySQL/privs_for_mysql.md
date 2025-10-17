---
id: privs_for_mysql
title: MySQL 需要的权限
description: CloudCanal 在做 MySQL 源端或对端的数据迁移同步时，需要提供的账号有一些赋权。
---

本文介绍 MySQL 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。
:::info
本文也同样适用于 MariaDB、Aurora MySQL、阿里云 RDS MySQL、Azure Database for MySQL。
:::

## 作为源端
  - **全量迁移**：迁移库表的 **SELECT** 权限。
  - **增量同步**：迁移库表的 **SELECT**、**REPLICATION SLAVE**、**REPLICATION CLIENT** 权限。
  - **源端心跳**（可选）：请参考 [打开 MySQL 源端心跳](./open_mysql_heartbeat.md)。

## 作为对端
  **全量迁移/增量同步**：迁移库表的 **INSERT**、**UPDATE**、**DELETE**、**DDL** 权限。
