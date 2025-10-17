---
id: rn-cloudcanal-2-1-0-14
title: 2.1.0.14
---

## CloudCanal-2.1.0.14

发版时间:2022年1月19日
版本号: 2.1.0.14

### 新特性
- 【重要】支持新的数据源对端 StarRocks 。
- 【重要】支持 Oracle 源端新的 REDO 增量消费模式。
- 【重要】支持 SQLServer 源端。
- 支持机器管理页面根据数据源过滤机器上绑定的任务
- 数据源管理页面支持按照描述、部署类型等条件筛选数据源
- 支持 MariaDB 更多版本，10.1.x
- 支持 MySQL->ElasticSearch 校验任务
- 支持阿里云 RocketMQ HTTP 协议
- 新支持 PostgreSQL -> ClickHouse 链路
- 支持MySQL源端增量 DDL 细粒度 action 控制
- MySQL 源端编辑订阅支持 action 过滤、列裁剪
- 更好的云数据库支持，机器列表支持将机器添加到关联数据源

### 优化
- 报警发送默认也发送给系统管理员
- 增量任务停止后支持页面手动摘除绑定，避免内存预占用导致创建任务时由于资源不足无法创建任务
- 支持任务列表页根据绑定的worker来筛选任务
- 优化机器列表查看机器和绑定任务的性能
- 优化PG查询元数据的性能
- MySQL源端的转义功能，支持更多特殊字符的转义，避免写入报错
- 优化没有列映射时的性能
- 优化自定义代码包加载逻辑，启动时加载
- 优化对 Kafka 数据源不同版本的兼容性
- 支持 Redis 空密码数据源
- 支持自定义代码任务相关日志白屏化展示
- 对 MySQL 源端实例长时间没更新抛出的 SocketTimeout 做更可读的日志输出

### BugFix
- 修复 OSS binlog 下载和解析消费有时候卡住的问题
- 修复写入 PostgreSQL 由于并发执行可能获取到空 DataSource 对象导致的 NPE 问题
- 修复结构迁移时，统计迁移的表数量不准的问题
- 修复增量SINK/PUBLISH相关指标不准确的问题
- 修复以物化视图方式订阅 Oracle 源端表时，当表全列均为主键情况引发 sequence ("") 异常的问题。
- 修复 Oracle 为对端数据写入时，主键字段含有 CHAR/NCHAR 类型时 丢失 UPDATE、DELETE的问题。
- 修复针对含有  Foreign Key 约束的表结构迁移时，出现 ForeignKey already exists. 异常的问题。