---
id: rn-cloudcanal-2-2-6-0
title: 2.2.6.0
---

## CloudCanal-2.2.6.0

发版时间:2022年10月11日 版本号: 2.2.6.0

### 新链路

- 开放 Oracle 源端到社区版
- 支持 SQL SERVER -> MySQL 全量数据校验、数据校验、任务重跑
- 支持 Oracle -> PostgreSQL 全量数据校验
- 支持 Oracle -> Oracle / MySQL 双向数据同步
- 支持 Oracle -> ClickHouse 数据迁移同步
- 支持 MongoDB-> PolarDBMySQL 数据迁移同步
- 支持 PostgreSQL-> Doris 数据迁移同步
- 支持 Kafka -> Oracle 数据同步
- 支持 StarRocks -> MySQL 全量(单次或定时)，实现分析结果回流，供业务高并发查询

### 新特性

- 支持 PostgreSQL  地理信息列上带有 SRID 信息的表结构迁移、数据迁移；数据同步阶段支持指定或忽略 SIRD 信息。
- 支持 MySQL 源端二进制类型  BIT、BINARY  的迁移和同步，对端为 MySQL 或 SQL SERVER
- 支持 MySQL、PolarDBMySQL 对端新的增量数据并行策略(TABLE_IMPORT_OPTIMIZE),以优化纯粹数据导入性能
- 支持 Oracle PDB 源端的数据同步
- 支持 MongoDB 对端写入时的异常处理策略
- 支持 MongoDB -> MongoDB 嵌套文档写入
- 支持 MongoDB  sharding (作为目标端即当作一个数据库，作为源端单独添加 shard 节点连接和用户名密码)
- 支持关系型数据库源端全量 snapshot read (参数 snapshotRead)
- 支持 StarRocks 2.2.5 版本
- 支持结构迁移用户自定义设置超时时间

### 优化

- 支持 SQL SERVER -> MySQL 数据同步链路功能稳定性
- 优化 MySQL 源端 Number 默认值识别
- 优化 MySQL / PostgreSQL 源端到 SQL SERVER 的结构迁移
- 优化 MySQL 源端无符号类型数据读取，在一些极端情况下可能导致无法正确读取数据。
- 优化 MySQL / PostgreSQL / SQL SERVER / ORACLE 二进制类型结构迁移，支持默认值的迁移。
- 优化 Oracle 对端写入获取连接的效率
- 优化 Oracle 源端 Number 值区分为整形和浮点型
- 优化 数据校验的比对逻辑，可以支持更多数据类型。
- 优化 数据源配置结构，支持kv类型配置(目前Oracle)

### 问题修复

- 修复 PostgreSQL 使用 copy 模式写入 Pg/Greenplum 时，针对特定数据负载报错 Not support pk table 的问题
- 修复 MySQL  对端 maxAllowedPacket 不生效的问题
- 修复 MySQL 对端 needJsonEscape 转译 JSON 数据时 \n 变成 n 的问题。
- 修复 MySQL 到 Oracle 结构迁移 重复列做索引失败的问题
- 修复 MySQL -> MySQL时在源端没有开启 Strict Mode 时 enum 类型转译可能出现 NPE 的问题
- 修复 SQL SERVER 源端存在大量库表信息 Console 无法展现的问题。
- 修复 SQL SERVER 对于一些版本兼容的问题。
- 修复 Oracle -> PostgreSQL DATE 类型映射问题
- 修复 Oracle -> OceanBase 社区版（MySQL）表映射问题
- 修复 Oracle 对于 19c 版本中元信息 SENSITIVE_COLUMN 列获取版本判断失败的问题
- 修复 Oracle 物化视图增量同步 NPE 的问题
- 修复 MongoDB 5.0 测试连接 applicationName  过长问题
- 修复 MongoDB -> MongoDB 数据校验个别类型值比较错误的问题
- 修复 MongoDB Date 类型写入问题
- 修复 MongoDB 为源端的带自定义代码任务列信息为空的问题
- 修复 Doris、StarRocks 结构迁移中断的问题
- 修复 ClickHouse 对端写入带微秒精度时间戳时，时间戳字符串解析不准的问题
- 修复编辑带自定义代码任务时，子任务无自定义代码设置的问题，目前方式为拷贝一份自定义代码给编辑子任务
- 修复任务参数 upsert 时未填入默认值的问题
- 修复数据校验中断后，继续运行所存在的位点转换问题
- 修复 某些链路 结构迁移环节出现 NPE 的问题
- 修复 结构迁移 在遇到源对端 大小写敏感 问题时索引名称生成错误的问题
