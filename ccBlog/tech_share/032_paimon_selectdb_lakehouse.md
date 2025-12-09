---
id: paimon_selectdb_lakehouse
description: 通过 CloudCanal、Paimon 与 SelectDB 的结合，在统一架构下打通数据采集、湖存储与实时分析，实现真正意义上的实时湖仓
title: CloudCanal + Paimon + SelectDB 从 0 到 1 构建实时湖仓
date: 2025-09-17
authors: mumu
tags:
  - tech_share
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/tech_share/paimon_selectdb_lakehouse.png
slug: /data_insights/paimon_selectdb_lakehouse
---
湖仓一体已经成为数据架构领域的热门话题。相比传统湖仓分离的模式，湖仓一体架构在统一存储层上同时支持流式和批处理，兼顾**实时数据处理能力与灵活分析能力**，成为许多企业数据架构的主流选择。

今天，我们将展示如何利用 **CloudCanal、Paimon、SelectDB** 从 0 到 1 构建一个实时可用的湖仓体系，实现从数据采集、湖存储到实时分析的完整闭环。

## 实时湖仓的技术背景
在大数据早期，数据湖与数仓通常是独立建设：

+ **数据湖（Data Lake）** 偏向存储原始数据，适合**低成本保存海量历史信息**，常用 HDFS、对象存储等。相对而言，数据湖查询性能不足，不适合直接用于实时分析场景。
+ **数据仓库（Data Warehouse）** 更加面向分析查询。企业通常会在数仓中构建维度建模（如星型、雪花模型），用于**报表、决策分析**等场景。常见系统有 SelectDB、StarRocks 等。但数仓一般成本较高。

因此，在传统湖仓分离的模式中，存在一些不可忽视的问题：

+ **链路长**：数据需要先写入湖，再经过批量 ETL 同步至仓库，运维成本高。
+ **延迟高**：分钟级延迟，无法满足实时分析或实时 BI 的场景。
+ **一致性难**：湖与仓的数据容易出现不一致，影响业务决策。

为解决上面的问题，**实时湖仓一体（Real-time Lakehouse）** 这一方案应运而生。它在统一的存储和计算体系上，兼顾了数据湖与数仓的优点，既有 **数据湖的低成本存储**，也提供了 **数仓的高效分析能力**。数据能够实时写入，查询延迟控制在秒级别。在此基础上，企业可以真正构建 **低延迟、低成本、灵活扩展** 的实时湖仓体系。

## CloudCanal + Paimon + SelectDB 的协同优势
要构建实时湖仓，关键在于三个核心能力：**实时采集、湖存储、分析查询**。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/paimon_selectdb_lakehouse/1.png)

+ **CloudCanal：实时采集业务数据**
    - 提供 **实时 CDC**（Change Data Capture）能力
    - **全量+增量** 数据一站式导入
    - 支持 **60+** 数据源接入
    - **秒级别** 低延迟同步，保障数据实时入湖
    - **可视化操作**，方便快速构建与后期运维
+ **Paimon：支持流批一体的存储层**
    - 提供高效的湖存储
    - 支持**主键表**，避免重复数据
    - 支持 **schema 演进**，兼容数据库的 Online DDL
+ **SelectDB：高性能分析查询引擎**
    - 与 Paimon **无缝对接**，直接查询湖中数据
    - 支持 **实时分析** 和 **交互式查询**
    - 适合大规模、多维度的业务分析



**典型应用场景：实时用户行为分析**

在电商平台中，用户的浏览、加购、下单和支付等行为会不断产生数据，这些数据分布在交易库、用户库、日志系统中。在传统数仓架构下，这些数据通常需要经过离线批处理才能汇总，导致数据延迟在小时甚至天级，无法实现实时的推荐。

通过 **CloudCanal + Paimon + SelectDB**，可以实现：

+ **实时采集**：CloudCanal 捕获多源数据库的变更，并以秒级别延迟写入 Paimon；
+ **统一存储**：在 Paimon 中对订单、用户、日志数据进行主键表建模和分区管理，保证数据一致性；
+ **实时查询**：SelectDB 直接查询 Paimon 中的数据，实现毫秒级响应，支持推荐系统调用、BI 看板实时刷新。

最终，平台能够在用户浏览的同时完成个性化推荐，或及时识别高风险交易。

## 实操演示
这里我们通过一个简化示例，展示从 0 到 1 构建实时湖仓的过程：

### 前置准备
1. 安装 CloudCanal SaaS：[https://www.clougence.com/](https://www.clougence.com/)
2. 安装 Paimon：[https://paimon.apache.org/](https://paimon.apache.org/)
3. 安装 SelectDB：[https://www.selectdb.com/](https://www.selectdb.com/)

### 数据同步
#### 添加数据源
1. 登录 **CloudCanal 平台**，点击 **数据源管理** > **添加数据源**，分别添加 MySQL 和 Paimon 数据源。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/paimon_selectdb_lakehouse/2.png)

2. 添加 Paimon 数据源时，需配置额外参数，具体可参考：[Paimon 数据源配置](https://www.clougence.com/cc-doc/dataMigrationAndSync/datasource_func/Paimon/props_for_paimon_ds)

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/paimon_selectdb_lakehouse/3.png)

#### 创建同步任务
1. 点击 **同步任务** > [创建任务](https://www.clougence.com/cc-doc/operation/job_manage/create_job/create_full_incre_task)。
2. 选择源和目标实例，并分别点击 **测试连接**。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/paimon_selectdb_lakehouse/4.png)

3. 在 **功能配置** 页面，选择 **增量同步**，并勾选 **全量初始化**。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/paimon_selectdb_lakehouse/5.png)

4. 在 **表和操作过滤** 页面，选择需要迁移同步的表，可同时选择多张。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/paimon_selectdb_lakehouse/6.png)

5. 在 **数据处理** 页面，保持默认配置。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/paimon_selectdb_lakehouse/7.png)

6. 在 **创建确认** 页面，点击 **创建任务**，开始运行。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/paimon_selectdb_lakehouse/8.png)



任务启动后，CloudCanal 将自动完成全量数据的初始化，并实时捕获增量变更写入 Paimon。

### 数据查询
SelectDB 原生支持 [Paimon Catalog](https://doris.apache.org/docs/3.0/lakehouse/catalogs/paimon-catalog)，可通过外部 Catalog 的方式直接查询 Paimon 中的实时数据，无需额外导入或数据转换。

接下来将使用数据库管理工具 [CloudDM](https://www.cdmgr.com/) 完成数据查询。

#### 创建 Paimon Catalog
```shell
CREATE CATALOG catalog_name PROPERTIES (
    'type' = 'paimon',
    'warehouse' = '<paimon_warehouse>'
    "s3.access_key" = "your-access-key",
    "s3.secret_key" = "your-secret-key",
    "s3.endpoint" = "http://minio.example.com:9000"
);
```

#### 实时查询数据
Catalog 创建成功后，就可以开始查询 Paimon 中的数据：

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/paimon_selectdb_lakehouse/9.png)



当 MySQL 中的数据发生变化后，CloudCanal 会将变更实时同步至 Paimon，SelectDB 查询到的数据也将同步更新，从而实现真正的端到端 **秒级实时分析能力**，无需构建复杂的 ETL 流程。

## 总结
通过 **CloudCanal、Paimon 与 SelectDB** 的结合，我们在一个统一架构下打通数据采集、湖存储与实时分析，实现真正意义上的实时湖仓，为企业提供了更灵活的实时数据架构解决方案。

