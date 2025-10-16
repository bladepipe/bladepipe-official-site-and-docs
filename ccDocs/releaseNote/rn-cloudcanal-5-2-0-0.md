---
id: rn-cloudcanal-5-2-0-0
title: 5.2.0.0
---
## CloudCanal-5.2.0.0

发版时间:2025年10月11日 版本号: 5.2.0.0

:::info
BYOC 部署用户请[升级到最新版](../productOpByoc/docker/upgrade_worker_docker.md)，否则创建任务和修改订阅可能会出现不兼容的情况。
:::

## 亮点

- 支持 [SaaS 全托管模式](../quick/quick_start_mgr.md)，无需部署任何组件，登录网站即可使用。当前开放上海 、深圳两区域，可就近选择使用
- 支持 MySQL、PostgreSQL、StarRocks、Doris、ClickHouse 等数据源[通过 SSH 隧道连接](../operation/datasource_manage/set_ssh_tunnel.md)，方便跨互联网数据互联
- 开放 PolarDB PostgreSQL -> MySQL/PostgreSQL/Doris/SelectDB/StarRocks 结构迁移、全量迁移、增量同步、数据校验、数据订正、DDL 同步（加列/减列/modify/rename/truncate）

## 新链路

- 开放 MySQL -> DeltaLake 结构迁移、全量迁移、增量同步、数据校验、数据订正、DDL 同步（加列/减列/modify/rename） 
- 开放 MySQL -> PolarDB PostgreSQL 结构迁移、全量迁移、增量同步、数据校验、数据订正、DDL 同步（加列/减列/modify/rename/truncate）
- 开放 ClickHouse -> ClickHouse 全量同步/数据校验/数据订正/结构迁移（新增参数 enableSelectFinal）
- 开放 ClickHouse -> StarRocks/Doris/SelectDB 强类型全量同步/数据校验/数据订正/结构迁移

## 新特性

- 支持 手动输入方式添加阿里云 RDS for MySQL、RDS for PostgreSQL、RDS for SQL Server、PolarDBMySQL、PolarDBX、ADB for MySQL、ADB for PG 数据源
- 支持 PostgreSQL 源端 Truncate DDL 捕获
- 支持 达梦、GaussDB、TiDB、Hana、PostgreSQL 全量扫描时，根据用户选择的列进行扫描
- 支持 PostgreSQL -> RocketMQ / RabbitMQ 全量同步/增量同步
- 支持 SQL Server -> Doris/SelectDB 虚拟列 和 DDL 同步（加列/减列）
- 支持 Oracle -> Doris/SelectDB 虚拟列
- 支持 Oracle 对端为 Number 类型，源端数据为 byte 数组（如 mysql/pg bit[n]）的迁移同步
- 支持 MySQL -> PostgreSQL/AuroraPostgreSQL 定时全量同步
- 支持 PostgreSQL 自定义 Array/String 类型
- 支持 PostgreSQL -> MySQL/OceanBase for MySQL 同步 smallint/int/bigint/oid/numeric... 等数组类型
- 支持 黑名单方式的操作过滤，分为数据操作、列变更、索引变更、数据定义变更、表变更 5 大类 16 小项，方便细颗粒度过滤操作（如只过滤索引变更操作）
- 支持 任务参数模版管理（创建、查询、删除）
- 支持 将已有任务参数保存为任务参数模板（参数手动选择），类似性能优化参数可复用到新任务
- 支持 创建任务和修改任务时选用任务参数模板
- 支持 TiDB 源端定时自动刷新 GC 时间，历史版本数据不会因为 GC 超时而被清掉
- 支持 DynamoDB 元信息检索能力
- 支持 达梦源端增量任务超时导致解析失败自动进行重试（新增参数：lmTimeoutRetry）
- 支持 Console 控制台自动升级、启动
- 支持 修改订阅删除源端已不存在的库、表
- 支持 新 Open API，包括 startWorker、stopWorker、modifyMemOverSoldPercent、updateWorkerAlertConfig、deleteWorker、detachIncreJob

## 优化

