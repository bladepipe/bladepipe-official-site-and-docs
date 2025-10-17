---
id: rn-cloudcanal-3-3-0-0
title: 3.3.0.0
---

## CloudCanal-3.3.0.0

发版时间:2023年9月27日 版本号: 3.3.0.0

### 新链路

- 开放 PostgreSQL -> ElasticSearch 结构迁移、全量迁移、增量同步、数据校验、数据订正
- 开放 TiDB -> ElasticSearch 结构迁移、全量迁移、增量同步、数据校验、数据订正、DDL同步（加列）
- 开放 OceanBase -> ADB for MySQL 结构迁移、全量迁移、增量同步、数据校验、数据订正、DDL同步（加/减列）
- 开放 MySQL -> Hudi (on hdfs with hive catalog) 结构迁移、全量迁移、增量同步、数据校验、数据订正
### 新特性

- 支持 定时全量迁移、校验停止状态下可编辑订阅的能力, 解决长周期全量/校验任务表结构变化的问题
- 支持 Oracle Logminer 使用在线字典并兼容源端 DDL 时延迟事件异常 DML 同步(不丢数据)
- 支持 Oracle -> PostgreSQL 数据校验和订正能力
- 支持 Oracle DDL 中 VARCHAR 类型别名（映射成 VARCHAR2）
- 支持 Redis 源端 3.x 和 7.2 版本, 目前支持 Redis 版本为 3.x 4.x 5.x 6.x 7.x
- 支持 Redis Sentinel 主备集群，目前支持 Redis 部署形态包括单节点、Sentinel、Cluster
- 支持 Redis Sentinel 、Redis  Cluster 主备切换
- 支持 Redis -> Redis commit log，方便排查可能的丢数据问题
- 支持 ElasticSearch 8.x 版本
- 支持 StarRocks 对端按时间 range 分区
- 支持 MySQL -> ElasticSearch 定时全量迁移，开始前对端清空的选项
- 支持 Oracle DML Sql 语句无法解析或者解析错误跳过功能
- 支持 对用户输入做全局性的trim，去掉输入过程中的空格符（创建任务除外）
- 支持 添加数据源时有权限文档的数据源加上对应的跳转链接
- 支持 创建任务增加防重措施
- 支持 MySQL源端任务参数 useDsConnectionPool 切换 Druid / Hikari 连接池

### 优化

- 优化 结构迁移能力, 修复多个异构数据源结构兼容问题
- 优化 ElasticSearch 数据校验的准确性
- 优化 定时校验订正任务过早清理差异日志的问题（清理时间点挪到下次任务启动前）
- 优化 定时全量迁移的前端展示（查看历史与定时数据校验任务保持一致）
- 优化 下拉菜单组件样式，解决点击无效的问题
- 优化 将回溯位点和清除位点功能合并改成重置位点，时间戳不限制选择
- 优化 创建任务筛选表阶段，MQ -> MQ 链路默认选中所有的表
- 优化 校验告警次数，修改为任务校验完成后告警一次
- 优化 CloudCanal 自动升级/回滚 sidecar 重启任务方式
- 优化 Oracle 源端任务创建时默认不开字典创建


### 问题修复

- 修复 创建任务第四步不选择任何任务仍然可以往下进行的问题
- 修复 OceanBase 对端结构迁移 TIMESTAMP 类型 default 值丢失进度导致失败的问题
- 修复 OceanBase -> StarRocks BIT 类型结构迁移错误的问题
- 修复 MariaDB 对端结构迁移索引字段过长的问题
- 修复 Kafka -> Kafka 结构迁移 topic partition 数据没有按源端 topic 创建的问题
- 修复 批量设置 redis key 异常的问题
- 修复 登陆失效时页面不停跳转的问题
- 修复 MySQL 源端同步 DDL 到对端发生 socketTimeout，导致任务中断重启的问题
- 修复 MySQL -> MySQL BIT 类型数据校验不正确的问题
- 修复 Oracle -> MySQL 字符串类型为主键，数据校验丢失或不一致的问题
- 修复 Oracle NUMBER 类型主键可能导致的全量扫描无法结束的问题
- 修复 修改订阅合并全量和结构迁移任务迁移表数据、总表数量、迁移数据总量统计信息未合并的问题
- 修复 PostgreSQL -> MySQL VARCHAR 作为 UK 时，结构迁移报错的问题

