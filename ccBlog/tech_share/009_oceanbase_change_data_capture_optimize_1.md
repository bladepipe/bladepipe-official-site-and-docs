---
id: oceanbase_change_data_capture_optimize
description: 优化 OcenaBase 作为源端和目标端的数据迁移同步，大幅提升性能，表兼容性，优化数据校验和数据订正能力
title: OceanBase 数据迁移同步优化(一)
date: 2023-05-24
authors: junyu
tags:
  - tech_share
image: https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/blog/ccBlog/tech_share/oceanbase_change_data_capture_optimize_1.png
slug: /data_insights/oceanbase_change_data_capture_optimize
---

## 简述

[CloudCanal](https://www.clougence.com?src=cc-doc-blog-oceanbase-cdc-optimize) 去年支持 [OceanBase](https://www.oceanbase.com/) 数据迁移同步能力后，随着使用用户增多以及问题反馈，近期对该能力进行了一轮较大规模的优化。
    
本篇文章简要介绍这些优化点，以及未来该能力的演进方向。

## 优化点

### 大幅提升同步性能
CloudCanal 目前使用 OceanBase LogProxy 做增量数据订阅，使用方式相对简单明了。

```
@Override
public void notify(LogMessage message) {
    try {
        ParsedEntry entry = msgConvertor.convertMsgToEntry(message);

        if (entry == null) {
            return;
        }

        instance.getEventStore().put(entry);
    } catch (Exception e) {
        String msg = "parse ob msg failed.msg:" + ExceptionUtils.getRootCauseMessage(e);
        log.error(msg, e);
        throw new LogProxyClientException(ErrorCode.E_PARSE, msg);
    }
}
```

消息解析对性能影响相对小，**攒批** 和 **对端写入方式** 影响更大。

攒批方面，我们将变更事件写入内存队列后，按照 **个数/容量阈值(increBatchSize)** 或 **超时时间(fetchFromBrokerTimeoutMs)** 刷出，提升批量写入的粒度。

对端写入方式，根据不同数据源，我们采用了 **batch** 、**multisql** 、 **并行** 、 **upsert** 等技术提升写入效率。

### 统一各类表全量扫描方式

**全量数据扫描** 是 CloudCanal 全量数据迁移(或数据初始化)重要组成部分，需满足 **性能优秀**（2KB/record,>= 100k records 扫描速率）、**可断点续传**、**可预测进度**、**表兼容性好** 的要求。

其中前三者是业务要求，最后一种是尽可能满足前三者的前提下，做到更多表的兼容。

CloudCanal 碰到的"表"包含以下类型
- 关系型数据库
  - 无/单/多主键
  - 各种类型主键(整型/浮点/日期/二进制等)
  - 差异值主键(有/无符号，null值/空值，超长值)
  - 各种类型分区
  - 差异数据量(1万，100万，1000万，1亿，10亿，100亿)
  - 实体表/视图/临时表
- 消息中间件
  - 各种命名规范
  - 无/有分区
  - 顺序/非顺序
- 文档数据库
  - 规范/非规范(schemaless)
  - 无/有行业规范格式(ObjectId)
- 缓存数据库
- 搜索引擎

CloudCanal 全量数据扫描主要面向关系型数据库，**性能要求**、**断点续传能力**、**进度预测能力**都基于主键展开。

此次优化，我们做了如下几方面工作，统一了扫描逻辑，并且让**无/单/多主键、各种类型主键、分区表都可断点续传**
- 以**主键**、**分区**作为断点续传位点
- 扫描语句加入**分区指定(如有)**、**元组比较(单/多主键)**、**按元组排序**、**指定分页数**等部分
- **对比位点最大值**、**扫描行数**方式判定扫描是否结束

此外，各个数据源可根据自身差异性，可**扩展扫描语句**、**最大最小位点值获取逻辑**、**链接自定义(设置超时等)**、**执行语句上下文自定义(设置fetchSize等)**。

### 支持全局索引表
全局二级索引（GLOBAL）对分布式数据库有着非常重要的作用，它让原本 **多分区数据检索** 操作 **弱化成单分区检索**，加速不同维度点查响应，提升 QPS。

对于 OceanBase 对端写入，CloudCanal 默认采用关系型数据库 **INSERT IGNORE/ON DUPLICATE KEY UPDATE 规避主键/唯一键冲突**。

但是对于带有 GLOBAL 索引的表，OceanBase 不支持 INSERT IGNORE 操作，所以此次优化，我们写入 OceanBase 的 INSERT 操作默认改为 ON DUPLICATE KEY UPDATE (**REPLACE**)。

### 异构 DDL 同步转换优化

从异构数据库同步 DDL 到 OceanBase，我们优化成**白名单模式**。

如 MySQL 到 OceanBase DDL 同步，默认支持
- ALTER TABLE xxx ADD/DROP/MODIFY COLUMN
- CREATE INDEX
- RENAME TABLE

优化同时去除了 **ALTER TABLE xxx CHANGE COLUMN**、**AFTER/BEFORE** 等 OceanBase 现阶段不支持的语句。

此项能力随着 OceanBase 产品能力的进化而不断丰富。

### 解决时间戳自更新问题

对于类似 **`gmt_create` datetime/timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP** 时间字段定义，当源端该字段值变化区间小于时间精度（被程序判定未变化），并且写入对端并非采用 upsert 方式（**精确字段更新**），那么该字段数据将不一致。

CloudCanal 在**精确字段更新**模式下，默认将时间字段置为更新状态，确保将**源端值带到对端**，解决不一致的问题。

## 演进方向

### OceanBase 4.x 版本兼容

OceanBase 4.x 有着更加便利的部署方式和更好的使用体验，CloudCanal 后续会安排对此版本的兼容性测试，特别对于其可能存在的 **订阅权限(系统租户保护)变化**、**更多的 DDL 支持**、**更加丰富类型支持** 做出变化。

### OceanBase 商业级增量组件兼容

OceanBase 商业版 OMS 的数据订阅能力有别于目前社区版的 LogProxy，如 OceanBase 官方逐步扩大其使用面，CloudCanal 将第一时间跟进兼容。

### 更快的数据校验和订正能力

分布式数据库相对单机数据库，单表数据量大幅度增加（亿级表相当常见），数据校验和订正性能相比数据初始化，**更加依赖数据扫描的性能**，为此，CloudCanal 将开放 **单表分片/分区并行扫描** 的能力。

### 更强的结构迁移和 DDL 同步能力

大表 **通用/特殊化分区** 是常见操作，目前 CloudCanal 对表分区的结构迁移并未有效支持，这种分区的结构迁移，对于同构数据库相当必要。后续，我们将提供 **分区信息的结构迁移**。

### 更多的数据源生态支持
以 OceanBase 为源端数据迁移同步，目前支持 **MySQL**、**StarRocks**、**OceanBase**、**Kafka** 对端，我们希望后续如 **Redis**、**ElasticSearch**、**Doris**、**Hudi** 等数据源也能加入到这个目标数据源中。

## 总结
本文主要介绍了 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-oceanbase-cdc-optimize) 在过去一段时间对 **OceanBase 数据迁移同步能力**的优化,从而是这个能力具备**更强的性能**、**更好的兼容性**、**更加稳定的数据迁移同步表现**。