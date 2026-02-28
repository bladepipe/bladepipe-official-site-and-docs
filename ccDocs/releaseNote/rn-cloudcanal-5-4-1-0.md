---
id: rn-cloudcanal-5-4-1-0
title: 5.4.1.0
---
## CloudCanal-5.4.1.0

发版时间:2026年2月28日 版本号: 5.4.1.0

## 新链路

- 开放 AWS Amazon MSK -> StarRocks 增量同步
- 开放 AWS DocumentDB ->  OceanBase for MySQL 全量迁移/数据同步
- 开放 SQL Server -> TiDB 结构迁移/全量迁移/数据同步/数据校验/数据订正/DDL（加列/减列）

## 新特性

- 支持 MySQL 9.x 版本
- 支持 [AWS Amazon MSK 的 IAM 方式认证](../dataMigrationAndSync/datasource_func/Kafka/kafka_iam_auth)
- 支持 Kafka 在数据源中传递自定义配置 customClientProps，具备更多样的认证方式和设定
- 支持 Hana 源端多位点模式（表级增量表）下心跳功能
- 支持 Vastbase G100 v2.2 版本
- 支持 任务参数 dbs（库、表、列等信息） 的关键词搜索
- 支持 修改机器描述

## 优化

- 优化 TiDB 全量查询 SQL TIKV Hint 优化，解决出现单条 SQL 查询内存超限导致查询失败问题（新增参数 storageEngineQueryHint）
- 优化 Paimon 升级 1.3.1 驱动版本
- 优化 Kafka -> StarRocks 部分列更新场景多 Topic 到同一 table 的写入问题
- 优化 MySQL -> MySQL 结构迁移含有计算索引时跳过该索引避免报错
- 优化 任务详情页面重跑任务后自动刷新详情
- 优化 任务列表中的数据源信息展示方式
- 优化 未激活状态引导交互，更加清晰且容易理解
- 优化 访问不存在的任务详情时重定向至任务列表页
- 优化 定时校验子任务关闭追加订正功能

## 问题修复

- 修复 从老版本升级后，action 白名单映射到黑名单时，部分 aciton 由于特殊规则映射不完整的问题
- 修复 MySQL -> MySQL 结构迁移 DATETIME 类型最后一列会被强制增加 default current_timestamp 的问题
- 修复 MySQL -> MySQL 结构迁移 FLOAT/DOUBLE 类型 unsigned 丢失的问题
- 修复 SQL Server -> Doris/GaussDB/MySQL/Oracle/PostgreSQL/StarRocks FLOAT 和 REAL 类型映射的问题
- 修复 SQL Server -> MySQL 增量 DATETIMEOFFSET、SMALLDATETIME 类型对端写入为 0 值的问题
- 修复 SQL Server -> MySQL 增量 TIMESTAMP 类型写入对端时数据不一致的问题
- 修复 SQL Server 源端结构迁移时间类型精度丢失的问题
- 修复 Dameng 全量开启过滤条件下推但未设置过滤条件时，全量任务无法结束的问题
- 修复 Vastbase -> MySQL/Dameng DATE 类型被映射为时间戳的问题
- 修复 Vastbase 源端校验任务解析 MONEY 类型报错的问题
- 修复 Vastbase 获取 oid 映射的 SQL 兼容性问题
- 修复 源端 Hana/SQL Server/PostgreSQL/Dameng/TDEngine 任务 DDL 不同步的情况下删除源端表后修改订阅异常的问题
- 修复 并行任务组中链路源端执行 DDL 导致任务报错问题
- 修复 任务组用户隔离失效问题，禁止用户跨权限查看及操作任务组
- 修复 Firefox 浏览器中多选框样式异常的问题
- 修复 已取消勾选的列修改订阅时会自动全部勾选上的问题
- 修复 修改目标表名会将“待创建”写入表名中的问题
- 修复 任务详情页在任务描述较长时出现页面显示异常的问题
- 修复 DocumentDB/MongoDB 源端修改订阅仅修改 设置_id 时提示“无变更”的问题
- 修复 MySQL -> Kafka 链路中，列选择的下拉菜单显示异常的问题
- 修复 位点分页刷新后页码与数据不同步的问题
- 修复 切换中英文后同步设置菜单中的国际化没有更新的问题
- 修复 创建相似任务时对端表设为“待创建”后，原取消勾选列被错误继承的问题


