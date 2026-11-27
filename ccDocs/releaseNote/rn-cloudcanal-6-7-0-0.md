---
id: rn-cloudcanal-6-7-0-0
title: 6.7.0.0
---

## CloudCanal-6.7.0.0

发版时间:2026年11月27日 版本号: 6.7.0.0

## 亮点

- 可通过自定义代码对任意格式消息进行解析，补充库表等元数据写入结构化数据库
- 更早过滤 **MySQL** / **PolarDb MySQL** / **PolarDb-X MySQL** / **TDSQL-C MySQL** / **OceanBase MySQL** Binlog 模式未订阅表 Binlog 行事件，大幅度减少解析开销和内存分配
- 修复安全问题 CVE-2026-114938，升级 Docker 安装包中的 JDK 版本到 17.0.21

## 新链路

- 开放 **SQL Server** -> **Dameng** / **ClickHouse** 结构迁移/全量迁移/增量同步
- 开放 **SQL Server** -> **Paimon** 结构迁移/全量迁移/增量同步/数据校验/数据订正
- 开放 **Kafka** -> **Apache IotDB** 数据同步，IotDB 版本为 1.x Tree 模式，原始消息格式，自定义代码解析消息（CcMqOriginMsgProcessorV2）
- 开放 **MySQL** / **SQL Server** / **GaussDB** -> **Apache Hudi** 结构迁移/全量迁移/增量同步/数据校验/数据订正/DDL（加列/modify/rename）
- 开放 **MongoDB** -> **Apache Hudi** 全量迁移、增量同步
- 开放 **TDSQL PostgreSQL** -> **OceanBase MySQL** 结构迁移/全量迁移/增量同步/数据校验/数据订正/DDL（加列/减列/modify/rename/truncate）
- 开放 **TDSQL PostgreSQL** -> **Kafka** 全量迁移/增量同步
- 开放 **Db2** -> **OceanBase MySQL** 结构迁移/全量迁移/增量同步/数据校验

## 新特性

- 支持 MySQL -> OceanBase 表达式模式同步
- 支持 MySQL -> MySQL 结构迁移源端生成列/虚拟列
- 支持 MySQL -> Snowflake 表达式任务同步建表和删表，支持同名表重建后继续写入
- 支持 MySQL / OceanBase For MySQL / PolarDB MySQL / PolarDB-X / PostgreSQL / TiDB / KinbaseES / GaussDB 目标端可选择关闭外键检查（参数: disableForeignKeyChecks）
- 支持 TDSQL PostgreSQL 数据库 Oracle 兼容模式
- 支持 StarRocks / Doris 目标端重复加列自动略过，如多个分表同步 DDL 到目标同一张表
- 支持 TiDB 源端和目标端配置 JDBC 连接时区，参数为 connectTimeZone，默认值为 Asia/Shanghai
- 支持 OceanBase MySQL 强类型（源端和目标端），具备更好的类型兼容性
- 支持 Oracle -> OceanBase MySQL 强类型任务全量迁移和增量同步 BLOB、CLOB
- 支持 Oracle 源端在 LogMiner 高级设置里开启 LOB 同步，默认关闭
- 支持 MongoDB / DocumentDB TLS 认证方式添加数据源
- 支持 SQL Server 源端获取最新位点
- 支持 数据清洗 md5 / sha256 / sm3 加密（如 return @fun.str.sha256(@params['phone'])）
- 支持 通过 OpenAPI 查询、上传和激活任务自定义代码包
- 支持 通过 OpenAPI 创建带自定义代码包的任务
- 支持 全链路 DDL 同步相关日志单独路由一份到 ddl_history.log 且页面查看日志功能可显示和下载

## 优化

- 优化 TDSQL PostgreSQL 数据库 Oracle 兼容模式特有类型同步到 Oracle / StarRocks / Doris / SelectDB
- 优化 MySQL family SQL 生成器冲突策略处理并统一批量插入接口
- 优化 Snowflake 自动建表和新增列时，在保留源列整数范围和小数精度的前提下，默认将 DECIMAL 的小数位预留至 8 位
- 优化 OceanBase MySQL 增量监控补充源端各阶段处理流量图表
- 优化 依赖，减少数据源插件大小（平均每个降低 3MB）
- 优化 控制台审计日志默认保留时间为 90 天，其他类型日志默认为 30 天
- 优化 Sidecar 周期性拉取配置逻辑，只有启动时才完全刷新任务配置，减少通信流量和元数据库压力，对大规模任务量系统友好

