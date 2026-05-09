---
id: elasticsearch_elasticsearch_sync
description: 本文介绍基于增量扫描的 Elasticsearch 到 Elasticsearch 数据同步方法，并带你从零开始实操整个过程。
title: Logstash 之外，还可以这样做 Elasticsearch 之间的增量数据同步
date: 2026-04-15
authors: mumu
tags:
  - data_sync_sample
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/data_sync_sample/elasticsearch_elasticsearch_sync.png 
slug: /data_sync_sample/elasticsearch_elasticsearch_sync
---

在做 Elasticsearch 之间的数据同步时，很多团队第一反应是使用 **Logstash**。作为 Elastic 官方生态的一部分，它配置简单，能解决基本的数据搬运需求。但由于缺乏直观的监控、告警以及精细的任务管理，在跨集群或大规模同步场景中，Logstash 常常不是最佳方案。

针对这些问题，CloudCanal 提供了基于增量扫描的企业级数据同步解决方案，本文将介绍这种方案的实现机制和特性，并带你从零开始构建数据链路，帮你快速上手。

## Logstash 的现实挑战
Logstash 是 Elastic 官方推出的开源数据处理管道工具，提供了丰富的 input / filter / output 插件，可以将数据从一个集群读取并写入另一个集群，因此在 Elasticsearch 数据同步场景中被广泛使用。

但在实际生产环境中，Logstash 也存在一些问题。例如，Logstash 没有内置的任务管理和监控，断点续传需要自己处理，配置文件一旦复杂起来，维护成本也不低。更关键的是，它本质上是一个数据管道工具，难以直观地监测同步状态、延迟、异常，出了问题往往很难快速定位。

这种“盲盒式”的运维体验，在大规模的数据迁移同步中往往会放大风险，给业务稳定性带来极大挑战。

## CloudCanal 解决方案：增量扫描
最近，CloudCanal 提供了一种轻量、直观的 Elasticsearch 数据同步方式：增量扫描同步。相比于 CDC 方式（需安装插件，对版本要求极严，仅推荐给对秒级实时性有极致要求的场景），**增量扫描**是目前更普适、更稳定的选择。

### 实现机制
增量扫描的核心思路很直接：既然无法获取变更日志，那就定时扫描，每次只拉取最近一段时间内有变化的数据。

具体来说，CloudCanal 会创建一个**定时扫描任务**，按设定的周期拉取数据，结合用户指定的增量字段（时间类型字段），每次扫描只会拉取时间在“上次扫描之后”的新增或更新数据，从而实现增量同步效果。

整个过程不需要对源端做任何改造，也不需要安装插件，无需侵入 Elasticsearch 集群。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/elasticsearch_elasticsearch_sync/scheduled_scan_based.png)

不过，这种方式的同步并非实时完成，通常会有一定延迟（具体取决于定时扫描的周期），同时，也无法直接感知和捕获 DELETE 操作。

### 链路管理和监控
相比 Logstash，CloudCanal 支持可视化创建任务，并内置了完整的任务管理和监控能力，原本不可见的链路状态都转化为直观的指标，便于使用和运维。

同步任务运行期间，你可以在控制台实时查看延迟、吞吐量、同步行数等核心指标，随时掌握链路的状态。一旦任务出现异常，可以在控制台及时发现，也可以进一步查看详细日志定位问题。

在告警方面，CloudCanal 支持通过 IM、电话、邮件等多种方式发送通知，可以根据团队的使用习惯灵活配置。出了问题不用盯着控制台，第一时间就能收到提醒。

此外，CloudCanal 具备断点续传能力。若任务意外中断，重启后会自动从上次记录的增量位点继续执行。

这些企业级同步能力让 Elasticsearch 之间的增量同步变得更可控、更稳健。

## 操作演示
下面将演示如何使用增量扫描方式，从零开始搭建 Elasticsearch 到 Elasticsearch 同步链路。

### 步骤 1：安装 CloudCanal
进入 [CloudCanal 官网](https://www.clougence.com/)，点击 **免费社区版**。

参考 [全新安装（Docker）](https://www.clougence.com/docs/productOP/docker/install_all_in_one_docker)，安装 CloudCanal 私有部署版本。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/elasticsearch_elasticsearch_sync/0.png)

安装完成后，用默认账号（`test@clougence.com` / `clougence2021`）登录控制台。

### 步骤 2：添加数据源
点击**数据源管理** > **新增数据源**，分别添加源端和目标端的 Elasticsearch，并确保测试连接正常。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/elasticsearch_elasticsearch_sync/1.png)

### 步骤 3：选择数据源
1. 点击**同步任务** > **创建任务**，进入任务创建流程。
2. 选择源端和目标端数据源，点击 **测试连接**。
3. 选择需要同步的 schema 信息。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/elasticsearch_elasticsearch_sync/2.png)

### 步骤 4：配置任务
1. 在功能配置页面，**任务类型** 选择 **增量同步**。
2. **同步模式** 选择 **定时扫描**，并 **设置参数**。
    - **执行周期**：即每次扫描的间隔，单位秒 (默认 300 秒)。建议先调大，稳定后再调小。
    - **执行前动作**：即开始扫描之前可以执行的动作。这里选择 **无，**以实现增量同步效果。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/elasticsearch_elasticsearch_sync/3.png)

### 步骤 5：选择数据表
在表 & action 过滤页面，选择要迁移的表。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/elasticsearch_elasticsearch_sync/4.png)

### 步骤 6：处理数据
1. 在数据处理页面的左侧选择表，并勾选要迁移的列。
2. 按需设置 **增量字段**（不设置则每次进行全量扫描），优先选**可排序、稳定递增或可比较**的时间字段：
    - 单独设置：在左侧点击 **操作 > 增量字段**，为这张表设置增量字段。
    - 批量操作：在右上角点击 **批量操作 > 增量字段**，为多张表统一设置增量字段。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/elasticsearch_elasticsearch_sync/5.png)

### 步骤 7：创建确认
1. 在创建确认页面，确认任务信息。
2. 确认无误后，点击 **创建任务**。任务将自动开始运行。

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/data_sync_sample/elasticsearch_elasticsearch_sync/7.png)

## 总结
相比 Logstash，增量扫描这种方式更方便、稳定，并且内置监控和管理能力，更适合生产环境。

如果你正在寻找 Elasticsearch 到 Elasticsearch 数据迁移同步的解决方案，不妨试一下 CloudCanal 免费社区版，几分钟内即可完成一条同步链路的搭建，让数据更高效地流动起来。
