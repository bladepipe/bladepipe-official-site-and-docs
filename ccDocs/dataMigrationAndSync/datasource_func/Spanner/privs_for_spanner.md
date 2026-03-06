---
id: privs_for_spanner
title: Spanner 权限要求
description: CloudCanal 在做 Spanner 作为源/对端的数据迁移同步时，需要提供的账号有一些赋权。
---

本文介绍 Spanner 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

## 作为源端

### 认证方式

需要提供具有访问 Spanner 实例和数据库足够权限的 Google Cloud 服务账号 (Service Account) JSON 凭证文件。

### 权限要求（最小权限配置）

需要在 Google Cloud 中创建一个**自定义 IAM 角色 (Custom Role)**，并精确包含以下必要权限。

CloudCanal 会在后台 **自动** 为您创建并管理持续复制所需的变更流（Change Stream）以及相关内部结构。

```
spanner.sessions.create
spanner.sessions.get
spanner.sessions.list
spanner.sessions.delete
spanner.databases.read
spanner.databases.select
spanner.databases.beginReadOnlyTransaction
spanner.databases.updateDdl
spanner.databaseOperations.get
monitoring.timeSeries.create
```

:::info
底层增量抽取强依赖 Cloud Spanner Change Streams API，该机制在运行过程中会主动向 Google Cloud Monitoring 写入客户端相关指标信息，并同时通过监控指标接口来获取流分区状态，从而确保变更数据持续地被捕获。
:::
