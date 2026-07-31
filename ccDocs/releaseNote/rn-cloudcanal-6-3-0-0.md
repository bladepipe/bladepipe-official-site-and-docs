---
id: rn-cloudcanal-6-3-0-0
title: 6.3.0.0
---
## CloudCanal-6.3.0.0

发版时间:2026年7月30日 版本号: 6.3.0.0

## 亮点
- 支持 **Oracle** 目标端在增量同步阶段使用临时表合并模式写入，大幅提升目标端写入性能（新增参数：useStagingMerge、stagingSchema）
- 支持 **OceanBase for Oracle** 目标端在全量、增量同步阶段使用临时表合并模式写入，大幅提升目标端写入性能（新增参数：useStagingMerge、stagingSchema）

## 新链路

- 开放 **PostgreSQL -> Oracle** 结构迁移、全量迁移、增量同步、数据校验、数据订正及 DDL 同步（add column、drop column、modify、rename、truncate）
- 开放 **Iceberg -> Redshift / MySQL** 结构迁移、全量迁移、增量同步（定时扫描、upsert）
- 开放 **MySQL / PostgreSQL / Aurora PostgreSQL / SQL Server -> Redshift** 结构迁移、全量迁移、增量同步
- 开放 **PostgreSQL / Aurora PostgreSQL / SQL Server -> Iceberg** 结构迁移、全量迁移、增量同步

## 新特性

- 支持 Oracle 21c、23c、23ai、26ai 版本
- 支持 SshFile / OssFile / S3File / GoogleDrive / Yuque 周期性增量同步，检测到文件变更后自动迁移，默认跳过源端不存在的文档
- 支持 Iceberg 目标端在结构迁移阶段自动将源表主键设置为 Identifier Fields
- 支持 Dameng -> StarRocks 定时扫描增量同步
- 支持 表映射页面忽略大小写自动映射目标表
- 支持 Kafka 源端配置起始消费策略，可选 earliest / latest（新增参数：kafkaAutoOffsetReset）
- 支持 PolarDB MySQL、PolarDB-X 源端配置数据库心跳模式（新增参数：dbHeartbeatMode）
- 支持 按告警方式检索告警日志
- 支持 PostgreSQL / KingbaseES / Vastbase 源端解析 TRUNCATE 事件
- 支持 StarRocks/Doris/SelectDB 对端同步无主键表，但需先手动配置目标表主键列

## 优化

- 优化 PostgreSQL / KingbaseES / Vastbase 源端复制流心跳机制，避免任务处理阻塞导致 WAL Sender 超时断连（新增参数：replicationHeartbeatSec）
- 优化 OceanBase for Oracle 目标端 INSERT 批量执行失效导致的写入性能下降问题
- 优化 Oracle 目标端 JDBC 绑定类型不稳定导致批量 INSERT / MERGE 执行失效的问题，大幅提升 Oracle 写入性能
- 优化 MySQL、OceanBase for MySQL、PolarDB MySQL、PolarDB-X、TDSQL-C MySQL 和 TDSQL MySQL 源端按时间戳查找 Binlog 位点的性能（新增参数：fastTimestampSeekEnabled，默认关闭）
- 优化 TiDB、ADB MySQL、GreptimeDB、PolarDB、TDSQL MySQL、TDengine、StarRocks、DeltaLake、Iceberg、Paimon 元数据获取性能
- 优化 修改订阅时子任务继承主任务 keyConflictStrategy 参数
- 优化 MySQL 5.7 VIEW 全量扫描能力
- 优化 电话告警日志，增加任务信息记录
- 优化 添加数据源流程，敏感字段以密文形式展示
- 优化 创建任务或修改订阅流程，未全选列时增加提示
- 优化 创建相似任务流程，数据库信息回显完成前禁止进入下一步
- 优化 系统内按钮的防重复点击机制
- 优化 "搜索并手动勾选"模式，再次筛选时保留已勾选项
- 优化 "搜索并手动勾选"模式，支持同时过滤源端和目标端

## 问题修复

