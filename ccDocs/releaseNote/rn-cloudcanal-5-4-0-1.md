---
id: rn-cloudcanal-5-4-0-0
title: 5.4.0.0
---
## CloudCanal-5.4.0.0

发版时间:2026年2月4日 版本号: 5.4.0.0


## 亮点

- 全新支持 Vastbase G100
- 支持 托管镜像一键安装产品([Docker](../productOP/docker/install_all_in_one_docker.mdx)/[K8s](../productOP/kubernetes/install_all_in_one_k8s.mdx))并自动激活社区版 15 天，无需注册
- 支持 [更多数据清洗功能](../operation/job_manage/job_op/data_transform.md#当前支持的脚本)(maskAll,regexReplaceAll,typeCast,ifNullReplace,timestampReplace,numberReplace)

## 新链路

- 开放 KingbaseES -> KingbaseES/Oracle/TiDB 结构迁移/全量迁移/数据同步/数据校验/数据订正/DDL（加列/减列/modify/rename/truncate）
- 开放 KingbaseES -> Kafka 全量迁移/数据同步
- 开放 Vastbase G100 -> MySQL/Dameng 结构迁移/全量迁移/数据同步/数据校验/数据订正/DDL（加列/减列/modify/rename）
- 开放 Dameng -> Vastbase G100/Oracle 结构迁移/全量迁移/数据同步/数据校验/数据订正/DDL（加列/减列/modify/rename）
- 开放 Oracle -> Dameng 结构迁移/全量迁移/数据同步/数据校验/数据订正/DDL（加列/减列/modify/rename）
- 开放 StarRocks -> Dameng 结构迁移/全量迁移
- 开放 MongoDB -> OceanBase 结构迁移/全量迁移/数据同步


## 新特性

- 支持 Iceberg HDFS 存储格式，此外目前还支持 S3 格式
- 支持 SQL Server 源端任务位点小于 CDC LSN 位点时，发送异常告警
- 支持 PostgreSQL JSONB 类型数据到 ClickHouse STRING 的同步
- 支持 MySQL 源端执行 DROP TABLE 指定多个表
- 支持 ClickHouse 设置 JDBC compress 数据压缩参数
- 支持 [Hana 源端手动创建 CDC 表和触发器](../dataMigrationAndSync/datasource_func/Hana/privs_for_hana.md)，只授权账号 SELECT 权限，降低同步数据的账号权限门槛
- 支持 Dameng 增量源端的归档开关与归档模式预检
- 支持 Dameng NVARCHAR 类型
- 支持 Dameng 目标端重建目标表、全量前清空目标数据
- 支持 Kafka -> StarRocks 数据清洗，当前仅支持源端为 Debezium Envelope 消息格式
- 支持 KingbaseES 源端视图迁移
- 支持 Docker 部署自定义用户名/邮箱地址（账号）/密码/网段/网关/组件地址，解决网段冲突以及个性化账号需求
- 支持 页面直接下载任务日志文件，方便问题排查
- 支持 任务日志和机器日志定时刷新
- 支持 用户偏好设置参数查询
- 支持 用户查看非 0 的 CLOUD 账单项
- 支持 消息类源端（e.g.,Kafka,RocketMQ,Pulsar ...）到关系型数据库或数仓，不同 topic 消息可写入不同 Schema 中的表
- 支持 重置位点 Open API

## 优化

- 优化 MySQL/SQL Server/Oracle/ClickHouse/PostgreSQL/KingbaseES 源端全量查询逻辑，支持联合主键按批查询（SQLServer 源端新增参数 sendStringParametersAsUnicode、queryRecompileEnabled，ClickHouse 源端新增参数 queryMaxMemoryUsageMb）
- 优化 联合主键表全量同步前获取 minpk/maxpk 逻辑，解决查询主键超时问题
- 优化 解析 MQ 源端消息时比较前后 Key 字段值确定是否发生更新
- 优化 宽表任务支持驱动表更新/删除补充维表数据到宽表
- 优化 对端 Doris/Starrocks/SelectDB DDL 预检
- 优化 ClickHouse 源端 Date/Date32 主键表迁移
- 优化 ClickHouse 目标端时间和日期值收束到 JDBC 合法区间内（新增参数：enableTimeRangeClamping）
- 优化 Oracle/PostgreSQL/MySQL/SQL Server 视图迁移初始化时不再查询表数据量
- 优化 操作审计查询方式，提供更多检索条件
- 优化 操作黑名单勾选交互逻辑
- 优化 任务列表与任务详情的任务操作按钮状态保持一致
- 优化 中英文语言切换重新刷新页面
- 优化 系统主题切换速度
- 优化 创建任务最后一步展示数据清洗相关配置
- 优化 任务日志和机器日志的展示，内容过长自动换行，避免横向滚动条的出现
- 优化 异常日志的展示方式，在任务、机器处可直接点击查看


## 问题修复

- 修复 宽表任务添加自定义代码后全量任务异常的问题
- 修复 开启过滤条件下推后任务中部分表未设置数据过滤条件，该表同步行数出现异常的问题
- 修复 更新数据源 Kerberos 认证文件后 Kerberos krb5.conf 和 ker5.keytab 文件错乱问题
- 修复 PostgreSQL 源端全量迁移 DOUBLE PRECISION/REAL 类型时，将 NULL 值错误识别为 0 的问题
- 修复 修改映射规则取消后新表会应用上未保存的映射规则的问题
- 修复 任务修改订阅/创建相似任务时，未复用原任务映射规则的问题
- 修复 Hana 源端单增量表模式下任务位点信息样式异常的问题
- 修复 许可证激活失败时，弹窗跳转官网的链接错误的问题
- 修复 无法配置阿里云访问权限的问题
- 修复 条件下推全量任务创建相似任务，任务类型切换至增量后条件下推参数没有清除的问题
- 修复 清除任务元数据历史/结构快照时弹窗闪动的问题
- 修复 TiDB 源端资源泄漏的问题
- 修复 TiDB 源端表结构信息时区类型序列化的问题
- 修复 TiDB 源端 KeepAlive 设置过长的问题
- 修复 SQL Server 全量 VARCHAR 类型主键查询索引失效的问题
- 修复 PostgreSQL -> MySQL rename column DDL 同步异常的问题
- 修复 Dameng 主键冲突未生效的问题（DuplicateKeyCode = 6625）
- 修复 Dameng 源端增量，不同 Schema 存在同名表时，未订阅表也会被采集增量的问题
- 修复 Dameng -> Dameng 结构迁移，VARCHAR / CHAR 类型的字符长度未正确迁移到目标端的问题
- 修复 Oracle 源端增量同步期间接收到同一个事务的两个 commit 事件导致消费异常的问题
- 修复 PostgreSQL -> PostgreSQL 结构迁移 BPCHAR/CHARACTER 类型到对端变成 10485760 长度
- 修复 目标端为消息类时创建任务对端表选择了已存在表下一步表结构未展示的问题
- 修复 Oracle 增量同步页面显示的日志文件不会随着 SCN 位点更新的问题
- 修复 升级 Sidecar 时关闭弹窗测试连接状态未清空的问题
- 修复 Kafka/MQ -> PostgreSQL、Oracle 等有 Schema 的数据源的链路，创建相似任务表没有回显的问题
- 修复 Doris/SelectDB 源端元数据索引重复插入的问题
- 修复 因支持元数据库多样化而引入的 performance_schema.user_variables_by_thread 权限要求，目前已不需要
- 修复 查看表结构历史页面翻页无效的问题
- 修复 条件下推任务修改订阅无法批量修改过滤条件的问题
- 修复 OceanBase for MySQL 结构迁移阶段解析表达式约束报错
- 修复 OceanBase for MySQL 增量同步阶段无法解析表达式约束表结构