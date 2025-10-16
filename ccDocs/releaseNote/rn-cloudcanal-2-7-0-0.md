---
id: rn-cloudcanal-2-7-0-0
title: 2.7.0.0
---

## CloudCanal-2.7.0.0

发版时间:2023年5月26日 版本号: 2.7.0.0

### 新链路

- 开放 PolarDbX 2.0 -> MySQL 结构迁移、全量迁移、增量同步、DDL同步（新增列/删除列）、校验与订正
- 开放 PolarDbX 2.0 -> StarRocks 结构迁移、全量迁移、增量同步、DDL同步（新增列/删除列）、校验与订正
- 开放 PolarDbX 2.0 -> Kafka 结构迁移、全量迁移、增量同步
- 开放 MySQL -> PolarDbMySQL、Redis 新校验订正能力

### 新特性

- 支持 Oracle 10g 增量同步(RAC 模式)
- 支持 RDS for MySQL -> MySQL 阿里云的 DMS 无锁变更
- 支持 RDS for MySQL -> RabbitMQ/Kafka 阿里云的 DMS 无锁变更
- 支持 TiDB 源端修改订阅库表列
- 支持 元数据检索，包括从源端表查对端表，查询设置过Where条件的，查询设置过对端主键的

### 优化

- 优化 MySQL/PolarDbMySQL 源端心跳连接开闭方式
- 优化 元数据刷新（任务详情 -> 功能列表 -> 刷新元数据）
- 优化 Kafka -> Kafka / RocketMQ -> RocketMQ 原始消息格式 apply_commit.log 日志
- 优化 RocketMQ -> RocketMQ 原始消息格式携带的头信息

### 问题修复

- 修复 TiDB 增量任务启动时OOM异常
- 修复 Kafka 到 StarRocks 任务无法创建的问题
- 修复 Oracle 到 StarRocks 无法查看库表映射的问题
- 修复 Oracle 对端结构迁移 CLOB/NCLOB DEFAULT 值错误的问题
- 修复 OceanBase/MySQL 源端主键中包含 Date 类型扫描问题
- 修复 Oracle 源端增量获取 LogMiner 正在分析的日志列表消耗过大问题
- 修复 自定义代码更新后，任务找不到代码包问题
- 修复 自定义代码CustomCodeContext参数在编辑订阅后，未传递到子任务的问题（子任务中该参数为空）
- 修复 创建 RocketMQ 任务时报 The producer group [CLIENT_INNER_PRODUCER] has been created before 错误
