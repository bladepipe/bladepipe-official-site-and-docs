---
id: rn-cloudcanal-3-3-4-0
title: 3.3.4.0
---

## CloudCanal-3.3.4.0

发版时间:2024年1月29日 版本号: 3.3.4.0

### 新链路

- 开放 OceanBase（支持3.2.x/4.2.x） -> SQL Server 结构迁移、全量同步、增量同步、数据校验、DDL同步（add/drop column、truncate、modify、change）
- 开放 Hana -> OceanBase / TiDB / AdbForMySQL 结构迁移、全量迁移、增量同步、数据校验、数据订正

### 新特性

- 增强虚拟列能力，[提升多来源数据汇聚能力](https://www.clougence.com/cc-doc/bestPractice/data_gather_use_virtual_cols) ， 可设置规定值、当前时间、源端实例 ID & DB & Schema & Table & 主键值多种形式拼接，可批量设置
- 增强虚拟列能力，[提升多来源数据汇聚能力](https://www.clougence.com/cc-doc/bestPractice/data_gather_use_virtual_cols) ， 可设置虚拟列为主键，原有主键降级为普通索引
- 支持 按 Schema_Table 和 Db_Schema_Table 表名拼接规则，[提升多来源数据汇聚能力](https://www.clougence.com/cc-doc/bestPractice/data_gather_use_virtual_cols) ， 目前支持链路（源端）：Oracle、MySQL、MariaDB、Postgre SQL、PolarDBMySQL、AuroraMySQL
- 支持 Kafka -> OceanBase 数据同步
- 支持 Hana -> Hana 结构迁移
- 支持 Hana 源端清理增量表数据后回收空间（任务参数：mergeDeltaAfterClean）
- 支持 Hana 源端可选择是否忽略触发器的报错（任务参数：triggerExceptionlgnore）
- 支持 Hana 源端任务启动时检查任务触发器状态并重新安装（任务参数：autoCheckTriggerAndReInstall）
- 支持 Hana 源端自动清理增量表的数据（任务参数：triggerDataCleanEnabled）
- 支持 Oracle -> Doris / SelectDB DDL同步（加/减列）
- 支持 TiDB 6.1.0 以上高版本时间类型主键和联合主键表同步
- 支持 按周执行周期性全量同步、数据校验
- 支持 新的调度任务调度策略，包括 ROUND_ROBIN (顺序分配) 和 LOAD_MEM_BALANCE (按负载分配)，可通过 business_output.properties 进行修改

### 优化

- 优化 MySQL -> MySQL、PolarDBMySQL -> PolarDBMySQL 链路 DDL 同步防重
- 优化 MySQL 源端 JSON 类型数据同步，自动检测类型并开启转译无需修改任务参数
- 优化 MySQL 源端 JSON 类型映射，在 OceanBase 4.0 以上版本中会映射为 JSON
- 优化 MySQL 源端过滤未订阅表的相关 DDL，避免元信息表过大
- 优化 重启任务历史记录展示粒度，从单阶段粒度提升至单任务粒度
- 优化 阿里 DMS 无锁变更临时表正则匹配过滤条件导致的同步性能下降问题，500 张表性能提升约 10 倍
- 优化 获取 StarRocks 版本语句，降低账号权限要求
- 优化 控制台异步任务配置，将异步执行任务类型变为所有，提升异步任务可靠性
- 优化 任务创建预检提示文案，方便理解
- 优化 设置目标主键，支持 Oracle 源端设置目标主键
- 优化 OceanBase / TiDB 多主键全量扫描方式，使用第一个主键进行排序
- 优化 Hana 触发器模板提升触发器编译速度
- 优化 Kafka 写入报错时，任务日志打印数据主键信息

### 问题修复

- 修复 MariaDB Set character_set_collations 事件导致的 binlog 解析报错的问题
- 修复 Hana 源端心跳时间导致的任务延迟跳动问题（任务参数：dbHeartbeatEnable）
- 修复 Hana -> TiDB / OceanBase 结构迁移 BLOB / TEXT 报错的问题
- 修复 MySQL -> Kafka 修改订阅失败的问题
- 修复 MySQL -> TiDB 数据校验中 binary 类型为空值、空字符串导致的越界异常问题
- 修复 MySQL -> MySQL 有自增属性的联合主键表同步后自增属性丢失的问题
- 修复 前端按照检索项选择表不生效的问题
- 修复 PolarDbForMySQL 源端心跳语句前带有注释导致过滤失败的问题
- 修复 阿里云成都、张家口、呼和浩特、乌兰察布区域 PolarDB 和 RDS for MySQL 无法添加的问题（开放 API 特殊 Endpoint）
- 修复 Oracle 全量阶段快照读模式下异常退出的问题（任务参数：snapshotRead）
- 修复 Kafka 全量同步报错时异常无法跳过的问题（任务参数：exceptionSkipMode）
- 修复 MySQL / PolarDbMySQL / PolarDB-X / OceanBase 解析 Binlog 日志中 0 时间异常的问题（支持在源端参数配置中设置 defaultZeroDate）
- 修复 任务在全量阶段重启后分区表进度100%的问题