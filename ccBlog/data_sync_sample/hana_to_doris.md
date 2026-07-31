---
id: sap_hana_to_doris
description: SAP HANA 迁移到 Doris 怎么做？本文对比手动导出、批量 ETL、自建 CDC 和 CloudCanal 全增量同步四种方案，并梳理 HANA 到 Doris 迁移中的关键技术要点。
title: SAP HANA 到 Doris 数据迁移：4 种方案对比与迁移教程
date: 2026-07-22
authors: yuxia
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/hana-to-doris.png
slug: /data_sync_sample/sap_hana_to_doris
---

生产环境做 SAP HANA 到 Doris，同步链路要先解决结构迁移、全量初始化、增量捕获、Doris 写入和数据校验。

CloudCanal 支持 SAP HANA 到 Doris 的数据迁移和实时同步，可以把这些步骤放进一个任务流程里：先迁结构和全量数据，再用 Trigger 捕获 HANA 的 INSERT / UPDATE / DELETE，最后做数据校验和订正。

本文介绍如何构建 HANA 到 Doris 的同步链路。

## 为什么要把 SAP HANA 数据同步到 Doris？

SAP HANA 本身支持事务处理和分析处理，也常用于实时分析。但在生产环境里，把核心业务库和分析平台拆开，是比较常见的架构选择：让 HANA 继续服务 ERP、财务、供应链等核心系统，把面向报表、看板、明细查询的负载同步到 Doris。

### 减少核心库的分析压力

报表查询、明细查询和业务交易如果共用同一套 HANA 资源，高峰期容易互相影响。把分析查询交给 Doris，可以减少核心库上的大查询压力。

### 实时分析需求越来越强

经营看板、订单分析、库存分析、财务明细不再满足 T+1，很多团队希望分钟级甚至秒级刷新。此时，周期性离线导出往往跟不上数据新鲜度要求，需要持续同步 HANA 的新增、更新和删除。

### 分析层需要单独扩展

如果为了分析查询持续扩容 HANA，成本和运维压力都会增加。把分析负载同步到 Doris 后，分析侧可以按自己的查询量、并发量和数据规模扩展。

### 多源数据需要汇到一起分析

很多企业不只有 HANA，还会同时使用 MySQL、Oracle、SQL Server、PostgreSQL、Kafka 等系统。把 HANA 数据接入 Doris，可以和其他业务数据放到统一分析层里查询。

## HANA 到 Doris 同步技术点

### 数据同步整体流程

CloudCanal 实现 HANA 源端增量数据同步，主要使用其触发器捕获变更事件。整体流程如下：

- 安装触发器，通过触发器捕获增量变更数据
- 记录位点，记录增量数据同步的起点
- 执行全量数据迁移
- 执行增量数据同步

### 表级别 CDC 表

CloudCanal 实现了表级别的 CDC 表设计，每张源表都对应一张 CDC 表，CDC 表的结构仅在原表结构的基础上增加了几个位点字段，用于增量同步。

相比于所有数据写入单一 CDC 表，表级别的 CDC 表更加独立，方便多次订阅表。此外，触发器只需要执行 INSERT 语句，因此对于字段较多的表也能够快速执行。扫描消费 CDC 数据时，不需要做额外的处理，消费更简单。

**原表**：

```sql
CREATE COLUMN TABLE "SYSTEM"."TABLE_TWO_PK" (
  "ORDERID" INTEGER NOT NULL ,
  "PRODUCTID" INTEGER NOT NULL ,
  "QUANTITY" INTEGER,
  CONSTRAINT "FANQIE_pkey_for_TA_171171268" PRIMARY KEY ("ORDERID", "PRODUCTID")
)
```

**CDC 表**：

```sql
CREATE COLUMN TABLE "SYSTEM"."SYSTEMDB_FANQIE_TABLE_TWO_PK_CDC_TABLE" (
  "ORDERID" INTEGER,
  "PRODUCTID" INTEGER,
  "QUANTITY" INTEGER,
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
CREATE TRIGGER "FANQIE"."CLOUD_CANAL_ON_I_TABLE_TWO_PK_TRIGGER_104" AFTER INSERT ON "SYSTEM"."TABLE_TWO_PK" REFERENCING NEW ROW NEW FOR EACH ROW
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN  END;
  IF 1=1 THEN
    INSERT INTO "SYSTEM"."SYSTEMDB_FANQIE_TABLE_TWO_PK_CDC_TABLE" (__$DATA_ID, __$TRIGGER_ID, __$TRANSACTION_ID, __$CREATE_TIME, __$OPERATION, "ORDERID","PRODUCTID","QUANTITY")
    VALUES(
      "SYSTEM"."CC_TRIGGER_SEQ".NEXTVAL,
      433,
      CURRENT_UPDATE_TRANSACTION(),
      CURRENT_UTCTIMESTAMP,
      2,
      :NEW."ORDERID" ,
      :NEW."PRODUCTID" ,
      :NEW."QUANTITY"
    );
  END IF;
END;
```

