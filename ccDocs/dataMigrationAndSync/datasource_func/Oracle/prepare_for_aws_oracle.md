---
id: prepare_for_aws_oracle
title: AWS RDS Oracle LogMiner 准备
description: 本文介绍 CloudCanal 同步 AWS RDS Oracle 数据前的准备动作。
---

CloudCanal 可以使用 LogMiner 实现对 AWS RDS Oracle 增量数据同步。

和自建的 Oracle 不同，AWS RDS Oracle 有专用指令 **开启归档模式** 以及 **初始化补全日志** 的方法。

本文介绍数据同步前的准备工作。

## 准备动作 1 - 开启归档模式

1. 使用 **主用户** 登录 Oracle (e.g.,sqlplus)。
2. 检查数据库日志模式。
    - 如果 log_mode 返回 `ARCHIVELOG` 则忽略后续步骤。
    - 如果 log_mode 返回  `NOARCHIVELOG` 则继续后续步骤。
    ```sql
    select dbid,name,log_mode from v$database;
    ```

3. 进入 **Aurora and RDS** > **数据库**。
4. 选择相应的 Oracle 库，点击右上角 **修改**
   - 确认开启 **启用自动备份**。
   - 确认 **备份保留期** 大于等于 1 天。

## 准备动作 2 - 开启补全日志 (Supplemental Logging)

1. 检查数据库是否开启补全日志。
    :::info
    如果 **supplemental_log_data_min** 返回 `Implicit`，**supplemental_log_data_pk** 和 **supplemental_log_data_all** 返回 `YES`，则略过此步骤。
    :::
    ```sql
    select supplemental_log_data_min min, supplemental_log_data_pk pk,supplemental_log_data_ui ui, supplemental_log_data_all all_cols from v$database;
    ```

2. 开启库级别完整补全日志。
    ```sql
    BEGIN
    rdsadmin.rdsadmin_util.alter_supplemental_logging('ADD', 'ALL');
    END;
   
    BEGIN
    rdsadmin.rdsadmin_util.alter_supplemental_logging('ADD', 'PRIMARY KEY');
    END;
    ```