- 修复 Kafka 多位点模式下增量同步至 StarRocks 时，任务位点不更新的问题
- 修复 DynamoDB 多 Shard 更新位点时，同步行数重复累计的问题
- 修复 Kafka、RabbitMQ 等消息类链路在"列出所有并手动勾选"模式下，表名搜索过滤失效的问题
- 修复 创建任务时，在表达式模式下进入下一步后返回上一步并切换至其他模式，再次进入下一步会跳过数据清洗步骤的问题
- 修复 创建任务时切换至表达式模式后再切回，导致任务创建成功后因配置错误而报错的问题
- 修复 MySQL 源端重置位点时，修改 GTID 无效的问题
- 修复 ElasticSearch 源端 epoch_millis、epoch_second 格式的 Date 字段解析失败的问题
- 修复 PostgreSQL 源端无法识别枚举类型，导致数据无法同步的问题
- 修复 PostgreSQL 源端同步公元前日期数据时解析报错的问题
- 修复 PostgreSQL 全量同步时 DECIMAL 字段值为 Infinity、-Infinity 或 NaN 导致同步失败的问题
- 修复 主机网卡均处于桥接模式时无法获取 IP 地址的问题，优先使用常规网卡，无有效 IP 地址时再使用桥接网卡的 IPv4 地址
- 修复 MySQL / OceanBase for MySQL 源端执行修改主键类型或备注的 DDL 后，实时元数据中的主键信息被覆盖丢失，导致后续数据同步不一致的问题
- 修复 S3File 单个 Bucket 下文件数量超过 1000 个时，文件列表获取不完整的问题
- 修复 重置 MFA 时输入错误验证码未正确提示的问题
- 修复 Oracle 全量使用 getString 读取非常规编码 NUMBER 小数异常的问题
- 修复 联合主键表执行数据校验、复查或数据订正时，主键查询顺序不一致的问题
- 修复 数据校验表的主键字段为数据库关键字时，校验 SQL 执行失败的问题
- 修复 MySQL、OceanBase for MySQL、PolarDB MySQL 和 PolarDB-X 源端在 PARSED_ENTRY 模式下，心跳消息被过滤导致心跳不生效的问题
- 修复 MySQL、OceanBase for MySQL、PolarDB MySQL 和 PolarDB-X 源端使用 CHECK_POS 心跳时，仅比较 Binlog Offset，导致不同 Binlog 文件的相同 Offset 被误判为无延迟的问题
- 修复 MySQL、OceanBase for MySQL、PolarDB MySQL 和 PolarDB-X 源端在 PROTOBUF、非 GTID 模式下，空 GTID 导致位置心跳构造失败的问题
- 修复 MySQL、OceanBase for MySQL、PolarDB MySQL、PolarDB-X、TDSQL-C MySQL 和 TDSQL MySQL 源端从已保存位点恢复增量同步时，事务起始位点可能定位错误的问题
- 修复 停止 MySQL RDS 源端任务时，正在执行的 Binlog 下载请求及下载线程未及时退出的问题
- 修复 CloudCanal 使用负载均衡代理部署时，MCP 工具调用异常的问题
- 修复 TiDB 源端增量同步时，JSON 类型数据分隔符后缺少空格的问题
- 修复 Kafka 源端在 JDK 17 下并发解析时，TableUnit 缓存线程不安全导致的偶发 ConcurrentModificationException 问题
- 修复 StarRocks 全量读取在 JDK 17 下 Arrow MemoryUtil 初始化失败的问题
- 修复 PolarDB-X、OceanBase for MySQL 任务因配置兼容性问题无法启动的问题
- 修复 结构迁移中 TEXT / BLOB 类型列映射到 MySQL 系目标库时，DEFAULT 值未自动移除导致语法错误的问题
- 修复 Oracle 源端增量同步时，DDL 中包含不支持的语句会导致同步中断的问题，现可正确识别并跳过
- 修复 创建任务时 ElasticSearch 索引元信息白名单失效的问题
- 修复 自动升级或安装机器时，目标机器不存在 clougence 用户导致机器启动失败的问题
- 修复 自动升级机器时，进程 PID 获取不准确导致机器或任务无法正常停止的问题
- 修复 使用 root 账户执行自动升级或部署时，未继承 clougence 用户环境变量导致机器启动失败的问题