## 问题修复

- 修复 目标端为 StarRocks、Doris、SelectDB、ClickHouse、TDSQL-C MySQL 或 TDSQL MySQL 时，数据校验并发配置 writeParallel 不生效的问题
- 修复 MySQL -> Snowflake 列变更后首批增量数据使用旧列定义的问题，确保新增列的值能立即写入
- 修复 MySQL 普通函数索引中 datetime / time 带精度的解析错误
- 修复 MySQL 多值索引 CAST(... AS UNSIGNED ARRAY) 和 CAST(... AS CHAR(64) ARRAY) 带 ARRAY 的解析错误
- 修复 MySQL 目标连接时区配置不生效，导致 TIMESTAMP 写入偏移的问题
- 修复 MySQL ANTLR 解析器不支持 TIME 字面量导致增量任务停止的问题
- 修复 Snowflake 目标端 库和 schema 待创建，但实际创建步骤中报错不支持的问题
- 修复 Snowflake 元数据查询未使用数据源配置的 Warehouse 和 Role 的问题
- 修复 Snowflake 全量和增量同步中 JSON 写入 VARIANT 列时的类型不匹配问题
- 修复 Doris、StarRocks 目标端 JSON 数据校验中的数值格式误报及高精度数值差异漏报，涵盖 JSON 映射为文本字段的场景
- 修复 Doris、StarRocks 目标端 DATE 字段受历史夏令时影响导致的校验误报问题
- 修复 结构迁移到 ClickHouse 时，零小数位 DECIMAL 列映射为 Int64 导致的数据溢出问题
- 修复 Oracle -> OceanBase MySQL 强类型全量迁移时数值主键写入失败的问题
- 修复 OceanBase MySQL 在 LogProxy 模式下强类型增量读取 TIMESTAMP 时的时区偏移问题
- 修复 OceanBase MySQL 目标强类型校验中 BINARY、VARBINARY 差异漏报和跨时区 DATETIME 误报问题
- 修复 TiDB 目标普通全量和强类型任务写入 TIMESTAMP 时目标时区配置未正确生效的问题
- 修复 TiDB 测试连接、读取字符集、查询版本和统计表数量时忽略数据源 SSL 配置的问题
- 修复 StarRocks 强类型校验中 BIT 对数值列、TIME 对 VARCHAR 列的误报
- 修复 HANA 按表 CDC 读取时未排除黑名单列的问题
- 修复 Db2 增量同步中 GRAPHIC、VARGRAPHIC 类型误判导致反复刷新元数据并最终退出的问题
- 修复 MariaDB UCA 14.0 字符集编号导致 Binlog 解码失败
- 修复 MariaDB 增量同步回放建表 DDL 后 JSON 字段值转换异常
- 修复 表达式模式任务修改订阅新增表达式没有结构迁移问题
- 修复 任务初始化阶段启动、重启时，任务状态与状态机推进不一致的问题，统一由初始化触发器完成启动和阶段推进
- 修复 任务停止、重启、重跑、删除及后台生命周期任务并发执行时，状态检查与更新不一致的问题；未结束的调度、完成处理任务也纳入生命周期操作检查
- 修复 任务重跑准备期间，父任务提前激活校验子任务的问题；重跑准备完成后再按自动启动设置激活任务
- 修复 任务删除、重跑取消或绑定新的后台任务后，旧重跑处理仍可能重新激活状态机的问题
- 修复 任务取消与子任务执行交错时，已取消任务仍可能启动后续子任务，以及结束状态被执行线程覆盖的问题；重试、跳过和取消统一在加锁后检查状态
- 修复 父任务触发校验子任务时，使用过期状态覆盖子任务当前状态的问题，改为按原状态条件更新
- 修复 一次性定时全量任务重跑时，未恢复原计划触发时间的问题
- 修复 启动、重启遇到状态机缺失，以及重跑遇到任务已删除时返回通用英文异常的问题，使用共享错误码和中英文提示。
- 修复 Console 与 Sidecar 异步 RSocket 请求发送失败、连接关闭后仍等待至超时的问题；请求结束时清理异步等待记录和订阅，并保留线程中断状态
- 修复 Sidecar 心跳并发写入导致重复记录和单条查询异常的问题
- 修复 创建相似任务时选择重建目标表，数据处理步骤会勾中不支持同步的列的问题
- 修复 通过 OpenAPI 创建任务时指定迁移分区信息不生效问题
