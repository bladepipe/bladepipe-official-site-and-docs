---
id: privs_for_dameng
title: Dameng 需要的权限
description: CloudCanal 在做 Dameng 作为源/对端的数据迁移同步时，需要提供的账号有一些赋权。
---

本文介绍 Dameng 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

如果添加数据源时使用的 Dameng 账号已经具有 DBA 权限，则可忽略以下具体权限申请。

## 作为源端

- 库/表/列的元信息查询权限。
  ```sql
  CREATE USER test_user IDENTIFIED BY "xxxx";
  GRANT SELECT ANY TABLE TO test_user;
  GRANT SELECT ON DBA_TAB_COLS TO test_user;
  GRANT SELECT ON DBA_COL_COMMENTS TO test_user;
  ```
- [Dameng LogMiner同步准备](prepare_for_dameng_logminer.md)，用于实现数据增量同步。

## 作为对端

- 库/表/列的元信息查询权限。
  ```sql
  CREATE USER test_user IDENTIFIED BY "xxxx";
  GRANT SELECT ANY TABLE TO test_user;
  GRANT SELECT ON DBA_TAB_COLS TO test_user;
  GRANT SELECT ON DBA_COL_COMMENTS TO test_user;
  ```
- **CREATE TABLE**、**CREATE INDEX**、**COMMENT ON [TABLE/COLUMN]** 权限，用于结构迁移时在对端创建表结构。
- **ALTER TABLE** 权限，用于同步来自源端的 DDL 变更。
- 对应的 Dameng 表 **INSERT**、**UPDATE**、**DELETE** 权限，用于同步源端数据变更。
