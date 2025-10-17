---
id: es_sync_detail
title: ElasticSearch 对端同步技术详解
description: 比较 MySQL 到 Elasticsearch 数据同步技术并介绍 CloudCanal 对此能力的实现细节
date: 2023-11-02
authors: junyu
tags:
  - tech_share
image: /img/ccBlog/tech_share/es_sync_detail.png
slug: /data_insights/es_sync_detail
---

## 简介

[CloudCanal](https://www.clougence.com?src=cc-doc-blog-es-sync-detail) 对于 [Elasticsearch](https://www.elastic.co/) 的支持经历了很多轮迭代，版本一路从 6.x,7.x 支持到 8.x 版本，也适配了其纷繁多样的 API。

因为 Elasticsearch 是一个相当流行的、实时的、并且具备一定不可替代能力的搜索引擎，所以很有必要对比下市面上我们能够比较容易获得的、免费的数据迁移同步工具，让大家落地实时数据搜索和分析更加有信心。

本文即从一个比较窄但是应用广泛的场景 - MySQL 到 Elasticsearch 数据同步技术 - 切入，比较不同技术的优劣和相关技术细节，最后给到一些展望。

## Elasticsearch 数据迁移同步技术对比

目前能够比较容易获得的、免费的、并且有一定应用范围的数据迁移同步工具有：Logstash 和 FlinkCDC，CloudCanal 也算其中之一。

一些对比如下表(如有错误，可联系笔者进行修改)。

|        | Logstash | FlinkCDC |CloudCanal|
|--------|---------- |----------|-------|
| 产品化  | 基础       | 基础     |完备 |
| 高可用    | 有        | 有        | 有     |
| 任务创建 |  配置文件     | 配置文件 + 代码 | 可视化 |
| 监控告警 | 基础        | 基础 |完备|
| 索引(结构)迁移  | 无        | 无     |有|
| 全量迁移   | 有        | 有        | 有     |
| 实时同步   | 有        | 无        | 有     |
| 数据校验   | 无        |无        |   有   |
| 索引结构同步（DDL）| 无 | 无 | 有限(加列)|
| 索引定义依赖 | 否      |否       |  是  |
| 数据源插件（原厂）| 一般 | 一般 | 丰富  |
| 数据源插件（社区） |丰富 | 一般 | 无  |
| 供应商     | 原厂     | 第三方  |第三方 |
| 获取方式   |   开源     | 开源   |免费社区版|

综合来看，各个产品各有特点，并且有自己的局限性。

Logstash 和 FlinkCDC 更多偏向社区，但是他们背后庞大的商业产品体系（分别对应 ElasticSearch 和 阿里云 MaxCompute & Dataworks）注定两者定位仅仅是支撑工具。

CloudCanal 更加偏商业化些，但是背后公司以此谋生。

## CloudCanal Elasticsearch 迁移同步技术介绍

### 基于 index mapping（索引结构）

因为 CloudCanal 最初支持从结构化数据库 - MySQL、Postgres、TiDB 等迁移同步数据到 Elasticsearch ，所以采用基于 mapping 方式构建目标数据。

具体展开，即在迁移同步数据到 Elasticsearch 前，CloudCanal 读取源端表结构，自动生成对应的 Elasticsearch 映射定义，并在对端创建，即结构迁移。

全量迁移和增量同步中，CloudCanal 会强依赖目标端的 mapping 结构进行数据构建。

基于 index mapping 方式构建目标数据带来的额外好处是：在 Elasticseach 上保持源端所有字段高速可查特性，叠加其对字符串字段基于倒排索引所带来的模糊查询能力。

### 处理 mapping 的变化 (DDL)

在关系型数据库同步到 Elasticsearch 过程中，源端表结构可能会动态变更，例如添加新字段等 DDL 操作。

对于 index 的 dynamic 参数设置为 false 后，Elasticsearch 将无法自动更新该结构变更，这将导致新的字段数据无法基于索引进行检索。

为了解决这一问题，CloudCanal 支持同步源端 DDL 加列的变更操作 - DDL 语句转换成 Elasticsearch 操作，动态更新到 index 的 mapping 中。

动态更新 mapping 的好处在于:
- 保证两端结构一致，满足业务的动态变更需求
- 无需用户手动干预构建索引，方便用户直接利用最新字段进行查询分析
- 有效弥补了 Elasticsearch 映射静态的限制

### 客户端 API 选择与得失

CloudCanal 依赖 Elasticsearch Java SDK 进行结构和数据操作，没有使用其基础 REST API 进行新的封装和调用。

这样做带来的好处是更少的工作量和更好的性能，坏处是 Java SDK 随着 Elasticsearch 版本升级变化极大，导致 CloudCanal 需要做较多的驱动隔离工作。

从 CloudCanal 架构设计原则上来看 - 不直接依赖开源/商业的业务组件，依赖数据库官方驱动 - 我们应该做了正确的事情。

## CloudCanal Elasticsearch 数据迁移同步展望

### 丰富源端数据源

目前 CloudCanal 支持 MySQL (或 MySQL 包装产品)、Postgres、TiDB、Kafka 同步到 Elasticsearch。

后续支持更多的源端数据源是一项非常重要的工作，且不仅限于结构化数据源，更有半结构化(mongodb)、非结构化数据源(redis、text file 等)作为源端的迁移同步，而后者对于基于 index mapping 的数据迁移同步带来很大的挑战。

### Elasticsearch 源端数据同步

CloudCanal 尚未实现对 Elasticsearch 进行源端数据同步功能，但是我们收到了蛮多社区用户和商业用户此类需求。

当前类似 Logstash 实现的也仅仅是全量数据迁移（使用 logstash-input-elasticsearch 插件），增量同步尚无合适方案，基于 trigger（如有）或定时基于时间戳增量扫描可能是解决方式。

### 基于 store 构建目标数据

CloudCanal 后续将支持基于 store 构建目标数据，即直接将 doc 写入目标端的存储文件中，不再依赖索引的 mapping 结构。

基于 store 构建目标数据好处在于：
- 支持同步非结构化数据，实现对各类数据源的通用同步
- 用户可以自行决定索引的构建和查询逻辑，更轻松实现各类数据分析场景

## 总结

Elasticsearch 带给业务独特的数据检索体验，是业务数据操作重要一环。CloudCanal 通过长周期、多轮迭代以及业务应用反馈予以鼎力支持，并由此积累了部分经验，借此文章对外分享。
