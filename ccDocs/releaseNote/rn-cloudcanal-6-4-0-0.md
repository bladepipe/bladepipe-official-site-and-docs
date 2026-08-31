---
id: rn-cloudcanal-6-4-0-0
title: 6.4.0.0
---

## CloudCanal-6.4.0.0

发版时间:2026年8月28日 版本号: 6.4.0.0

## 亮点
- 支持 **SAP Hana** 源端表级增量同步未提交事务非阻塞处理，事务结束后自动补偿回放（新增参数：uncommittedTxMode）
- 支持 **PostgreSQL** 源端（>=17）增量创建可容灾的 replication slot, 即主备切换不中断同步，也无需重建
- 优化 **Oracle** 增量源端新增 ADD_FILE_ARCHIVE_WINDOW 模式，动态扩展前后归档日志作为事务上下文，并按真实 SCN 范围查询以优化挖掘性能

## 新链路

- 开放 [**Google Ads (谷歌广告数据)**](../dataMigrationAndSync/datasource_func/GoogleAds/configure_and_authorize_google_ads.md) -> **MySQL** 增量同步（定时扫描，upsert）
- 开放 **PostgreSQL** -> **PolarDB For MySQL** 结构迁移、全量迁移、增量同步、数据校验、数据订正及 DDL 同步（加列/减列/modify/rename/truncate）
- 开放 **TDSQL MySQL**/**TDSQL-C MySQL** -> **StarRocks**/**Doris** 全量迁移/增量同步/数据校验/数据订正/结构迁移/DDL（加列/减列/modify/rename/truncate）
- 开放 **TDSQL MySQL**/**TDSQL-C MySQL** -> **Kafka** 全量迁移/增量同步
- 开放 **Dameng** / **KingbaseES** / **GaussDB** -> **Elasticsearch** 全量迁移/增量同步/数据校验/结构迁移

## 新特性

- 支持 Doris -> Oracle 定时扫描增量，可设置 DATETIME / DATETIMEV2 类型字段作为周期性过滤条件
- 支持 Doris 对端结构迁移与 DDL 同步写入列 default 值（数字、字符串部分类型）
- 支持 OceanBase for MySQL -> OceanBase for MySQL 结构迁移表分区信息
- 支持 PostgreSQL 源端 CHECK_POS 心跳模式，无侵入性
- 支持 SQL Server 对端数据校验时自动拆分大批量查询，避免超出参数上限（新增参数： maxInSizePerQuery ）
- 支持 MySQL -> SQL Server DDL 同步预检跳过已执行的索引和注释操作，避免任务在对端表重放 DDL 异常
- 支持 页面日志下载通过额外通信信道，和任务调度等关键操作隔离，更加稳定
- 支持 页面查看日志（tail）通过额外通信信道，和任务调度等关键操作隔离，更加稳定
- 支持 Console 从各个 Sidecar 上获取任务监控指标通过额外通信通道, 和任务调度等关键操作隔离，更加稳定
- 支持 MFA 自定义用户与服务标识

## 优化

- 优化 Hana trigger 检查性能
- 优化 Hana 源端创建相似任务时带上高级配置
- 优化 Kafka 源端位点查询兼容性，支持 Kafka 0.11 以下 Broker 获取分区末端位点和消费组提交位点
- 优化 Kafka 源端消费位点重置，支持活动消费组重试和时间戳越界自动回退至最新位点，并修复操作超时单位错误
- 优化 Oracle 增量同步支持展示剩余归档文件消费数指标
- 优化 Doris 全量同步行数获取方式，通过查询元数据替代全表扫描
- 优化 StarRocks 全量同步行数获取方式，通过查询元数据替代全表扫描
- 优化 MySQL/ADBForMySQL/PolarDb MySQL/TDSQL-C MySQL 对端 dstWholeReplace 写入模式按列结构切分增量事件
- 优化 KingbaseES 系统 search_path 配置导致无法直接查询系统表问题
- 优化 KingbaseES 显式转换索引序号类型以兼容严格函数参数匹配
- 优化 Dameng 增量过滤 LogMiner 中表名为空的 DML 事件
- 优化 Elasticsearch 对端校验 OBJECT 字段忽略属性顺序
- 优化 GaussDB 增加复制流心跳，避免处理阻塞导致 wal sender 超时断连（增加参数 replicationHeartbeatSec）
- 优化 页面日志下载交互，大文件不卡页面，流式下载
- 优化 数据源修改地址、账号密码等配置合并为一个功能入口
- 优化 重置AK/SK增加二次确认，防止误操作
- 优化 全量同步过滤条件下推仅对设置过滤条件的表生效，未设置过滤条件的表使用分页扫描方式
- 优化 异步任务操作者记录逻辑，显示具体到子账户用户名
- 优化 任务参数的模板项
- 优化 创建任务时对无主键表且未设置目标主键进行提示

## 问题修复

- 修复 安全问题，升级任务运行组件中的 Fastjson 至 1.2.84
- 修复 SQL Server 源端增量同步 CDC 更新掩码漏标时，实际变更列未被标记为更新的问题
- 修复 Kafka 源端多位点任务修改订阅删除 Topic 后，任务位点仍保留已删除 Topic 的问题
- 修复 Paimon、DeltaLake、Iceberg 全量及增量写入报错后无法按任务配置跳过的问题，并支持 Hudi 全量异步刷写异常跳过
- 修复 PostgreSQL 到 MySQL interval 类型映射错误的问题（修正为 interval -> varchar）
- 修复 OceanBase For Oracle 指定对端主键相关列字段约束 nullable 的问题
- 修复 MySQL JSONB 解析转义问题
- 修复 SQL Server 2016 前的版本无法执行 DROP TABLE DDL 同步
- 修复 PostgreSQL -> MySQL 家族数据库时布尔列数据丢失和浮点数组含 NaN/Infinity 导致写入失败的问题
- 修复 PostgreSQL 目标端 DDL 同步修改字段类型时，额外添加 NOT NULL 约束的问题
- 修复 KingbaseES/Vastbase 子任务合并后复制槽未删除的问题
- 修复 TDSQL-C MySQL 主备切换后找不到 binlog 文件的问题
- 修复 Dameng 元数据中 TIMESTAMP WITH LOCAL TIME ZONE 的 DATA_SCALE 编码未解码，导致小数秒精度被错误识别的问题
- 修复 GaussDB 增量同步 MONEY 字段丢失符号位问题
- 修复 MySQL/PolarDB MySQL/TDSQL-C MySQL 批量写入 TINYTEXT/TEXT/MEDIUMTEXT/LONGTEXT 时未指定字符流长度导致最终写入空字符串问题
- 修复 Dameng 全量同步在开启滤条件下推但未设置过滤条件时 SQL 拼接语法错误，导致同步失败的问题
- 修复 PostgreSQL -> MySQL 全量同步时空数组被写入为 "]" 的问题
- 修复 MySQL -> SQL Server DDL 同步时表注释丢失的问题
- 修复 任务详情告警配置中取消最后一种告警方式后配置未生效的问题
- 修复 创建相似任务时库映射下拉框选择后还显示旧值的问题
- 修复 创建任务多 DB 模式下，一次添加多行后逐个选择库时出现异常的问题
- 修复 过滤条件中字段添加双引号后无法正确识别的问题
- 修复 修改订阅对端表已存在的情况下，首次勾选对端不存在的列时异常出现「待创建」的问题
- 修复 异常连续关闭多个弹窗问题，导致部分报错信息丢失的问题