---
id: privs_for_oracle
title: Oracle 需要的权限
description: CloudCanal 在做 Oracle 作为源/对端的数据迁移同步时，需要提供的账号有一些赋权。
---

本文介绍 Oracle 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

如果添加数据源时使用的 Oracle 账号已经具有 DBA 权限，则可忽略以下具体权限申请。


## 作为源端

- 库/表/列的元信息查询权限。
  ```
  GRANT CONNECT,SELECT_CATALOG_ROLE to xxxxx
  ```
- Oracle 原表的 **SELECT** 权限，用于数据全量迁移。
- [Oracle LogMiner同步准备](prepare_for_oracle_logminer.md)，用于实现数据增量同步。

## 作为对端

- 库/表/列的元信息查询权限。
  ```
  GRANT CONNECT,SELECT_CATALOG_ROLE to xxxxx
  ```
- **CREATE TABLE**、**CREATE INDEX**、**COMMENT ON [TABLE/COLUMN]** 权限，用于结构迁移时在对端创建表结构。
- **ALTER TABLE** 权限，用于同步来自源端的 DDL 变更。
- 对应的 Oracle 表 **INSERT**、**UPDATE**、**DELETE** 权限，用于同步源端数据变更。
