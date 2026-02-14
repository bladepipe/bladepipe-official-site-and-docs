---
id: privs_for_pg
title:  Required Privileges for PostgreSQL
description: It describes how to enable PostgreSQL heartbeat in Incremental stage when there is no data written to PostgreSQL, so that the latency can be displayed correctly.
---
This article describes the permissions required by BladePipe for database accounts when PostgreSQL is used as the Source or Target DataSource for migrating or synchronizing data.

## As the Source
- **Full Data Migration**: The **SELECT** and **REFERENCES** permissions.    
  e.g.:
  ```sql
  -- Create a user (bp_test_user)
  CREATE USER bp_test_user WITH PASSWORD 'Bladepipe@2021';
          
  -- Grant the user (bp_test_user) the required permission on schema (public)
  GRANT SELECT,REFERENCES ON ALL TABLES IN SCHEMA public TO bp_test_user; 
  ``` 
- **Incremental Data Synchronization**:
  - The **CREATE** permission on the databases to be synchronized.
  - The **OWNER** permission on the tables to be synchronized.
  - The **REPLICATION** permission on the user.
    e.g.:
    ```sql
    -- Create a user (bp_test_user)
    CREATE USER bp_test_user WITH PASSWORD 'Bladepipe@2021';
                             
    -- Grant the user (bp_test_user) the role of owner of the tables to be synchronized (postgres)
    GRANT postgres TO bp_test_user;
          
    -- Alter user (bp_test_user) REPLICATION
    ALTER USER bp_test_user REPLICATION;
    ```
  - The permissions to create triggers and tables to enable **DDL synchronization** in DataJobs.
    e.g.:
    ```sql
    -- Create a DDL capture table (bp_pg_ddl_capture_tab)
    CREATE TABLE IF NOT EXISTS public.bp_pg_ddl_capture_tab(
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
          
    -- Create a DDL capture function (bp_pg_ddl_capture_func)
    CREATE OR REPLACE FUNCTION public.bp_pg_ddl_capture_func() RETURNS event_trigger
      LANGUAGE plpgsql
      SECURITY INVOKER
    AS $$
    declare ddl text;
    begin if (tg_tag in ('DROP INDEX','ALTER TABLE','DROP TABLE','CREATE INDEX','CREATE TABLE')) then
      select current_query() into ddl;
      insert into public.bp_pg_ddl_capture_tab(biz_ddl,biz_user,biz_txid,biz_tag,biz_db,biz_schema,biz_client_addr,biz_client_port,biz_event_time) values (ddl,current_user,cast(txid_current() as varchar(16)),tg_tag,current_database(),current_schema,inet_client_addr(),inet_client_port(),current_timestamp);
    end if;
    end;
    $$
          
    -- Grant the related permissions
    GRANT USAGE ON SCHEMA public TO public;
    GRANT SELECT,INSERT,DELETE ON TABLE public.bp_pg_ddl_capture_tab TO public;
    GRANT SELECT,USAGE ON SEQUENCE public.bp_pg_ddl_capture_tab_id_seq TO public;
    GRANT EXECUTE ON FUNCTION public.bp_pg_ddl_capture_func() TO public;
          
    -- Create a DDL event trigger (bp_pg_ddl_capture_event)
    CREATE EVENT TRIGGER bp_pg_ddl_capture_event ON ddl_command_end EXECUTE PROCEDURE public.bp_pg_ddl_capture_func();
    ALTER EVENT TRIGGER bp_pg_ddl_capture_event ENABLE always;
    ```

## As the Target
**Full Data Migration/Incremental Data Synchronization**: The **INSERT**, **UPDATE**, **DELETE**, **DDL** permissions.


