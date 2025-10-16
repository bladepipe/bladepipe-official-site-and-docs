---
id: privs_for_pg
title: PostgreSQL 需要的权限
description: CloudCanal 在做 PostgreSQL 源端或对端的数据迁移同步时，需要提供的账号有一些赋权。
---
本文介绍 PostgreSQL 作为源端或对端数据源迁移或同步数据时，CloudCanal 所需的账号权限。

## 作为源端
- **全量迁移**：迁移库表的 **SELECT**、**REFERENCES** 权限。    
  示例:
  ```sql
  -- 创建同步用户 (cc_test_user)
  CREATE USER cc_test_user WITH PASSWORD 'Clougence@2021';
          
  -- 授权同步用户 (cc_test_user) 需要同步的 SCHEMA (public) 权限
  GRANT SELECT,REFERENCES ON ALL TABLES IN SCHEMA public TO cc_test_user; 
  ``` 
- **增量同步**：
  - 同步数据库的 **CREATE** 权限。
  - 同步表的 **OWNER** 权限。
  - 同步用户的 **REPLICATION** 权限。  
    
    示例:
    ```sql
    -- 创建同步用户 (cc_test_user)
    CREATE USER cc_test_user WITH PASSWORD 'Clougence@2021';
                             
    -- 授权同步用户 (cc_test_user) 同步表 owner 的角色 (postgres)
    GRANT postgres TO cc_test_user;
          
    -- 开启同步用户 (cc_test_user) 的 REPLICATION
    ALTER USER cc_test_user REPLICATION;
    ```
  - 任务开启 **DDL 同步** 需要创建相关触发器和表。   
    
    示例:
    ```sql
    -- 创建 DDL 记录表 (cc_pg_ddl_capture_tab)
    CREATE TABLE IF NOT EXISTS public.cc_pg_ddl_capture_tab(
      id bigserial primary key,
      biz_ddl text,
      biz_user character varying(64) default current_user,
      biz_txid character varying(16) default txid_current()::varchar(16),
      biz_tag character varying(64),
      biz_db character varying(64) default current_database(),
      biz_schema character varying(64) default current_schema,
      biz_client_addr character varying(64) default inet_client_addr(),
      biz_client_port integer default inet_client_port(),
      biz_event_time timestamp default current_timestamp
    );
          
    -- 创建 DDL 捕获函数 (cc_pg_ddl_capture_func)
    CREATE OR REPLACE FUNCTION public.cc_pg_ddl_capture_func() RETURNS event_trigger
      LANGUAGE plpgsql
      SECURITY INVOKER
    AS $$
      declare ddl text;
      begin if (tg_tag in ('DROP INDEX','ALTER TABLE','DROP TABLE','CREATE INDEX','CREATE TABLE')) then
        select current_query() into ddl;
        insert into public.cc_pg_ddl_capture_tab(biz_ddl,biz_user,biz_txid,biz_tag,biz_db,biz_schema,biz_client_addr,biz_client_port,biz_event_time) values (ddl,current_user,cast(txid_current() as varchar(16)),tg_tag,current_database(),current_schema,inet_client_addr(),inet_client_port(),current_timestamp);
      end if;
    end;
    $$
          
    -- 开启相关权限
    GRANT USAGE ON SCHEMA public TO public;
    GRANT SELECT,INSERT,DELETE ON TABLE public.cc_pg_ddl_capture_tab TO public;
    GRANT SELECT,USAGE ON SEQUENCE public.cc_pg_ddl_capture_tab_id_seq TO public;
    GRANT EXECUTE ON FUNCTION public.cc_pg_ddl_capture_func() TO public;
          
    -- 创建 DDL 事件触发器 (cc_pg_ddl_capture_event)
    CREATE EVENT TRIGGER cc_pg_ddl_capture_event ON ddl_command_end EXECUTE PROCEDURE public.cc_pg_ddl_capture_func();
    ALTER EVENT TRIGGER cc_pg_ddl_capture_event ENABLE always;
    ```
  - 任务订阅 **Truncate** 需要创建相关触发器和表。
    ```sql
    -- 创建 Truncate 捕获函数
    CREATE OR REPLACE FUNCTION public.log_truncate() RETURNS trigger
      LANGUAGE plpgsql
    AS $func$
      BEGIN
        INSERT INTO public.cc_pg_ddl_capture_tab
        (biz_ddl, biz_user, biz_txid, biz_tag, biz_db, biz_schema, biz_client_addr, biz_client_port, biz_event_time)
        VALUES
          ('TRUNCATE ' || quote_ident(TG_TABLE_SCHEMA) || '.' || quote_ident(TG_TABLE_NAME),
           current_user,
           txid_current()::varchar(16),
           'ALTER TABLE', -- 注意：5.2.0.0 及以上版本这里改成 'TRUNCATE'
           current_database(),
           TG_TABLE_SCHEMA,
           inet_client_addr(),
           inet_client_port(),
           clock_timestamp());
        RETURN NULL;
      END;
    $func$;
  
    -- 只针对 public.test_table 建触发器
    DROP TRIGGER IF EXISTS cc_trunc_test_table ON public.test_table;
    CREATE TRIGGER cc_trunc_test_table
      AFTER TRUNCATE ON public.test_table
      FOR EACH STATEMENT
      EXECUTE FUNCTION public.log_truncate();
    ```
- **最小化增量同步权限**
  
  当同步用户不是表的 **OWNER**，也没有被授予表 **OWNER** 角色时，依然可以通过以下方式实现增量同步。 
  - 同步用户的 **REPLICATION** 权限。

    示例:
    ```sql
    -- 创建具备 REPLICATION 权限的用户
    CREATE USER cc_test_user WITH PASSWORD '123456' REPLICATION;
  
    -- 允许连接数据库
    GRANT CONNECT ON DATABASE postgres TO cc_test_user;
  
    -- 允许访问 schema
    GRANT USAGE ON SCHEMA public TO cc_test_user;  
    ```
    :::info
    此账号可用于 CloudCanal 连接数据库执行逻辑复制，但无法修改表结构或创建 publication。
    :::

  - 由有权限的账号执行以下操作：

    因为同步账号没有 **OWNER** 或 **CREATE PUBLICATION** 权限，这些操作必须由表的 **OWNER** 或 **高权限用户** 执行：
      ```sql
      -- 开启全字段变更捕获（避免 UPDATE/DELETE 时缺少非主键列值）
      ALTER TABLE public.two_pk_table REPLICA IDENTITY FULL;

      -- 创建 Publication，用于增量同步
      -- 命名规则：<任务名> + "_increment"
      -- 例如任务名 canalo1r7j9115mt，则 publication 名称为 canalo1r7j9115mt_increment
      CREATE PUBLICATION <任务名>_increment FOR TABLE public.two_pk_table;
      ```
  
## 作为对端
**全量迁移/增量同步**：迁移库表的 **INSERT**、**UPDATE**、**DELETE**、**DDL** 权限。

