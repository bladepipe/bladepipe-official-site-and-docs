---
id: prepare_for_oracle_logminer
title: Oracle LogMiner 同步准备
description: CloudCanal使用LogMiner来同步Oracle。本文介绍同步前的准备动作。
---
CloudCanal 使用 LogMiner 实现 Oracle 增量数据同步。本文介绍数据同步前的准备工作。

## 准备动作 1 - 开启 LogMiner
### 非 RAC 模式 Oracle
1. 使用 DBA 权限的账号登录 Oracle (e.g.,sqlplus)。
2. 检查数据库日志模式。
    - 如果 log_mode 返回 `ARCHIVELOG` 则忽略后续步骤。
    - 如果 log_mode 返回  `NOARCHIVELOG` 则继续后续步骤。
    ```sql
    select dbid,name,log_mode from v$database;
    ```

3. 关闭当前数据库。
    ```sql
    shutdown immediate;
    ```

4. 启动并挂载数据库。
    ```
    startup mount;
    ```

5. 开启归档日志，并打开数据库。
    ```sql
    alter database archivelog;
    alter database open read write;
    ```

### RAC 模式 Oracle

1. 在 Oracle RAC 的某一个节点的 shell 中，关闭、启动、挂载某一个数据库。
    ```
    srvctl stop database -d <数据库名字>
    srvctl start database -d <数据库名字> -o mount
    ```

2. 使用 DBA 权限账号登录该数据库 (e.g.,sqlplus)，并开启归档。
    ```sql
    alter database archivelog;
    ```

3. 在 Oracle RAC 的某一个节点的 shell 中, 重启数据库。
    ```
    srvctl stop database -d <数据库名字>
    srvctl start database -d <数据库名字>
    ```

4. 使用 DBA 权限账号登录该数据库 (e.g.,sqlplus)，检查该数据库是否是归档日志模式。
    ```
    select log_mode from v$database;
    ```

## 准备动作 2 - 开启补全日志 (Supplemental Logging)

1. 检查数据库是否开启补全日志。
    :::info
    如果以下4个 SQL 字段值都返回 `YES` 或者  `Implicit`，则略过此准备动作。
    :::
    ```sql
    select supplemental_log_data_min min, supplemental_log_data_pk pk,supplemental_log_data_ui ui, supplemental_log_data_all all_cols from v$database;
    ```

2. 开启库级别最小补全日志模式。
    - 多租户数据库 (PDB)
    ```sql
    alter session set container=cdb$root;

    alter database add supplemental log data;
    ```
    - 标准数据库 (CDB)
    ```sql
    alter database add supplemental log data;
    ```
3.  **(选择 1，推荐)** 开启库级别完整补全日志模式。
    - 多租户数据库 (PDB)
    ```sql
    alter session set container=cdb$root;

    alter database add supplemental log data (all,primary key,unique) columns;
    ```
    - 标准数据库 (CDB)
    ```sql
    alter database add supplemental log data (all,primary key,unique) columns;
    ```
     **(选择 2)** **准备动作 3** 中开启表补全日志。
    ```sql
    alter table schema名.表名 add supplemental log data (all,primary key,unique) columns;
    ```
  

## 准备动作 3 - 创建账号和授权

### 多租户数据库（PDB）

**适用 Oracle 版本**：12c、18c、19c、21c。

1. 在 `cdb$root` 下创建一个普通用户，通常格式为 `c##<你指定的名字>`。
    ```sql
    alter session set container=cdb$root;

    create user <你的用户名> identified by <你的密码> container=all;
    ```

2. 授予通用权限。
    ```sql
    grant create session, select_catalog_role,logmining, execute_catalog_role to <你的用户名> container=all;
    ```
    :::tip
    部分 Oracle 版本中可能不存在 `logmining` 权限。如果您的 Oracle 版本中不存在该权限，上述语句中可删除 `logmining`。
    :::

3. 授予 LogMiner 相关权限。
    ```sql
    grant execute on sys.dbms_logmnr to <你的用户名>;
    grant execute on sys.dbms_logmnr_d to <你的用户名>;

    grant select on v_$logmnr_contents to <你的用户名>;
    grant select on v_$archived_log to <你的用户名>;
    grant select on v_$log to <你的用户名>;
    grant select on v_$logfile to <你的用户名>;
    grant select on v_$logmnr_logs to <你的用户名>;
    ```

4. 授予业务表权限。
    ```sql
    alter session set container=<pdb名称>;

    grant select,alter on <schema>.<table> to <你的用户名>;
    ...将你要迁移同步的表进行select,alter(自动开补全日志)权限授予...
    ```

### 标准数据库 (CDB)

**适用 Oracle 版本**：11g、12c、18c、19c、21c。


1. 创建一个普通用户。
    ```sql
    create user <你的用户名> identified by <你的密码>;
    ```

2. 授予通用权限。
    ```sql
    grant create session, select_catalog_role, logmining, select any transaction, select any table to <你的用户名>;
    ```
    :::tip
    部分 Oracle 版本中可能不存在 `logmining` 权限。如果您的 Oracle 版本中不存在该权限，上述语句中可删除 `logmining`。
    :::

3. 授予 LogMiner 相关权限。
    ```sql
    grant execute on sys.dbms_logmnr to <你的用户名>;
    grant execute on sys.dbms_logmnr_d to <你的用户名>;

    grant select on v_$archived_log to <你的用户名>;
    grant select on v_$logmnr_contents to <你的用户名>;
    grant select on v_$log to <你的用户名>;
    grant select on v_$logfile to <你的用户名>;
    grant select on v_$logmnr_logs to <你的用户名>;
    ```

4. 授予业务表权限。
    ```sql
    grant select,alter on <schema>.<table> to <你的用户名>;
    ...将你要迁移同步的表进行select,alter(自动开补全日志)权限授予...
    ```

