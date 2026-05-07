---
id: privs_for_obo
title: OceanBase for Oracle 需要的权限
description: CloudCanal 在做 OceanBase for Oracle 源端或对端的数据迁移同步时，需要提供的账号有一些赋权。
---

本文介绍 OceanBase for Oracle 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

## 必需权限

- 数据库连接权限。
  ```sql
  GRANT CONNECT TO '<your_account>';
  ```

- 库表元信息查询权限。

  - 可选 1（推荐）
    ```sql
    GRANT SELECT_CATALOG_ROLE TO '<your_account>';
    ```

  - 可选 2（最小化权限）
    ```sql
    GRANT SELECT ON SYS.ALL_USERS TO '<your_account>';
    GRANT SELECT ON SYS.ALL_TABLES TO '<your_account>';
    GRANT SELECT ON SYS.ALL_TAB_COMMENTS TO '<your_account>';
    GRANT SELECT ON SYS.ALL_CONSTRAINTS TO '<your_account>';
    GRANT SELECT ON SYS.ALL_CONS_COLUMNS TO '<your_account>';
    GRANT SELECT ON SYS.ALL_INDEXES TO '<your_account>';
    GRANT SELECT ON SYS.ALL_IND_COLUMNS TO '<your_account>';
    GRANT SELECT ON SYS.ALL_TAB_COLS TO '<your_account>';
    GRANT SELECT ON SYS.ALL_COL_COMMENTS TO '<your_account>';
    ```

## 作为源端

### 全量迁移

- 原表的 **SELECT** 权限，用于数据全量迁移。

## 作为对端

- **CREATE TABLE**、**CREATE INDEX**、**COMMENT ON [TABLE/COLUMN]** 权限，用于结构迁移时在对端创建表结构。
- **ALTER TABLE** 权限，用于同步来自源端的 DDL 变更。
- 对应表的 **INSERT**、**UPDATE**、**DELETE** 权限，用于同步源端数据变更。
