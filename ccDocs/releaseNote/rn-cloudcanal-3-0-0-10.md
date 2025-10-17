---
id: rn-cloudcanal-3-0-0-10
title: 3.0.0.10
---

## CloudCanal-3.0.0.10

发版时间:2023年7月20日 版本号: 3.0.0.10

### 新特性

- 支持 AWS MySQL, Aurora MySQL, Aurora PostgreSQL, MariaDB
- 支持 Azure MySQL, MariaDB, PostgreSQL, Azure SQL
- 支持 StarRocks 3.x 版本
- 支持 MySQL -> ElasticSearch 数据订正
- 支持 ElasticSearch 对端写入联合主键自定义连接符
- 支持 ElasticSearch CA Certificate 认证方式
- 支持 PostgreSQL 源端全量迁移联合主键断点续传
- 支持 Oracle 源端全量迁移联合主键断点续传
- 支持 PostgreSQL fullFetchSize 参数控制全量扫描流式传输批次大小
- 支持 PolarDbMySQL 读取 binlog 超时时间可配置
- 支持 PolarDb-X 2.0 源端修改订阅

### 优化

- 优化 ElasticSearch 对端增量写入性能 (混合负载 > 10k rps/s)
- 优化 ElasticSearch 对端写入监控指标
- 优化 MySQL 源端全量迁移联合主键扫描效率
- 优化 PolarDb-X 2.0 源端全量迁移联合主键扫描效率
- 优化 MySQL -> MongoDB 全量迁移数据类型变为强类型，解决该链路全量增量数据类型不一致问题
- 优化 TiDB 源端位点更新策略
- 优化 Sidecar 初次连接 Console 超时时间改成可配置，解决弱网环境连接问题

### 问题修复

- 修复 ElasticSearch 对端写入零时间问题
- 修复 MySQL -> ElasticSearch 8.x 版本数据校验问题
- 修复 MySQL -> ElasticSearch 修改订阅表页面下一步，然后再上一步，刷新卡住的问题
- 修复 MySQL -> ElasticSearch 时间类型数据校验不一致问题
- 修复 MySQL -> ElasticSearch 无主键表同步报错问题
- 修复 MySQL -> ElasticSearch 修改订阅/创建相似任务，设置分片和分片副本数没有带过去的问题
- 修复 Kafka ->  ElasticSearch 修改订阅/创建相似任务时在选择列的页面_id不显示的问题
- 修复 PostgreSQL 源端 UUID 主键全量扫描报错的问题
- 修复 PostgreSQL 源端全量联合主键扫描/无主键扫描效率问题
- 修复 PolarDb-X 2.0 源端创建任务获取主键错误问题
- 修复 PolarDb-X 2.0 源端增量同步按时间戳回溯问题
- 修复 TiKV region 失效连接未中断异常的问题
- 修复 Azure MySQL 作为源端增量同步连接异常的问题
- 修复 新增 RDS 数据源后删除数据源，打开异步任务列表报错的问题
- 修复 StarRocks 作为源端创建任务失败的问题
- 修复 Kafka -> ElasticSearch TOPIC_INDEX 映射类型问题
- 修复 创建相似任务，没有选择参考任务对应的集群问题

