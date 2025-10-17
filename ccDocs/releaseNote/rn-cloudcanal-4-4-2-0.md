---
id: rn-cloudcanal-4-4-2-0
title: 4.4.2.0
---
## CloudCanal-4.4.2.0

发版时间:2024年11月29日 版本号: 4.4.2.0

## 亮点

- 开放 [MySQL -> Iceberg](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/mysql2?target=Iceberg) 结构迁移、全量迁移、增量同步、DDL 同步（加列，删除列，改列类型，改列名，改列 Nullable）

## 新链路

- 开放 PolarDB-X 2.0 -> Doris 结构迁移、全量迁移、增量同步、数据校验与订正
- 开放 ObForOracle -> Kafka 全量同步、增量同步


## 新特性

- 支持 TiDB 8.x 源端和目标端
- 支持 SelectDB 4.0 版本
- 支持 PolarDB-X 2.0 源端 Auto 模式下数据同步
- 支持 Clickhouse Cloud 数据源(添加 Clickhouse 数据源时修改 useSSL 参数为 true)
- 支持 MongoDB -> MySQL / StarRocks 主键映射（_id -> 指定字符串类型的列），方便用户对端建表
- 支持 Oracle / MySQL / SQL Server -> Kafka 虚拟列
- 支持 MySQL -> StarRocks 修改订阅支持增加待创建库
- 支持 虚拟列值为数据转换表达式
- 支持 校验订正子任务可修改订阅
- 支持 定时全量、校验任务在任务调度等待期间可修改订阅 
- 支持 OceanBase Binlog 模式下，可通过文件位点重置任务位点
- 支持 审计日志导出为 EXCEL 格式文件（新增审计日志导出权限）

## 优化

- 优化 TiDB 源端过滤 Delete 为空的事件
- 优化 Doris / SelectDB 对端结构迁移 Char / Varchar 不带长度或 0 长度默认值设置（255 / 65535）
- 优化 Clickhouse 对端时间类型默认映射从 Datetime 修改为 Datetime64
- 优化 添加 DocumentDB 地址栏可填写集群地址
- 优化 各项更新操作的审计日志, 更加易读且新增部分必要信息

## 问题修复

- 修复 PolarDB-X 任务初始化时，未获取 Binlog 位点相关信息，导致任务长时间初始化的问题
- 修复 PolarDB-X 源端解析 SQL 报错导致增量同步无法进行的问题
- 修复 OceanBase 部分数据新增参数在添加时不生效的问题
- 修复 StarRocks 源端获取表信息未过滤视图的问题
- 修复 Doris / OceanBase 创建任务获取表信息未过滤视图问题
- 修复 StarRocks / Doris 目标端写入重试机制报错的问题
- 修复 MySQL -> StarRocks 源端空表全量迁移卡在 99.9% 无法完成的问题
- 修复 SQL Server 对端增量同步，无主键表 Update / Delete 语句包含空数据时，执行失败的问题
- 修复 多张表增量同步部分表设置了数据清洗，多表同时交叉增量时数据清洗遗漏的问题
- 修复 子账号开启全部资源权限后，已授权限显示不同步的问题
- 修复 OceanBase、PolarDB-X 位点重置界面多选框显示为英文的问题
- 修复 ADB for MySQL 目标端 Clob 类型 （Text / Longtext）写入为空的问题
- 修复 PostgreSQL 目标端 MUTI_SQL 模式，虚拟列同步异常的问题
- 修复 过滤条件带有多个条件导致过滤无效的问题
- 修复 AWS DocumentDB 为源端的结构迁移报错的问题
- 修复 MongoDB 为源端 ChangeStream 推送空 Update 事件的问题
- 修复 删除任务清理对端资源时，选择公网方式链接，Host 为空的问题
- 修复 Hive 对端未设置分区键却显示已设置的问题
- 修复 Hive 目标端 Timestamp 类型写入无法查看的问题
- 修复 Hive 目标端全量迁移 __op 字段为 Null 的问题
- 修复 创建相似任务虚拟列删除后不重新渲染的问题
- 修复 批量设置数据清洗，删除单表的数据清洗会删除所有表的数据清洗的问题
- 修复 新增虚拟列，批量新增虚拟列后，不会自动切换到虚拟列tab的问题
- 修复 修改订阅某些链路（源端带 Schema 的数据库，目前已知 Hana -> MySQL / Oracle -> Doris）去掉一张表，另外的表的列会空，导致任务变成更新表的问题
- 修复 修改订阅合并子任务到主任务可能导致子任务虚拟列/数据清洗配置无效的问题（e.g., 主任务配置了虚拟列，子任务配置了数据清洗）





