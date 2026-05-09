---
id: tidb_change_data_capture
description: TiDB 为源端的数据迁移,数据同步(CDC,change data capture),结构迁移,数据校验和订正
title: CloudCanal x TiDB 数据迁移同步
date: 2023-08-27
authors: junyu
tags:
  - tech_share
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/tech_share/tidb_change_data_capture.png
slug: /data_insights/tidb_change_data_capture
---

## 简介
[TiDB](https://github.com/pingcap/tidb) 是一款由 [PingCAP](https://cn.pingcap.com/) 开源的 **分布式关系型** 数据库，主打 **HTAP** 能力，具备 **优秀的伸缩性**。其开源社区强大，产品颇具流行度。

数据同步场景中，TiDB 官方提供如 TiCDC、TiDB Binlog 等工具，但为了满足用户将 TiDB 数据迁移同步到更加广泛数据库的需求，[CloudCanal](https://www.clougence.com?src=cc-doc-blog-tidb-cdc) 近期推出了 **TiDB 为源端的数据迁移同步** 功能，本文将简要介绍该能力的落地。

## 功能介绍
### 目标数据库和能力
| 目标端数据源    | 结构迁移 | 数据初始化 | 增量同步 | 数据校验 | 数据订正 |
|------|------|------|------|------|------|
| MySQL     | 支持   | 支持   | 支持   | 支持   | 支持 |
| TiDB      | 支持   | 支持   | 支持   | 支持   | 支持 |

> 目标数据源不断增加中

### TiDB 源端特色能力

#### 不依赖 TiCDC
TiDB 为源端的增量数据同步实现有两种方式
- 作为 TiCDC 下游接收变更记录，实现数据同步
- 与 TiKV/PD 直接通信，接收实时变更数据，实现数据同步

CloudCanal 考虑到部署的 **轻量性**、**可控性**，选择了第二种方案，跳过 TiCDC、TiDB Server 组件，**直接与 PD 建立 gRPC 通信**，实时接收源端数据变更记录，通过算法解析字节流内容，自动同步到对端数据库中。

#### 支持断点续传
长周期数据同步，任务可能会因为**参数调整**、**问题数据修复**、**性能优化**等操作暂停或重启任务，断点续传能力不可或缺。

CloudCanal 为 TiDB 源端定时或定量保存对端消费后的位点，以实现断点续传能力。

全量迁移中，对亿级别数据量的大表中断重启，断点续传能力可尽可能少的影响迁移进度，增量同步中，断点续传能力确保任务重启后可继续，并不丢失数据。

#### 变更事件保序
订阅 TiDB 增量变更事件，可能因为各种原因，个别变更数据到达时间不一致(乱序)，导致数据丢失或变更错误。

CloudCanal 为此采用自研算法处理事件，并根据事务 **最终提交时间** 来保证事务的有序消费。

#### 支持 DDL、DML 增量数据同步
CloudCanal 支持以 TiDB 为源端，TiDB、MySQL 为对端 (支持的对端数据源还在不断增加) 的 DDL 和 DML 同步。

- DDL 数据同步能力：
  - ALTER TABLE ... ADD/DROP/MODIFY COLUMN ... 
  - ALTER TABLE ... ADD/ALTER/DROP INDEX ...
  - RENAME TABLE ... TO ...
  
- DML 数据同步能力
  - INSERT/UPDATE/DELETE
  
除了 DDL、DML 同步功能实现，CloudCanal 根据 SCHEMA SNAPSHOT 和 DDL 构建了表 **多版本表快照能力**，确保变更数据和结构保持一致，数据消费更加精准。

#### 结构迁移类型自动处理与优化
不同数据库对于数据类型支持存在差异，CloudCanal 结构迁移时会进行**类型自动转换**与优化。

TiDB 为源端的结构迁移也存在类似转换与优化，如以 MySQL 为对端的 Float 类型若不指定精度，则可能造成数据精度丢失，
CloudCanal 将 Float 类型自动转换为 Float(0),保证了精度的准确性

#### 配套数据校验与订正能力
在数据同步过程中，由于数据的**外部关联性**、**结构约束差异**、**数据库运维操作**、**软件bug**等情况，两端数据可能会不一致，此时数据校验和订正功能非常必要。

CloudCanal 为 TiDB 为源端的数据同步能力额外提供了数字、字符类型主键表的**数据校验**和**数据订正**功能，快速确定不一致数据范围，并针对差异数据进行修复。

#### 产品化能力支撑
##### 可视化创建
CloudCanal 创建 TiDB 数据迁移同步任务是完全可视化的，通过**获取数据库元数据**，让用户**在 web 页面上决定哪些库、表、列进行迁移同步**，或者设定**过滤条件**、**自定义数据处理逻辑**等。

##### 自动化流程
TiDB 数据迁移同步任务创建后，CloudCanal 将**自动流转**各个阶段的任务，用户无需干涉，直达数据实时同步状态。

##### 监控图表支撑
CloudCanal 为 TiDB 数据迁移同步任务提供了多个实用监控指标，包括**增量缓存RPS**、**增量缓存延迟(ms)**、**内存队列数据个数**等，当调优任务性能或排查任务异常原因时，监控指标提供了很好的判断依据。

##### 告警支持
CloudCanal 为 TiDB 数据迁移任务提供了包括**钉钉/企业微信/飞书/自定义**等 webhook 类型告警，对于企业级客户，可额外选择**邮件**，以及**短信告警**，实时保障同步任务的高可用。

## 简单示例
本示例以将数据从 TiDB 数据库同步到 MySQL 数据库为操作案例，以便更好地说明 CloudCanal 在不同数据库之间进行数据同步的能力。

### 准备动作
- 下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-tidb-cdc),使用参见[快速上手文档](https://www.clougence.com/docs/productOP/docker/install_linux_macos)
- 准备好 TiDB 数据库（本例使用 5.4.3 版本）和 MySQL 数据库（本例使用 8.0 版本）
- 登录 CloudCanal 平台 ，添加 TiDB 和 MySQL
- TiDB 增量同步依赖 PD 通信，如需进行增量同步，请在额外参数处填写 PD 地址
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0010/1.jpg)

### 任务创建
- 任务管理 -> 新建任务
- 测试链接并选择 源 和 目标 数据库
- 点击下一步
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0010/2.jpg)

- 选择 数据同步，并勾选 全量数据初始化，其他选项默认
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0010/3.jpg)

- 选择需要迁移同步的表和列 (本例以常见的 数字、字符、时间类型主键、多主键表为例)
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0010/4.jpg)
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0010/5.jpg)

- 确认创建任务
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0010/6.jpg)

- 任务自动执行结构迁移、全量同步和增量同步，执行一些增量数据同步后进行数据校验，结果显示数据校验通过
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/tech_share/0010/7.jpg)


## 总结
本文主要介绍了 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-tidb-cdc) 支持 TiDB 为源端数据迁移同步功能，通过这个能力，用户可以便利地将 TiDB 中数据实时同步到其他数据库，实现数据更广泛、更实时的应用。
