---
id: privs_for_hana
title: SAP HANA 需要的权限
description: CloudCanal 在做 SAP HANA 源端或对端的数据迁移同步时，需要提供的账号有一些赋权。
---

本文介绍 SAP HANA 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

## 作为源端
- **全量迁移**：迁移库表的 **SELECT** 权限。   
  示例:
  ```sql
  -- 创建同步用户 (CC_TEST_USER)
  CREATE USER CC_TEST_USER password "Clougence@2021" NO FORCE_FIRST_PASSWORD_CHANGE;
            
  -- 授权同步用户 (CC_TEST_USER) 需要同步的 SCHEMA (CANAL_TEST) 权限
  GRANT SELECT ON SCHEMA CANAL_TEST TO CC_TEST_USER;      
  ``` 
- **增量同步**：
    - 授予用户增量表 **TRIGGER**、**SELECT** 权限，增量同步需要创建触发器、查询。
    - 触发器会将增量变更数据写入 **增量变更表**，需要 **SELECT**、**INSERT**、**CREATE ANY** 权限。
    - 同步过程需要检查事务是否提交，需要整个 **CATALOG** 的 **READ** 权限
    - **业务账号** 需要增量表所在 **SCHEMA** 的 **INSERT** 权限。   
    示例:
    ```sql
    -- 创建同步用户 (CC_TEST_USER)
    CREATE USER CC_TEST_USER password "Clougence@2021" NO FORCE_FIRST_PASSWORD_CHANGE;

    -- 授权同步用户 (CC_TEST_USER) 需要同步的表权限（示例：把 table_x 换成真实表名）
    GRANT SELECT  ON "CANAL_TEST"."table_x" TO "CC_TEST_USER";
    GRANT TRIGGER ON "CANAL_TEST"."table_x" TO "CC_TEST_USER";
          
    -- 授权同步用户 (CC_TEST_USER) 增量变更表所在 SCHEMA (SYSTEM) 权限
    GRANT SELECT ON SCHEMA SYSTEM TO CC_TEST_USER;
    GRANT INSERT ON SCHEMA SYSTEM TO CC_TEST_USER;
    GRANT CREATE ANY ON SCHEMA SYSTEM TO CC_TEST_USER;
          
    -- 授权同步用户 (CC_TEST_USER) 整个 CATALOG 的 READ 权限
    GRANT CATALOG READ TO CC_TEST_USER;
  
    -- 授权业务用户 (BUSINESS_USER) 增量变更表所在 SCHEMA (SYSTEM) 权限
    GRANT INSERT ON SCHEMA SYSTEM TO BUSINESS_USER;
    ```

## 作为对端
**全量迁移/增量同步**：迁移库表的 **INSERT**、**UPDATE**、**DELETE** 权限。
