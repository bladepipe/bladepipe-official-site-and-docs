---
id: rn-cloudcanal-2-6-0-0
title: 2.6.0.0
---

## CloudCanal-2.6.0.0

发版时间:2023年4月27日 版本号: 2.6.0.0

### 新链路

- 开放 TiDB -> OceanBase 结构迁移、全量、数据同步、DDL同步（新增列/删除列）、数据校验、数据订正
- 开放 TiDB -> KAFKA 全量、数据同步、DDL同步（新增列/删除列/Rename列）
- 开放 MySQL -> SelectDB 结构迁移、全量、数据同步、DDL同步(新增列/删除列/Rename列）、数据校验
- 开放 PostgreSQL -> SelectDB 结构迁移、全量、数据同步、数据校验

### 新特性

- 支持 MySQL -> ADB MySQL 目标端 KeyConflictStrategy 参数可修改
- 支持 SQL Server 自定义代码
- 支持 Docker-Compose 1.x及2.x,基础镜像添加JDK，Arthas，Windows脚本适配Docker-Compose及 Docker Compose两种格式
- 支持 KAFKA -> KAFKA 修改订阅，Topic 增删改
- 支持 数据源添加阿里云 RDS For MySQL 只读实例
- 支持 MySQL-> SQL Server 源端使用关键字清单上的名字作为列名
- 支持 新增OpenAPI 查看、新增/修改数据源配置两个接口

### 优化

- 优化 PostgreSQL/Greenplum 作为对端的写入性能
- 优化 PostgreSQL/Greenplum 作为对端的增量监控指标
- 优化 SQL Server 作为对端的增量监控指标
- 优化 任务详情中结构迁移/全量/增量同步日志查看策略
- 优化 Oracle -> ClickHouse 支持单副本、多副本 DDL 同步
- 优化 CloudCanal 数据校验与数据订正功能
- 优化 机器管理页面的任务列表心中CPU使用率、任务 JVM FGC 指标
- 优化 用户管理页面列表添加用户UID列
- 优化 任务创建页面根据用户配置默认选择冲突策略，个人中心可配置 KeyConflictStrategy 参数
- 优化 Oracle 类型，NUMBER 不带精度长度的，默认当作 NUMBER_BIGINT
- 优化 ClickHouse 无主键表引擎类型为 MergeTree,不再使用 ReplacingMergeTree

### 问题修复

- 修复 CloudCanal 添加数据源为阿里云 Tair for Redis 时报错的问题
- 修复 MySQL -> MySQL 对端生成时间类型默认值的问题
- 修复 Oracle 到对端数据源 结构迁移、DDL 大小写映射问题
- 修复 TiDB 任务创建初始化位点的问题
- 修复 MySQL CHAR/VARCHAR/TEXT 类型默认映射到 SQL Server NCHAR/NVARCHAR/NTEXT 小语种乱码问题
- 修复 OceanBase -> OceanBase 数据同步后数据校验失败的问题
- 修复 KAFKA -> KAFKA 不支持待创建的 Topic
- 修复 Druid 连接池，超时重置问题
- 修复 Oracle -> ClickHouse 结构迁移精度问题，NUMBER(20) 映射成 Int128