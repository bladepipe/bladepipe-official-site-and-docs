---
id: rn-cloudcanal-4-8-0-0
title: 4.8.0.0
---
## CloudCanal-4.8.0.0

发版时间:2025年6月30日 版本号: 4.8.0.0

## 亮点

- 开放 [Google Drive(Docs/Sheet)](../dataMigrationAndSync/datasource_func/GoogleDrive/prepare_for_google_cloud.md) -> PostgreSQL 结构迁移、全量迁移、向量嵌入
- 开放 MySQL -> [Apache Paimon](../dataMigrationAndSync/datasource_func/Paimon/props_for_paimon_ds.md) 结构迁移、全量迁移、增量同步、数据校验、数据订正、DDL（加列、减列、modify、rename、truncate）
- 开放 Kafka -> Apache Paimon 全量迁移、增量同步
- 开放 Doris/SelectDB -> MySQL 结构迁移、全量迁移

## 新链路

- 开放 MongoDB -> ClickHouse 全量迁移、增量同步
- 开放 PolarDbMySQL -> Elasticsearch 结构迁移、全量迁移、增量同步、数据校验、数据订正、DDL（加列）

## 新特性

- 支持 PostgreSQL/SQL Server/Oracle/MariaDB -> MySQL 宽表构建
- 支持 PostgreSQL -> StarRocks/Doris/SelectDB 宽表构建
- 支持 PostgreSQL/MariaDB -> StarRocks/Doris/SelectDB 虚拟列
- 支持 PostgreSQL -> StarRocks/Doris/SelectDB JSONB 类型数据同步
- 支持 MongoDB/DocumentDB -> MongoDB/DocumentDB 索引迁移
- 支持 RagApi ReRank 能力，将查询出来的结果进行二次重排（参数：enabledPromptFunctions/contentReRankPrompt）
- 支持 RagApi 跨域配置（参数：httpCorsConfig）
- 支持 RagApi 请求参数 disableRag，若设置为 true 本次请求不执行 RAG 工作流
- 支持 RocketMQ -> RocketMQ 原始消息格式同步时，用户可自定义 properties （参数：messagePropertiesKey）
- 支持 MySQL（双向同步）/AdbForMySQL/Dameng/Hana/OceanBase/ObForOracle/Oracle/PolarDbMySQL/PolarDbX/PostgreSQL/SQL Server/TiDB 目标端 KEY_UPGRADE_TABLE 写入策略，解决唯一键字段更新导致的数据冲突问题（即检测到唯一字段数据变更，自动将当前批数据从主键级别并行降级为表级别）
- 支持 Dameng DDL 关键字替换（新增参数：sqlReplaceKeywords），当遇到解析不支持的 DDL，可页面设定等效 DDL 进行替换，从而规避解析错误
- 支持 [PostgreSQL 源端任务创建，高级配置可开闭 “自动初始化表复制属性”](../dataMigrationAndSync/datasource_func/PostgreSQL/set_pg_replica_identity.md)，让用户自己决定初始化的时机和方式
- 支持 TGZ 自动部署/升级机器时，自定义安装包名称，简化下载包管理逻辑（下载包带版本，可直接用于部署而不需要重命名）
- 支持 自动刷新令牌保持登录无感知（相关参数 clougence.rdp.login.expire.sec）
- 支持 任务详情页面添加 Kafka/RocketMQ 对端具体写入分区查询入口


## 优化

- 优化 RagApi 上下文注入、压缩、扩展 Prompt 默认格式，模型效果更好（参数：enabledPromptFunctions）
- 优化 RagApi 自动根据用户提问选择向量表查询，对于问题有更好的针对性（参数：enabledPromptFunctions / knowledgeSelectPrompt）
- 优化 SQL Server 源端动态模式，修改 filterDDL 参数进行检查
- 优化 MySQL 源端 DateTime 类型 Zero date 数据（0000-00-00 hh:mm:ss）全量转为合法时间（0000-01-01 00:00:00）
- 优化 Redis 源端同步协议兼容 RDB Version 12 版本 （即支持源端 Redis 大于等于 7.4 的版本）

## 问题修复

- 修复 宽表因关联表数据缺失、同一批数据相同关联字段值从而导致列名重复、数据缺失等问题
- 修复 DashScope qwen-max 模型不兼容的问题
- 修复 任务只修改大模型设置（不修改表和列）的情况下不能修改订阅的问题
- 修复 SQL Server 动态模式源端执行 DDL 后任务重启导致订阅到旧的 CDC 表，同步少列的问题
- 修复 Kafka -> Kafka 源对端 partition 只能设置成一样的问题
- 修复 Kafka 源端 partition 无法正确获取的问题
- 修复 Dameng 增量同步连接数创建过多的问题
- 修复 Dameng 增量同步不支持的 DDL 空指针的问题
- 修复 Dameng 源端任务重启导致元数据库性能下降的问题
- 修复 MySQL/TiDB/PolarDbMySQL 对端解析源端 `Create Table ... Like ...` DDL 不准确导致 DDL 被跳过的问题
- 修复 Doris/SelectDB 对端数据校验出现字符串越界的问题
- 修复 数据清洗返回数字类表达式页面测试报错的问题（如 return cast(@params['col'] as integer) / 1000 数字结果表达式）
- 修复 MySQL -> Kafka 创建任务/修改订阅 Topic 分区有概率获取不正确的问题
- 修复 CloudCanal 未激活的情况下添加机器报错的问题
- 修复 MySQL -> Tunnel 结构迁移报错的问题
- 修复 Oracle 源端为分区表时，增量同步生成表结构时，会过滤系统的分区列，避免解析报错
- 修复 MongoDB/DocumentDB 源端存在 id 列，同时把 _id 映射为 id 列，同步数据错位的问题
- 修复 TiDB 到 StarRocks 源端是大写字段，同步到 StarRocks 报错的问题（参数：cdcUseOriginalCase）