### 表级别任务位点

在表级别 CDC 表模式下，同步增量数据时，每个表都有自己的位点，原有的单一位点无法满足这种同步需求。

因此，CloudCanal 引入了表级别的增量同步位点，确保每个表能够消费各自对应的增量同步位点。位点的具体体现为：

```json
[
  {
    "db": "SYSTEMDB",
    "schema": "FANQIE",
    "table": "TABLE_TWO_PK",
    "dataId": 352,
    "txId": 442441,
    "timestamp": 1715828416114
  },
  {
    "db": "SYSTEMDB",
    "schema": "FANQIE",
    "table": "TABLE_TWO_PK_2",
    "dataId": 97,
    "txId": 11212,
    "timestamp": 1715828311123
  },
  ...
]
```

这样的设计有以下好处：

- **位点精细控制**：每个表都有自己的增量同步位点，在增量任务中可以重新消费特定表中的增量数据，而无需消费所有表的数据，实现更加精细的控制，减少不必要的数据传输和处理，提高同步效率。

- **数据并行处理**：由于每个表有自己的位点，可以实现表级别的并行处理。不同表的增量数据可以同时处理，避免了单一位点导致的串行处理瓶颈，从而加快了同步速度。

### 创建任务前确认

为了让全量初始化和增量写入更稳定，创建任务前建议重点确认以下几项：

- 按 Doris Unique Key 模型规划目标表。CloudCanal 通过 Stream Load 写入 Doris，并按主键整行替换，适合承接 HANA 主键表的新增、更新和删除。
- 迁移前确认 HANA 源表主键，并同步规划 Doris Unique Key，避免无主键表影响全增量链路。
- 如果 HANA 源表发生结构变更，按 HANA DDL 变更文档处理后再继续同步，避免源端和目标端结构不一致。
- 如果源表包含 `TEXT`、`BIN_TEXT`、`ST_POINT`、`ST_GEOMETRY`、`BINARY`、`BLOB` 等特殊类型，建议提前做字段取舍、类型转换或单独评估。
- 确保迁移同步节点能访问 Doris / SelectDB FE QueryPort 和 FE/BE HttpPort，保证元数据查询和 Stream Load 写入正常执行。

## 用 CloudCanal 做 SAP HANA 到 Doris 同步演示

