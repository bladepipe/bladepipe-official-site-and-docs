---
id: rn-cloudcanal-4-0-1-0
title: 4.0.1.0
---

## CloudCanal-4.0.1.0

发版时间:2024年4月29日 版本号: 4.0.1.0

### 新链路

- 开放 TiDB -> Doris 结构迁移、全量同步、增量同步、数据校验与订正、DDL同步（create table/add column/modify column/drop column/rename column/rename table）

### 新特性

- 支持 Hana 源端表级别增量同步(订阅的每一张表具备独立的 CDC 表)，大幅提升增量数据捕获速度
- 支持 更加强大的数据过滤条件，除子查询、关联查询、CTE、聚合函数等不支持，支持大部分 MySQL 表达式（函数），具体参数 [http://dev.mysql.com/doc/refman/8.0/en/functions.html](http://dev.mysql.com/doc/refman/8.0/en/functions.html)
- 支持 K8S 环境中按 HostName 进行调度，解决 K8S pod 漂移引发的问题
- 支持 MQ 目标端自定义消息体中表结构的映射关系（新增参数：customMsgDefMapping）
- 支持 MySQL 源端任务同时订阅 PT 与 GHOST 工具临时表，实现无需重启任务即可随意切换 OnlineDDL 工具（extraDDL 参数设置为 PT_GHOST）
- 支持 全量迁移/增量同步任务单独添加校验和订正子任务
- 支持 任务在全量阶段进行重跑

### 优化

- 优化 MySQL -> StarRocks STRING 映射为 VARCHAR
- 优化 MySQL / PolarDbMySQL 目标端 DDL 去重功能，兼容单 Alter 语句多操作能力
- 优化 Oracle Rac 环境中遗漏消费归档日志的问题

### 问题修复

- 修复 安全漏洞，升级管控应用 spring-boot 版本到 2.5.15
- 修复 安全漏洞，升级管控应用 MyBatis 版本到 3.5.6
- 修复 安全漏洞，升级管控 MySQL 驱动到 8.0.33
- 修复 MySQL、Doris、Oracle、TiDB 全量对端非法时间写入异常问题，非法时间由 defaultZeroDate 参数值替换
- 修复 MySQL、OceanBase、PolarDbMySQL 源数据库时间不准确而导致任务延迟为负的问题
- 修复 MySQL、OceanBase 主键为 VARBINARY / BINARY / BLOB 时全量同步报错的问题
- 修复 MySQL -> TiDB 同步 index 异常问题，过滤 index 类型 DDL
- 修复 MySQL 源端白名单判断失败导致内存中表结构与实际 DB 表结构不一致问题
- 修复 MQ 目标端进行全量同步时，主键名大小写未跟随映射配置变化的问题
- 修复 Oracle 源端忽略 MISSING_SCN 事件导致数据丢失的问题
- 修复 Oracle 目标端 UPDATE SET 为空的问题
- 修复 Oracle 目标端 NCHAR / NVARCHAR2 / NCLOB 因字符集导致的写入报错问题
- 修复 StarRocks 对端字符类型数据校验越界导致任务中断的问题
- 修复 SQL Server-> Oracle 列映射无效的问题
- 修复 页面位点信息展示样式问题
- 修复 机器列表页面搜索结果内容永远为空的问题
- 修复 重置位点提示操作失败确认按钮转圈问题
