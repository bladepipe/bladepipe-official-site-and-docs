---
id: kafka_data_check
description: CloudCanal 数据同步相关案例-Kafka 数据中转校验
title: Kafka 数据中转校验
date: 2023-08-19
authors: juantu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/kafka_data_check.png 
slug: /data_sync_sample/kafka_data_check
---

## 案例简述
[CloudCanal](https://www.clougence.com?src=cc-doc-blog-kafka-data-check) 支持 **MySQL -> Kafka**完整的传输链路。

Kafka是消息系统，不支持SQL查询数据。针对这种异构数据源，我们如何来校验源对端数据的一致性呢？

本案例将通过 CloudCanal 先将Kafka数据再次回流到MySQL, 最后 **检验两个 MySQL 的数据是否一致**，即可间接地对比数据一致性。本案例使用 **DebeziumEnvelope** 消息格式。

## 前置条件

- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-kafka-data-check),使用参见[快速上手文档](https://www.clougence.com/docs/productOP/docker/install_linux_macos)
- 准备好 2 个 MySQL 实例，1 个 Kafka 实例（本例使用自己搭建的两台 MySQL 5.6，阿里云 Kafka 2.2）
- 两台 MySQL 实例准备两个相同的表 **kafka_migration_test.table1**
```sql
create schema kafka_migration_test collate utf8mb4_unicode_ci;
create table table1 (
	`col1` varchar(25) null,
	`col2` varchar(25) null,
	`col3` varchar(45) null
);
```

- 登录 CloudCanal 平台，添加 Kafka，MySQL
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/01.png)

-  kafka 自定义一个主题 **topic_1**，并创建一条 MySQL(1) -> Kafka 链路作为增量数据来源
    - 因为默认的消息格式是不带 Schema 字段的，这里的消息我们会反写到 MySQL 要利用 Schema 的信息，所以创建成功后需要在 **源端配置页面** 设置 **SchemaInclude** 参数为 **true**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/02.png)

- kafka 自定义一个主题 **topic_2**，并创建消费者组 migration，后续用于反写数据， 并创建一条 Kafka -> MySQL(2) 链路作为增量数据来源
## 任务创建 1 **[ MySQL(1) -> Kafka ]**

- **任务管理** -> **任务创建**
- **测试链接**并选择 **源** 和 **目标** 数据库，**并选择 DebeziumEnvelope 消息格式，和 topic_1 主题**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/03.png)

- 选择 **数据同步**，不勾选 **全量数据初始化**，其他选项默认
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/04.png)

- 选择需要迁移同步的表 **table1**和对应的 Kafka 主题 **topic_1**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/05.png)

- 没有主键自动忽略，方便后序生成数据
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/06.png)

- 确认创建任务，创建成功后在源端配置页面设置 **SchemaInclude** 参数为 **true**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/07.png)

- 然后点击生效配置，确认重启
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/08.png)

## 任务创建 2 **[ Kafka -> MySQL(2) ]**

- **任务管理** -> **任务创建**
- **测试链接**并选择 **源** 和 **目标** 数据库
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/09.png)

- 选择 **数据同步**，其他选项默认
- 选择消费的 Kafka 主题 **topic_2**和需要迁移同步的表 **table1**
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/10.png)

- 确认创建任务，没有主键自动忽略，方便后序生成数据

## 数据验证

- **程序造数据**，向 **MySQL(1)** 生成数据，**MySQL(1)** -> **Kafka(topic_1) -> Kafka(topic_2) -> MySQL(2)**
- **Kafka(topic_1)** 数据会下沉到 **topic_2** 主题
- 任务正常运行一段时间后，停止造数据，**等待数据全部同步完成**
- 创建 MySQL 到 MySQL 的数据准确校验
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/11.png)

- 选着数据校验功能，其他的默认
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/12.png)

- 数据校验 OK
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0025/13.png)

# 总结
本文展示了 Kafka 的双向同步案例，验证了 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-kafka-data-check) 传输数据的准确性。
