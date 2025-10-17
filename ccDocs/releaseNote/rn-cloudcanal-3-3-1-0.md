---
id: rn-cloudcanal-3-3-1-0
title: 3.3.1.0
---

## CloudCanal-3.3.1.0

发版时间:2023年10月30日 版本号: 3.3.1.0

### 新链路

- 开放 Oracle -> SQL Server 结构迁移、全量迁移、增量同步、数据校验、数据订正

### 新特性

- 支持 MySQL -> MySQL 虚拟列数据校验和订正
- 支持 自动过滤 Oracle invisible 字段
- 支持 自动过滤 Oracle virtual 字段
- 支持 手动合并编辑子任务能力（错过自动合并时机点的补救措施）
- 支持 TiDB 监控图表（CDC 事件对列数据个数）
- 支持 TiDB PD 节点保活机制
- 支持 StarRocks 对端删除表，create table like 语句
- 支持 Docker 部署的 CloudCanal 可修改默认验证码配置 console.config.product.trial.verify_code=777777
- 支持 MySQL 源端检测位点的心跳机制（新增心跳机制模式：dbHeartbeatMode=CHECK_POS）
- 支持 RabbitMQ 对端发送延迟消息（是否开启：delaySendEnable=true，延迟毫秒：delayMs=10000）
- 支持 MySQL -> Doris 数据校验和订正
- 支持 Oracle -> MySQL 全库同步
- 支持 Oracle -> OceanBase/MySQL/StarRocks 数据校验和订正
- 支持 源端 MySQL / MariaDB / AuroraMySQL / PolarDb-X / Oracle / OceanBase / SQLServer / TiDB / DB2 等更多数据链路的订正功能

### 优化

- 优化 TiDB 源端增量同步数据消费顺序和存储，支持数据落盘，逐步对齐 TiCDC 能力
- 优化 MySQL -> StarRocks/Doris DDL 同步防重机制支持 alter table modify  对类型、精度、默认值、备注变更的检测。
- 优化 Oracle 源端增量参数 fallBackScnStep 默认值为 20 (100->20，更加实时）, 支持紧跟（0 值，实时性最好）

### 问题修复

- 修复 SQL Server 源端表名中含有 “.” 字符导致同步失败的问题
- 修复 SQL Server -> SQL Server 新 apply 全量期间 exceptionSkipMode 参数设置无效的问题
- 修复 SQL Server 2008 全量阶段表中含有 uniqueidentifier 类型报错的问题
- 修复 MongoDB -> MongoDB 源端 update 数据同步报错的问题
- 修复 新版结构迁移 Doris 对端没有添加 __op 字段导致 upsert 无效的问题
- 修复 新版结构迁移 MySQL 对端添加虚拟列的问题
- 修复 TiDB -> OceanBase 结构迁移 int 类型长度超过 255 导致迁移失败的问题
- 修复 TiDB 源端增量同步时 DDL 丢失问题
- 修复 PostgreSQL -> ElasticSearch 增量同步位点提交的问题
- 修复 PostgreSQL -> ElasticSearch 机器时区和 JVM 时区不一致而导致的时间数据滞后问题
- 修复 Jackson 无注册 JavaTimeModule 导致的时间异常问题
- 修复 Hana 源端单个 Schema 达到 15 万张表时元信息查询超时的问题
- 修复 Oracle 源端 create table 语句中 primary key 没有处理大小写敏感，导致 sql 解析失败的问题
- 修复 MySQL -> MySQL DDL Predict 无法识别 change column 的问题
- 修复 MySQL -> StarRocks 多张表进行数据校验与订正，只随机订正其中一张表的问题
- 修复 源端 SQL Server 数据校验 datetime2 类型字段不一致时任务异常报错的问题
- 修复 自动升级 Sidecar 需要手动订正 SQL 的问题
- 修复 OceanBase -> OceanBase int 无符号类型的字段，数据超过 2147483647，任务会持续报错无法同步的问题
- 修复 添加 StarRocks/Doris 数据源只有 PUBLIC 地址，未填写 privateHttpHost 报错的问题
- 修复 对端 StarRocks 2.2.x 源数据获取失败的问题
- 修复 ORACLE 未指定精度和长度 Number 类型转换为 BIGINT 的问题，默认转换成 Decimal, 到 StarRocks 主键不支持 Decimal 则默认转成 VARCHAR
- 修复 任务列表批量操作任务，取消点击后任务消失的问题
- 修复 修改订阅最后一步数据初始化选项不出现的问题