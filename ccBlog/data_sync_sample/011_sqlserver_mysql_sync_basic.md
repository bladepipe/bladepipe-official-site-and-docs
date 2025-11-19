---
id: sqlserver_mysql_sync_basic
description: CloudCanal 数据同步链路创建示例-SQLServer 到 MySQL (一)
title: SQL Server 到 MySQL 数据同步 (一)
date: 2022-06-14
authors: juantu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/sqlserver_mysql_sync_basic.png 
slug: /data_sync_sample/sqlserver_mysql_sync_basic
---
## 简述
[CloudCanal](https://www.clougence.com?src=cc-doc-blog-sqlserver-mysql-sync) 2.1.0.x 版本开始支持 SQLServer 作为源端的数据迁移同步能力。

本文通过 SQLServer 到 MySQL 的数据迁移同步案例简要介绍这个源端的能力。链路特点：
- 结构迁移、全量迁移、增量同步(数据)、数据校验俱全
- 流程全自动化

## 技术点

### SQLServer开CDC
SQLServer 开启 CDC (change data capture) 首先需要安装并启动 SQL Server Agent , 通过 agent 异步解析其变更日志写到 **[目标db].cdc** 的一系列表中。

安装并启动 Agent 后,  对 **目标db** 需要开启 CDC 能力。`USE [目标db]`切换到目标数据库，再执行`EXEC sys.sp_cdc_enable_db;`打开这个库的 CDC。 执行完毕后会在 **[目标db].cdc** schema下出现一系列表。

**目标db** 开启 CDC 后，还需要开启针对哪些表的 CDC, 命令为
```
EXEC sys.sp_cdc_enable_table   
@source_schema = N'dbo',
@source_name   = N'worker_stats',
@role_name     = NULL,
@supports_net_changes = 0;
```
默认会生成  **source_shema_source_name_CT** 的表，当然创建过程中也可以直接指定 `capture_instance` 指定这个表除 `_CT` 这个后缀之前部分的命名。

以上步骤运维稍显繁琐，但是使用 CloudCanal , 创建任务时都会自动准备好，前提是给到足够权限的账号。

###  增量 DDL 同步

DDL 对于数据同步的影响在于两方面，如果没有处理好，可能导致数据同步根本无法成立的致命问题。

第一，大部分数据库的增量日志都不带字段类型长度等属性，需要依赖从源端数据库独立获取的元数据进行日志解析，DDL 如果更改了解析日志相关元数据，则需要刷新，否则会导致**字段不存在**、**对不齐**、**类型错误**等问题，这个刷新需要严格按照事件变更顺序，一般和位点紧相关。

其次，对于上下游需要保证结构一致性的同步链路，DDL 变更则需要准确应用到下游数据库中，这中间步骤包括 DDL 获取、转换、执行等多个步骤，a 种源端 * b 种目标端 * c 种 DDL  , 导致全数据库相互同步难度相当高，其中还伴随着 DDL 应用导致的链路延迟，应用失败导致位点回溯等棘手问题。

以上两点，第一点几乎无法回避，第二点可以通过预先做 DDL 执行解决，特别通过平台化方案自动关联执行，相对方便且合理。

CloudCanal 对 SQLServer DDL 同步解决了第一点，但是对于第二点，暂时没有解决，需要手动到对端进行 DDL 变更。

## 操作示例

### 前置条件:
- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-sqlserver-mysql-sync),使用参见[快速上手文档](https://www.clougence.com/docs/productOP/docker/install_linux_macos)
- 准备好 SQLServer 数据库(本例版本为 2016)和 MySQL  数据库(本例版本为 8.0)
- 在 SQLServer 的准备一些库表和数据(本例使用另外一个 MySQL 迁移同步数据到 SQLServer)

### 添加数据源
- 登录 CloudCanal 平台
- **数据源管理**->**新增数据源**
- 将源端**SQLServer**和目标端**MySQL** 分别添加
  ![截屏2021-12-28 上午11.25.43.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0011/1.png)

### 任务创建
- **任务管理**->**任务创建**
- 选择 **源** 和 **目标** 数据源
  ![截屏2021-12-28 下午12.12.48.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0011/2.png)
- 选择 **数据同步**，勾选 **全量数据初始化**, 勾选 DDL **不同步**
  ![截屏2021-12-28 下午12.14.38.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0011/3.png)
- 选择需要迁移同步的表
- 选择列,默认全选
- 确认创建
  ![截屏2021-12-28 下午12.15.51.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0011/4.png)
- 查看异步任务，确认创建步骤正常
  ![截屏2021-12-28 下午12.16.34.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0011/5.png)
- 任务自动运行
  ![截屏2021-12-28 下午12.17.26.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0011/6.png)

### 校验数据
- 持续造增量数据，INSERT & UPDATE & DELETE 比例 2:7:1
  ![截屏2021-12-28 下午12.18.12.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0011/7.png)
-  停止增量造数据
-  创建校验任务，并校验任务结果
   ![截屏2021-12-28 下午12.24.38.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0011/8.png)

## 常见问题

### 是否支持 DDL 同步

暂时没有支持，不过 cdc schema下存在 ddl_history 表，可能可以结合 lsn 找到具体 DDL 语句，从而支持  DDL 同步。

### 是否支持其他目标端

最近会支持 Kafka , 其他数据源按具体需求逐步进行开放。

## 总结
本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-sqlserver-mysql-sync) 进行 SQLServer  到 MySQL 的数据迁移同步。