### 准备动作
- 登录 CloudCanal SaaS 版本，或下载安装商业版私有部署。可以参见快速上手文档：[快速开始（私有部署）](https://www.clougence.com/docs/quick/quick_start)，[快速开始（SaaS）](https://www.clougence.com/docs/quick/quick_start_mgr)。
- 准备好源端和目标端数据库及对应数据
- 参考 [HANA 权限准备](https://www.clougence.com/docs/dataMigrationAndSync/datasource_func/Hana/privs_for_hana) 做账号授权

### 添加数据源
- 登录 CloudCanal 控制台，点击 **数据源管理** > **新增数据源**
![CloudCanal进入新增数据源页面](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/hana_to_doris/hana11.png)

- 创建源端数据源，选择 **自建数据源**，选择 **HANA** 并填写相关信息
![CloudCanal创建SAP HANA源端数据源](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/hana_to_doris/hana12.png)

  > **默认数据库**：CloudCanal 新增 HANA 数据源页面中的数据库名配置项。可在 SAP HANA 执行 `SELECT DATABASE_NAME FROM M_DATABASE;` 查询数据库名，并将返回结果中的 `DATABASE_NAME` 值填写到该项。

- 创建目标端数据源，选择 **自建数据源**，选择 **Doris** 并填写相关信息
![CloudCanal创建Doris目标端数据源](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/hana_to_doris/hana13.png)

  > **Client 地址**：对应 Doris / SelectDB FE QueryPort，用来查询元数据和走 MySQL 协议交互。
  >
  > **Http 地址**：对应 Doris / SelectDB FE/BE HttpPort，用来执行 Stream Load 写入。


### 任务创建
- 点击 **同步任务** > **创建任务**
![CloudCanal进入创建同步任务页面](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/hana_to_doris/hana14.png)

- 源端选择 **HANA** 数据源，目标端选择 **Doris** 数据源，分别点击 **测试连接** 按钮并设置数据库映射关系。点击下一步。
![CloudCanal选择HANA源端和Doris目标端并配置库映射](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/hana_to_doris/hana15.png)

- 选择 **增量同步**，并且勾选 **全量初始化**。点击下一步。
![CloudCanal选择增量同步并勾选全量初始化](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/hana_to_doris/hana16.png)

- 选择订阅的表，点击下一步。
![CloudCanal选择HANA到Doris同步订阅表](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/hana_to_doris/hana17.png)

- 配置列映射，点击下一步。
![CloudCanal配置HANA到Doris字段映射](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/hana_to_doris/hana18.png)

- 点击创建任务
![CloudCanal确认并创建HANA到Doris同步任务](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/hana_to_doris/hana19.png)

任务创建过程会执行一系列异步操作。可以点击 **同步设置** > **异步任务**，找到任务创建记录并点击 **详情** 查看。

HANA 源端任务创建通常包含以下步骤：

- 结构迁移
- 初始化 HANA CDC 表以及对应触发器
- 分配任务执行机器
- 创建任务状态机
- 完成任务创建

任务创建完成后，CloudCanal 会自动流转：

- **结构迁移**：把 HANA 源端表定义迁移到 Doris。如果 Doris 中已经存在同名表，则会忽略。
- **全量数据迁移**：把已有存量数据完整迁移到 Doris。
- **增量数据同步**：持续把 HANA 增量数据同步到 Doris。

### 数据校验

任务进入增量同步并且延迟追平后，建议创建数据校验任务，检查 HANA 源端和 Doris 目标端是否一致。可以在同步任务详情页点击 **功能列表** > **创建相似任务**，在任务类型中选择 **数据校验** 或 **数据校验和订正**。

创建过程中如果遇到问题，可以参考这个文档：[SAP HANA 到 Doris 数据同步链路](https://www.clougence.com/docs/dataMigrationAndSync/connection/sap-hana-to-doris/)，或者联系我们。

## 其他同步方案

### 手动导出 / 导入

最直接的做法是从 HANA 导出 CSV 或其他中间文件，再用 Doris 的导入功能写入目标表。

![HANA到Doris手动导出导入方案示意](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/hana_to_doris/hana1.png)

这种方式上手快、依赖少，适合小数据量、一次性迁移、测试环境初始化或历史冷数据搬迁。

但它的问题也很明显，导出时如果 HANA 还在写入，就很难保证一致性；导入失败后重跑成本高；后续如果要做增量同步，还要另起一套链路。因此，它不太适合生产级持续同步。

### 批量 ETL

批量 ETL 通常是先做一次全量，再按时间戳、业务水位线或批次号定时抽取增量。

![HANA到Doris批量ETL同步方案示意](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/hana_to_doris/hana2.png)

它适合低频报表、小时级刷新、源表有可靠更新时间字段的场景。相比手动导出，批量 ETL 更自动化，也更容易接入调度系统。

但批量 ETL 很依赖“增量字段”。如果 `updated_at` 不可靠、存在晚到更新、删除记录无法表达，或者需要高频同步，就容易漏数、重复，也很难补数。

### 自建 CDC / 触发器链路

如果要捕获 HANA 的 INSERT、UPDATE、DELETE，可以用触发器记录变更，再由消费程序写入 Doris。

![HANA到Doris自建CDC触发器同步方案示意](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/hana_to_doris/hana3.png)

这种方案实时性更好，也能覆盖更多变更。但要处理的工程细节很多：触发器如何安装和恢复、变更表如何清理、消费位点如何管理、Doris 写入失败如何重试、数据如何校验，都需要团队自己实现并长期维护。

如果企业已经有成熟的数据平台团队，可以考虑自建 CDC；如果只是为了一条 HANA 到 Doris 链路，自研通常不太划算。

## 方案对比

| 维度 | 手动导出 / 导入 | 批量 ETL | 自建 CDC | CloudCanal |
| --- | --- | --- | --- | --- |
| 适合场景 | 一次性搬迁、测试初始化 | 低频报表同步 | 有平台团队自研链路 | 生产迁移、准实时同步 |
| 全量迁移 | 支持 | 支持 | 需自行实现 | 支持 |
| 增量同步 | 不支持 | 有限支持 | 支持 | 支持 |
| UPDATE / DELETE | 手动处理 | 容易漏语义 | 可实现 | 支持常见 DML |
| 停机窗口 | 较长 | 中等 | 较短 | 较短 |
| 数据校验 | 手写脚本 | 手写脚本 | 需自行实现 | 支持校验订正 |
| 运维成本 | 低 | 中 | 高 | 中低 |

## 总结

如果只是一次性搬小表，导出导入就够了。如果是低频同步，批量 ETL 可以满足部分报表需求。如果团队自研能力强、后续多条链路可复用，也可以考虑自建 CDC。但如果是生产环境，希望尽量减少停机，并持续把 HANA 变更同步到 Doris，就更适合用全量 + 增量一体化的迁移方式。
