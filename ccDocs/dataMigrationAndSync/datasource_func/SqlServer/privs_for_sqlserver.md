---
id: privs_for_sqlserver
title: SQL Server 需要的权限
description: CloudCanal 在做 SQLServer 作为源/对端的数据迁移同步时，需要提供的账号有一些赋权。
---

本文介绍 SQL Server 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

如果添加数据源时使用的 SQL Server 账号已经具有 DBA/SA 权限，则可忽略以下具体权限申请。

## 账号创建

若已准备好专用同步账号，可跳过本节。

1. 创建 CloudCanal 登录账号用于连接数据库。
    ```sql
    CREATE LOGIN [cloudcanal] 
      WITH PASSWORD=N'cloudcanal', 
          DEFAULT_DATABASE=[master], 
          CHECK_EXPIRATION=OFF, 
          CHECK_POLICY=OFF
    ```
2. 授权 CloudCanal 登录账号可以连接数据库。
    ```sql
    GRANT CONNECT SQL TO [cloudcanal]
    ```

## 作为源端权限
CloudCanal 支持两种 CDC 模式：**动态 CDC 模式** 和 **静态 CDC 模式**，详细说明请参考 [SQL Server 源端同步模式说明](sync_cdc_mode.md)。

### 动态 CDC 模式

1. 切换到 your_source_db 源端数据库，为下一步分配数据库用户做准备。
    ```sql
    USE [your_source_db]
    ```
2. 为 CloudCanal 登录账号分配同名数据库用户。
    ```sql
    CREATE USER [cloudcanal] FOR LOGIN [cloudcanal]
    ```
3. 为 your_source_db 数据启用 CDC，该命令需要 sysadmin 服务器角色，应由 DBA 单独操作。
    ```sql
    exec [your_source_db].sys.sp_cdc_enable_db
    ```
4. 为 CloudCanal 登录账号分配 db_owner 身份，新建任务创建 CDC 表需要该权限。
    ```sql
    ALTER ROLE [db_owner] ADD MEMBER [cloudcanal]
    ```

### 静态 CDC 模式
CloudCanal 在静态模式会根据账号是否拥有 **db_owner** 角色，分以下两种情况：
  ```sql
  ALTER ROLE [db_owner] ADD MEMBER [cloudcanal]
  ```
- 账号已在 db_owner
  - CloudCanal 会自动执行表级 CDC 的启用，无需手动运行 `sys.sp_cdc_enable_table`。

- 账号非 db_owner（或备库）
  - 无法自行启用订阅，该步骤需由 **DBA** 完成。

  :::info
  capture_instance 格式要求 db_schema_table_cc_static
  :::
  ```sql
  USE [your_source_db];
      
  -- 启用表级 CDC
  EXEC sys.sp_cdc_enable_table
  @source_schema       = 'dbo',
  @source_name         = 'YourTable',
  @role_name           = NULL,
  @capture_instance    = 'db_schema_table_cc_static',
  @supports_net_changes= 0;    
  ```
    - 只需对业务 Schema 及 CDC Schema 授予 **SELECT** 权限。
    ```sql
    USE [your_source_db];
    GRANT SELECT ON SCHEMA::<YourSchema> TO [cloudcanal];
    GRANT SELECT ON SCHEMA::cdc TO [cloudcanal];
    ```

- CDC 状态检测权限：
    ```sql
    USE msdb;
    GRANT SELECT ON DATABASE::msdb TO [cloudcanal];  
    ```

## 作为对端

如果已经具有 your_target_db 数据库的 db_owner 身份则无需下列授权操作。

1. 切换到 your_target_db 对端数据库，为下一步分配数据库用户做准备。
    ```sql
    USE [your_target_db]
    ```
2. 为 CloudCanal 登录账号分配同名数据库用户。
    ```sql
    CREATE USER [cloudcanal] FOR LOGIN [cloudcanal]
    ```
3. 授权结构迁移时在对端创建表结构。
    ```sql
    GRANT CREATE TABLE TO [cloudcanal]
    GRANT ALTER TO [cloudcanal]
    ```
4. 授权结构迁移过程中表/列备注信息的设置，以及增量 DDL 同步过程中同步源端表/列更名 DDL。
    ```sql
    GRANT EXECUTE TO [cloudcanal]
    ```
5. 授予对应的表 **INSERT**、**UPDATE**、**DELETE** 权限。
    ```sql
    GRANT INSERT TO [cloudcanal]
    GRANT UPDATE TO [cloudcanal]
    GRANT DELETE TO [cloudcanal]
    ```

### Schema 级授权
如果已经具有 your_target_db 数据库的 db_owner 身份则无需下列授权操作。

**单一 SCHEMA 授权**
1. 授权在 SCHEMA 下创建表。
    ```sql
    GRANT ALTER ON SCHEMA::[my_schema] TO [cloudcanal]
    GRANT EXECUTE ON SCHEMA::[my_schema] TO [cloudcanal]
    ```
2. 授予对应的表 **INSERT**、**UPDATE**、**DELETE** 权限。
    ```sql
    GRANT INSERT ON SCHEMA::[my_schema] TO [cloudcanal]
    GRANT UPDATE ON SCHEMA::[my_schema] TO [cloudcanal]
    GRANT DELETE ON SCHEMA::[my_schema] TO [cloudcanal]
    ```

**整体 SCHEMA 授权**
1. 授权在 SCHEMA 下创建表。
    ```sql
    GRANT ALTER ON SCHEMA::* TO [cloudcanal]
    GRANT EXECUTE ON SCHEMA::* TO [cloudcanal]
    ```
2. 授予对应的表 **INSERT**、**UPDATE**、**DELETE** 权限。
    ```sql
    GRANT INSERT ON SCHEMA::* TO [cloudcanal]
    GRANT UPDATE ON SCHEMA::* TO [cloudcanal]
    GRANT DELETE ON SCHEMA::* TO [cloudcanal]
    ```

