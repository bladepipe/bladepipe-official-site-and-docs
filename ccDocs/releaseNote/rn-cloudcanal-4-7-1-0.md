---
id: rn-cloudcanal-4-7-1-0
title: 4.7.1.0
---
## CloudCanal-4.7.1.0

发版时间:2025年4月29日 版本号: 4.7.1.0

## 亮点

- 支持 [Oracle 备库（isDataGuard）](../dataMigrationAndSync/datasource_func/Oracle/oracle_dg_mode.md)
- 支持 [Oracle 源端订阅 OpenLogReplicator](../dataMigrationAndSync/datasource_func/Oracle/prepare_for_oracle_olr.md)

## 新链路

- 开放 Dameng -> OceanBase 链路 结构迁移、全量迁移、增量同步、数据校验、数据订正、DDL 同步（加列/减列）

## 新特性

- 支持 通过大模型从文件中提取结构化数据并写入数据库，可用于快速构建微调用的问答训练集 
- 支持 MySQL -> PostgreSQL 的大模型增量嵌入（VectorDB 写入不再限制强类型，支持更多链路）
- 支持 Ollama、ZhipuAI 等大模型用于向量嵌入与对话应用
- 支持 RagApi 请求参数 showReasoning=true，开启思维链（Reasoning）展示
- 支持 RagApi 流式对话，兼容 OpenAI、LocalAI、Ollama、DeepSeek、DashScope、Zhipu AI、HuggingFace
- 支持 RagApi 配置 MCP 服务器，实现调用外部 MCP 服务链路
- 支持 RagApi 多知识库自动路由，智能选择对应知识库进行向量检索（任务参数：enabledPromptFunctions）
- 支持 RagApi 查询压缩与多语义向量检索，提升搜索精准度（任务参数：enabledPromptFunctions）
- 支持 RagApi 向量数据库上下文召回接口（v1/content/retrieve）
- 支持 SQL Server、Oracle、 PostgreSQL 视图 全量同步/校验订正/结构迁移
- 支持 Redis -> Redis 校验订正（新增参数 checkBatchSizeMb、enableFullValueEqualCheck）
- 支持 数据清洗 新增 fillNullValue 函数用于替换字段中的空值为指定值
- 支持 数据清洗 新增 limitLength 函数用于切割字段值至指定长度，防止超过目标端约束
- 支持 多 Console 集群共享单一 Prometheus 服务（新增 Console 参数：prometheus.product.name）

## 优化

- 优化 全量同步期间 MQ 对端转换源端 timestamp/datetime 类型数据，默认格式 yyyy-MM-dd HH:mm:ss.SSS
- 优化 数据校验期间 Oracle 对端 BLOB 类型空数据与源端 Empty BLOB 类型相等
- 优化 任务启动元数据获取（新增参数：useAdvancedMeta）
- 优化 回滚客户端功能，可从 Sidecar 自动获取回滚路径
- 优化 Redis 源端全量 Batch 解析全量时间，解决全量同步期间一次性拉取单个 Key 下的全部 Value 值导致的内存问题（新增参数 enableFullBatch、parseFullEventBatchSize）
- 优化 Redis 校验对端获取数据方式（Redis Pipeline），减少网络 RTT，提升整体校验速率
- 优化 zeroDateTimeBehavior 默认参数为 exception，使增量行为与全量一致
- 优化 ElasticSearch 对端 globalTimezone 为空时不对日期类型数据进行时区转换，优先使用不带时区信息的 format
- 优化 子账号授权逻辑

## 问题修复

- 修复 MySQL -> Kafka 创建相似任务或修改订阅时分区数获取异常的问题
- 修复 PostgreSQL 源端结构迁移时间精度丢失的问题
- 修复 PostgreSQL timestamp without time zone/time with time zone/time without time zone 类型同步到对端时区转换问题（新增参数 srcTimezone）
- 修复 全量期间 MySQL 源端 Second 值为 0 的 Time 类型数据写入到 PostgreSQL/SQL Server/Oracle 对端丢失 Second 值的问题
- 修复 StarRocks Serveless 存算分离版本获取不到表的问题
- 修复 StarRocks 2.4 及以下版本获取表信息异常问题
- 修复 停止任务会发送告警的问题
- 修复 创建任务源对端没有 MySQL 数据源，仍默认选中 MySQL 并且去调用接口拿 MySQL 数据源的问题
- 修复 Kafka 在修改账号的 TLS 认证方式缺失配置 TrustStore 密码引发的 NPE 异常
- 修复 Kafka -> MySQL/PolarDbMySQL/AdbMySQL 增量同步期间，同一张表的一批 json 数据中 columns 顺序不一致导致的写入问题（新增参数 enableMsgDataSort）
- 修复 Kafka -> MySQL/PolarDbMySQL/AdbMySQL 增量同步期间，同一张表的一批 json 数据中 columns 定义不一致，导致对端写入问题（新增参数 enableDynamicColumnCheck）
- 修复 Oracle 对端增量同步，无主键表 Update / Delete 语句包含空数据时，执行失败的问题
- 修复 Oracle 对端增量同步，无主键表 MERGE INTO 语句报错导致 Batch 降级的问题
- 修复 ClickHouse 对端 Date、DateTime 类型全量同步月份向后偏移的问题




