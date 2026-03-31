---
id: rn-cloudcanal-5-5-0-0
title: 5.5.0.0
---
## CloudCanal-5.5.0.0

发版时间:2026年3月31日 版本号: 5.5.0.0

## 亮点

- 支持 StarRocks/Doris/Redshift -> MySQL [定时扫描方式同步](../operation/job_manage/create_job/create_retl_job.md)，可选增量字段做增量同步，执行前可附带 清空对端 或 归档旧表 能力
- 支持 ElasticSearch -> ElasticSearch 定时扫描方式同步，可选指定增量字段做增量同步
- 支持 OSS/S3/Posix 文件数据 -> PostgreSQL 定时迁移能力（向量嵌入），执行前可附带删除对端相应文件嵌入记录，达到增量更新功能

## 新链路

- 开放 [Google Spanner -> StarRocks / Doris / ClickHouse](../dataMigrationAndSync/connection/spanner.mdx) 结构迁移、全量、增量同步、数据校验、数据订正
- 开放 Vastbase -> Doris/StarRocks/Oracle 结构迁移/全量迁移/数据同步/数据校验/数据订正/DDL（加列/减列/modify/rename）
- 开放 DynamoDB -> Kafka 结构迁移/全量迁移/数据同步

## 新特性

- 支持 Oracle -> Oracle/MySQL/PostgreSQL/SQL Server 强类型增量同步，复杂类型适配能力更好
- 支持 Oracle -> Oracle 同步 INTERVAL YEAR TO MONTH、INTERVAL DAY TO SECOND 类型数据
- 支持 Oracle Blob 数据类型增量同步（参数 useTypedField、oraLmLobEnable 设为 true）
- 支持 SQL Server -> Oracle/MySQL/PostgreSQL/SQL Server 强类型全量迁移/数据同步/数据校验/数据订正，复杂类型适配能力更好
- 支持 TiDB / Oracle 源端打印原始接收数据日志（新增参数：enableReceiveLog），补全数据缺失排查能力
- 支持 Kafka 源端多位点模式，解决单位点模式下不同分区消费速度不一致引起的任务延迟时间跳动问题
- 支持 Hana 源端创建 CDC 表自增序列
- 支持 KingbaseES 源端分区表迁移/同步
- 支持 ElasticSearch 9.x 版本
- 支持 支持 OceanBase 4.5.0.0 版本
- 支持 MCP 协议，主账号可通过 配置 > 个人资料 > 安全，获取 MCP 链接
- 支持 主账号可通过 配置 > 个人资料 > 安全 ，获取 OpenAPI 链接，方便类似 Postman / Curl 等工具调试
- 支持 任务详情中结构迁移库表列表和全量迁移库表列表筛选和调整每页显示数量
- 支持 创建任务时修改目标名称增加去掉前缀和后缀的映射规则
- 支持 表达式模式下增量同步 OnlineDDL
- 支持 验证电话告警功能，并添加电话告警发送记录
- 支持 对子账号批量授权能力，降低多任务权限配置成本
- 支持 任务列表表头列宽自定义调整
- 支持 修改订阅删除源端已不存在的列

## 优化

- 优化 MySQL 源端 增量元信息解析问题，使用 Antlr 来替代德鲁伊实现（新增参数：ddlParserMode），解析能力大幅度强化
- 优化 ClickHouse 目标端写入性能，性能提高 30%，支持二进制流的写入方式（新增参数：ckWriteMode）
- 优化 Kafka 源端延迟判断逻辑，新增积压 offset 数量指标，便于评估当前任务消费进度及追平能力
- 优化 Kafka 目标端原始格式下 apply_commit.log 日志内容，针对无 PK 消息新增 offset 打印，便于快速排查丢数据问题
- 优化 MySQL / OceanBase for MySQL 源端全量迁移开启 snapshotRead 或者查询条件下推时不去查询 minpk/maxpk
- 优化 TiDB 源端新增快速失败关键词，避免任务陷入无限重连假存活
- 优化 KingbaseES MySQL 兼容模式，支持 MySQL 模式下的 DATETIME、TIMESTAMP、TINYINT、BLOB、SET、ENUM 类型
- 优化 KingbaseES Oracle 兼容模式，支持 Oracle 模式下的 INTERVAL_YEAR_TO_MONTH、INTERVAL_DAY_TO_SECOND、ROWID、UROWID 类型
- 优化 KingbaseES SQL Server 兼容模式，支持 SQL Server 模式下的 TIME、DATETIME2、SMALLDATETIME 类型
- 优化 KingbaseES 元数据获取逻辑，兼容低版本元数据结构
- 优化 MySQL 源端无符号 tinyint/smallint/mediaint 到 Dameng 的结构迁移类型映射
- 优化 全量阶段源端 Select 语句不再查询黑名单列（MySQL/PostgreSQL/Vastbase/Kingbase）
- 优化 Doris/StarRocks/OceanBase for MySQL/OceanBase for Oracle 任务启动时的表结构获取速度
- 优化 OceanBase for Oracle 索引获取效率
- 优化 Oracle 根据 Schema 查询表时自动根据表名升序排序
- 优化 TiDB 源端虚拟列的页面展示，相关字段默认不同步
- 优化 私有部署 Docker/K8s 容器安装脚本，默认保持容器内部时区和宿主机一致
- 优化 BYOC 客户端容器安装脚本，默认保持和所连接控制台一致时区(CloudCanal 为 Asia/Shanghai)
- 优化 日志清理功能，支持按日志保留天数配置，由后台线程定期清理过期日志
- 优化 数据源管理页面可以按更多的部署类型进行筛选
- 优化 任务列表分页允许更大单页

