---
id: privs_for_tidb
title: TiDB 需要的权限
description: CloudCanal 在做 TiDB 源端或对端的数据迁移同步时，需要提供的账号有一些赋权。
---
本文介绍 TiDB 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

## 作为源端
- **全量迁移**：迁移库表的 **SELECT** 权限。
- **增量同步**：**INFORMATION_SCHEMA** 与 MySQL 库的 **SELECT** 权限。

## 作为对端
**全量迁移/增量同步**：迁移库表的 **INSERT**、**UPDATE**、**DELETE**、**DDL** 权限。

