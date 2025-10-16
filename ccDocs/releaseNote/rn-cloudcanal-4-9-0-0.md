---
id: rn-cloudcanal-4-9-0-0
title: 4.9.0.0
---
## CloudCanal-4.9.0.0

发版时间:2025年7月31日 版本号: 4.9.0.0

## 亮点

- 新增 AWS DynamoDB、AWS ElastiCache (Valkey/Redis)、GaussDB 源端数据源

## 新链路

- 开放 AWS ElastiCache (Valkey/Redis) -> AWS ElastiCache (Valkey/Redis) / Redis 全量迁移、增量同步、数据校验、数据订正
- 开放 Redis -> AWS ElastiCache (Valkey/Redis) 全量迁移、增量同步、数据校验、数据订正
- 开放 AWS DynamoDB -> MySQL / StarRocks 全量迁移、增量同步、数据校验、数据订正
- 开放 MySQL -> AWS DynamoDB 结构迁移、全量迁移、增量同步、数据校验、数据订正
- 开放 [华为 GaussDB](../dataMigrationAndSync/datasource_func/GaussDB/privs_for_gaussdb) -> MySQL / Oracle / Doris / SelectDB 结构迁移、全量迁移、增量同步、数据校验、数据订正、DDL同步（加列、减列、modify、rename、truncate）
- 开放 华为 GaussDB -> Clickhouse 结构迁移、全量迁移、增量同步、数据校验、DDL同步（加列、减列、modify、rename、truncate）
- 开放 ClickHouse -> StarRocks / Doris / SelectDB 结构迁移、全量迁移、数据校验、数据订正
- 开放 Yuque 文档 -> PostgreSQL (向量) 结构迁移、全量迁移

## 新特性

- 支持 Redis 到 Redis 非幂等命令（如：incr/decr）因任务重启重复执行（新增参数：enableWriteDeReplay），实现 exactly once 语义
- 支持 [Apache Paimon HDFS 存储方式](../dataMigrationAndSync/datasource_func/Paimon/props_for_paimon_ds.md#通用配置)，当前支持 S3、HDFS、本地文件三种方式
- 支持 StarRocks 部分列更新（参数：partialUpdateEnabled，partialUpdateMode）, 让增量同步链路更省带宽
- 支持 Doris / StarRocks 目标端控制校验方式，根据主键的分布特性优化查询性能（新增参数：checkFetchStrategy，checkRangeThreshold）
- 支持 MySQL / PostgreSQL 获取当前最新文件位点
- 支持 PostgreSQL / RDS for PostgreSQL 使用 SSL 证书认证
- 支持 SQL Server 源端联合主键数据校验
- 支持 ClickHouse 支持 25.4.x/25.5.x/25.6.x
- 支持 StarRocks 3.4.x 版本 TABLE_TYPE 为 TABLE 的表（适配其新版本元数据变化）
- 支持 Dameng 源端增量同步单位点任务消费
- 支持 Redis 使用 TLS 连接，并允许使用自签 CA 证书连接
- 支持 MySQL / RDS for MySQL SSL 证书认证
- 支持 ElasticSearch 对端 DATE 类型内置格式
- 支持 Oracle 源端设置事务超时后自动提交的时间（参数：autoCommitTxTimeoutSec）
- 支持 创建任务时设置 Kafka 对端副本数
- 支持 [数据清洗 源端字符串转时间](../operation/job_manage/job_op/data_transform.md#当前支持的脚本)（castToDateTimeWithFormat(@params['dt'],'yyyy-MM-dd HH:mm:ss')、castToDateWithFormat(@params['d'],'yyyy-MM-dd')、castToTimeWithFormat(@params['t'],'HH:mm:ss')）
- 支持 [私有部署开启 MFA 验证](../operation/system_manage/mfa_usage)，增强账号安全
- 支持 创建任务设置默认集群（新增用户偏好参数：defaultClusterName），以免用户创建任务忘记指定特定集群导致创建失败

## 优化

- 优化 Redis 全量拆分 Key 前生成 del command，解决任务重启后对端重复写入的问题
- 优化 MySQL 获取 SECURITY_TYPE 为 DEFINER 的视图时根据权限信息检索
- 优化 MySQL 源端按白名单处理 Create DDL 刷新 MetaHistory 逻辑，MetaHistory 只保存任务相关表的 DDL 信息
- 优化 SQL Server 元数据获取逻辑，支持获取自定义类型字段
- 优化 创建任务第一步做限制，目标端 DB2 不显示待创建库
- 优化 PostgreSQL 源端添加多 DB 增量任务预检
- 优化 MariaDB 源端表级别 ACTION 添加 CREATE/ALTER/RENAME/TRUNCATE/DROP
- 优化 获取 AK/SK、重置 AK/SK 以及第三方配置的排布，目前移动到 配置 > 个人资料 > 安全 中
- 优化 子账号管理页面国际化问题
- 优化 创建任务按钮布局，下一步按钮位置固定


## 问题修复

- 修复 PostgreSQL 修改订阅的子任务合并后 publication slot 没有删除的问题
- 修复 Kafka -> MySQL / Iceberg 修改订阅没有把主任务的目标主键带上的问题
- 修复 Kafka -> MySQL / Iceberg 创建相似任务没有带上目标主键的问题
- 修复 Kafka -> MySQL / Iceberg 修改订阅不增减表只修改目标主键报未进行修改的问题
- 修复 创建相似任务，修改源端数据源类型，控制台和接口报错的问题
- 修复 创建任务和创建相似任务，选完库映射再切换数据源类型控制台报错的问题
- 修复 AuroraMySQL 源端全库同步抛 src table detail is empty 异常
- 修复 TiDB -> TiDB 结构迁移中复合索引项重复出现导致异常报错的问题
- 修复 使用相同文件名的私钥/证书认证文件修改数据源认证配置不生效问题
- 修复 使用 TLS/Kerberos 认证的 Kafka 数据源测试连接显示证书文件不存在问题
- 修复 源端有 Schema 的链路使用默认目标主键时，修改订阅没有展示该目标主键的问题
- 修复 任务列表、数据源管理列表、集群列表、状态机列表、环境列表、角色列表、子账号列表查询时页数没有重置的问题
- 修复 OpenGauss 创建任务时未显示 autoInitReplication 配置的问题
- 修复 Dameng 源端解析 SQL 字段包含 TimeStamp 关键字解析失败的问题
- 修复 修改订阅不新增表时修改数据清洗条件不生效的问题
- 修复 修改订阅减少表时出现 NPE 的问题
- 修复 Oracle 源端元数据快照不刷新的问题
- 修复 Oracle 源端 COL x 解析错位的问题
- 修复 修改子账号名字报错的问题
- 修复 MariaDB 全量条件下推弹窗展示不正确导致过滤条件失效的问题
