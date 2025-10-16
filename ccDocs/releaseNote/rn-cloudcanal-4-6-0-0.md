---
id: rn-cloudcanal-4-6-0-0
title: 4.6.0.0
---
## CloudCanal-4.6.0.0

发版时间:2025年2月27日 版本号: 4.6.0.0


## 新链路

- 开放 [TDengine -> MySQL](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/tdengine2) 链路 结构迁移、全量迁移、增量同步、数据校验与订正
- 开放 [MySQL -> GreptimeDB](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/mysql2?target=GreptimeDB) 链路 结构迁移、全量迁移、增量同步、数据校验与订正
- 开放 TiDB -> Greenplum 链路 结构迁移、全量迁移、增量同步、数据校验与订正、DDL 同步（加列/减列/修改列/清空表）
- 开放 TiDB -> PostgreSQL 链路 结构迁移、全量迁移、增量同步、数据校验与订正、DDL 同步（加列/减列/修改列/清空表）
- 开放 Greenplum -> OceanBase 链路 结构迁移、全量迁移、数据校验与订正
- 开放 StarRocks -> StarRocks 链路 结构迁移、全量迁移
- 开放 Kafka -> Iceberg 链路 增量同步

## 新特性

- 支持 Hana、PostgreSQL、Greenplum、SQL Server、Oracle、PolarDB-X、ObForOracle、PolarDbMySQL、StarRocks 端全量同步时的过滤条件下推能力
- 支持 Iceberg 目标端 timestampz 时间类型
- 支持 Iceberg 目标端 Truncate、Create Table、Drop Table DDL 同步
- 支持 Hana 源端链路选择目标主键的能力
- 支持 PostgreSQL 对端全量迁移前清空数据功能
- 支持 Kafka 数据源 SASL / SCRAM 认证
- 支持 Kafka 参数 clientCustomProps 可自定义增加或覆盖生产者消费者的客户端配置
- 支持 多任务分布式执行数据迁移、同步、校验和订正（[并行任务组](https://www.clougence.com/cc-doc/operation/job_manage/job_op/job_group#并行组)），大幅度提升关键业务数据流转性能
- 支持 [高级功能-任务组](https://www.clougence.com/cc-doc/operation/job_manage/job_op/job_group)，包括业务组（如多个 kafka 源端任务，数据汇聚任务，业务属性相似任务）和并行组两种，方便任务管理
- 支持 带 Date 类型字段的数据过滤条件（高级模式，程序内过滤）

## 优化

- 优化 Hana 源端数据清理，使用更加安全的机制清理 CDC 表数据
- 优化 Hana 源端修改订阅取消表后，自动去掉对于表的位点信息
- 优化 Oracle 源端增量位点新增最近提交时间戳，以区分延迟是未提交事务还是大流量导致
- 优化 Oracle 源端增量周期性打印距离当前最久的未提交事务 ID，该事物变更事件数等信息，方便及时处理
- 优化 类型映射，MySQL bit(1) 到 Doris / StarRocks 为 tinyint，bit 长度定义 > 1 则维持16进制字符串写入
- 优化 类型转换，TiDB bit(1) 写入 Doris / StarRocks 为 tinyint，bit 长度定义 > 1 则维持16进制字符串写入
- 优化 Schema 映射参数 mappingDef 为可修改，解决部分场景替换更新的需求
- 优化 获取数据任务列表开放 API（datajob/list 和 datajob/queryjob），增加任务当前状态（currTaskStatus）
- 优化 任务重跑开放 API，增加 autoStart 请求参数以满足类似校验子任务无需自动启动的需求（由主任务的增量阶段触发）
- 优化 IM 告警测试验证接口判定
- 优化 IM 各个平台告警对接口调用错误敏感度

## 问题修复

- 修复 OceanBase(Binlog) / PolarDB / PolarDB-X 源端同步 ENUM 类型为数字的问题
- 修复 MySQL 源端修改订阅取消表后重新添加，导致同步字段数据缺失的问题
- 修复 MySQL 全库同步 CREATE TABLE 预检错误导致目标端未创建的问题
- 修复 Redis 开启 DB 映射重启任务概率性导致 Key 错位的问题
- 修复 Oracle 源端时间类型主键全量迁移位点保存错误的问题
- 修复 Oracle 时间类型主键表写入较慢的问题
- 修复 Oracle Blob 类型数据过长导致的写入失败的问题
- 修复 PolarDbMySQL / PolarDB-X 源端在解析 Binlog 时，字段 nullable 属性检测不一致导致的解析报错问题
- 修复 PostgreSQL 结构迁移默认值元数据获取时，过滤携带精度的强制类型有误的问题
- 修复 Kafka 依赖切换版本无效的问题
- 修复 获取 StarRocks 表元数据未过滤 engine 类型为 OLAP_EXTERNAL 的表
- 修复 任务修改账号密码后创建相似任务报错的问题
- 修复 Greenplum 源端创建任务时错误预检的问题
- 修复 任务批量授权带子任务报错的问题
- 修复 目标端为 StarRocks / Doris / SelectDB / Iceberg 的链路多次批量设置数据分区被覆盖的问题
- 修复 钉钉消息模版中全部资源授权 ‘@’ 信息缺失的问题
- 修复 组件、任务日志归档有残留的问题






