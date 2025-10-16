---
id: rn-cloudcanal-3-1-0-0
title: 3.1.0.0
---

## CloudCanal-3.1.0.0

发版时间:2023年8月17日 版本号: 3.1.0.0

### 新链路

- 开放 Redis &lt;-&gt; Redis 增量同步(可选数据初始化), [参考最佳实践文档](https://www.clougence.com/cc-doc/bestPractice/mysql_redis_sync)
- 开放 Redis &lt;-&gt; Redis 双向同步（防循环）, [参考最佳实践文档](https://www.clougence.com/cc-doc/bestPractice/redis_loop_data_sync)
- 开放 MySQL -> GaussDBForMySQL 结构迁移、全量迁移、增量同步、数据校验、DDL同步（加减列）
- 开放 MySQL -> GaussDBForOpenGauss 结构迁移、全量迁移、增量同步、数据校验、DDL同步（加减列）


### 新特性

- 支持 OceanBase binlog service 增量模式（OceanBase 4.x）
- 支持 MySQL -> Redis 设置 secondsToExpire 实现迁移同步数据缓存失效能力
- 支持 MySQL -> PostgreSQL 校验后订正能力
- 支持 MySQL -> TiDB truncate DDL 同步
- 支持 TiDB -> MySQL 数据校验与订正
- 支持 TiDB -> OceanBase 数据校验与订正
- 支持 PostgreSQL -> PostgreSQL 数据校验与订正
- 支持 PolarDbMySQL -> ADB for MySQL 使用 extraDDL 参数执行 DDL（参数类型包括GHOST、PT、DMS）
- 支持 Kafka/RocketMQ 源端自动心跳机制，解决无数据延迟问题
- 支持 数据校验任务告警功能（数据丢失/数据不一致发送告警信息）
- 支持 MySQL -> ElasticSearch 目标映射规则以‘_数字’后缀截取
- 支持 企业版 CloudCanal 自动安装/升级/回滚/启动 sidecar 安装路径以及安装包路径自定义
- 支持 企业版 CloudCanal 自动安装/升级/回滚/启动 sidecar 账号密码回填
- 支持 IM 告警网络超时时间配置(console.config.alert.dingtalk.timeout=5000)


### 问题修复

- 修复 PostgreSQL -> Doris 主键类型为 UUID 时结构迁移报错的问题
- 修复 PostgreSQL -> PostgreSQL Update 全表 SET 相同值导致异常 SQL 的问题
- 修复 添加阿里云 ADB for MySQL 数据源失败的问题
- 修复 源端无心跳时任务延迟不会增加的问题
- 修复 Kafka -> Kafka 结构迁移失败问题
- 修复 RocketMQ -> RocketMQ 创建任务延迟无变化的问题
- 修复 任务 OOM 情况下无法退出的问题
- 修复 TiDB -> MySQL 结构迁移无适配前缀索引的问题
- 修复 TiDB 位点策略的问题（任务位点以所有表的最小位点为准，若无DML或DDL则延迟时间一直上升）
- 修复 TiDB/StarRocks 添加数据源时参数示例没有显示的问题
- 修复 TiDB 多索引表 commit 日志打印普通索引值的问题
- 修复 TiDB 添加数据源 PD 参数不进行预检的问题
- 修复 非 Cluster 模式 Redis 创建任务和写入问题（因支持 Cluster 模式 Redis 所带进来的问题）
- 修复 自动安装/启动 Sidecar JDK 环境检查的问题
- 修复 自动部署 Sidecar 成功后，弹框文案提示错误的问题
- 修复 MySQL -> Doris 时间类型精度丢失的问题
- 修复 MySQL -> StarRocks 时间类型全量没有精度，增量有精度的问题
- 修复 RDS for MySQL -> StarRocks 全量迁移报错的问题（参数列表中httpHost值为空）
