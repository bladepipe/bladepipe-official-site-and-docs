---
id: rn-cloudcanal-6-6-0-0
title: 6.6.0.0
---

## CloudCanal-6.6.0.0

发版时间:2026年10月30日 版本号: 6.6.0.0

## 亮点

- 优化 数据源版本机制，对新版本或者未识别的数据库版本不再设限（如从数据库源码临时打包、尚未确定版本号的版本）

## 新链路

- 开放 **TDSQL PostgreSQL** -> **StarRocks**/**Doris**/**SelectDB** 全量迁移/增量同步/数据校验/数据订正/结构迁移

## 新特性

- 支持 Kudu 目标端结构迁移、全量迁移、增量同步、数据校验和数据订正能力，开放全量前删除并重建目标表
- 支持 Kudu 增量 DDL：建表、删表、加列、删列、表重命名、列重命名、设置和移除默认值、表和列注释；处理重复 DDL 重放和 DDL 后元数据刷新
- 支持 Kudu 对端批量写入，按行数、时间及数据容量触发落盘（参数：enableBatchWrite，新任务默认开启）
- 支持 MySQL/OceanBase MySQL/PolarDB MySQL/PolarDB-X MySQL 全量迁移指定 Force Index 条件查询，提升复杂过滤条件的执行性能。
- 支持 Dameng/OceanBase MySQL/OceanBase Oracle 表结构校验
- 支持 Sidecar 上报运行时区，并按集群唯一时区设置新任务源端默认时区（参数：src_timezone_from_worker_enabled，默认关闭），更好地适配海外地区使用。
- 支持 PostgreSQL DDL 新解析器，扩展 DDL 同步支持范围
- 支持 PostgreSQL -> Doris 的部分类型映射问题
- 支持 MySQL -> StarRocks（>=3.0） TINYBLOB 和 BLOB 到 VARBINARY 类型映射
- 支持 Oracle RAW 类型到 ClickHouse String 字段的数据迁移同步
- 支持 PolarDB MySQL/PolarDB-X MySQL/OceanBase MySQL 联合主键全量扫描分页及断点续传
- 支持 Redis 增量任务过滤 RDB 事件（参数:skipIncreRdb）
- 支持 TiDB 多库同步到 Kafka，扩大单任务可同步表范围
- 支持 Elasticsearch 目标端多库同步（如MySQL/PolarDBMySQL -> Elasticsearch 可选多个 schema 迁移同步），扩大单任务可同步表范围
- 支持 MySQL -> Oracle 修改订阅新增库
- 支持 OceanBase/OceanBase for Orcale 账号密码 TLS 连接方式
- 支持 OceanBase 通过 SSL 连接 binlog 模式增量同步
- 支持 表的表达式映射规则，以支持更加个性化、有规律的表映射，减少选表的操作复杂度
- 支持 列的忽略大小写映射规则
- 支持 多位点模式下批量更新位点

## 优化

- 优化 异构数据库 -> StarRocks/Doris DDL 同步，索引新增/修改/删除默认过滤,  建表/加列/改列 默认带上源端经过转换后的列 default 值（如有） 
- 优化 Oracle DDL 解析器解析能力，提升 Oracle -> Oracle DDL 同步能力，包括 COMMENT TABLE/COLUMN,SET DEFAULT，SET NOT NULL/SET NULL，SET IDENTITY /DROP IDENTITY 等
- 优化 StarRocks/Doris 目标端 DDL报错处理，自动略过修改 DEFAULT 值和缩短类型长度的报错，并打印日志
- 优化 PostgreSQL DDL 同步，默认过滤 CREATE TABLE 语句
- 优化 Oracle LogMiner V2 的事务起点、SCN 窗口、日志会话恢复、部分事务标识匹配及回滚处理
- 优化 ClickHouse 对端强类型转换，统一 JDBC 与 RowBinary 写入路径时间、数值及嵌套 Array/Map 处理
- 优化 ClickHouse 数据校验，对 ReplacingMergeTree、CollapsingMergeTree 等表引擎使用 FINAL 查询，按合并后逻辑数据比较
- 优化 StarRocks 全量和增量实际 Flush 日志补充表名
- 优化 MySQL/TiDB/OceanBase MySQL/StarRocks/Doris/PostgreSQL/Oracle/KingbaseES 增量同步对端执行 DDL 后动态刷新对端结构信息，为后续 DML 提供准确的写入类型
- 优化 StagingMerge 模式下纯 UPDATE 批次执行方式，提升执行效率
- 优化 StarRocks 对端强类型写入，修复 Map/Array/Struct/Varbinary 类型写入问题
- 优化 Doris 对端强类型写入，修复 LargeInt/Decimal/DecimalV3 类型数据精度丢失问题
- 优化 Redis 全量 + 增量一体化任务拆分为全量迁移，增量同步单独任务
- 优化 Redis 双向同步防循策略，前置防循环指令过滤，减少 Redis 实例压力
- 优化 SQL Server 源端追平检查，避免远程查询较慢时阻塞任务启停
- 优化 修改订阅时子任务配置继承，保留父任务的时区、写入策略、数据源连接及采集参数
- 优化 导出任务关键信息补充性能类型的参数, 以便更加高效做诊断和优化
- 优化 控制台自动升级输入安装包路径的时候提示一些特殊值
- 优化 任务详情页的表结构历史查看限制，非增量阶段的 Tab 也支持查看表结构历史。
- 优化 重置位点时间选择组件交互
- 优化 任务配置的 dbs 中的一些信息在页面上的透出
- 优化 黑名单批量设置交互，可通过选择指定表生效
- 优化 任务日志打印，可开闭执行线程打印(默认关闭)，commit log 去除日志级别，节省日志的磁盘占用

