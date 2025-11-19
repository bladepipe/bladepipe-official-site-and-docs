---
id: hana_pg_sync
description: Hana 到 PostgreSQL 数据迁移同步,具备可视化创建、结构迁移、数据初始化、数据同步、自动化流程等能力
title: Hana 到 PostgreSQL 数据同步
date: 2024-09-21
authors: juantu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/hana_pg_sync.png 
slug: /data_sync_sample/hana_pg_sync
---

## 简述
本篇文章主要介绍如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-hana-pg-sync) 构建一条 Hana 到 PostgreSQL 的数据同步链路。

## 技术点

### 表级别 CDC 表
CloudCanal 在实现 Hana 源端增量同步时，最初采用的是单 CDC 表的模式，即所有订阅表的增量数据（插入、更新、删除）通过触发器统一写入同一张 CDC 表。这样设计的初衷是简化架构和实现方式，但是同时也带来了一些问题。

* **触发器执行效率低**：采用单个 CDC 表时，我们将订阅表的字段值拼接成 JSON 字符串。虽然这种方式统一，但增加了触发器的复杂性。当字段数量超过 300 个时，触发器效率显著下降，影响同步性能。

* **增量数据积压**：所有订阅表的变更数据集中写入单个 CDC 表，当 A 表增量数据较多而 B 表较少时，混合写入会导致无法及时处理 B 表数据，造成 B 表数据积压，影响同步及时性。

后续我们对于单 CDC 表模式进行了优化。本次优化实现了表级别的 CDC 表设计，每张源表都对应一张 CDC 表，CDC 表的结构仅在原表结构的基础上增加了几个位点字段，用于增量同步。

**原表**：

```sql
CREATE COLUMN TABLE "SYSTEM"."TEST" (
  "TEST1" INTEGER NOT NULL ,
  "TEST2" INTEGER NOT NULL ,
  "TEST3" INTEGER,
  CONSTRAINT "TEST_KEY" PRIMARY KEY ("TEST1", "TEST2")
)
```

**CDC 表**：

```sql
CREATE COLUMN TABLE "SYSTEM"."SYSTEM_TEST_CDC_TABLE" (
  "TEST1" INTEGER,
  "TEST2" INTEGER,
  "TEST3" INTEGER,
  "__$DATA_ID" BIGINT NOT NULL ,
  "__$TRIGGER_ID" INTEGER NOT NULL ,
  "__$TRANSACTION_ID" BIGINT NOT NULL ,
  "__$CREATE_TIME" TIMESTAMP,
  "__$OPERATION" INTEGER NOT NULL 
);
-- other index
```

**触发器 (INSERT)**：
```sql
CREATE TRIGGER "SYSTEM"."CLOUD_CANAL_ON_I_TEST_TRIGGER_TEST" AFTER INSERT ON "SYSTEM"."TEST" REFERENCING NEW ROW NEW FOR EACH ROW 
BEGIN 
  DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN END; 
  IF 1=1 THEN 
    INSERT INTO "SYSTEM"."SYSTEM_TEST_CDC_TABLE" ("__$DATA_ID", "__$TRIGGER_ID", "__$TRANSACTION_ID", "__$CREATE_TIME", "__$OPERATION", "TEST1", "TEST2", "TEST3") 
    VALUES( 
      "SYSTEM"."CC_TRIGGER_SEQ".NEXTVAL, 
      433, 
      CURRENT_UPDATE_TRANSACTION(), 
      CURRENT_UTCTIMESTAMP, 
      2, 
      :NEW."TEST1" ,
      :NEW."TEST2" ,
      :NEW."TEST3"  
    ); 
  END IF; 
END;
```

采用这种方式有以下几个好处：
 * 表级别 CDC 表更加独立，方便进行多次订阅。
 * 触发器只需要执行 INSERT 语句，因此对于字段较多的表也能够快速执行。
 * 扫描消费 CDC 数据时，不需要做额外的处理，消费更简单。


## 操作示例

### 步骤 1: 安装 CloudCanal

请参考 [全新安装(Docker Linux/MacOS)](https://www.clougence.com/cc-doc/productOP/docker/install_linux_macos)，下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-hana-pg-sync)。

### 步骤 2: 添加数据源

登录 **CloudCanal 控制台**，点击 **数据源管理** > **新增数据源**。

### 步骤 3: 创建任务

1. 点击 **同步任务** > [**创建任务**](https://www.clougence.com/cc-doc/operation/job_manage/create_job/create_full_incre_task)。
2. 配置源和目标数据源。
   1. 选择源和目标实例，并分别点击 **测试连接**。
   2. 在目标实例下方 **高级配置** 中选择源端 CDC 表模式：**单 CDC 表** / **表级 CDC 表**。
3. 选择 **数据同步** 并勾选 **全量初始化**。
4. 选择需要同步的表。
5. 选择表对应的列。

   :::info
   如果需要选择同步的列，可先行在对端创建好表结构。
   :::

6. 点击 **确认创建**。

   :::info
   任务创建过程将会进行一系列操作，点击 **同步设置** > [**异步任务**](https://www.clougence.com/cc-doc/operation/job_setting/console_job_manage)，找到任务的创建记录并点击 **详情** 即可查看。
   
   Hana 源端的任务创建会有以下几个步骤：
   - 结构迁移
   - 初始化 Hana CDC 表以及对应触发器
   - 分配任务执行机器
   - 创建任务状态机
   - 完成任务创建
   :::
   
7. 等待任务自动流转。

   :::info
   当任务创建完成，CloudCanal 会自动进行任务流转，其中的步骤包括：
   - **结构迁移**: Hana 源端的表定义将会迁移到对端，如果同名表在对端已经存在，则会忽略。
   - **全量数据迁移**: 已存在的存量数据将会完整迁移到对端。
   - **增量数据同步**: 增量数据将会持续地同步到对端数据库，并且保持实时（秒级别延迟）。
   :::

## 总结
本文介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-hana-pg-sync) 进行 Hana 到 PostgreSQL 数据迁移同步，操作简便的同时带来高效的数据同步体验，大大加快了企业的数据流通与数据平台构建。