## 问题修复

- 修复 Oracle 目标端强类型NVARCHAR2 非 ASCII 码字符（中文）乱码
- 修复 Oracle 增量源端消费大批量 CSF 分段事件时丢失事件问题（参数 oraIncrLmMode 新增枚举值 ADD_FILE_TX_WINDOW）
- 修复 Oracle 增量源端事务落盘未正确处理 ROLLBACK 事件，导致对端出现脏数据/数据不一致问题
- 修复 Oracle 增量源端消费归档模式下，CHECKPOINT SCN 在 redo 日志边界导致任务无限期暂停消费问题
- 修复 Oracle 源端增量 logminer 推送 redo SQL 为空的 DML 事件导致后续空指针异常问题
- 修复 SQL Server 源端全量迁移/增量同步 TIME 类型数据丢失精度问题
- 修复 StarRocks / Doris 目标端强类型同步 JSON 类型数据
- 修复 StarRocks / Doris 数据校验强类型 bit2varchar / binary2varchar / time2varchar / decimal2varchar 无效的问题
- 修复 StarRocks / Doris 目标端数据校验时，设置多个目标主键导致报错的问题
- 修复 Vastbase 修改订阅时摘除表未将表从数据库发布订阅中移除
- 修复 Vastbase/KingBase 作为源端，任务详情页的 是否同步 DDL 永远为否
- 修复 Vastbase 无主键表全量同步任务无限循环
- 修复 TiDB 源端因 Region 历史心跳事件导致的位点回退问题
- 修复 TiDB 源端在 Region 分裂及 TiKV 主从切换场景下的任务延迟问题
- 修复 TiDB 源端增量时间类型字段空值解析异常的问题
- 修复 TiDB 源端无符号 BIGINT 主键表同步任务报错的问题
- 修复 Kafka -> StarRocks 设置数据清洗后取消勾选表，但被取消表的数据清洗数据没有被清除的问题
- 修复 Kafka -> StarRocks 设置数据清洗条件在最后一步任务信息总结处未展示数据清洗条件的问题
- 修复 Kafka -> StarRocks 修改订阅只删除数据清洗条件时无法下一步的问题
- 修复 OceanBase 写入无符号 bigint 报错的问题
- 修复 Elasticsearch 目标端增量写入过程中，因批次大小计算不准确导致的 Request Entity Too Large 报错问题
- 修复 导入 OceanBase for MySQL 源端增量任务抛出租户不可为空异常，默认使用 sys 租户
- 修复 强类型模式下，部分源端，目标端日期字段写入时类型转换失败
- 修复 MySQL 源端无符号 TINYINT/SMALLINT/MEDIUMINT 全量同步报错问题
- 修复 PostgreSQL/KingbaseES 增量任务分区表初始化失败问题
- 修复 PostgreSQL/KingbaseES/Vastbase 获取表 UK 为空问题
- 修复 KingbaseES PK/UK/INDEX 中包含系统隐藏列导致结构迁移失败问题
- 修复 Console 切换网络导致 IP 变化时，异步任务无法正常调度的问题（新增 Console 配置：console.config.cluster.uid）
- 修复 非 Asia/Shanghai 时区下许可证开始时间早于当前时间，导致系统无法激活的问题
- 修复 数据源管理页面添加白名单的弹窗点击右上角关闭按钮后无法再次打开的问题
- 修复 创建相似任务无法 勾选/取消勾选 全量初始化的问题
- 修复 校验与订正任务创建相似任务时，任务类型切换后任务规格没有切换的问题
- 修复 子账户无状态机权限时仍可通过 URL 直接访问状态机页面的问题
- 修复 库表映射区域展开/收起后样式错位问题
- 修复 订正与校验任务中当任务处于订正状态时，禁止修改订阅的提示文案问题，明确限制范围与生效条件
- 修复 社区版 TGZ 部署无法新增机器的问题