- 优化 SQL Server 源端开启快照读、条件下推不再读取主键最大最小值
- 优化 StarRocks/Doris/SelectDB 写入报错日志打印，报错日志增加 Schema 和 Table 信息
- 优化 Iceberg 数据源配置，可以直接填写 AK/SK，简化配置
- 优化 OnlineDDL 转化为目标端普通 DDL，减少在目标端执行不必要的临时表操作（新增参数：onlineDdlConvert、onlineDdlBackupDb）
- 优化 OnlineDDL Ghost 临时表订阅规则，支持配置临时表正则表达式，解决无法订阅 `~yourtablename_{timestamp}_gho/~yourtablename_gho` 格式的临时表问题（新增参数：onlineDdlTempTableRegex）
- 优化 添加 RDS for MySQL 数据源默认认证方式为账号密码
- 优化 达梦 DSC 实例增量暂不支持表级位点（初始化位点阶段报错，避免需重建任务）
- 优化 达梦数据源参数（isDscNode），避免任务创建后需再次修改
- 优化 达梦提交位点，避免增量任务订阅表没有数据变更，导致数据延迟持续增大
- 优化 TiDB 源端分区表同步，兼容任务组并行分区消费数据
- 优化 TiDB 源端开启 printDetailLog 参数，源端打印更多详细日志，方便排查问题
- 优化 PostgresSQL BYTEA 映射为 MySQL/OceanBase for MySQL LONGBLOB 类型
- 优化 OceanBase MySQL & Oracle 租户 DDL 执行超时，默认超时设置为 8 小时
- 优化 OceanBase Oracle 租户全量扫描 SQL 执行超时，和 soTimeoutSec 参数关联
- 优化 并发布 cloudcanal-openapi-sdk 1.0.2 版本，无需填写调用 URI，更加简洁，并支持更多开放 API 调用
- 优化 产品界面展示的性能，防止在大量库表列情况下的浏览器内存占用过高，导致浏览器崩溃的问题
- 优化 任务日志与 Worker 日志的查看体验
- 优化 任务参数中 JSON 字段的编辑交互方式
- 优化 页面“同步设置”需通过二级菜单进入，避免误操作

## 问题修复

- 修复 自动刷新没有更新 Prometheus 图表的问题
- 修复 worker 列表的详细信息最近更新日期永远为 1970-01-01 08:00:00 的问题
- 修复 ElastiCache -> ElastiCache 创建任务页面中，高级配置目标端展示了 RDB 相关的内容
- 修复 Oracle 源端校验订正任务超出 in(?,?,?) 长度限制的问题
- 修复 Doris/SelectDB 目标端修改订阅没有复制主任务参数（deleteOpCol），导致子任务增量同步报错
- 修复 源端变更主键 Doris 对端出现两条数据的问题
- 修复 修改订阅和创建相似任务没有拿取主任务的列映射规则（COLUMN_COLUMN）
- 修复 PostgreSQL 源端表包含表达式索引时结构迁移报错的问题
- 修复 达梦增量任务 DDL SQL 截断的问题
- 修复 达梦增量任务 Redo SQL 乱序的问题
- 修复 达梦增量任务初始化位点找不到 DUAL 表的异常
- 修复 达梦 DSC 实例增量任务无法消费的异常
- 修复 达梦 DSC 实例增量任务修改订阅没有复制主任务参数（isDscNode），导致子任务增量同步报错
- 修复 PostgreSQL 源端 DDL 加列解析 COLUMN 关键字报错的问题
- 修复 PostgreSQL 源端 DDL 修改列类型解析 USING 关键字解析报错的问题
- 修复 StarRocks/Doris 目标端 DDL 防重检测报错的问题
- 修复 TiDB 目标端 ROW 模式，冲突策略设置 IGNORE 不生效的问题
- 修复 TiDB 到 Kafka Canal 格式 es 字段为空的问题
- 修复 TiDB 源端 ALTER TABLE partition_table ADD PARTITION PARTITIONS 20 不会触发新分区订阅的问题
- 修复 SQL Server 为源端的子任务合并后任务重启失败的问题
- 修复 阿里云 RocketMQ 为目标端时，部分链路结构迁移报错的问题
- 修复 RabbitMQ 为目标端时，测试连接报错的问题
- 修复 创建相似任务时的缓存遗留问题
- 修复 读取关键字配置文件失败导致无限递归的问题
- 修复 任务列表页面用源端数据源 ID 或者目标端数据源 ID 搜索之后，刷新页面数据源列表没有展示的问题
- 修复 Console 控制台监控报错的问题
- 修复 Console 共享单一 Prometheus 服务监控图表无法显示的问题
- 修复 全量任务（dataTaskState": "COMPLETE"）在完成状态下无法修改订阅的问题
- 修复 子账号登录后卡在登录界面的问题
- 修复 子账号只提供审计权限时，登录后无法跳转的问题
- 修复 修改订阅对新增表中的单张表添加虚拟列，再批量添加同名的虚拟列，会重复设置导致任务报错的问题
- 修复 先设置虚拟列（设置为表中含有的列名的虚拟列），再批量设置目标主键或清洗数据，搜索含有该列的表时数量不正确的问题
- 修复 修改订阅添加库，源端选一个目标端不存在的库，不选择目标端的库（页面显示为未选择的状态），点击确定可以添加成功的问题   
- 修复 重跑操作时，同一个任务位点并行修改可能导致任务状态不对的问题
- 修复 查看机器日志因为日志调整出现的破页问题
- 修复 Kafka 目标端修改映射规则后，目标端 partition 没有设置成已存在 topic 的 partition 的问题
- 修复 Kafka 目标端手动输入表名回车后，目标端 partition 没有设置成已存在 topic 的 partition 的问题
- 修复 达梦 DSC 实例连接不同实例操作同一个表增量数据乱序的问题
- 修复 达梦 DSC 初始化位点，不同实例位点间隔太大的问题
- 修复 Paimon 写入重试导致文件找不到的问题


