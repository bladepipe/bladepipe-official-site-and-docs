---
id: rn-cloudcanal-4-7-0-0
title: 4.7.0.0
---
## CloudCanal-4.7.0.0

发版时间:2025年4月1日 版本号: 4.7.0.0

## 亮点

- 开放 PostgreSQL 向量结合大模型提供 RAG 服务 （数据源类型：RagApi），兼容标准 OpenAI 交互协议，支持用 Cherry Studio 等三方工具操作
- 开放 [文件（数据源类型：SshFile、S3File、OssFile）到 PostgreSQL 全量迁移结合大模型进行数据向量化(embedding)](../bestPractice/sshfile_to_aliyun_pg_vector.md)，结合 RagApi 构建 私有数据到服务 的 RAG 应用
- 支持 PostgreSQL 到 PostgreSQL 全量迁移、增量同步结合大模型进行数据向量化(embedding)
- 支持 MySQL 到 PostgreSQL 全量迁移结合大模型进行数据向量化(embedding)
- 支持 添加 OpenAI、阿里云 DashScope、DeepSeek、HuggingFace、Cohere、LocalAI 等 LLM 类型数据源，为数据向量化和 RagApi 服务

## 新链路

- 开放 Dameng -> MySQL/StarRocks/Doris 链路 结构迁移、全量迁移、增量同步、数据校验与订正、DDL同步（加列/减列）
- 开放 Dameng -> ClickHouse 链路 结构迁移、全量迁移、增量同步、数据校验、DDL同步（加列/减列）
- 开放 Dameng -> Kafka 链路 全量迁移、增量同步
- 开放 文件数据源（SshFile、S3File、OssFile）到 PostgreSQL 的全量迁移
- 开放 文件数据源（SshFile、S3File、OssFile）到 MySQL 的全量迁移
- 开放 Greenplum -> Hana 链路 结构迁移、全量迁移、额外支持定时全量迁移和过滤条件（程序内和下推）
- 开放 Greenplum -> Doris 链路 结构迁移、全量迁移、数据校验与订正

## 新特性

- 支持 [通过 SSH 获取的 Posix 文件系统文件（SshFile）、AWS S3 文件（S3File）、阿里云 OSS文件（OssFile）数据源](../reference/file_schema_format.md)
- 支持 文本文件(txt,markdown,json,.java,.c等)、Excel、CSV 到 MySQL 或 PostgreSQL 全量迁移
- 支持 MariaDB 11.8 版本（实际规则增加了允许所有11.x版本）
- 支持 Aliyun RocketMQ 5.0 版本
- 支持 SQL Server 新增 CDC 表静态模式（多位点），任务共享固定 CDC 表名（db_schema_table_cc_static）
- 支持 用户偏好设置 RDB 目标端写入并行策略（参数：increParallelApplyStrategy）
- 支持 Iceberg 使用用户自定义代码
- 支持 Redis key 的正则过滤（新增参数：keyRegex）
- 支持 MongoDB 源端设置目标主键
- 支持 创建任务选表步骤 搜索并手动勾选能力，满足数据库有限授权和几十万张表选择几张做迁移同步的需求
- 支持 创建任务时根据用户偏好决定是否获取唯一键信息
- 支持 创建任务在有唯一键无主键表，自动勾选 UPDATE & DELETE 或表变为可选择，且在选列页面自动设置第一个唯一键字段为对端主键
- 支持 JDK17 运行 CloudCanal 产品，整体运行效率得到提升
- 支持 [清理机器日志](../productOP/dailyOP/clear_worker_log.md)

## 优化

- 优化 Aliyun RocketMQ 测试连接，可探测 Aliyun RocketMQ 实例是否存活
- 优化 Aliyun RocketMQ 源端重置位点，可通过 timestamp 进行位点重置
- 优化 SQL Server 元信息获取，提示页面获取速度。
- 优化 TiDB 源端，支持多 TiSession 请求，提升任务 Region 处理瓶颈（参数：maxPoolSize）
- 优化 Redis 源端全量大 Key 同步（新增参数： listValueShardSize、hashValueShardSize、setValueShardSize、zsetValueShardSize）
- 优化 Redis 位点，添加 count 辅助指标，dbIndex 多位点
- 优化 支持 ElasticSearch 对端写入无 format 手动创建 format 的 date 类型
- 优化 ElasticSearch 对端同步时区转换及带时区数据校验订正
- 优化 初次安装 CloudCanal 需要删除默认 Sidecar
- 优化 数据源列表分类展示，更容易识别

## 问题修复

- 修复 Redis -> Redis 任务多次重启导致源端 Redis 主节点服务不稳定的问题（新增参数：bindSocketPort）
- 修复 Redis -> Redis 任务停止 Socket 连接不会关闭的问题
- 修复 Kafka Scram 登录模式并选择原始消息格式时，增量同步出现异常的问题
- 修复 TiDB 源端表名大写导致 DDL 无法捕获的问题
- 修复 修改订阅无法展示表数量的问题
- 修复 StarRocks DYNAMIC scanMode 对 largeint 类型数据的转换
- 修复 PolarDbMySQL 全量期间空指针报错的问题
- 修复 Hana、PostgreSQL、Dameng、TDengine、SQL Server Dbs 过长导致修改订阅报错的问题
- 修复 Aliyun RocketMQ 源端修改订阅抛非法 groupid 异常
- 修复 Aliyun RocketMQ 源端修改订阅合并配置失败问题






