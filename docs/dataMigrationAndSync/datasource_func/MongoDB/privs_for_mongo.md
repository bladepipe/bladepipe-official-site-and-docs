---
id: privs_for_mongo
title:  Required Privileges for MongoDB
description: To migrate or sync data from or to MongoDB instances, BladePipe requires certain user permissions to be granted.
---

## Overview
To migrate or sync data from or to MongoDB instances, BladePipe requires certain user permissions to be granted.

:::info
The permission requirements are also applicable to Aliyun MongoDB and AWS DocumentDB.
:::

## As the Source
- **Full Data**: **SELECT** permission for the collections to be migrated.   
  e.g.:
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
- **Incremental**: **ChangeStream** permission for MongoDB instance.    
  e.g.:
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
- **Heartbeat** (optional): **SELECT**, **INSERT** and **UPDATE** permissions for the heartbeat database.    
  e.g.:
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
## As the Target
**Full Data/Incremental**: **INSERT**, **UPDATE** and **DELETE** permissions for the collections to be migrated.   
e.g.:
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
