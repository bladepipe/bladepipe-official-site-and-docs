---
id: rn-cloudcanal-6-2-0-0
title: 6.2.0.0
---
## CloudCanal-6.2.0.0

发版时间:2026年6月29日 版本号: 6.2.0.0

## 亮点
- 优化 **MySQL/PolarDB-X/PolarDB-MySQL/OceanBase for MySQL binlog 模式源端增量解析逻辑**，大幅度优化数据内存驻留、源端宽表解析 CPU 负载
- 优化 **MySQL/PolarDB-MySQL/Oracle/PostgreSQL/SQL Server 源端增量任务数据格式**，降低任务内存占用(参数 `updateImageMode` 、`deleteImageMode`)

## 新链路

- 开放 **PolarDB-MySQL -> OceanBase for MySQL** 结构迁移/全量迁移/增量同步/数据校验/数据订正/DDL（加列/减列/modify/rename/truncate）

## 新特性

- 支持 Redis 源端指令过滤白名单（参数：`skipCommands`），更好适配生产环境的复杂性
- 支持 Oracle 源端指定 LogMiner 读取多个归档日志的归档目的地名称（参数：`archiveDestName`），适配用户数据库切换场景
- 支持 OceanBase for MySQL 源端 DDL 新解析方案（ANTLR），具备更好的可扩展性
- 支持 SelectDB 源端数据校验/数据订正
- 支持 数据清洗/虚拟列 字段值拼接功能，如：`return @fun.str.join([@params['oid'],@params['biz_no'],@params['name']])`
- 支持 CloudBerry 对端全量/重跑前清空目标数据
- 支持 PolarDB-X 2.0 分布式数据库 5.4.21、8.4 版本
- 支持 StarRocks 4.1.x 系列版本
- 支持 达梦源端按照时间戳设置任务位点
- 支持 黑名单批量操作全选能力
- 支持 TiDB/KingbaseES 源端设置目标主键
- 支持 TiDB 全量查询使用 force index 指定查询索引提示

## 优化

- 优化 MySQL/TiDB/PolarDB-X/PolarDB-MySQL/PostgreSQL/KingbaseES/Vastbase 源端查询失败后强制 kill 查询进程，避免因任务自动重启在数据库上堆积大查询
- 优化 Hana 源端触发器清理逻辑，增加更多详细日志
- 优化 Kafka 源端、StarRocks 目标端部分默认参数，提升同步性能
- 优化 创建任务期间对端数据源不再获取表 PK/UK 信息
- 优化 StarRocks/Doris/SelectDB Dynamic 模式数据拉取逻辑，通过新增参数控制单次拉取数量（参数：`dynamicScanBatchSize`）
- 优化 PostgreSQL 系列数据库解析 unknown 类型时提示字段模式和表名
- 优化 Oracle 源端 LogMiner 增量模式任务创建，校验并限制表名超 30 字符的表选择
- 优化 任务中存在多个数据库创建相似任务时，页面卡顿的问题
- 优化 StarRocks 数据分区配置项，当检测到目标表已存在时置灰

## 问题修复

- 修复 RDS for MySQL 源端同步任务下载 Binlog 失败的问题
- 修复 安全问题，Sidecar 限制端口暴露范围（仅限本地连接）
- 修复 安全问题，控制台可全局关闭自定义代码功能
- 修复 Hana 到 Kafka 链路 Debezium Json 格式中 source.ts_ms 字段未使用源端变更时间的问题
- 修复 PostgreSQL 数据库非 public schema 开启 vector 扩展，结构迁移报错的问题
- 修复 MySQL 全量/校验查询过滤条件中带分号 JDBC 游标读不生效导致 OOM 的问题
- 修复 KingbaseES 对端执行无主键且无数据变更的 update 语句异常的问题
- 修复 RSocket/元数据大字段场景 Jackson 反序列化超过 20MB 失败的问题
- 修复 PolarDB-X BIT 类型数据校验误判不一致的问题
- 修复 Redis 目标端写入报错跳过参数不生效的问题
- 修复 Dameng 源端增量任务频繁重启时 LSN 异常递增导致数据丢失的问题
- 修复 Docker 镜像 JDK 17.0.1 依赖冲突导致 Console 无法正常启动的问题
- 修复 Dameng 源端增量同步 DDL 时，原始 DDL 语句表名使用小写导致 DDL 被误过滤的问题
- 修复 TiDB 源端单 Region 包含多张表时，部分表增量数据可能被过滤导致目标端缺失的问题
- 修复 TiDB 源端 Region Split、Leader 切换等场景下，订阅状态可能不一致导致增量数据无法正常接收的问题
- 修复 TiDB 源端 DDL/分区表变更后，旧 tableId 或 partitionId 订阅未及时清理可能导致状态异常的问题
- 修复 Kafka/Pulsar 目标端异步写入后，apply_commit.log 提交日志写入耗时不准确的问题
- 修复 OceanBase for MySQL 源端使用 SKIP_INDEX(SUM) 类型索引时解析器不支持的问题
- 修复 Oracle 源端增量同步强类型模式下遇到源端 null 值数据时出现空指针异常的问题
- 修复 数据订正任务会订正未被订阅的列的问题（参数：`reviseAllSrcColumns`）
- 修复 数据清洗在强类型迁移同步数据时，ifNullReplace 脚本执行报错的问题
- 修复 MySQL ANTLR 解析器对于选项中使用反引号形式的语句无法解析的问题，例如 "row_format =\`dynamic`"
- 修复 Oracle ANTLR 解析器对于 "alter table "ABC" shrink space CHECK;" 无法解析的问题
- 修复 创建任务及修改订阅新增表时，修改目标名称后页面状态未及时更新为"待创建"，需手动刷新的问题
- 修复 关系型数据库源端全量同步时，源表存在主键但未勾选主键列，宽表列裁剪场景下可能导致数据遗漏的问题
- 修复 创建任务页面，编辑待创建表名后按回车键输入未生效的问题
- 修复 表达式模式修改订阅时，删除全部原表达式后新增表达式，任务无法提交的问题
- 修复 任务监控页面"对端写入延迟"指标未显示的问题
- 修复 部分分页接口实际单页条数上限与报错提示信息不一致的问题