---
id: gaussdb_target_data
description: GaussDB for MySQL/OpenGauss 目标端数据同步(CDC,change data capture),结构迁移,数据校验
title: MySQL 到 GaussDB 数据同步
date: 2024-03-17
authors: juantu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/gaussdb_target_data.png 
slug: /data_sync_sample/gaussdb_target_data
---
## 简介

CloudCanal 近期开放了 MySQL -> [GaussDB for MySQL](https://www.huaweicloud.com/product/gaussdbformysql.html) /[OpenGauss](https://opengauss.org) 数据链路，本篇文章将简要概述 CloudCanal 对于 GaussDB for MySQL/OpenGauss 目标数据迁移同步的支持。

### 功能介绍

#### 结构迁移类型自动处理与优化
不同数据库对于数据类型支持存在差异，CloudCanal 结构迁移时会进行**类型自动转换**与优化。

例如：在 MySQL 中可以定义的 `VARCHAR(0)` 数据类型，在 OpenGauss 中不支持，CloudCanal 结构迁移时会自动将源端 MySQL 的 `VARCHAR(0)` 类型映射为 `VARCHAR(1)` 。

#### 自定义数据处理
用户在迁移、实时同步期间如需要对传输的数据行进行自定义的加工可以采用 CloudCanal 提供的**自定义数据处理**能力，这对于实时宽表构建、新增动态列、基于微服务、缓存的数据清洗等数据处理场景都非常有帮助。关于更多自定义数据的使用方式可以参考：[数据处理插件使用方式](https://gitee.com/clougence/cloudcanal-data-process)。

#### 支持高性能写入模式
CloudCanal 中默认采用 OpenGauss的驱动通过JDBC的方式进行批量写入。如果用户对性能要求很苛刻，可以尝试开启基于**Copy模式**的高性能写入模式。在Copy写入模式下，写入性能相比采用JDBC的方式有很大的提升。

#### 可视化创建
CloudCanal 创建 GaussDB for MySQL/OpenGauss 数据迁移同步任务是完全可视化的，通过获取**数据库元数据**，让用户在 浏览器页面上即可决定哪些库、表、列进行迁移同步等。

#### 自动化流程
GaussDB for MySQL/OpenGauss 数据迁移同步任务创建后，CloudCanal 将自动流转各个阶段的任务，用户无需干涉，直达数据实时同步状态。

#### 监控图表支撑
CloudCanal 为 GaussDB for MySQL/OpenGauss 数据迁移同步任务提供了多个实用监控指标，包括**增量缓存RPS**、**增量缓存延迟(ms)**、**内存队列数据个数**等，当调优任务性能或排查任务异常原因时，监控指标提供了很好的判断依据。

#### 告警支持
CloudCanal 为 GaussDB for MySQL/OpenGauss 数据迁移任务提供了包括**钉钉/企业微信/飞书/自定义**等 webhook 类型告警，对于企业级客户，可额外选择**邮件**，以及**短信告警**，实时保障同步任务的高可用。

## 简单示例
本示例以将数据从 MySQL 数据库同步到 GaussDB for OpenGauss 数据库为操作案例，以便更好地说明 CloudCanal 在不同数据库之间进行数据同步的能力。

### 准备动作
- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-gaussdb-target)，使用参见[快速上手文档](https://www.clougence.com/cc-doc/quick/quick_start)
- 准备好 MySQL 数据库（本例使用 8.0 版本）和 GaussDB for OpenGauss 数据库（本例使用 5.0 版本）
- 登录 CloudCanal 平台 ，添加 GaussDB for OpenGauss 和 MySQL

### 任务创建
- 任务管理 -> 新建任务
- 测试连接并选择 源 和 目标 数据库
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0034/1.png)
- 点击下一步
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0034/2.png)

- 选择 数据同步，并勾选全量数据初始化以及开启一次性校验，其他选项默认
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0034/3.png)

- 选择需要迁移同步的表
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0034/4.png)
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0034/5.png)

- 确认创建任务
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0034/6.png)

- 任务自动执行结构迁移、全量同步和增量同步，执行数据校验，结果显示数据校验通过
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/wufenzhong/0034/7.png)


## 总结
本文主要介绍了 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-gaussdb-target) 支持 GaussDB for MySQL/OpenGauss 目标端数据迁移同步功能，通过这个能力，用户可以便利地将数据实时同步到 GaussDB for MySQL/OpenGauss 数据库，实现数据更广泛、更实时的应用。
