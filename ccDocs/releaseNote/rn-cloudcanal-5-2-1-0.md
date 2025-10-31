---
id: rn-cloudcanal-5-2-1-0
title: 5.2.1.0
---
## CloudCanal-5.2.1.0

发版时间:2025年10月31日 版本号: 5.2.1.0


## 亮点

- 全新支持 腾讯云 TDSQL-C MySQL 源端和目标端

## 新链路

- 开放 MySQL/SQL Server/Oracle -> GaussDB 结构迁移、全量迁移、增量同步、数据校验、数据订正、DDL 同步（加列/减列/modify/rename/truncate）
- 开放 OceanBase for MySQL -> OceanBase for Oracle 全量同步、增量同步、数据校验、数据订正、结构迁移、DDL 同步（加列/减列/modify/rename/truncate）
- 开放 腾讯云 TDSQL-C MySQL -> TDSQL-C MySQL 全量同步、增量同步、数据校验、数据订正、结构迁移、DDL 同步（加列/减列/modify/rename/truncate）

## 新特性

- 支持 Oracle 获取当前最新位点
- 支持 关系型数据库表结构快照和变更历史的查询及清理

## 优化

- 优化 Paimon 默认写入参数 write-only 为 true，同时通过异步 Compaction 提升同步性能（参数：asyncCompactIntervalSec，fullCompaction）
- 优化 Oracle 源端错误处理逻辑，解析 DML 语句异常时打印当前内存表结构，方便排查
- 优化 StarRocks、Doris、SelectDB 目标端，数据校验采用 in (pk) 方式时，进行分批检索（参数：maxInSizePerQuery）
- 优化 OceanBase for MySQL/PolarDB MySQL/PolarDB-X 增量源端 bit/binary/varbinary/tinyblob/mediumblob/blob/longblob 类型数据以十六进制字符串形式传输，统一二进制类型数据的增量同步逻辑
- 优化 OceanBase for MySQL/PolarDB MySQL/PolarDB-X -> Kafka/RocketMQ/RabbitMQ/Pulsar 同步 binary/varbinary/tinyblob/mediumblob/blob/longblob 类型数据以十六进制字符串形式同步到对端
- 优化 结构迁移 SQL Server 对端 VARCHAR/NVARCHAR/VARBINARY 类型长度配置，防止源端字段类型无长度导致对端字段长度配置为 1
- 优化 PostgreSQL -> MySQL/Doris/StarRocks 的强类型模式下的 JSON 类型校验
- 优化 TiDB 源端报错策略，当 TiKV 超时断开 gRPC 时，直接重启任务
- 优化 达梦增量任务源端日志打印，方便排查源端消费日志慢的原因
- 优化 操作黑名单交互，按钮更加明显且好理解


## 问题修复

- 修复 Kafka 源端在重置位点时，当指定时间戳在某些分区上超出起始范围时，自动回退到该分区最新位点的问题
- 修复 PostgreSQL 源端创建非增量同步任务时也执行增量同步相关检查的问题
- 修复 PostgreSQL 源端开启强类型模式后解析结构化 JSON 类型数据报错的问题
- 修复 修改订阅取消勾选已订阅表后重新勾选，虚拟列和数据清洗配置丢失的问题
- 修复 老任务存在映射规则但参数中列映射为空的情况下修改订阅导致任务报错的问题
- 修复 自动部署机器安装路径获取错误的问题
- 修复 Hana 增量同步触发器未创建的问题
- 修复 Hana 增量同步单增量表模式，时间类型报错导致同步异常的问题
- 修复 Hana 源端清理 CDC 表数据，服务端关闭连接，客户端没有重建连接导致清理数据失败的问题
- 修复 清理机器日志异常的问题
- 修复 达梦源端任务重跑没有重新初始化位点的问题
- 修复 达梦数据源额外参数没有生效的问题
- 修复 设置目标主键后数据二次校验与订正时仍使用源端主键作为行标识的问题
- 修复 子账号页面，列表中账号过长会导致标签显示不完整的问题
- 修复 强类型数据校验后，最终打印出的不一致二进制类型 value 为 null 的问题
- 修复 OceanBase -> MongoDB 增量同步 BIT 类型数据到对端不一致的问题
- 修复 OceanBase -> MongoDB BIT 类型 0 值校验误判不一致的问题
- 修复 数据校验源端 BIT -> 对端 NUMBER 类型数据出现数据转换空指针的问题
- 修复 创建任务时，源端切换库，数据库映射中对端库没有更新的问题
