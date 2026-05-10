---
id: rn-cloudcanal-6-0-0-0
title: 6.0.0.0
---
## CloudCanal-6.0.0.0

发版时间:2026年5月8日 版本号: 6.0.0.0

## 亮点
- 开放 **MySQL -> Hologres** 结构迁移/全量迁移/增量同步/数据校验/数据订正/DDL（加列/truncate）
- 开放 **PostgreSQL -> CloudBerry** 结构迁移/全量迁移/数据同步/数据校验/数据订正/DDL（加列/减列/modify/rename/truncate）
- 开放 **GreenPlum -> CloudBerry** 结构迁移/全量迁移/数据校验/数据订正
- 开放 **MySQL / PostgreSQL / Oracle -> Snowflake** 结构迁移/全量迁移/数据同步/数据校验/DDL（加列/减列/modify）

## 兼容性

- 产品运行环境升级至 **JDK17**，[**TGZ 升级需切换 JDK 版本**](../productOP/tgz/firstinstall_with_tgz.md#安装基础环境)，Docker/K8S 不影响

## 新链路

- 开放 **[KingbaseES](../dataMigrationAndSync/datasource_func/KingbaseES/privs_for_kes.md) -> OceanBase for Oracle** 结构迁移/全量迁移/数据同步/数据校验/数据订正/DDL（加列/减列/modify/rename/truncate）
- 开放 **[OceanBase for Oracle](../dataMigrationAndSync/datasource_func/ObForOracle/privs_for_obo.md) -> KingbaseES** 结构迁移/全量迁移/增量同步/数据校验/数据订正/结构迁移/DDL 同步（加列/减列/modify/rename/truncate）
- 开放 **MySQL / PolarDB MySQL -> MySQL DuckDB** 结构迁移/全量迁移/数据同步/数据校验
- 开放 **OpenGauss -> Doris** 结构迁移/全量迁移/增量同步/数据校验/数据订正

## 新特性

- 支持 VastBase 源端视图全量迁移
- 支持 [VastBase -> Dameng 的定时扫描增量同步](../operation/job_manage/create_job/create_retl_job.md#支持的链路)
- 支持 KingbaseES 数据源设置默认数据库，方便用户授权
- 支持 Dameng 对端强类型，具备更好的类型兼容性
- 支持 Oracle 源端无主键表迁移同步，使用 ROWID 作为唯一标识
- 支持 Oracle 对端 DDL 预测识别 DROP PRIMARY KEY、ADD PRIMARY KEY 操作
- 支持 Oracle 源端 PRIMARY KEY 的新增与删除同步
- 支持 OpenGauss 强类型
- 支持 OpenGauss 6.x
- 支持 全量阶段的子任务修改订阅
- 支持 创建任务数据处理步骤可批量设置目标列名，包括去掉特定字符串、添加或删除前后缀
- 支持 导出任务关键信息，方便快速排查任务相关问题
- 支持 查看库表映射 > 导出订阅列表，以快速创建跨 CC 集群的相似任务
- 支持 数据清洗/虚拟列 subStringIndex/subStringBetweenIndex 脚本，满足更多的字符串字段数据截取处理需求
- 支持 自建 SQL Server 、AWS SQL Server、Azure SQL Server、自建 MariaDB、AWS MariaDB、Azure for MariaDB、Aurora MySQL、Azure for MySQL TLS 认证方式添加数据源，使跨互联网数据迁移同步更安全
- 支持 Aurora PostgreSQL、Azure for PostgreSQL CA 证书认证方式添加数据源，使跨互联网数据迁移同步更安全

## 优化

- 优化 升级控制台 springboot 等依赖包，解决安全问题
- 优化 默认过滤 StarRocks 生成列
- 优化 Oracle 源端 Antlr 作为增量 DDL 的解析器，默认新创建的任务会使用该解析器
- 优化 Oracle 源端内存元信息跟踪使用新增 Antlr 作为 DDL 的解析器引擎，默认新创建的任务会使用该解析器
- 优化 Oracle 源端删除兼容性，解决普通 DROP 语句在底层被重写为 RENAME 导致的兼容问题（新增参数：rewriteRecycleRenameToDrop）
- 优化 MySQL 增量位点定位，支持新实例空 binlog 场景自动回退到首个 binlog 起点
- 优化 KingbaseES 支持订阅二级分区表
- 优化 Elasticsearch 对端 Date 类型写入，支持手动选择对端已有 format
- 优化 定时扫描的同步模式最大间隔为 24 小时
- 优化 设置定时扫描的定时时间时输入的交互方式
- 优化 添加数据源时额外参数配置不符合要求的提示，更加易读
- 优化 创建任务/修改订阅时，对于耗时较长的捞取表和捞取列，支持中止捞取
- 优化 订阅修改流程，禁止修改已有映射的表/列，改动对端信息需剔除后重新添加
- 优化 创建任务流程，筛选表时支持序号范围过滤，可以快速选择序号范围内的表
- 优化 创建 Elasticsearch 对端任务时默认不设置时区信息
- 优化 重跑任务的交互，增加二次确认弹窗，并提示已设置清空目标数据或重建目标表配置的风险

## 问题修复

- 修复 OSS 数据源依赖问题导致的无法链接的问题
- 修复 DB2 源端全量迁移 soTimeoutSec 参数无效的问题
- 修复 DB2 源端全量迁移 11 版本以下 Limit 语法错误的问题
- 修复 TiDB 到 OceanBase Datetime / Timestamp 时间差 8 小时的问题
- 修复 OpenGauss/PostgreSQL -> OpenGauss/PostgreSQL 数据校验误判 INTERVAL 类型不一致问题
- 修复 PostgreSQL 低版本增量同步启动时根据 oid 获取字段类型异常问题
- 修复 PostgreSQL、KingbaseES、Vastbase 增量同步时 DDL 捕获表更新、删除事件被错误同步到下游的问题
- 修复 MySQL DDL 同步过程中名称本身带有反引号情况下的解析错误的问题，例如“KEY ``user_id`` (user_id)”
- 修复 MySQL DDL 同步过程中新解析器在遇到默认值带有 b1 这种二进制表示法时解析错误的问题
- 修复 KingbaseES 源端结构迁移时表达式索引解析列失败问题
- 修复 添加数据源时达梦 TLS 方式链接，无法上传 trustore 文件的问题
- 修复 AWS 数据源源端任务重置位点的国际化展示问题
- 修复 定时扫描同步的对端落盘日志不打印主键的问题
- 修复 全量迁移任务修改订阅，大模型相关配置丢失的问题
- 修复 设置单表和批量大模型嵌入的表单的交互问题
- 修复 修改订阅时，取消已订阅表，再重新勾选时配置被清掉的问题
- 修复 刷新路由逻辑，避免在任何路由刷新都会回到任务列表页面
- 修复 个人设置页面按回车键触发页面刷新的问题
- 修复 库表映射通过分号进行批量过滤筛选功能
- 修复 库表映射操作黑名单状态，鼠标悬浮提示文案会显示异常的问题
- 修复 创建任务表过滤中，在未选择的表筛选条件下，勾选表后当前行立即消失，容易误操作的问题
- 修复 创建相似任务对端切换为 ClickHouse 报错的问题
- 修复 创建任务在对端没有数据源的情况下，切换网络类型会默认展示 MySQL 实例的问题
- 修复 无法正常另存任务参数模版的问题
- 修复 任务参数编辑中，放宽对JSON类型的参数修改限制





