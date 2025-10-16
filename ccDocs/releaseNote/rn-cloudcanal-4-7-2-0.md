---
id: rn-cloudcanal-4-7-2-0
title: 4.7.2.0
---
## CloudCanal-4.7.2.0

发版时间:2025年5月30日 版本号: 4.7.2.0


## 新链路

- 开放 Dameng -> Dameng 结构迁移、全量迁移、增量同步、数据校验、数据订正、DDL 同步（加列/减列）
- 开放 TiDB -> SelectDB 结构迁移、全量迁移、增量同步、数据校验、数据订正、DDL 同步（加列/减列）
- 开放 PostgreSQL & Oracle & SQL Server -> Iceberg 结构迁移、全量迁移、增量同步
- 开放 SshFile & S3File & OssFile -> StarRocks & MongoDB Atlas & Elasticsearch 向量构建
- 开放 StarRocks & MongoDB Atlas & Elasticsearch -> RagApi 链路提供 RAG 服务

## 新特性

- 支持 [MySQL -> MySQL/StarRocks/Doris/SelectDB 可视化打宽表的能力](../operation/job_manage/job_op/visual_widetable_create.md)（Left Join）
- 支持 Dameng & SQL Server 源端全量定时迁移
- 支持 Redis \<-> Redis LPop、RPop、LTrim、Publish、ZRemRangeByRank、ZRemRangeByLex 指令
- 支持 SQL Server -> Oracle 自定义虚拟列能力
- 支持 Kafka securityProtocol（安全协议）PLAINT_TEXT 认证方式
- 支持 Redis -> Redis 数据校验通过正则表达式过滤数据
- 支持 MySQL 对端不对 DATETIME 类型数据做时区转换（新增参数：convertDateTimeTimeZone）
- 支持 具备向量能力的数据库 -> RagApi 修改订阅（修改对话模型）
- 支持 Anthropic、AWS Bedrock 类型数据源，为数据向量化和 RagApi 服务
- 支持 文件到 PostgreSQL 根据嵌入模型不同创建不同的向量（维度 2000 以下，4000 以下）
- 支持 MCP 工具过滤参数 (filterToolNames) 和调用失败策略参数（failIfOneServerFails）
- 支持 大模型请求时 timeout 参数，可以动态调整请求超时时间，默认 300 秒
- 支持 文件源端全量修改订阅
- 支持 导入任务允许额外创建已完成状态的全量迁移，以便用户重跑任务
- 支持 [Kubernetes Helm 安装方式](../productOP/kubernetes/install_on_k8s.md#方式二使用-helm-chart-安装)

## 优化

- 优化 Redis -> Redis 同步期间 KeyDiff 上报频率以及分片集群差值累加问题
- 优化 Redis -> Redis 数据校验批量扫描逻辑
- 优化 重跑任务可能出现状态机状态不对的问题，延迟 1 秒执行挂载、激活等操作的异步任务
- 优化 额外添加订正任务可能出现状态机状态不对的问题，延迟 1 秒执行创建的异步任务


## 问题修复

- 修复 MySQL -> ClickHouse 创建任务数据处理页面弹窗报错的问题
- 修复 MySQL 源端 fix String length (20030999) exceeds the maximum length (20000000) 问题
- 修复 TiDB -> StarRocks DDL 兼容问题（加列/减列/修改列）
- 修复 TiDB -> TiDB 结构迁移 PK/UK/INDEX 未指定索引列前缀导致的索引长度溢出问题
- 修复 TDengine 源端 Timestamp 主键时区转换后数据校验不准确问题
- 修复 PostgreSQL 创建任务时 sslMode 配置未生效问题
- 修复 SQL Server -> StarRocks 结构迁移 decimal 类型缺失精度的问题
- 修复 获取 StarRocks 表唯一键时返回结果为空的问题
- 修复 subAccountAuthType 参数为 PASSWORD 时，设置通用参数 subAccountPwdVerifyExpr 保存报错的问题
- 修复 MongoDB -> MongoDB Array 类型空数组增量同步到对端数据值为 NULL 的问题
- 修复 MySQL 目标端结构迁移，字段注释含有 '\' 时报错的问题
- 修复 PostgreSQL 配置心跳未生效的问题
- 修复 创建文件到向量数据库相似任务，dimension 参数未复制的问题
- 修复 向量数据库 -> RagApi 结构迁移显示同步表为 0 的问题
- 修复 文件 -> 向量数据库设置统一对端表名后结构迁移日志冗余的问题
- 修复 Ollama 和 ZhipuAI 展示思维不准确的问题
- 修复 Redis 集群源端数据校验期间集群数据迁移出现的异常问题
- 修复 Redis -> Redis 同步追加数据校验订正任务异常问题
- 修复 MySQL -> Iceberg DDL 同步表名映射失效问题
- 修复 查看关联任务展示异常的问题
- 修复 参数修改中（新增数据源、修改数据源参数等），撤销修改的时候会把其他开关类型的参数都撤销的问题




