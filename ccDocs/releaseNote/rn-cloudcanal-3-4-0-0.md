---
id: rn-cloudcanal-3-4-0-0
title: 3.4.0.0
---

## CloudCanal-3.4.0.0

发版时间:2024年2月28日 版本号: 3.4.0.0

### 新链路

- 开放 [GuassDbForOpenGuass &lt;-&gt; GuassDbForOpenGuass](https://www.clougence.com/cc-doc/bestPractice/opengauss_pg_loop_data_sync) 双向数据同步、结构迁移、全量迁移、增量同步、数据校验
- 开放 Hana -> Kafka 结构迁移、全量迁移、增量同步

### 新特性

- 支持 [MySQL -> Hive 增量数据同步](https://www.clougence.com/blog/data_insights/hive_dst_change_data_capture_writer)
- 支持 Hive 目标端全量前清空对端表数据和重建表功能
- 支持 [PostgreSQL &lt;-&gt; PostgreSQL](https://www.clougence.com/cc-doc/bestPractice/opengauss_pg_loop_data_sync) 双向数据同步
- 支持 SQL Server 跨网络通过 Tunnel 数据源写入数据到 MySQL (SQL Server->Tunnel->MySQL)
- 支持 OceanBase -> SQL Server 数据校验能力
- 支持 使用 OpenApi 创建任务时自定义 dstWholeReplace 参数值
- 支持 添加 SQL Server 数据源时指定默认数据库
- 支持 MySQL 源端增量同步任务重置位点修改 SERVER ID
- 支持 Kafka 对端写入添加自定义消息头（新增参数：customHeader）

### 问题修复

- 修复 关注列表中未显示已关注的他人创建任务的问题
- 修复 OnlineDDL 工具的临时表没有同步源表映射关系的问题
- 修复 PostgreSQL / GuassDbForOpenGuass 对端 DB 存在，Schema 待创建，但是结构迁移不会创建 Schema 的问题
- 修复 MySQL -> ElasticSearch / MongoDB 增量同步时异步队列内存值计算不准确的问题
- 修复 未开启校验订正功能链路创建一次性校验订正子任务的问题
- 修复 Hive 获取 Column 元信息 NPE 的问题