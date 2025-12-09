---
id: postgresql_doris_sync
description: CloudCanal 数据同步链路创建示例-PostgreSQL 到 Doris
title: PostgreSQL 到 Doris 数据同步
date: 2022-09-20
authors: junyu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/postgresql_doris_sync.png 
slug: /data_sync_sample/postgresql_doris_sync
---

## 简述
Apache Doris 是一个现代化的 **MPP** 分析型数据库产品，仅需 **亚秒级 **响应时间即可获得查询结果，能有效地支持**实时数据分析**。

本文主要介绍如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-postgresql-doris-sync) 快速构建一条稳定高效运行的 **PostgreSQL** 到 **Doris** 数据同步链路。

## 技术点
### 基于 StreamLoad 的导入方式
**Doris** 提供了多种导入方式。CloudCanal 采用了 **StreamLoad** 的方式进行导入，源端的消息会转成字节流，最后会以 Batch 的形式通过 HTTP 协议发往 **Doris**。

相比直接通过 SQL 写入的方式，**StreamLoad** 方式会有更好的性能，写入的数据直接经 FE 转发给 BE 处理。如果直接采用 SQL 写入，在 FE 侧，会有额外的 SQL 解析开销。

CloudCanal 默认采用 **json** 格式来进行**StreamLoad**导入，如果用户内容特殊字符较较少，也可以开启 **csv** 格式导入，分隔符可以通过参数 **columnSeparator** 和 **lineSeparator** 设置。

基于 **StreamLoad** 的写入方式，实际写入对端的操作均为 **INSERT**，CloudCanal 同步时会自动将 **UPDATE / DELETE** 转成 **INSERT** 语句，并修改 **__op** 值。

### PG -> Doris 的数据类型支持
CloudCanal 从 2020 年开始支持 PG 同步后就不断的丰富 PG 的对端数据源，支持 PG 到 DORIS 是一个非常重要的数据源扩充。

Doris 可以满足多种数据分析需求，例如固定历史报表，实时数据分析，交互式数据分析等，可以让数据分析工作更加简单高效！

PG 到 DORIS 全量和增量同步，不仅覆盖主流使用的数据类型，对地理信息相关类型也有很好的支持。关于CloudCanal对于地理信息的支持可以参考文章[如何利用现代化数据栈高效处理地理信息数据](https://www.clougence.com/blog/data_insights/how_to_sync_and_use_geo_data) 。

### Doris 关键技术
Doris 内部自行管理数据的**多副本**和**自动修复**。保证数据的**高可用**、**高可靠**。在服务器宕机的情况下，服务依然可用，数据也不会丢失。

MySQL 兼容性好，兼容 MySQL 的网络协议，**兼容 MySQL 语法**。

支持 **MMP** 一条 SQL 如果包含了合并、聚合计算、排序等多种操作；在执行计划的时候，MPP 会将其拆分成多份，分布到每台机器执行，最后再将结果汇总，**大大提升了效率**。

## 操作示例
### 前置条件

- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-postgresql-doris-sync),使用参见[快速上手文档](https://www.clougence.com/docs/productOP/docker/install_linux_macos)
- 准备一个 PG 数据库，和 DORIS 实例（本例分别使用自建 PG 12.4 和 Doris 1.0）
- 登录 CloudCanal 平台 ，添加 PG 和 DORIS
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0002/01.png)

- 创建一条 PG -> DORIS 链路作为增量数据来源

### 任务创建

- **任务管理**-> **任务创建**
- **测试链接**并选择 **源** 和 **目标** 数据库
- 点击下一步
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0002/02.png)

- 选择 **数据同步**，并勾选 **全量数据初始化**，其他选项默认
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0002/03.png)

- 选择需要迁移同步的**表**和**列**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0002/04.png)
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0002/05.png)

- 确认创建任务
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0002/06.png)

- 任务自动做**结构迁移**、**全量迁移**、**增量同步**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0002/07.png)

### 校验数据

- 我们使用程序对源端制造了一些数据
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0002/08.png)

- 任务正常运行一段时间后，停止造数据
- 点击  PG -> DORIS 任务**详情**，**功能列表 -> 创建相似任务**，在创建任务的第二步选择**数据校验**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0002/09.png)

- 数据校验 OK
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0002/10.png)

## 常见问题
### 支持什么版本的 PG 和 DOIRS ？
目前源端 PG 12.x, 13.x, 14.x 皆可使用 CloudCanal 进行迁移同步，对端 DORIS 支持 1.x 版本，后序将不断扩展源端 PG 的数据类型。

## 总结
本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-postgresql-doris-sync) 进行 PG -> Doris 数据迁移同步。
