---
id: mysql_elasticsearch_sync
description: CloudCanal 数据同步链路创建示例-MySQL 到 ElasticSearch
title: MySQL 到 Elasticsearch 数据同步
date: 2022-04-24
authors: juantu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/mysql_elasticsearch_sync.png 
slug: /data_sync_sample/mysql_elasticsearch_sync
---

## 简述
本文介绍如何通过 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-mysql-elasticsearch-sync) ，五分钟内创建一条**长期稳定运行**的 MySQL -> Elasticsearch (以下简称 ES) 实时数据迁移同步链路 。

## 技术内幕
### 限流
MySQL 到 ES 数据迁移同步过程中，往往会面临源端写入对端 RPS 较大问题，导致 ES 负载较大，影响业务对 ES 的正常读写。CloudCanal 为了应对这个情况，提供限流能力。同步任务创建完毕后，可在 **任务详情** -> **参数设置** 对源端流量进行限流。
![8ab5e2b2-3a48-4042-b53b-1e469734b157-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/5_mysql_elasticsearch_sync/8ab5e2b2-3a48-4042-b53b-1e469734b157-image.png)

### 时区处理
CloudCanal 允许用户在创建数据迁移同步任务时指定时区。写入ES 时，源端时间类型数据将会格式化并带上时区信息 , 支持用户在跨国、跨地域场景下使用。

### 自动创建索引和 Mapping 结构
CloudCanal 迁移同步任务支持自动将源端数据库表结构映射成 ES 索引，该过程中允许用户在 **列(column/field)** 级别上，个性化设置自己需要的索引和 Mapping 结构。这些设置包括：
- 每个列可以指定是否需要索引
- 可以对 **text** 类型的 field 设置 ES mapping 中的分词器(标准分词器)
- 索引分片数、副本数自定义设置


### 映射已建索引
用户可能已经在 ES 中提前建好了索引，这种情况下 CloudCanal 会自动探测，并允许用户配置映射，一张表可映射对端一个索引。

### 类型支持
不支持父子文档join，支持NESTED/OBJECT。NESTED有更好的索引性能，建议用NESTED，避免ES侧join


### 支持用户自定义分词器
映射用户已经创建的索引时候，支持自定义分词器

### 内置 **_id** 生成和 **routing field** 指定
写入 ES 时候 **_id** 用于唯一标识一个 doc。CloudCanal 数据同步默认遵循以下原则：
- routing 使用 _id 值
- 单主键表，会默认使用源端关系表的主键列的列值作为 _id 的值
- 多主键表，会通过分隔符$连接多个主键列的值，组成唯一的 _id 值
- 无主键表，会将所有列的值通过$连接，生成唯一的 _id 值

## 举个"栗子"
### 准备 CloudCanal
- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-mysql-elasticsearch-sync),使用参见[快速上手文档](https://www.clougence.com/docs/productOP/docker/install_linux_macos)

### 添加数据源
- CloudCanal 支持 **6.8** 及以上版本 ES，我们点击 **数据源管理**->**新增数据源** 添加 ES 数据源
  ![1048936c-46bb-4495-b33f-6bbdece681ba-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/5_mysql_elasticsearch_sync/1048936c-46bb-4495-b33f-6bbdece681ba-image.png)

- 填写必要 **host** 信息后点击 **新增数据源**
  ![2c28c66a-6392-4994-a98d-e4dd3a672c98-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/5_mysql_elasticsearch_sync/2c28c66a-6392-4994-a98d-e4dd3a672c98-image.png)

### 创建任务
- 点击任务管理，选择创建任务
  ![8637011b-9477-45d1-b9c5-f2e166bed7d0-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/5_mysql_elasticsearch_sync/8637011b-9477-45d1-b9c5-f2e166bed7d0-image.png)

#### 数据源设置
- 勾选源端和目标端数据库，并且选择相应的数据库
  ![deb89653-e04d-430a-b6c6-1a27d0d785df-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/5_mysql_elasticsearch_sync/deb89653-e04d-430a-b6c6-1a27d0d785df-image.png)

####  功能配置
- 选择数据同步，并勾选数据初始化(带**全量迁移**)
  ![450e225c-db1b-477f-8a81-bd5c5e8ea87e-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/5_mysql_elasticsearch_sync/450e225c-db1b-477f-8a81-bd5c5e8ea87e-image.png)

#### 表&action过滤
- 此处可以进行的操作主要是：
  - 勾选需要订阅的表
  - 选择需要映射的索引（支持映射已经存在的索引）
  - 勾选 IUD 过滤
  - 批量设置分片数
  :::info
  CloudCanal 的结构迁移支持自动帮用户按照源端表结构创建索引。
  :::

  ![cbd229cc-2803-482a-bddc-26048f392571-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/5_mysql_elasticsearch_sync/cbd229cc-2803-482a-bddc-26048f392571-image.png)

#### 数据处理
- 本页面提供的主要能力有：
  - 列裁剪设置(包括批量筛选和设置)
  - 设置源端where过滤条件
  - 索引设置
  - 分词器设置
  - 列映射（如果同步的是已经存在的索引，支持列映射）

  ![c250f412-12c1-45bd-b1a2-bbf77a0b152c-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/5_mysql_elasticsearch_sync/c250f412-12c1-45bd-b1a2-bbf77a0b152c-image.png)

#### 创建确认
- 最后一步，确认创建内容无误后点击确认创建。
  ![e308cb9d-0016-41d1-982a-84f742b4a12f-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/5_mysql_elasticsearch_sync/e308cb9d-0016-41d1-982a-84f742b4a12f-image.png)

### 查看任务状态

- 回到 CloudCanal 控制台，刷新并查看任务实时状态，从结构迁移、数据初始化，到数据同步。
  ![253e90e4-6d8e-41c4-b421-eb95a0f73d9f-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/5_mysql_elasticsearch_sync/253e90e4-6d8e-41c4-b421-eb95a0f73d9f-image.png)

- 登录 ES  Kibana 控制台，查看迁移同步过去的结构和数据。
  ![9ddba516-afa8-4d9b-aeec-f64a1485f3ef-image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/5_mysql_elasticsearch_sync/9ddba516-afa8-4d9b-aeec-f64a1485f3ef-image.png)

## 总结
本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-mysql-elasticsearch-sync) 快速构建 MySQL->Elasticsearch 数据迁移同步链路，更多的源端和目标端陆续开放。