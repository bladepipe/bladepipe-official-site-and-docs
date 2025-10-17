---
id: rn-cloudcanal-2-2-1-0
title: 2.2.1.0
---

## CloudCanal-2.2.1.0

发版时间:2022年3月18日
版本号: 2.2.1.0

### 新链路

- 支持 MongoDB->Kafka，schema 支持 Alibaba Canal/Aliyun DTS avro/CloudCanal 3种消息格式
- 支持 Kafka->MongoDB, schema 支持 Alibaba Canal/Aliyun DTS avro/CloudCanal 3种消息格式
- 支持 Oracle->Kafka，schema 支持 Alibaba Canal/Aliyun DTS avro/CloudCanal 3种消息格式

### 新功能

- 支持机器内存超卖
- 支持 Kafka 消息格式 [Aliyun DTS Avro 格式](https://github.com/LioRoger/subscribe_example/tree/master/avro) 兼容，并拓展 isPk 属性
- 支持到 Greenplum 全量比较再 upsert 能力(可结合过滤条件，适合做数据订正）
- 支持 MySQL 源端全库同步时编辑任务并添加新库
- 支持 MySQL 源端全库同步配置action过滤
- 支持任务编辑时，新增同步对象可选择不做全量迁移，直接进行增量同步
- 支持MySQL、PostgreSQL 到 Oracle 结构迁移时源端时间类型列默认值

### 优化

- 优化创建任务 MySQL 源端大小写处理
- 优化控制台打开任务列表的性能

### 问题修复

- 修复 MongoDB 源端增量日志解析问题
- 修复 PolarDbMySQL 对端数据同步时单线程模式写入问题
- 修复拉取 Aliyun RDS oss binlog 切换问题，此问题可能偶发导致任务卡住或极端情况丢数据
- 修复 StarRocks 链路不支持主键更新的问题
- 修复全量校验 Decimal 类型比较不准的问题
- 修复增量同步transaction buffer sequence在启动时没有正确重置的问题
- 修复 StarRocks 配合自定义代码中增减列时存在的问题
- 修复 StarRocks 结构迁移 Decimal 类型精度为 0 时的迁移问题
- 修复 MySQL binlog 解析初始化 LogBuffer 过小导致的解析问题
- 修复 PostgreSQL/Greenplum 到 StarRocks 结构迁移，schema 处理不正确导致的迁移问题
- 修复 MySQL、Oracle、PostgreSQL 到 Greenplum 结构迁移唯一索引和主键共享列问题
- 修复 Oracle 源端 redo 模式下某些情况下位点卡住问题
- 修复对端 MySQL 5.7 结构迁移时对于默认值允许为空的兼容问题
- 修复对端 MySQL 结构迁移时 maxrowsize 问题，CloudCanal 会计算 rowsize 并自动优化列类型映射