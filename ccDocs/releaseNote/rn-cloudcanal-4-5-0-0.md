---
id: rn-cloudcanal-4-5-0-0
title: 4.5.0.0
---
## CloudCanal-4.5.0.0

发版时间:2024年12月31日 版本号: 4.5.0.0


## 新链路

- 开放 [MySQL -> Pulsar](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/mysql2?target=Pulsar) 全量迁移、增量同步
- 开放 [Pulsar -> MySQL](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/pulsar2?target=MySQL)、[Pulsar -> Pulsar](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/pulsar2) 增量同步
- 开放 OceanBase -> RocketMQ 全量迁移、增量同步

## 新特性

- 支持 Iceberg 目标端 REST + S3
- 支持 Iceberg 目标端自定义创建表属性和表分区
- 支持 Iceberg 清空目标表（不删除存储数据）和重建目标表
- 支持 Iceberg 目标端时区转换，默认不做转换（参数：enableTimeZoneProcess、Timezone）
- 支持 MongoDB 8.X 版本（源端和目标端）
- 支持 [MongoDB & AWS DocumentDB 源端 ChangeStream 心跳](https://www.clougence.com/cc-doc/dataMigrationAndSync/datasource_func/MongoDB/open_mongodb_heartbeat)（参数：dbHeartbeatEnable、dbHeartbeatCollection、dbHeartbeatIntervalSec）
- 支持 Oracle -> Oracle 结构迁移 Unique Index
- 支持 MySQL -> MySQL 结构迁移 RANGE COLUMNS 分区信息
- 支持 TiDB -> TiDB , MySQL -> TiDB 使用新架构结构迁移（包括清空目标表、重建目标表）
- 支持 TiDB 源端条件过滤拼接到查询语句末尾进行查询（参数：fullDataSqlConditionEnabled）
- 支持 HANA -> HANA 结构迁移 AUTO_MERGE_ON 和 UNLOAD_PRIORITY 属性
- 支持 HANA 源端扫描 CDC 表时和最新事务号之前保持间隔，极端情况下避免漏扫数据（参数：fallBackTxStep）
- 支持 全量修改订阅开放 API：updateTransferObjectForFull
- 支持 OceanBase 源端 Binlog 模式下位点重置功能
- 支持 SQL Server 源端位点重置功能
- 支持 Oracle 19.X 所有小版本
- 支持 数据校验中固定字符类型校验策略，包括 TRIM_START / TRIM_END / TRIM / NO_TRIM (参数：checkFixedCharStrategy)
- 支持 PostgreSQL 部分类型多维数组全量同步
- 支持 设置源端多表映射到对端统一表名的功能
- 支持 GTID 重置位点非空校验


## 优化

- 优化 MySQL 源端的 CHECK_POS 心跳机制，直接从 Binlog 位点计算延迟 EndPos，避免使用 SQL 计算，降低对数据库的影响
- 优化 TiDB 增量源端 gRPC 超时后自动重试，避免任务重启
- 优化 TiDB 增量源端请求 Region 时进行限流，避免 TiKV 压力过大（参数：requestRegionQuote）
- 优化 CloudCanal 创建任务最后一步新增三个回显字段（结构迁移、定时/重跑清空对端数据/重建对端表）
- 优化 修改订阅新增二次确认
- 优化 虚拟列列表展示生成表达式
- 优化 SQL Server 源端 2014 以下版本默认 SnapshotRead 设置为 true，扫描动作为快照读
- 优化 HANA 触发器模板，新增支持用户配置选项，允许选择是否移除异常捕获，从而提升触发器的执行效率
- 优化 HANA 源端表级位点的展示

## 问题修复

- 修复 源端表结构带有特殊符号，导致高级数据过滤解析表结构报错的问题
- 修复 TiDB 8.4 源端分区表执行 Truncate 后数据无法消费的问题
- 修复 TiDB -> TiDB 开启分区迁移后，分区信息未同步的问题
- 修复 Iceberg 目标端写入时，因多分区并发问题导致的报错
- 修复 Oracle 获取元信息时，约束名与索引名重复导致创建任务选择表页面报错的问题
- 修复 HANA 源端修改订阅页面，字段大小写映射不一致的问题
- 修复 HANA 源端 DB 中存在 VIRTUAL 类型表时获取表列表异常的问题
- 修复 MySQL 源端在解析 Binlog 时，字段 nullable 属性检测不一致导致的解析报错问题
- 修复 ObForOracle 解析 DDL 失败导致 oblogclient 连接断开的问题（新增参数 ddlParsingExceptionSkip）
- 修复 StarRocks 未过滤外表导致获取元信息异常的问题
- 修复 PostgreSQL 对端写入 JSONB 类型默认为 Null 的问题
- 修复 PostgreSQL 数组结构迁移类型错误、精度丢失、维度丢失的问题
- 修复 PostgreSQL CHAR、BPCHAR 字符数组类型增量同步结果携带多余引号的问题
- 修复 PostgreSQL 数组数据校验不一致的问题
- 修复 AuroraMySQL DDL 同步时，对目标端数据源未进行映射的问题
- 修复 MQ 目标端 batchWriteSize 参数导致单条消息数据条数超出配置的问题
- 修复 RocketMQ 4.x 源端增量同步非 ACL 验证时出现 NPE 的问题
- 修复 Console 转发请求循环导致 Web 页面卡住的问题
- 修复 追加子任务时，状态机 ID 生成错误，导致状态机页面访问报错的问题
- 修复 任务详情中，重置位点表单不对齐以及高级设置和位点类型联动不正确的问题
- 修复 新建上传代码处理包时，确定按钮的交互没有严格校验输入非空的问题
- 修复 在任务上传代码处理包的情况下，左侧查看代码包管理中上传新包时，没有严格校验输入非空的问题
- 修复 不同位点情况下，回显不正确的问题
- 修复 批量设置虚拟主键检索表数量不正确的问题
- 修复 Docker 版本新安装时，Prometheus 组件启动过快导致 Console 启动失败的问题
- 修复 在没有任何任务的集群中，点击搜索绑定任务报错的问题
- 修复 开启全部资源管理权限时，告警配置不生效的问题






