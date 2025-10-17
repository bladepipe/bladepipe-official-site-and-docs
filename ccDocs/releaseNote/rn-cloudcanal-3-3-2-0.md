---
id: rn-cloudcanal-3-3-2-0
title: 3.3.2.0
---

## CloudCanal-3.3.2.0

发版时间:2023年11月28日 版本号: 3.3.2.0

### 新链路

- 开放 [Oracle -> Doris / SelectDB](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/oracle2?target=Doris) 结构迁移、全量迁移、增量同步、数据校验、数据订正

### 新特性

- 支持 [Kafka 源端](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/kafka2) Debezium Json 消息格式
- 支持 MongoDB 6.x 和 7.x 版本，目前支持 MongoDB 版本为 3.x 4.x 5.x 6.x 7.x
- 支持 [MongoDB 源端](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/mongodb2) Change Stream 订阅模式（5.x 以上默认打开 Change Stream 的方式，可通过 captureMode 参数修改）
- 支持 MongoDB 目标端写入时区转换配置（enableTimeZoneProcess 设置为 true, timezone 设置时区）
- 支持 MongoDB 目标端批量写入（修改参数 enableBatchApply 为 true）
- 支持 [MongoDB -> MongoDB](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/mongodb2) 数据校验、订正（数据订正只支持 Long / Integer / ObjectId 为主键的集合）
- 支持 MongoDB 源端主从架构的增量同步（修改 oplogCollection 为 oplog.$mian）
- 支持 [MySQL -> StarRocks](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/mysql2?target=StarRocks) （3.1.4 以上版本）binary 类型数据同步（修改参数 enableEasyMatchMode 为 true）
- 支持 [MySQL -> MongoDB](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/mysql2?target=MongoDB) 数据校验、订正（数据订正只支持 Long / Int / Varchar 为主键的表）
- 支持 OceanBase 对端全量前清空表数据，方便重跑、定时全量开始时做数据重置
- 支持 TiDB 对端全量前清空表数据，方便重跑、定时任务开始时做数据重置
- 支持 MySQL -> StarRocks / Doris 默认镜像规则映射（页面默认按镜像匹配，结构迁移、数据迁移、同步）
- 支持 MySQL -> StarRocks / Doris 大写表/列 到 小写表/列映射（页面可选择映射规则，数据迁移、同步）
- 支持 Aurora MySQL -> StarRocks / Doris 大写表/列 到 小写表列映射（页面可选择映射规则，数据迁移、同步）
- 支持 Aurora MySQL -> StarRocks / Doris 源端修改订阅（全量迁移、增量同步、数据校验）

### 优化

- 优化 所有链路的表映射规则和列映射规则，支持手动选择映射规则
- 优化 [链路文档](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/mysql2) ，内容更加实用、简洁、易维护、可传播

### 问题修复

- 修复 MySQL -> MySQL 全量迁移 bit 类型写入报错的问题
- 修复 MySQL -> TiDB utf8mb4 字符集没有同步过去的问题
- 修复 MySQL -> MongoDB 全量、增量写入类型不一致的问题
- 修复 MySQL 源端 Long 无符号类型的字段，数据超过 9223372036854775807，任务会持续报错无法同步的问题
- 修复 MySQL -> StarRocks 执行 DDL 报错的问题
- 修复 目标端 Kafka / RocketMQ / RabbitMQ / ADB for MySQL / Oracle / MongoDB / MySQL / PolarDbForMySQL / Redis 增量同步页面延迟无变化的问题
- 修复 SQLServer -> MySQL 增量报错的问题
- 修复 源端 PolarDbMySQL 使用 GHOST 或 PT 工具同步时白名单添加异常的问题
- 修复 源端有库对端没库，无法正常创建任务的问题（Kafka / RocketMQ / RabbitMQ / Redis / ElasticSearch）
- 修复 参数修改确认弹框按钮的文案（从 “按模板变更” 变为 “确认”）
- 修复 MongoDB 目标端时间类型解析报错的问题（目前时间类型写入可兼容不同的格式）
- 修复 MongoDB 源端 ObjectId、Binary、Decimal 类型转换错误的问题
- 修复 MongoDB -> MySQL 创建相似任务第四步无法点击下一步的问题
- 修复 MongoDB 源端链路任务详情无法查看结构迁移的表的问题
- 修复 RocketMQ 写入时分区越界的问题
- 修复 StarRocks / Doris StreamLoad 写入长时间无响应的问题（设置目标端参数 httpSoTimeout）
- 修复 TiDB、ClickHouse、ADB for MySQL 执行 DDL 报错但任务不中断的问题
- 修复 创建 RDB -> Kafka / RocketMQ DDL Topic 失效的问题
- 修复 创建任务中已存在表映射规则设置异常的问题
- 修复 修改订阅添加库、表后子任务启动失败的问题