---
id: mysql_pg_gp
description: CloudCanal 数据同步链路创建示例-MySQL 到 PostgreSQL/Greenplum
title: MySQL 到 PostgreSQL/Greenplum 数据同步
date: 2023-09-26
authors: junyu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/mysql_pg_gp.png 
slug: /data_sync_sample/mysql_pg_gp
---

## 简述
本文主要介绍如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-mysql-pg-gp-sync) 构建一条 **MySQL** 到 **Greenplum / PostgreSQL** 的数据同步链路。

## 支持版本
源端 **MySQL** 支持的版本为：`5.6`、`5.7`、`8.X`
对端 **PostgreSQL** 支持的版本为：`8.4`、`9.0`、`9.1`、`9.2`、`9.3` `9.4`、`9.5`、`9.6`、`10.X`、`11.X`、`12.X`、`13.X`、`14.X` 、`15.X`、`16.X`、`17.X`
对端 **Greenplum** 支持的版本为：`6.X`

## 技术点

### 流程自动化&功能丰富
支持创建结构迁移、全量迁移、增量同步、数据校验、数据订正类型的任务。结构迁移、全量迁移和增量同步可作为一个任务的多个阶段自动化进行。

### 新增表自动迁移同步
**CloudCanal** 提供了**修改订阅**的能力。对于一个正在运行的增量同步的任务，**CloudCanal** 提供了动态修改订阅的方式，可以对一个正在运行的增量同步任务新增需要订阅的表。对于新增的表，**CloudCanal** 会自动迁移、同步其数据。

### 自定义数据处理
用户在迁移、实时同步期间如需要对传输的数据行进行自定义的加工可以采用 **CloudCanal**提供的自定义数据处理能力，这对于实时宽表构建、新增动态列、基于微服务、缓存的数据清洗等数据处理场景都非常有帮助。关于更多自定义数据的使用方式可以参考：[数据处理插件使用方式](https://gitee.com/clougence/cloudcanal-data-process)。

### 支持多种 DDL
**MySQL** -> **Greenplum** / **PostgreSQL** 链路支持的DDL有 `Create Table`、`Drop Table`、`Alter Table`、`Rname Table` 、`Create Index` 。

### 支持高性能写入模式
**CloudCanal** 中默认采用 **PostgreSQL/Greenplum**的驱动通过JDBC的方式进行批量写入。如果用户对性能要求很苛刻，可以尝试开启基于Copy模式的高性能写入模式。在Copy写入模式下，写入性能相比采用JDBC的方式有很大的提升。

### 支持地理信息类型写入
**PostgreSQL**和**Greenplum**对于地理信息类型的处理比较友好，因此常常被用于存储地理信息数据。**CloudCanal** 支持迁移同步源端地理信息类型的数据并且对其做自动转换后写入对端。了解更多 **CloudCanal**对于地理信息类型的处理可以参考文章：[CloudCanal地理数据同步与处理](https://www.clougence.com/blog/data_insights/how_to_sync_and_use_geo_data)。

### 结构迁移类型自动处理
异构数据源之间对类型的处理都存在差异，**CloudCanal** 会进行自动的转化和优化，例如在 **MySQL** 中可以定义的`VARCHAR(0)`数据类型，在 **PostgreSQL** / **Greenplum** 中不支持，**CloudCanal** 结构迁移时会自动将源端**MySQL** 的`VARCHAR(0)`类型映射为 `VARCHAR(1)`。

### 数据类型映射
**CloudCanal** 结构迁移和数据迁移同步时会自动进行数据类型映射。类型映射见下表：

| **MySQL** 类型 | **PostgreSQL** / **Greenplum** 类型 |
| --- | --- |
| BIT | BIT |
| TINYINT | SMALLINT |
| SMALLINT | SMALLINT |
| MEDIUMININT | INTEGER |
| INT | INTEGER |
| BIGINT | BIGINT |
| DECIMAL | NUMERIC |
| FLOAT | NUMERIC |
| DOUBLE | NUMERIC |
| DATE | TIMESTAMP WITHOUT TIME ZONE |
| DATETIME | TIMESTAMP WITHOUT TIME ZONE |
| TIMESTAMP | TIMESTAMP WITHOUT TIME ZONE |
| TIME | TIME WITHOUT TIME ZONE |
| YEAR | INTEGER |
| CHAR | CHARACTER |
| VARCHAR | CHARACTER VARYING |
| BINARY | BYTEA |
| VARBINARY | BYTEA |
| TINYBLOB | BYTEA |
| BLOB | BYTEA |
| MEDIUMBLOB | BYTEA |
| LONGBLOB | BYTEA |
| TINYTEXT | BYTEA |
| TEXT | TEXT |
| MEDIUMTEXT | TEXT |
| LONGTEXT | TEXT |
| ENUM | TEXT |
| SET | TEXT |
| JSON | JSON |
| GEOMETRY | TEXT |
| POINT | POINT |
| LINESTRING | TEXT |
| POLYGON | POLYGON |
| MULTIPOINT | TEXT |
| GEOMETRY_COLLECTION | TEXT |
| GEOM_COLLECTION | TEXT |
| MULTILINESTRING | TEXT |

## 准备工作

- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-mysql-pg-gp-sync),使用参见[快速上手文档](https://www.clougence.com/docs/productop/docker/install_linux_macos)
- 准备好源端和目标端数据库以及对应的测试数据

## 操作示例

### 添加数据源

-  登录 **CloudCanal** 平台
-  **数据源管理** -> **新增数据源** -> **自建数据库**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0027/1.png)

- 添加 **Greenplum** 或者 **PostgreSQL**后可以在数据源列表看到新增的数据源。
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0027/2.png)

### 创建同步任务

- 任务管理 -> 创建任务
- 源端选择 **MySQL** 数据源，对端选择 **Greenplum** / **PostgreSQL**
- 分别点击 **测试连接**，选择**源端**和**对端**需要订阅的库，选择 **下一步**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0027/3.png)

- 选择 **增量同步** -> 选择 **全量初始化**
- 根据自身机器配置选择 **规格**
- 选择 **下一步**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0027/4.png)

- 选择源端需要同步的表，如果目标表显示橙色表示对端不存在该表，任务创建之后，会自动生成该表
- 点击**下一步**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0027/5.png)

- 可以在左侧，添加 **数据过滤条件**
- 选择 **下一步**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0027/6.png)

- 选择 **创建任务**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0027/7.png)

### 任务执行

任务创建并且启动后，会自动进行如下的三个阶段：

- **结构迁移**：任务创建之后，如果对端没有表结构，那么 **CloudCanal** 会去自动在对端创建表结构
- **数据初始化**：将源端存量数据整体迁移到对端
- **数据同步**：全量迁移期间以及全量完成以后的源端增量数据变更会实时同步到对端
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0027/8.png)
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0027/9.png)

## 总结
本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-mysql-pg-gp-sync) 进行 **MySQL** -> **Greenplum** 数据迁移同步。各位读者朋友，如果你觉得还不错，请点赞、评论加转发吧。
