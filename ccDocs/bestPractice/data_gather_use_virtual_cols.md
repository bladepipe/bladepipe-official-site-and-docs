---
id: data_gather_use_virtual_cols 
description: 介绍 CloudCanal 如何做多来源数据汇聚
title: 多来源数据汇聚
---

## 简介

[CloudCanal](https://www.clougence.com?src=data_gather_use_virtual_cols) 近期增强了数据汇聚防重能力，消除各个来源 **数据表名冲突**、**主键/唯一键约束冲突** 的可能性。

这个增强具体特性包括:

- 常用虚拟列添加
- 指定虚拟列为对端表主键
- 对端表名分级元数据拼接
- 可视化操作，无需写自定义代码

本文简要介绍上述特性，并使用 MySQL -> StarRocks 作为示例进行能力演示。

## 技术点

### 多种虚拟列

为了应对不同场景，不同数据源，CloudCanal 提供了以下虚拟列生成能力，如下表。

同时也支持 **单表设置多个虚拟列**，**针对特定表设置**，**批量设置**。

| 虚拟列种类              |说明             | 有效的操作 |
| -------------------- | --------------------------|---|
| 指定具体值   | 可指定特定的数字、字符串生成新列，写入到对端  | INSERT|
| 数据迁移或同步时间  | 以数据到达 CloudCanal 的时间生成新列，写入对端|INSERT, UPDATE|
| 源端实例ID_SCHEMA_表_主键值   | 按照源端数据源 **实例ID**，**Schema**，**表** 和 **主键值** 做拼接生成新列，写入对端  |INSERT, UPDATE, DELETE|
| 源端实例ID_DB_SCHEMA_表_主键值   | 按照源端数据源 **实例ID**，**Catalog**，**Schema**，**表** 和 **主键值** 做拼接生成新列，写入对端  |INSERT, UPDATE, DELETE|
| 源端实例DB_SCHEMA_表_主键值   | 按照源端数据源 **Catalog**，**Schema**，**表** 和 **主键值** 做拼接生成新列，写入对端  |INSERT, UPDATE, DELETE|
| 源端实例SCHEMA_表_主键值   | 按照源端数据源 **Schema**，**表** 和 **主键值** 做拼接生成新列，写入对端  |INSERT, UPDATE, DELETE|
| 源端实例表_主键值   | 按照源端数据源 **表** 和 **主键值** 做拼接生成新列，写入对端  |INSERT, UPDATE, DELETE|

### 指定虚拟列为对端主键(唯一键)

多来源数据汇聚到同一张表，如果存在主键或唯一约束，往往会形成冲突，比较典型的例子如来自各地的 MySQL 数据自带自增主键，汇聚到对端主键即冲突。

为了解决这个问题，我们利用既有的 **设定对端主键能力**，将其扩展到虚拟列，通过将类似 **源端实例ID_SCHEMA_表_主键值** 设置成对端主键达成主键或唯一键约束成立。

此能力可针对特定表或批量进行设置。

### 对端表名拼接

业务除了汇聚到同一张表的需求，也存在保持源端独立表的需求，这个时候需要解决表名冲突问题。

CloudCanal 针对不同数据源，提供以下几种表名拼接规则，在结构迁移时重命名，并且数据迁移和同步支持此类元数据映射。

| 表名映射规则              |说明             | 
| -------------------- | --------------------------|
| 按 SCHEMA_TABLE 拼接(元数据镜像)   | 按照源端数据源 **Schema**，**表** 拼接作为对端表名  | 
| 按 SCHEMA_TABLE 拼接(元数据转小写)  | 按照源端数据源 **Schema**，**表** 拼接并转为 **小写** 作为对端表名|
| 按 SCHEMA_TABLE 拼接(元数据转大写)   | 按照源端数据源 **Schema**，**表** 拼接并转为 **大写** 作为对端表名 |
| 按 DB_SCHEMA_TABLE 拼接(元数据镜像)   | 按照源端数据源 **Catalog**，**Schema**，**表** 拼接作为对端表名  |
| 按 DB_SCHEMA_TABLE 拼接(元数据转小写)   | 按照源端数据源 **Catalog**，**Schema**，**表** 拼接并转为 **小写** 作为对端表名  |
| 按 DB_SCHEMA_TABLE 拼接(元数据转大写)   | 按照源端数据源 **Catalog**，**Schema**，**表** 拼接并转为 **大写** 作为对端表名  |

### 支持的链路

此次增强，因为测试时间紧张，我们只开了一批链路，如下列表所示，这些链路均支持上述特性

- MySQL -> MySQL, MySQL -> StarRocks, MySQL -> Doris, MySQL -> SelectDB, MySQL -> ClickHouse, MySQL -> PostgreSQL, MySQL -> ORACLE
- ORACLE -> StarRocks ,ORACLE -> MySQL
- PostgreSQL -> MySQL

## 操作示例

### 环境准备

- 根据文档[安装 CloudCanal Docker 版](https://www.clougence.com/cc-doc/productOP/docker/install_linux_macos)

- 添加 MySQL 数据库和 阿里云 EMR for StarRocks

### 任务创建

- 选择数据源信息略，点击下一步
- 选择任务规格、配置略，点击下一步
- 选择库表，点击库表映射，选择 **按 SCHEMA_TABLE 拼接(元数据镜像)**，可看到对端表名按规则拼接
- 点击下一步

  ![gather_data_3](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/gather_data/gather_data_3.png)

- 选择列页面
- **批量操作** > **批量设置虚拟列**

  ![gather_data_4](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/gather_data/gather_data_4.png)

- **批量操作** > **批量设置对端主键**，此例选择 `vir_instid_sche_tab_pk` 作为对端主键
- 点击下一步

  ![gather_data_5](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/gather_data/gather_data_5.png)

- 确认任务创建
- 结构迁移，全量迁移，增量同步正常运行

  ![gather_data_6](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/gather_data/gather_data_6.png)

### 功能验证

#### 查看全量迁移数据

- 使用 [CloudDM](https://www.clougence.com/clouddm-personal) 查询对端表数据，结构正确（主键），虚拟列数据按规则生成
  
  ![gather_data_7](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/gather_data/gather_data_7.png)

  ![gather_data_8](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/gather_data/gather_data_8.png)

- 源端插入和更新数据，对端虚拟列数据按规则插入或更新(pk字段更新，暂未支持）

  ![gather_data_9](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/gather_data/gather_data_9.png)
  ![gather_data_10](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/gather_data/gather_data_10.png)

- 源端删除数据，对端则删除对应数据

## 总结

本文主要介绍 [CloudCanal](https://www.clougence.com?src=data_gather_use_virtual_cols) 数据防重能力，降低数据汇聚场景各个来源数据表名冲突、主键/唯一键约束冲突的概率，从而让用户更加便捷地落地在线数据应用。

