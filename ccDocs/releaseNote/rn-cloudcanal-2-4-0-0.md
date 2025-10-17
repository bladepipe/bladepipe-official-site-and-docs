---
id: rn-cloudcanal-2-4-0-0
title: 2.4.0.0
---

## CloudCanal-2.4.0.0

发版时间:2023年3月9日 版本号: 2.4.0.0

### 新链路

- 开放 Db2 -> TiDB 链路，结构迁移、全量、同步、数据校验、手工DDL同步（加减列） 
- 开放 Db2 -> MySQL 链路，结构迁移、全量、同步、数据校验、手工DDL同步（加减列）
- 开放 Db2 -> Kafka 链路，结构迁移、全量、同步、数据校验、手工DDL同步（加减列）

### 新特性

- 支持 ElasticSearch 8.x 版本
- 支持 Doris 1.2.x 版本
- 支持 Oracle -> StarRocks Schema 级别的同步和自动过滤无主键表
- 支持 Oracle 源端 PrintKeyConfig 参数配置
- 支持 SQL Server 2008 JTDS 驱动
- 支持 MySQL -> OceanBase 结构迁移支持 AUTO INCREMENT
- 支持 对端为 Oracle 的任务的修改订阅

### 优化

- 优化 SQL Server 源端在选择同步DDL模式下，增加预检表只能被订阅一次
- 优化 任务删除，需先删除子任务才能删除主任务
- 优化 OceanBase -> OceanBase 性能数据延迟
- 优化 在增量任务上报位点时打印日志，提供偶发延迟告警问题的排查思路
- 优化 DDL 转换出错不记录异常事件，从而不发送一些不必要的告警
- 优化 控制台文案统一，任务名称统一改为任务ID，ID统一改为数字ID

### 问题修复

- 修复 ORACLE Transaction 回滚问题
- 修复 ORACLE LOG交替写入时，长Sql拼接引起的问题
- 修复 MySQL 生成建表语句 Double 携带精度问题
- 修复 CloudCanal 任务列表 Open API
- 修复 JTDS SQL Server 2008 LocalDateTime 类型写入问题
- 修复 MySQL -> SQL Server 全量写入失败，对端表含有 TIMESTAMP OR ROWVERSION 类型字段
- 修复 同步时间字段有默认时间 ON UPDATE CURRENT_TIMESTAMP 导致数据不一致
- 修复 MySQL -> OceanBase DDL 执行失败，多个操作写在一条 ALTER 语句不支持
- 修复 OceanBase 特殊的 _RECYCLEBIN 的 DDL 同步导致任务失败
