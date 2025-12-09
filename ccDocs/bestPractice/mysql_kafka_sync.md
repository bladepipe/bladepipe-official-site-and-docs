---
id: mysql_kafka_sync
description: 介绍 CloudCanal 如何将关系型数据库中数据同步到 Kafka
title: MySQL 到 Kafka 同步
---

:::info
本文档同样适用于 MySQL - AutoMQ 链路。
:::

## 简述
本文主要介绍 [CloudCanal](https://www.clougence.com?src=cc-doc-mysql-kafka-sync) 如何将关系型数据库中数据同步到 Kafka, 默认使用 CloudCanal 消息格式, 链路特点包括

- 支持[多种消息格式](../reference/kafka_msg_format_type.md)
- 支持 DDL 同步（可自定义 DDL Topic）
- 支持 Topic 自动创建

## 技术点

### Topic 自动创建

目前任务支持自动创建 Kafka 的 Topic，并且能自定义分区数量。如下示例：

![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_kafka_sync/1.png)

### 数据批量写入

支持对同一表的相同操作合并到同一条消息体中，实现数据批量写入，从而减少网络带宽的使用，提高数据处理的效率。

![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_kafka_sync/2.png)

### 任务断点续传

CloudCanal 支持迁移和同步任务的断点续传，通过定期记录的位点，让任务重启后自动从上一次位点开始继续迁移或同步。

对于亿级别数据量的大表，此能力不可或缺，数据初始化断点续传功能让此种暂停尽可能少的影响进度。

## 操作示例
- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-mysql-kafka-sync)

- 造 Insert、Update、Delete 负载，比例为 1:1:1
![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_kafka_sync/3.png)

- 添加数据源
![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_kafka_sync/4.png)

- 创建任务，选择数据源和库，并连接成功
- 点击下一步
![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_kafka_sync/5.png)

- 选择数据同步，建议规格至少选择 1 GB
![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_kafka_sync/6.png)

- 任务结构迁移、全量迁移、增量同步，正常运行
![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/mysql_kafka_sync/7.png)

## 常见问题
### 还支持哪些源端数据源呢？
目前开放 MySQL、Oracle，SQLServer，Postgres，MongoDB 到 Kafka，如果各位有需求，可以在社区反馈给我们。

### 总结
本文简要介绍了 [CloudCanal](https://www.clougence.com?src=cc-doc-mysql-kafka-sync) 实现 MySQL 到 Kafka 数据迁移同步的能力，帮助业务快速实现实时数据处理与分析。