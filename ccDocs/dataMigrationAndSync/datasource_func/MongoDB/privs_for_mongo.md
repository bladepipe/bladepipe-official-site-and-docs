---
id: privs_for_mongo
title: MongoDB 需要的权限
description: CloudCanal 在做 MongoDB 源端或对端的数据迁移同步时，需要提供的账号有一些赋权。
---
本文介绍 MongoDB 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

:::info
本文也同样适用于 阿里云 MongoDB、AWS DocumentDB、MongoDB Atlas。
:::

## 作为源端
- **全量迁移**：迁移 **集合** 的 **SELECT** 权限。   
  示例:
  ```javascript
    db.createRole({
        role: "sync",
        privileges: [
            {
                resource: { db: "", collection: "" },
                actions: ["listCollections", "listDatabases", "listIndexes"]
            }],
        roles: []
    });
  ```
- **增量同步**：MongoDB 实例的 **ChangeStream** 权限。   
  示例:
  ```javascript
    db.createRole({
        role: "sync",
        privileges: [
            {
                resource: { db: "", collection: "" },
                actions: ["find", "changeStream", "modifyChangeStreams", "listChangeStreams"]
            }],
        roles: []
    });
  ```
- **源端心跳**（可选）：心跳库的 **SELECT**、**INSERT**、**UPDATE** 权限。   
  示例:
  ```javascript
    db.createRole({
        role: "sync",
        privileges: [
            {
                resource: { db: "", collection: "" },
                actions: ["insert", "update", "listCollections", "listDatabases", "listIndexes"]
            }],
        roles: []
    });
  ```
## 作为对端
**全量迁移/增量同步**：迁移 **集合** 的 **INSERT**、**UPDATE**、**DELETE** 权限。   
示例:
  ```javascript
    db.createRole({
        role: "sync",
        privileges: [
            {
                resource: { db: "", collection: "" },
                actions: ["insert", "update", "delete"]
            }],
        roles: []
    });
  ```
