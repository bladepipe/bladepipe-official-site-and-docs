---
id: sap_hana_ddl
title: SAP HANA 源端表结构变更
description: SAP HANA 源端通过触发器捕获增量数据，不支持 DDL 同步；如果有 DDL 变更，需要按以下方式处理。
---

## 简述

CloudCanal 通过触发器捕获 SAP HANA 源端增量数据，不支持 DDL 同步。如果有 DDL 变更，需要按以下方式处理。

## 前置条件

- CloudCanal 版本 >= 3.3.3.0
- 任务配置中 **增量表模式** 为 **表级增量表**（即确认源端 [数据源配置](../../../operation/job_manage/job_op/job_params#操作步骤) **incrTableMode** 参数值为 **TABLE_LEVEL_CDC_TABLE**）。

## 操作步骤

### 新增列
当 SAP HANA **新增列** 时，需要执行以下动作：
1. 在 **源表**、**CDC 表**、**目标端表**，分别执行新增列语句。
```sql
-- 源端新增列
ALTER TABLE "SYSTEM"."TEST"
ADD ("COL_4" INTEGER NOT NULL);
    
-- CDC 表新增列（CDC 表名规则：${DB_NAME}_${SCHEMA_NAME}_${TABLE_NAME}_CDC_TABLE）
ALTER TABLE "SYSTEM"."SYSTEMDB_SYSTEM_TEST_CDC_TABLE"
ADD ("COL_4" INTEGER NOT NULL);
    
-- 目标端新增列（以 MySQL 为例）
ALTER TABLE `SYSTEMDB`.`TEST`
ADD COLUMN `COL_5` INT NOT NULL;
```
2. [修改订阅](../../../operation/job_manage/job_op/edit_job)，剔除对应表。
3. [修改订阅](../../../operation/job_manage/job_op/edit_job)，新增对应表，并勾选 **全量数据初始化**。

### 删除列
当 SAP HANA **删除列** 时，需要执行以下动作：
1. 在 **源表**、**CDC 表**、**目标端表**，分别执行删除列语句。
```sql
-- 源端删除列
ALTER TABLE "SYSTEM".TEST 
DROP ("COL_4");
  
-- CDC 表删除列（CDC 表名规则：${DB_NAME}_${SCHEMA_NAME}_${TABLE_NAME}_CDC_TABLE）
ALTER TABLE "SYSTEM"."SYSTEMDB_SYSTEM_TEST_CDC_TABLE" 
DROP ("COL_4");
  
-- 目标端删除列（以 MySQL 为例）
ALTER TABLE `SYSTEMDB`.`TEST`
DROP COLUMN `COL_5`;
```
2. [修改订阅](../../../operation/job_manage/job_op/edit_job.md)，剔除对应表。
3. [修改订阅](../../../operation/job_manage/job_op/edit_job.md)，新增对应表，并勾选 **全量数据初始化**。

### 修改列名
当 SAP HANA **修改列名** 时，需要执行以下动作：
1. 在 **源表**、**CDC 表**、**目标端表**，分别执行修改列名语句。
```sql
-- 源端修改列名
RENAME COLUMN "SYSTEM"."TEST"."COL_4" 
TO "COL_4_NEW";
  
-- CDC 表修改列名（CDC 表名规则：${DB_NAME}_${SCHEMA_NAME}_${TABLE_NAME}_CDC_TABLE）
RENAME COLUMN "SYSTEM"."SYSTEMDB_SYSTEM_TEST_CDC_TABLE"."COL_4" 
TO "COL_4_NEW";
  
-- 目标端修改列名（以 MySQL 为例）
ALTER TABLE `SYSTEM`.`TEST` 
CHANGE COLUMN `COL_4` `COL_4_NEW` INT NOT NULL;
```
2. [修改订阅](../../../operation/job_manage/job_op/edit_job.md)，剔除对应表。
3. [修改订阅](../../../operation/job_manage/job_op/edit_job.md)，新增对应表，并勾选 **全量数据初始化**。

### 修改列类型、长度
当 SAP HANA **修改列类型、长度** 时，需要执行以下动作：

在 **源表**、**CDC 表**、**目标端表**，分别执行修改列类型、长度语句。
  ```sql
  -- 源端修改列类型、长度
  ALTER TABLE "SYSTEM"."TEST" 
    ALTER ("COL_4_NEW" VARCHAR(255) NULL);

  -- CDC 表修改列类型、长度（CDC 表名规则：${DB_NAME}_${SCHEMA_NAME}_${TABLE_NAME}_CDC_TABLE）
  ALTER TABLE "SYSTEM"."SYSTEMDB_SYSTEM_TEST_CDC_TABLE" 
    ALTER ("COL_4_NEW" VARCHAR(255) NULL);

  -- 目标端修改列类型、长度（以 MySQL 为例）
  ALTER TABLE `SYSTEM`.`TEST` 
    MODIFY COLUMN `COL_4_NEW` VARCHAR(255) NOT NULL;
  ```

### 修改表名
1. [修改订阅](../../../operation/job_manage/job_op/edit_job.md)，剔除对应表。
2. 修改表名后，[修改订阅](../../../operation/job_manage/job_op/edit_job.md)，新增对应表，并勾选 **全量数据初始化**。


:::info
SAP HANA 源端同步任务被删除或修改订阅剔除表后，CloudCanal 不会自动删除 CDC 表。

如需删除 CDC 表，请手动执行 `DROP TABLE` 操作。
:::