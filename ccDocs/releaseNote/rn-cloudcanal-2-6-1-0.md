---
id: rn-cloudcanal-2-6-1-0
title: 2.6.1.0
---

## CloudCanal-2.6.1.0

发版时间:2023年5月18日 版本号: 2.6.1.0

### 新链路

- 暂无

### 新特性

- 支持 Decimal 类型同步Doris，1.2.1版本后优先转 DecimalV3
- 支持 MySQL 源端读取 Binlog 超时时间可配置，默认60s
- 支持 CloudCanal 中文/英文切换
- 支持 SQL Server -> SQL Server DDL 同步
- 支持 SQL Server 作为源端再执行DDL之前检测列情况（ADD列会检测是否已存在，DROP列会检测是否已删除）
- 支持 PostgreSQL -> PostgreSQL 结构迁移JSON/JSONB类型带有默认值
- 支持 MySQL -> Doris/StarRocks 全库同步（新增表）
- 支持 MySQL -> Doris/StarRocks DDL同步（新增/删除/修改列类型/修改表名称）
- 支持 官网下载 ARM 版 CloudCanal 和 CloudDM
- 支持 OceanBase/TiDB 对端可以通过 WriteStrategy 参数控制是否为OneByOne 或 MULTI_SQL写入
- 支持 新增 Console 控制台监控信息

### 优化

- 优化 SQL Server 源端/对端/全量/增量 数据链接管理
- 优化 SQL Server 源端自动检测 EXEC SP_CDC_HELP_JOBS中的配置项

### 问题修复

- 修复 OceanBase -> OceanBase 结构迁移带有自增的列迁移后没有自增状态的问题
- 修复 MySQL -> TiDB 校验强依赖白名单 FieldType 导致校验NPE的问题
- 修复 SQL Server 源端报 Oracle_Scn 数值类型超长的错误
- 修复 PostgreSQL -> Doris Numeric(20)类型的值超过18位同步失败的问题
- 修复 SQL Server 源端存在丢数据的问题
- 修复 SQL Server -> KAFKA 自定义代码报错的问题
- 修复 机器监控页面指标数据展示异常的问题
- 修复 机器监控页面指标名称丢失的问题
- 修复 SQL Server 任务参数配置页面默认是DDL全部同步，但实际参数生效的是不同步
- 修复 MySQL/Oracle/OceanBase 源端 SnapshotRead 参数不生效问题
- 修复 PostgreSQL 作为源端 WalSender 链接数超过 PostgreSQL 数据库设置的总数时任务同步报错的问题
- 修复 Oracle -> StarRocks 全库同步报错的问题
- 修复 Console 日志保留天数无效的问题