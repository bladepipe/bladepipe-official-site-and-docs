---
id: prepare_for_dameng_logminer
title: Dameng LogMiner 同步准备
description: CloudCanal 使用 LogMiner 来同步 Dameng。本文介绍同步前的准备动作。
---
CloudCanal 使用 LogMiner 实现 Dameng 增量数据同步。本文介绍数据同步前的准备工作。

## 准备动作 1 - 开启日志归档

1. 检查当前数据库是否开启归档。如果 `ARCH_INI` 参数为 1 则忽略该准备动作。
   ```sql
   SELECT PARA_NAME,PARA_VALUE FROM V$DM_INI WHERE PARA_NAME = 'ARCH_INI';
   ```
2. 修改 dm.ini 参数。
   ```text
   ARCH_INI = 1
   ```
3. 配置 dmarch.ini 本地归档。
   ```text
   [ARCHIVE_LOCAL1]
   ARCH_TYPE = LOCAL
   ARCH_DEST = d:\dmdata\arch
   ARCH_FILE_SIZE = 128 #单位Mb
   ARCH_SPACE_LIMIT = 0 #单位Mb，0表示无限制，范围1024~4294967294M
   ```

## 准备动作 2 - 修改归档日志模式

1. 检查当前数据库日志模式。如果 `RLOG_APPEND_LOGIC` 参数为 2 则忽略该准备动作。
   ```sql
   SELECT PARA_NAME,PARA_VALUE FROM V$DM_INI WHERE PARA_NAME = 'RLOG_APPEND_LOGIC';
   ```
2. 修改 dm.ini 参数。
      ```text
   RLOG_APPEND_LOGIC = 2
   ```

   :::info
   具体参考：[Logmnr 接口使用说明](https://eco.dameng.com/document/dm/zh-cn/pm/logmnr-interface-instructions)
   :::

## 准备动作 3 - 达梦 DSC 额外配置

   若达梦实例不是 DSC（Data Shared Cluster），则忽略该动作。


1. 新建表结构，用于 CloudCanal 同步全局 LSN。
   ```sql
   CREATE TABLE "CC_DSC_SYNC_TABLE" (
      "ID" INT NOT NULL,
      "GMT_MODIFIED" DATETIME(6),
      NOT CLUSTER PRIMARY KEY("ID")
   );
   ```
2. 在 CloudCanal 控制台添加数据源时，配置以下额外参数：
     - **isDscNode**：是否为 DSC 集群，参数值改为 true。
     - **dscHosts**：DSC 源端所有节点信息，参数值示例：ip1:port1,ip2:port2,ip3:port3...
     - **dscSyncLsnTable**：DSC 用于同步全局 LSN 的表名称，需填写第 1 步创建的表名以及数据库名。参数值示例："DbName"."TableName"