## 问题修复

- 修复 安全问题，剔除 FastJson2 依赖包
- 修复 Hana、SQL Server、Kafka、DynamoDB、Redis、TDengine 及公共位点管理中的心跳、批次位点合并和上报快照问题。
- 修复 Kudu、Paimon、DeltaLake 停止时未执行 Future 的取消处理
- 修复 Spanner 源端 NEW_ROW_AND_OLD_VALUES 模式下，更新前数据缺少未变化字段
- 修复 GaussDB for MySQL、Lindorm、TDSQL PostgreSQL 源端表级数据过滤条件不生效
- 修复 DB2 源端不同 Schema 下同名表错误使用相同数据过滤条件
- 修复 TiDB 连接创建、DDL 连接的超时和 SSL 配置沿用统一数据源配置
- 修复 Elasticsearch 对端不能正确跳过 RENAME DDL 导致任务异常的问题
- 修复 Redis 数据同步 EVALSHA 命令目标端写入失败的问题
- 修复 Redis Sentinel、Cluster 主从切换时恢复位点未沿用已确认消费进度，可能跳过未消费数据
- 修复 Redis 源端任务停止后数据计数定时线程未关闭
- 修复 Dameng 增量同步中事务 ID 与 LSN 顺序不一致时，事务缓存被误清理导致数据丢失的问题
- 修复 Hana 源端 CDC 表中不同事务的 __$DATA_ID 相同时，UPDATE 前后镜像配对失败导致的问题
- 修复 Hana 源端手动创建触发器模式下，无法正确检测 TRIGGER 问题
- 修复 MySQL DDL 转换获取类型出错问题（如...COLUMN test_a text CHARACTER SET utf8mb4...）
- 修复 MySQL 源端强类型全量读取 DATE 受 Worker 时区影响，以及空 SET 被解析为含空字符串集合
- 修复 MySQL Binlog 解析丢失 binary 类型尾部 0 的问题
- 修复 MySQL 源端 DDL ANTLR 解析器 解析复杂建表语句报错的问题 (CHECK)
- 修复 MySQL 源端 DDL ANTLR 解析器 enum/set DDL 未提取枚举值导致同步到目标端报错的问题
- 修复 MySQL 源端 DDL ANTLR 解析器共享 Meta 被后续 DDL 修改导致的并行解析列错配问题
- 修复 MySQL 源端 DDL ANTLR 解析器 CREATE TABLE IF NOT EXISTS 覆盖已有元数据导致数据列错位问题
- 修复 MySQL/PolarDB MySQL/PolarDB-X MySQL/TDSQL MySQL/TDSQL-C MySQL/OceanBase MySQL 对端 JDBC 参数配置导致 FLOAT 读取协议不一致而引发的全量校验误报的问题
- 修复 PostgreSQL/KingbaseES/VastDB/Hana 源端先删除表，再任务修改订阅去掉表，清理订阅资源报错问题
- 修复 Dameng7 因系统元数据表中 HIDDEN_COLUMN 为 NULL 导致查询时普通字段被过滤问题
- 修复 Dameng 列精度及长度元数据为空时任务启动空指针异常
- 修复 OceanBase MySQL 作为 CloudCanal 元数据库场景下异步任务在事务提交前启动导致 NPE 问题
- 修复 创建任务并绑定配置模板时，自动创建的校验任务未继承模板生效后配置
- 修复 Oracle 源端带默认值加列、隐藏列及历史 DDL 重放时，字段位置/历史表结构不一致导致的数据解析错误
- 修复 Oracle NCHAR、NVARCHAR2 字段写入及国家字符集主键分页读取的字符集处理问题
- 修复 Oracle 源端强类型模式下 LONG 字段被按二进制读取
- 修复 Oracle 源端带时区时间在夏令时重复小时内解析为错误时间偏移
- 修复 Oracle 任务创建后修改修改 logminerPasswd 后，对应参数无法生效的问题
- 修复 Oracle 无法识别 23+ 的版本
- 修复 PostgreSQL 源端强类型主键包含 date 类型时全量报错的问题
- 修复 PostgreSQL 源端表结构迁移不支持表达式唯一索引的问题
- 修复 OceanBase/OceanBase for Oracle 连接池缓存冲突的问题
- 修复 SQL Server 静态 CDC 表模式下，修改订阅时新增的源端列被自动勾选的问题
- 修复 从 PostgreSQL 的支持目标列表中移除尚未支持的 PolarDB PostgreSQL
- 修复 全量迁移、数据校验及数据订正完成临界点停止任务后，无法正常启动或重复执行已完成阶段
- 修复 控制台日志频繁报 favicon.ico 不存在的问题
- 修复 创建结构迁移任务，最后一步任务配置显示错误
- 修复 反向代理 Console 并在反向代理处配置 tls 卸载之后，页面下载日志仍然使用 http 的问题
- 修复 异步任务的最后一个子任务被点击“忽略并继续”后异步任务一直等待执行的问题
- 修复 任务日志弹窗关闭后又自动重新打开的问题。
- 修复 创建相似任务并更换目标数据源后，不支持同步的列仍被错误勾选的问题
- 修复 批量设置目标主键时，实际值与显示不一致问题

