---
id: rn-cloudcanal-5-1-0-0
title: 5.1.0.0
---
## CloudCanal-5.1.0.0

发版时间:2025年8月29日 版本号: 5.1.0.0

## 亮点

- 新增 AWS MSK 源端数据源支持
- 新增 阿里云数据湖构建（DLF）目标数据源支持
- 新增 Apache Paimon 阿里云 OSS 支持
- 新增 Apache Paimon 腾讯云 COSN 支持

## 新链路

- 开放 MySQL/Kafka -> AWS MSK 结构迁移、全量迁移、增量同步
- 开放 AWS MSK -> AWS MSK/Kafka 结构迁移、全量迁移、增量同步
- 开放 MySQL/Kafka -> 阿里云数据湖构建（DLF）结构迁移、全量迁移、增量同步、数据校验、数据订正
- 开放 SQL Server -> PostgreSQL 结构迁移、全量迁移、增量同步、数据校验、数据订正

## 新特性

- 支持 SaaS 客户端异步下载扩展数据源包（默认镜像带 MySQL，Oracle，SQL Server，PostgreSQL，StarRocks，Doris，MQ），安装包缩小一倍
- 支持 CloudCanal 私有部署版安装之后，[自动激活](../quick/quick_start.md)若干天社区版授权，使用更加便利
- 支持 达梦 -> StarRocks 宽表构建，增强实时数仓分析能力
- 支持 SQL Server -> SQL Server/PostgreSQL 强类型数据校验，具备更广泛、精确的类型支持
- 支持 SQL Server -> Oracle 强类型校验/订正，具备更广泛、精确的类型支持
- 支持 Oracle -> Oracle 强类型全量同步/数据校验/数据订正，具备更广泛、精确的类型支持
- 支持 Redis 基于事务的双向防循环，全指令兼容
- 支持 自建 Redis 分片集群 7.4 版本
- 支持 OceanBase 时区转换（新增参数 dstTimeZone，convertDateTimeTimeZone）
- 支持 OceanBase Binlog 心跳事件更新增量位点
- 支持 Oracle 源端关闭 LogMiner 模式下启用日志文件一致性校验（新增参数 logFileConsistentCheckEnabled）
- 支持 [达梦 DSC 实例](../dataMigrationAndSync/datasource_func/Dameng/prepare_for_dameng_logminer.md#准备动作-3---达梦-dsc-额外配置)（新增参数 isDscNode、dscHosts、dscSyncLsnTable）
- 支持 TiDB 源端检索元数据功能，可以通过 TiDB 同步的表查询所在的任务以及对端的库表信息，方便下游使用
- 支持 子账号列表显示子账号是否开启 MFA，方便管理员进行安全管控
- 支持 迁移同步节点自主上报任务监控指标，让控制台和节点间通信通道更加轻量，更好地支持大规模任务集群

## 优化

- 优化 SQL Server 元信息获取，使用 INFORMATION_SCHEMA 解决类型为空的问题
- 优化 Oracle 源端自动提交超时事务的日志信息，显示更多信息方便排查
- 优化 PostgreSQL 支持 Enum/Range/Composite 自定义类型
- 优化 MySQL 源端过滤未订阅 CREATE DDL 语句，加上黑名单的过滤
- 优化 OceanBase Binlog 解析速度，新增参数设定 Binlog 解析并发度和队列长度 (参数 parseBinlogParallel 和 parseBinlogBufferSize)
- 优化 文件类数据源设置唯一键无效的问题
- 优化 MySQL sslMode 默认值改为 DISABLE，解决服务端与客户端 SSL 协议冲突问题
- 优化 全量迁移源端读取数据报错日志打印，方便定位异常数据
- 优化 前后端接口调用方式，提升界面加载和访问性能
- 优化 [Sidecar 日志文件](../productOP/dailyOP/get_log.md)，更加精简，方便用户提取下载错误日志

## 问题修复

- 修复 Elasticsearch 初始化位点在开启账号认证时未解密密码导致异常的问题
- 修复 Elasticsearch 全量迁移复杂类型转换异常问题
- 修复 SQL Server 源端 DDL 语句中包含 Max 无法解析的问题
- 修复 OceanBase 依赖冲突导致的增量任务启动失败的问题
- 修复 达梦全量迁移时间类型主键不支持的问题
- 修复 达梦 -> StarRocks 手动勾选映射没生效的问题
- 修复 搜索并手动勾选表模式下搜索报错的问题
- 修复 SQL Server 源端数据校验设置目标主键不生效问题
- 修复 SQL Server 源端 smalldatetime/datetimeoffset 类型主键 全量迁移/数据校验 查询报错的问题
- 修复 Oracle 登录用户所属 SCHEMA 下存在 DUAL 表导致对端 Merge 写入不生效问题
- 修复 Oracle 登录用户所属 SCHEMA 下存在 DUAL 表导致查询 Timestamp with local time zone 类型数据空指针的问题
- 修复 Oracle -> Oracle 增量同步 Timestamp with Time Zone 时间类型同步到对端出现时区差异的问题
- 修复 Oracle 源端存在 Long/Long Raw 类型字段且该字段不在表结构首位情况下，二次校验读取数据抛 Stream has already been closed 的问题
- 修复 Oracle -> Oracle 增量同步写入 Long/Raw 类型数据与源端不一致的问题
- 修复 Oracle 对端写入存在 ROWID/UROWID 只读数据类型时出现参数错位异常的问题
- 修复 PostgreSQL 数据强类型写入数据转换异常的问题
- 修复 PostgreSQL 读取 Money 类型数据忽略负数符号位的问题
- 修复 强类型链路 TIME 类型数据精度丢失的问题
- 修复 PostgreSQL 强类型转换时间数组异常的问题
- 修复 PostgreSQL 到 StarRocks / Doris 时间类型写入的问题
- 修复 SQL Server -> MySQL 结构迁移由于 identity 导致迁移异常的问题
- 修复 MySQL -> OceanBase，结构迁移/ DDL 无法识别 unsigned 的问题
- 修复 Hana 源端清理 CDC 表导致 PreparedStatement 过多的问题
- 修复 Console 修改服务端口 Sidecar 无法测试连接的问题
- 修复 TiDB 源端增量 DDL 中多个加列操作报错的问题
- 修复 TiDB 源端增量 DDL 解析报错导致任务卡住的问题
- 修复 Kafka 位点重置在 Rebalance 期间超时失败的问题。
- 修复 阿里云 新加坡、美东、美西、法兰克福、伦敦 RDS 和 PolarDBMySQL 开放 API 调用点错误的问题
- 修复 SaaS 预付款和预警数额上下限与合法性检查的问题
- 修复 创建任务时，任务数超过许可证限定，报错信息错误的问题



