---
id: rn-cloudcanal-3-3-3-0
title: 3.3.3.0
---

## CloudCanal-3.3.3.0

发版时间:2023年12月28日 版本号: 3.3.3.0


### 新特性

- 支持 Hana 1.x 版本，目前支持 Hana 版本为 1.x、2.x
- 支持 Hana 增量任务自定义增量表
- 支持 Hana 修改订阅取消表后自动删除触发器
- 支持 MySQL &lt;-&gt; Tunnel &lt;-&gt; MySQL 双向同步，包括增、删、改操作(不包括DDL), 此能力为 MySQL 双向同步增强版本，两端数据库均可不开公网地址
- 支持 [阿里云全托管 SelectDB](https://www.aliyun.com/product/selectdb)
- 支持 StarRocks、Doris、SelectDB、Oracle、MariaDB 对端全量前清除数据能力，方便用户重新迁移同步数据
- 支持 MySQL、OceanBase、TiDB、StarRocks、Doris、SelectDB、Oracle、MariaDB 对端创建任务或修改订阅重建对端表
- 支持 MySQL -> TiDB/OceanBase 链路同步 Online DDL 工具语句
- 支持 任务详情 > 更多功能 > 修改任务配置，包括全量前清除对端数据开关、创建任务时重建对端表开关、修改定时全量/增量 Java Cron 表达式
- 支持 MySQL -> MySQL 创建任务第二步可勾选 DROP 操作
- 支持 任务告警按时间段关闭
- 支持 创建任务筛选表可以批量筛选，即选表页面可粘贴 table1;table2;table3;...tableN 进行搜索并自动勾选，解决用户创建任务选表复杂问题
- 支持 任务批量调度到另外一台机器，提高手动任务调度效率
- 支持 CloudCanal 显示 LicenseID，方便后续用户对照 license 到期提醒信息

### 优化

- 优化 [Redis &lt;-&gt; Redis](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/redis2) 双向同步防循环策略，且支持更多指令双向同步防循环
- 优化 [Redis -&gt; Redis](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/redis2) 数据初始化能力，包括 Set、ZSet、List 类型数据初始化
- 优化 [Redis -&gt; Redis](https://www.clougence.com/cc-doc/dataMigrationAndSync/connection/redis2) 指令集 Rename、Incr、Incrby、Hsetnx、Hmset、Lpush、Rpush、Lset、Sadd、Zadd、Zrem、Zremrangebyscore
- 优化 Kafka Debezium Json 支持 Bytes 类型（具体参考：[源端 Kafka Debezium Json 使用说明](https://www.clougence.com/cc-doc/reference/debezium_json_notice) ）
- 优化 TiDB 作为源端 Stub 超时处理逻辑，将超时被动上报调整为主动上报，实现任务不重启，重新订阅 Region
- 优化 TiDB 作为源端获取表信息方案，大幅度优化获取多表信息的速度
- 优化 TiDB 作为源端维护多版本表结构的策略，实现主动清理过期的表结构
- 优化 TiDB 作为源端 DML 事件 sink 条件，使得 DDL 与 DML 消费更有序，降低数据不一致的风险
- 优化 TiDB 作为源端 Error 事件的处理方案，降低 Region 增量扫消费时间
- 优化 TiDB 作为源端性能指标图，新增 5 个指标（ CDC 提交事件总数、10秒内 Region 异常总数、10秒内 Region 活跃总数、任务增量扫阶段 Region 总数、Region 总数）
- 优化 MariaDB -> Oracle、Oracle -> Oracle 使用新版本结构迁移
- 优化 PostgreSQL/MySQL -> StarRocks Json 类型字段同步（优化映射规则）
- 优化 修改订阅时规则映射只应用到新增表
- 优化 修改订阅页面防止重复点击
- 优化 CloudCanal 未激活时无法显示控制台监控信息，方便用户在未激活状态下查看当前 Console 状态

### 问题修复

- 修复 Hana 源端表字段过多，导致创建触发器报错问题
- 修复 Hana 无主键表创建任务报错的问题
- 修复 Hana 小写 Schema/Table/Column 创建任务报错的问题
- 修复 Hana 增量同步无主键表重复插入数据的问题
- 修复 Hana 源端删除任务时导致多次订阅表的触发器被误删除的问题
- 修复 Hana 源端增量阶段数据中存在特殊字符而导致的解析报错问题
- 修复 数据校验任务页面显示丢失、不一致和实际不相符的问题
- 修复 SQL Server 增量同步 LSN 位点排序时被修改而导致的同步中断问题
- 修复 TiDB 作为源端大表多 Region 订阅导致的超时问题，支持设置超时时间
- 修复 TiDB 作为源端任务位点小于 GC 安全点导致的数据不一致问题
- 修复 TiDB 作为源端 Create Database ... 等非同步业务 DDL 导致的解析异常问题
- 修复 TiDB 源端 v6.5.0 以上版本因时间精度导致的增量 GC 安全点检测报错的问题
- 修复 MySQL -&gt; Doris 结构迁移注释未同步到对端的问题
- 修复 MySQL -&gt; StarRocks DDL 新增列默认值丢失的问题
- 修复 MySQL -&gt; StarRocks DDL 修改列属性中带有 Not Null 导致同步失败的问题
- 修复 MySQL -&gt; StarRocks DDL 新增 Text 类型字段同步失败的问题
- 修复 MySQL -&gt; Oracle 表映射无效的问题
- 修复 PostgreSQL -&gt; MySQL 修改订阅对同一张表进行多次加/减操作，导致任务报错的问题
- 修复 任务重跑之后增量位点没有重置的问题
- 修复 Oracle 对端只有外网 Host 情况下，无法删除任务的问题
- 修复 Oracle -&gt; Oracle Schema 不存在映射的情况下修改订阅或创建相似任务默认设置目标端 Schema 为 Public 的问题
- 修复 Kafka/MQ -&gt; MySQL 创建任务页面中消息结构展示与实际选择不一致的问题
- 修复 PostgreSQL -&gt; StarRocks 修改订阅原映射关系失效的问题
- 修复 结构迁移任务创建相似任务报错的问题
- 修复 重置文件位点时，时间位点改变不正确的问题