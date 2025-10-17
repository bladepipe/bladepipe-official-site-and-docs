---
id: privs_for_gaussdb
title: GaussDB 需要的权限
description: CloudCanal 在做 GaussDB 作为源/对端的数据迁移同步时，需要提供的账号有一些赋权。
---

本文介绍 GaussDB 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

## 作为源端
- **全量迁移**：迁移库表的 **SELECT**、**REFERENCES** 权限。    
  示例:
  ```sql
  -- 创建同步用户 (cc_test_user)
  CREATE USER cc_test_user WITH PASSWORD 'Clougence@2021';
          
  -- 授权同步用户 (cc_test_user) 需要同步的 SCHEMA (public) 权限
  GRANT SELECT,REFERENCES ON ALL TABLES IN SCHEMA public TO cc_test_user; 
  ``` 
- **增量同步**：同步用户的 **REPLICATION** 权限。  
    示例:
    ```sql
    -- 创建同步用户 (cc_test_user)
    CREATE USER cc_test_user WITH PASSWORD 'Clougence@2021';
    -- 开启同步用户 (cc_test_user) 的 REPLICATION
    ALTER USER cc_test_user REPLICATION;
    ```

## 作为对端
- **全量迁移/增量同步**：迁移库表的 **INSERT**、**UPDATE**、**DELETE**、**DDL** 权限。

