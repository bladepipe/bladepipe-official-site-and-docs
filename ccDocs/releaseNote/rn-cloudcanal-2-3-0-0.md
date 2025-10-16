---
id: rn-cloudcanal-2-3-0-0
title: 2.3.0.0
---

## CloudCanal-2.3.0.0

发版时间:2022年12月1日 版本号: 2.3.0.0

### 新链路

- 开放 PolarDBMySQL -> ClickHouse 链路
- 开放 PolarDBMySQL -> TiDB 链路
- 开放 MySQL-> SQL SERVER 链路，全量、增量（支持新增、删除、修改列）、数据校验
- 开放 SQL SERVER -> MySQL 链路，全量、增量、数据校验
- 开放 SQL SERVER -> SQL SERVER 链路，全量、增量、数据校验
- 开放 SQL SERVER -> StarRocks 链路，全量、增量、数据校验
- 开放 SQL SERVER -> Doris 链路，全量、增量、数据校验
- 开放 SQL SERVER -> ORACLE 链路，全量、增量、数据校验
- 开放 SQL SERVER -> PostgreSQL 链路，全量、增量、数据校验
- 开放 SQL SERVER -> ORACLE 链路，全量、增量、数据校验
- 开放 Kafka -> Kafka 链路
- 开放 MySQL -> Tunnel 链路
- 开放 SQL SERVER -> Tunnel 链路
- 开放 ORACLE -> Tunnel 链路
- 开放 Tunnel-> MySQL 链路
- 开放 Oracle、MySQL、OceanBase、PolarDB for MySQL、PostgreSQL 源端数据订正能力

### 新特性

- 支持 新的开放 Api, 包括自建节点安装、根据集群查询机器列表、添加数据源、摘除任务、挂载任务、根据源端同步对象查询查询对端同步对象（元数据血缘）
- 支持 Kafka增量报错跳过能力
- 支持 传递自定义参数到自定义代码中，方便不同环境使用相同的自定义代码
- 支持 基于校验结果的订正能力，详情见 [五分钟掌握 CloudCanal 的数据校验与数据订正](/blog/data_sync_sample/data_check_and_revise)
- 支持 ORACLE -> MySQL Truncate table 语句同步
- 支持 ORACLE -> PostgreSQL 表字段 增 / 删 / 改 语句同步
- 支持 ORACLE -> StarRocks 表字段 增 / 删 / 改 / Truncate Table 的语句同步
- 支持 StarRocks 2.4 版本
- 支持 Postgres 15 版本
- 支持 ORACLE 10g 版本（当前支持 10g，11g，12c，18c，19c 版本）
- 支持 ElasticSearch、Hive、MongoDB、PolarDbX、PostgreSQL 作为对端时全量阶段设置异常跳过参数
- 支持 ElasticSearch、Hive、MongoDB、PolarDbX、PostgreSQL 作为对端时全量阶段设置异常跳过参数
- 支持 PostgreSQL 的 Batch / Copy 写入方式增量阶段设置跳过异常数据
- 支持 AdbForMySQL增量阶段设置跳过异常数据
- 支持 自定义报警接口
- 支持 kafka DDL 消息记录表的 SCHEMA 变化，详情见 [Kafka 消息同步格式](../reference/kafka_msg_format_type.md)
- 支持 PolarDBMySQL 对端 DDL 防重
- 支持 用户配置中心可选默认消息格式偏好
- 支持 添加重建索引的功能
- 支持 TiDB、ElasticSearch、Hive、MongoDB、PostgreSQL 全量阶段跳过异常的能力
- 支持 PostgreSQL、AdbForMySQL 增量阶段跳过异常的能力
- 支持 任务列表搜索子任务

### 优化

- 优化 审计日志，将系统内调用、常量调用剔除出审计日志；对于修改订阅，修改 kv 配置，会记录审计信息，同时打印日志到 /logs/cloudcanal/console/user_audit_detail_xxx
- 优化 ORACLE Logminer 补全日志逻辑，库级别满足要求后，不再初始化表级别补全日志
- 优化 PostgreSQL 对端 Copy 模式写入时，支持十六进制表示分隔符
- 优化 PostgreSQL Copy 写入模式优化临时表创建，避免频繁临时表创建导致 pg_attribute 增长过快
- 优化 输入非法授权码时的检查
- 优化 源和目标表映射，加上源和对端数据源实例 ID
- 优化 热点合并，针对数据导入加速
- 优化 调度分配机器失败时的错误日志显示，更准确
- 优化 对端基于 Copy 模式写入 PostgreSQL 支持十六进制表示分隔符
- 优化 对端基于 Copy 模式写入优化临时表空间的使用，避免 PostgreSQL 临时表空间增长过快
- 优化 创建订正任务时候支持巡检，避免没有差异或不一致的校验任务创建订正任务
- 优化 手机验证码登录不再受到密码次数过多导致锁账号的限制

### 问题修复

- 修复 PolarDBMySQL 源端回拉任务位点跨 binlog 文件可能回溯不到位问题
- 修复 ORACLE 源端 Logminer 增量解析中文的问题
- 修复 ORACLE 源端小写表名 Logminer 解析忽略的问题
- 修复 Kafka -> Kafka 增量同步位点无法上报的问题
- 修复 任务详情切换结构迁移 Tab，每次点击查看详情，表格数据都会在原有基础上增加的问题
- 修复 编辑任务添加代创建的库无法编辑成功的问题
- 修复 数据源列表修改数据源参数样式问题
- 修复 console.log 同级路径下其他日志文件的查看的问题
- 修复 无法根据子任务搜索 data job 的问题
- 修复 CloudCanal - 任务管理 - 创建任务的第五步 - 创建确认中数据校验不应该显示 “undefined” 字样 （选择周期性校验时会显示)
- 修复 CloudCanal - 任务管理 - 使用子任务的 ID 进行搜索，无法查询正确的结果的问题
- 修复 CloudCanal - 数据源管理 - 数据源操作 - 查看配置，页面数据显示不合理的问题（Oracle）
- 修复 MySQL 非法日期写入解析错误的问题, 加入 MySQL 对端 sql_mode 会话能力
- 修复 只读账号有效性，以及登录账号名携带空格的问题
- 修复 按源端表名查对端表, 修复编辑任务的问题
- 修复 PolarDB for MySQL 由于获取元数据导致不准确导致的校验异常
- 修复 Console 日志中内容不完整的问题
- 修复 无法获取到本地有效 IP 时的 Console 报错
- 修复 Sidecar 由于 Console 侧 connection 信息异常导致的无法正常重连
