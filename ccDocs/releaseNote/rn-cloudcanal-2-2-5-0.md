---
id: rn-cloudcanal-2-2-5-0
title: 2.2.5.0
---

## CloudCanal-2.2.5.0

发版时间:2022年7月27日 版本号: 2.2.5.0

### 新特性

- 支持 Oracle 源端 Logminer 文件添加(ADD_FILE)和持续解析(CONTINUOUS_MINE)模式,其中后者受 ORACLE 版本限制
- 支持 Oracle -> MySQL 基本 DDL 同步（加列、减列、改列）
- 支持 Oracle 源端表元数据多版本管理，以应对位点回拉消费到老版本元数据的事件
- 支持 Oracle 源端使用新 SQL 解析器解析 Redo SQL, 解决字符串解析存在的特殊字符干扰解析问题
- 支持 Oracle 源端修改订阅(增减表订阅)
- 支持 Oracle 源端数据过滤条件(SQL92标准)
- 支持 Oracle -> MySQL 全量数据校验
- 支持 Oracle 使用 ServiceName 方式链接
- 支持 Oracle 使用时间戳、SCN位点回溯
- 支持 Oracle 源端增量任务监控新指标，包括获取增量数据速度、未提交事务数量指标
- 支持 Oracle 源端心跳能力，避免没有任何写入导致延迟
- 支持 Oracle 源端关闭自动构建字典、切换 redo 日志能力
- 支持 Kafka 对端 envelope 格式
- 支持 全链路自定义代码能力，CloudCanal SDK 版本依赖升级到 1.0.7
- 支持 新列是否自动同步参数(任务核心配置 autoSyncNewCreatedColumn, 默认值为true)
- 支持 PostgreSQL 源端地理信息 Geometry 类型的同步
- 支持 MySQL、PostgreSQL源端跨时区同步
- 支持 MySQL 结构迁移源表含有全文索引的情况。
- 支持 写入 PostgreSQL、Greenplum 高性能写入模式(Copy)
- 支持 任务参数列表自动订正新增参数，不需要操作元数据库
- 支持 sidecar组件系统层面容灾（商业版需部署时启动巡检脚本）
- 支持 sidecar组件的异常抑制，减少无效网络通信
- 支持 查看结构迁移过程中的日志，以及执行的具体 SQL
- 支持 Doris 1.1新版本
- 支持 更多ElasticSearch版本，最新支持到7.17版本

### 优化

- 优化 Oracle LogMiner 获取分析日志的范围（缩小），从而减少数据库侧因 LogMiner 分析造成的 redo 日志大量增长的问题
- 优化 Oracle LogMiner 对于大事务的处理，事务大小超过一定数量，自动进行刷盘，避免超大事务造成 CloudCanal OOM
- 优化 Oracle LogMiner ADD_FILE 逻辑，进一步增强实时性
- 优化 Oracle LogMiner 增量消息格式，合并事务，提高增量吞吐（标准 1KB / record, 5000 rps）
- 优化 Oracle 元信息获取，降低对于 DBA 相关权限的需要求，降低为：grant connect,select_catalog_role to xxxxx;
- 优化 Oracle 对端全量写入，降低代码逻辑复杂度
- 优化 MySQL(阿里云 RDS MySQL) 对端结构迁移字符串索引兼容性，超长字符串索引自动降级为前缀索引(5.6 & 5.7长度为191，8.0为768）
- 优化 MySQL 到 MySQL(阿里云 RDS MySQL) 、TiDB 、ClickHouse、PostgreSQL 结构迁移兼容性
- 优化 PostgreSQL 到 PostgreSQL 、MySQL(阿里云 RDS MySQL) 、ClickHouse 结构迁移兼容性
- 优化 社区版安装脚本，增加环境预检，提升安装成功率
- 优化 组件间通信日志名称，更加易懂辨识
- 优化 报警信息回传管控进行异步化处理，避免大量报警异常导致通信阻塞
- 优化 组件通信模块 client 连接 server 动作，主动更新连接状态，避免产生错误的连接状态
- 优化 组件间通信 keep alive 时间（更长），避免正常的慢通信触发 connection error
- 优化 PostgreSQL 同步，源端安装 PostGIS 插件的 PostgreSQL 在同步时隐藏 spatial_ref_sys 表，此表为 PostGIS 系统表
- 优化 RocketMQ 驱动依赖的 fastjson 版本过低导致客户系统安全扫描不过问题，目前依赖 fastjson 1.2.83
- 优化 MySQL / PolarDbMy 作为源端 过滤掉虚拟列
- 优化 PolarDbMy 作为源/对端，结构迁移实现方案优化

### 问题修复

- 修复 结构迁移经常遇到 ddl table fetch Thread exited or fetchWork is running 错误的问题
- 修复 MySQL 一些类型默认值上的一些处理，time、number、默认值带有函数的情况
- 修复 MySQL 时间戳类型迁移过程中的兼容问题
- 修复 MySQL、PolarDBMy 源端表中若存在 计算列结构迁移兼容的问题。
- 修复 MySQL -> Oracle 链路中，TIME 类型兼容问题，目前映射成 Oracle VARCHAR2 类型
- 修复 Oracle 源端全量迁移百分比不对的问题
- 修复 Oracle Redo 可能重复消费的问题
- 修复 MySQL parser 解析遇到异常时导致死循环和 CPU 飙高的问题
- 修复 RDS 由于表明大小写混合DDL不同步的问题
- 修复 update 事件没有任何列更新时多语句批量写入报语法错误
- 修复 不符合预期的 client 连接拒绝所存在问题
- 修复 异常抑制的bug，会导致第一次的异常直接被抑制
- 修复 列批量设置勾选错乱的bug
- 修复 PG 源端情况下预检，增加 max_replication_slots 参数检测，避免结构迁移 “Free one or increase max_replication_slots” 错误
- 修复 表选择页刷新和下一步 loading 状态错误的问题
- 修复 数据库系统时区为 SYSTEM 时解析 MySQL binlog 报错问题
- 修复 MySQL 源端 RDS OSS binlog 下载时 Content-Length 为空导致的 NPE 问题
- 修复 MySQL 源端通过 binlog file 和 offset 位点回溯时由于未设置时间导致 binlog 下载异常的问题
- 修复 Aliyun RocketMQ 源端 GROUP_ID 校验出错的问题
