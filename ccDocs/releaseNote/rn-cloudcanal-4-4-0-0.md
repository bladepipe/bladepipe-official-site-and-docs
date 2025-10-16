---
id: rn-cloudcanal-4-4-0-0
title: 4.4.0.0
---
## CloudCanal-4.4.0.0

发版时间:2024年9月27日 版本号: 4.4.0.0

## 新链路

- 开放 MySQL -> ObForOracle 结构迁移、全量迁移、增量同步、数据校验与订正、DDL同步（加列/减列/修改列/清空表）
- 开放 ObForOracle -> OceanBase 结构迁移、全量迁移、增量同步、数据校验与订正、DDL同步（加列/减列/清空表）
- 开放 OceanBase -> ClickHouse 结构迁移、全量迁移、增量同步、数据校验
- 开放 OceanBase -> MongoDB 全量迁移、增量同步、数据校验
- 开放 MongoDB -> StarRocks 全量迁移、增量同步、数据校验
- 开放 AWS DocumentDB，支持链路等同 MongoDB 且可和 MongoDB 互相同步

## 新特性

- 支持 ClickHouse ReplaceMergeTree _sign 、_version 字段，所有操作变为 INSERT 且有明确版本信息，增强同步性能
- 支持 Redis &lt;-&gt; Redis EvalSha、PsetEx、Script Load（单机不支持）命令
- 支持 TiDB 源端同步分区表
- 支持 TiDB -> TiDB 分区表结构迁移
- 支持 ElasticSearch -> ElasticSearch 修改订阅，查看库表映射，创建任务或修改订阅表映射和列映射功能
- 支持 PostgreSQL 源端设置心跳（新增参数：dbHeartbeatEnable、dbHeartbeatOp、dbHeartbeatIntervalSec）
- 支持 源端 OceanBase、StarRocks、SQLServer、Db2 设置目标主键 ，方便数据汇聚
- 支持 操作审计记录用户登录成功/失败的操作
- 支持 操作审计多条件查询
- 支持 操作审计展示 uid，以及双击自动按 uid 查询
- 支持 子账号管理界面展示 uid 并支持复制，以及根据 uid 查询子账号

## 优化

- 优化 PostgreSQL/Oracle/MySQL/MariaDB 到 ClickHouse 结构迁移采用新架构，更加简单统一
- 优化 ClickHouse 驱动依赖，去除 ru.yandex.clickhouse 包内依赖（官方标记将去除），并升级驱动版本为 0.4
- 优化 StarRocks/Doris/SelectDB 获取表唯一键（或主键）字段报错异常信息打印
- 优化 ClickHouse 类型读取逻辑，更好适配复合、复杂类型
- 优化 MongoDB 类型读写逻辑，更好适配符复合、复杂类型
- 优化 MySQL 源端 Change Column DDL 语句同步

## 问题修复

- 修复 TiDB 源端增量同步 TableID 变化导致的同步延迟问题
- 修复 TiDB 源端任务异常重启后，位点异常上报导致丢数据的问题
- 修复 TiDB GPRC 连接创建大量线程导致的 OOM 问题
- 修复 MongoDB 源端因二次校验逻辑问题导致数据校验的错误
- 修复 MongoDB/DocumentDB -> MySQL Timestamp 类型格式不对的问题
- 修复 MongoDB/DocumentDB 对端写入时间类型时区转换的问题
- 修复 OceanBase 源端增量遇致命异常无法退出的问题
- 修复 OceanBase 源端数据校验初始化位点信息失败的问题（NPE）
- 修复 RDS for MySQL 用户非必要 Schema 权限不足导致创建任务失败的问题
- 修复 SQLServer 源端无主键情况下，获取字段元数据异常的问题
- 修复 源端一个事务中有多条变更时 RocketMQ/RabbitMQ/Kafka 对端数据写入 PK 为空的问题（DSG & OGG & Envelope 消息格式）
- 修复 MySQL 源端初始化时区配置错误的问题
- 修复 任务详情展示的创建人均为主账号的问题





