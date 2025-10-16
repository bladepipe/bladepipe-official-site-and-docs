---
id: rn-cloudcanal-2-2-0-4
title: 2.2.0.4
---

## CloudCanal-2.2.0.4

发版时间:2022年2月25日
版本号: 2.2.0.4

### 新链路

- 支持 PostgreSQL->Kafka
- 支持 PostgreSQL->ClickHouse
- 支持 SQLServer->Kafka
- 支持 SQLServer->SQLServer
- 支持 Kafka->PostgreSQL
- 支持 Kafka->Greenplum
- 支持 Kafka->ElasticSearch
- 支持 Kafka->ClickHouse
- 支持 Kafka->StarRocks
- 支持 Kafka->SQLServer

### 新功能

- 支持 MySQL->ElasticSearch 定时全量任务(Upsert)
- 支持 MySQL->ElasticSearch 任务修改订阅
- 支持 MySQL->Redis 自定义代码
- 支持 MySQL->Redis 任务修改订阅
- 支持 MySQL->RabbitMQ 任务修改订阅
- 支持 MySQL->ClickHouse 任务修改订阅
- 支持 MySQL->PostgreSQL 任务修改订阅大小写
- 支持到 MySQL 任务全量/增量冲突覆盖策略(**keyConflictStrategy参数为REPLACE**)

### 优化

- 优化到 PostgreSQL/Greenplum 结构迁移 bit(n>1) 类型自动转为 bit varying(n)
- 优化到 PostgreSQL/Greenplum 结构迁移 char 类型自动转为 character varying(n)
- 优化 SQLServer->SQLServer 支持 uniqueidentifier 类型, 目标端类型映射成 varchar(64)

### 问题修复

- 修复 MySQL 预检 show master status 文件是否在 show binary logs 中 bug
- 修复创建任务时，MySQL 源端初始化位点未获取 server_id 的问题
- 修复 where 条件 col is null 问题
- 修复 where 条件 in/not in 分支条件通过 and/or 与其他条件连接的问题（e.g., is_delete=0 and abc not in (‘07’,‘08’,‘10’,‘13’)）
- 修复 where 条件列为 bit 类型导致全量迁移时数据过滤报错问题
- 修复 MySQL->MySQL 带自定义代码时，bit 类型对端写入 NPE 问题
- 修复 PostgreSQL/Greenplum 对端写入 bit varying 或 varbit 类型数据截断问题
- 修复对于 ClickHouse 20.x 版本获取表元数据时兼容问题
- 修复批量裁剪列问题
- 修复创建相似任务时,修改 where 条件失败问题
- 修复定时任务下一次执行时间显示问题
- 修复创建任务第二步强制填写错乱问题
- 修复 MySQL->Redis 创建任务 Redis Key 没有默认值的问题
- 修复MySQL->Redis创建任务对端库名错误问题（应该是dbName:tableName格式）