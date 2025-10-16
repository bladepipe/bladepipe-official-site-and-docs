---
id: rn-cloudcanal-3-4-1-0
title: 3.4.1.0
---

## CloudCanal-3.4.1.0

发版时间:2024年4月3日 版本号: 3.4.1.0

### 新链路

- 开放 Oracle -> RocketMQ 结构迁移、全量同步、增量同步
- 开放 TiDB -> ClickHouse 结构迁移、全量同步、增量同步、数据校验

### 新特性

- 支持 目标端 Kafka / RocketMQ DSG 消息格式
- 支持 源端 Kafka OGG KV JSON 消息格式
- 支持 Kafka SASL / SCRAM 验证方式 (阿里云/AWS 全托管 Kafka)
- 支持 MySQL -> Kafka 多 Schema 迁移同步
- 支持 MySQL -> RocketMQ 多 Schema 迁移同步
- 支持 MySQL、PolarDbMySQL、RDS for MySQL 源端配置DDL 事件告警（默认不设置告警）
- 支持 Oracle 源端 LogMiner 只解析归档日志（新增参数：archiveLogOnlyMode）
- 支持 Oracle 源端 LogMiner 只分析归档日志并处于 ADD_FILE 模式时，指定单次分析归档日志的个数（新增参数：oraIncrLmAddFileLimit）
- 支持 Oracle 源端打印 LogMiner 分析的 redo 或 archive 日志的视图记录（新增参数：oraPrintViewInLogs）
- 支持 Oracle 源端设置 LogMiner 每次分析 redo 或 archive 日志的 SCN 范围大小（新增参数：logMiningScnStep）
- 支持 Oracle 增量物化视图模式（mlog），丰富 Oracle 源端增量同步方式
- 支持 任务修改订阅添加虚拟列
- 支持 创建相似任务带上虚拟列信息
- 支持 Kafka 源端修改订阅（Kafka -> ElasticSearch 除外）
- 支持 Kafka 源端消息多余列保留或过滤能力（任务核心参数 autoSyncNewCreatedColumn）
- 支持 Kafka / RocketMQ -> MySQL 查看库表映射
- 支持 Kafka 目标端写入时修改 bufferMemory 参数
- 支持 MySQL 源端全量任务时区转换（srcTimeZone参数），和增量同步能力保持一致
- 支持 校验任务可以按照丢失、不一致过滤排序
- 支持 自动安装 / 升级 / 回退 Sidecar SSH 免密登陆方式
- 支持 创建任务筛选表时，可批量进行精确匹配

### 优化

- 优化 MySQL 源端 CHECK_POS 心跳模式，记录所有 Binlog 事件进行延迟比较
- 优化 Redis &lt;-&gt; Redis 指令集 LRem、HIncrBy
- 优化 Kafka 驱动加载方式(外置加载），解决安全漏洞问题，默认带 kafka-clients 3.4.1 和 kafka-client2.8.2（老版本 Kafka 兼容）版本
- 优化 RocketMQ 驱动加载方式(外置加载)
- 优化 Hana 驱动加载方式(外置加载)
- 优化 Common-text 驱动版本，解决安全漏洞
- 优化 StarRocks、Doris、SelectDB 对端数据写入日志，加入 label 信息方便数据写入慢排查
- 优化 Kafka 源端 Debezium 格式，兼容 before 和 after 字段数量不一致时的解析方式
- 优化 SSH 连接方式，使用连接池缓存 Session 连接，无须多次重新建立连接

### 问题修复

- 修复 StarRocks / Doris 初始化链接 soTimeout 修改无效的问题
- 修复 Hana 创建链接时默认数据库丢失导致权限的问题
- 修复 内网地址变化导致 Console 告警失效的问题
- 修复 TiDB 源端所有同步链路的类型问题
- 修复 时间虚拟列数据校验误校验的问题
- 修复 自定义代码任务修改订阅后自定义代码包丢失的问题
- 修复 Redis 哨兵实例无密码主实例有密码测试链接报错的问题
- 修复 Redis -&gt; Redis 全量初始化（Key、Hash、List、Set、ZSet）键 TTL 丢失的问题
- 修复 Oracle 源端 mlog 增量模式不会清理已消费数据的问题
- 修复 Oracle 源端联合主键顺序不一致而导致丢数据的问题
- 修复 Oracle -&gt; Oracle TableSpace NeedAutoCreate 不准确的问题（这个问题是指对端 Schema 存在，结构迁移报错）
- 修复 Oracle 目标端数据校验时未处理 CHAR/NCHAR 类型的空格而导致的数据丢失
- 修复 Oracle 源端解析 CHAR/NCHAR 长度超过 4000 报错的问题
- 修复 Oracle 源端链路无法创建相似任务的问题
- 修复 Oracle -&gt; StarRocks 对端为大写表的情况下修改订阅无法正常回显的问题
- 修复 数据校验 Json node 顺序不正确提示数据不一致的问题
- 修复 PostgreSQL -&gt; MySQL Json 类型增量报错的问题
- 修复 PostgreSQL 目标端时间类型 null 字符串导致转换失败的问题
- 修复 OceanBase -&gt; Kafka 全量与增量同主键消息消费分区不同的问题
- 修复 MySQL -&gt; Kafka 由于设置会话 binlog_rows_query_log_events 参数而导致消息中持续携带 DML 语句的问题