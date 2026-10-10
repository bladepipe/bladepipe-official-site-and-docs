---
id: rn-cloudcanal-6-5-0-0
title: 6.5.0.0
---

## CloudCanal-6.5.0.0

发版时间:2026年10月9日 版本号: 6.5.0.0

## 新链路

- 开放 **TDSQL PostgreSQL** -> **Oracle**/**TDSQL PostgreSQL** 全量迁移/增量同步/数据校验/数据订正/结构迁移
- 开放 **SQL Server**/**Oracle** -> **TDSQL PostgreSQL** 全量迁移/增量同步/数据校验/数据订正/结构迁移
- 开放 **MongoDB** - **MongoDB** 双向同步

## 新特性

- 支持 Hana -> PostgreSQL & MySQL 定时扫描增量
- 支持 SQL Server -> Oracle 定时扫描增量
- 支持 StarRocks -> Kafka 定时扫描增量
- 支持 定时全量任务单次运行模式
- 支持 MySQL/PolarDb MySQL/Oracle/PostgreSQL/SQL Server/StarRocks/Doris/SelectDB/TiDB 表结构校验
- 支持 MySQL 增量强类型，具备更好的类型兼容性
- 支持 MySQL Binlog Dump SSL 证书校验，并修复能力协商及握手超时问题
- 支持 PostgreSQL 源端任务订阅单库多 Schema
- 支持 Iceberg 使用 Hive Metastore 管理 Catalog 元数据
- 支持 任务拆分，选择库表后，拆分到独立任务，并更新原有任务配置
- 支持 任务配置 通过开关操作布尔值 , 选项选择枚举类型配置，减少修改配置误操作。
- 支持 使用专用信道（RSOCKET）升降级客户端版本 (非容器部署)， 无需 SSH 打通或密钥，更加安全便捷。
- 支持 OceanBase for MySQL 对端结构迁移 COLLATE 属性
- 支持 MongoDB Cursor 全量读取，解决混合类型 _id 导致的全量同步失败或漏数问题（参数：cursorRead）

## 优化

- 优化 Oracle 源端延迟较大时的 LogMiner 分析和读取性能，自适应控制每个 redo thread 注册的日志数量（参数：oraLogminerV2Enable）
- 优化 Oracle 源端 BLOB、CLOB 同步，包括事务回滚、保存点回滚、长事务（参数：oraLogminerV2Enable、oraLmLobEnable）
- 优化 Oracle 新增展示 LogMiner 数据挖掘耗时图表信息，帮助观测源端查询效率
- 优化 Oracle 目标端结构迁移对主键创建 UNIQUE INDEX，保证唯一索引
- 优化 MySQL 增量源端 Online DDL 临时表过滤性能问题，解决表达式订阅任务误同步临时表 DML 的问题
- 优化 高规格任务默认 fullRingBufferSize/increRingBufferSize 配置，降低任务内存占用
- 优化 低版本 OceanBase for MySQL 元数据查询出重复主键列导致结构迁移失败问题
- 优化 worker 告警记录无法在告警日志中查询到的问题
- 优化 同一个 Topic 映射到不同表时增加 partitions 设置一致性检查
- 优化 多位点任务重置位点交互
- 优化 任务详情页布局，突出右侧关键信息
- 优化 用户、数据源、任务配置编辑逻辑，统一修改交互逻辑

## 问题修复

- 修复 Oracle 12+ -> Oracle 12+ 结构迁移 Identity 列失败问题
- 修复 Oracle 源端首次启动时，位点之前已开始、之后才提交的事务丢失的问题（参数：oraLogminerV2Enable、oraV2StartupReplay）
- 修复 Oracle 源端隐藏列导致的同步错位问题
- 修复 Oracle 表取消订阅后重新订阅导致的 Schema 和同步列错误问题
- 修复 Oracle 复合主键字段顺序与唯一索引字段顺序不一致时，IGNORE_ROW_ON_DUPKEY_INDEX Hint 出现索引无效问题
- 修复 MySQL / PolarDb MySQL / OceanBase for MySQL 源端重建解析元数据可能碰到的链接半开问题
- 修复 MySQL 大小写敏感模式下，缺失表错误地获取到同名不同大小写表的列
- 修复 MySQL 8.0+ 强类型模式下 GEOMETRY 经纬度轴序解析异常
- 修复 MySQL 对端空间类型字段写入模板，统一使用 ST_GeomFromText
- 修复 MySQL -> PostgreSQL 结构迁移 SET 类型异常问题
- 修复 MySQL 无符号整数 BIGINT 及高精度 DECIMAL 同步至 SQL Server 时的数据溢出问题
- 修复 MySQL/OceanBase for MySQL（Binlog 模式）增量 ANTLR ddlParserMode 模式下 DDL 元数据回放导致字段重复问题
- 修复 MySQL/PolarDb MySQL/PolarDb-X/OceanBase for MySQL（Binlog 模式）元数据恢复时 ddlhistory 位点范围过滤不准确的问题
- 修复 MySQL/PolarDb MySQL/PolarDb-X/OceanBase for MySQL（Binlog 模式）文件位点重置后保留旧时间戳，导致消费位置与元数据恢复边界不一致的问题
- 修复 MySQL/PolarDb MySQL/PolarDb-X/OceanBase for MySQL（Binlog 模式）启动时未按重置后的文件位点解析时间戳，导致恢复缺列或超前表结构的问题
- 修复 MySQL/PolarDb MySQL/PolarDb-X/OceanBase for MySQL（Binlog 模式）元数据名称携带反引号导致快照校验被跳过、错误表结构被归档的问题
- 修复 Dameng、Spanner 到 Kafka 的 Topic 改名映射，确保消息进入配置的目标 Topic
- 修复 Redis 全量阶段正则表达式过滤失效的问题
- 修复 PostgreSQL 双向同步时带 schema 的去环表无法识别及被白名单提前过滤问题
- 修复 PostgreSQL 强类型对端 BIT 写入类型转换及位宽错误
- 修复 PostgreSQL 增量对端生成修改列类型 DDL 时错误追加 SET NOT NULL 问题
- 修复 PostgreSQL TIME WITH TIME ZONE 强类型同步至 StarRocks 后时间偏移及跨日错误
- 修复 MongoDB 文档字段移除（$unset）未同步的问题
- 修复 MongoDB 同步到对端 RDB 时指定主键不生效导致更新失败的问题
- 修复 连接 ClickHouse 时 SSL 连接参数支持补全以及因为驱动版本问题参数不兼容问题
- 修复 StarRocks LARGEINT 主键溢出导致全量任务循环扫描
- 修复 StarRocks 全量扫描没有启用流式读取导致 OOM 问题
- 修复 G1 GC 指标名称未正确识别，导致任务 JVM GC 监控无数据的问题
- 修复 RAW 等二进制主键的分区键计算不稳定，可能导致相同主键数据被分配到不同执行队列的问题
- 修复 修改订阅后主任务重启未完成导致子任务合并异常问题
- 修复 自动调度关闭的情况下，Sidecar 告警每分钟发送一次的问题
- 修复 不支持待创建表的链路，页面上不应该自定义对端表名
- 修复 增量同步开启强类型同步模式下，虚拟列主键生成 null 的问题
