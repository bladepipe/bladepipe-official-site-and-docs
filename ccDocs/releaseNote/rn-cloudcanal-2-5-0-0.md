---
id: rn-cloudcanal-2-5-0-0
title: 2.5.0.0
---

## CloudCanal-2.5.0.0

发版时间:2023年4月6日 版本号: 2.5.0.0

### 新链路

- 开放 TIDB -> MySQL 结构迁移、全量、数据同步、DDL同步（新增列/删除列/Rename列）、数据校验、数据订正 
- 开放 TIDB -> TIDB 结构迁移、全量、数据同步、DDL同步（新增列/删除列/Rename列）、数据校验、数据订正
- 开放 KAFKA -> KAFKA 消息同步

### 新特性

- 支持 写入ADB MySQL 支持 dstWholeReplace 配置
- 支持 CloudCanal 升级自动执行 DDL 变更 SQL
- 支持 KAFKA -> KAFKA 使用 ORIGIN_MSG_FOR_MQ
- 支持 OceanBase/MySQL/Oracle 整形/浮点数(Decimal)/字符串/日期 单/多主键组合表，支持断点续传
- 支持 OceanBase/MySQL 额外支持按 Partition 扫描
- 支持 Db2 到对端数据库大小写映射转换
- 支持 Db2 数据校验、数据订正
- 支持 Db2 CDC 自动预检
- 支持 Db2 删除增量任务时自动清理CDC元信息表
- 支持 TIDB 添加心跳功能
- 支持 Oracle RAC 模式

### 优化

- 优化 OceanBase 源端的全量扫描方式
- 优化 OceanBase 目标端默认使用 Replace 模式
- 优化 升级 Sidecar KAFKA 版本
- 优化 TIDB 全量同步
- 优化 OceanBase/MySQL 多次删除功能

### 问题修复

- 修复 CloudCanal 任务数初始化问题
- 修复 CloudCanal 手机号验证码校验失败问题
- 修复 CloudCanal 激活失败时信息国际化问题
- 修复 CloudCanal 上添加阿里云ECS安装失败的问题
- 修复 OceanBase -> OceanBase 时间类型主键 的序列化问题
- 修复 OceanBase -> OceanBase 数据同步后数据校验失败的问题
- 修复 用外网数据源创建的任务无法查看库表映射的问题
- 修复 向 Doris、StarRocks 同步表结构时PK列顺序与建表顺序不一致，导致结构迁移失败的问题
- 修复 StarRocks、Doris 进行数据校验，任务不能停止的问题
- 修复 OceanBase 目标端的数据订正问题
- 修复 CloudCanal 中使用任务数字ID 输入查询条件过长报错的问题
- 修复 源端 MySQL 同步到 KAFKA 添加Where 条件过滤后，KAFKA 中会收到为空的信息
- 修复 MySQL-> StarRocks/Doris 无符号类型字段到对端对应字段数据类型可支持范围缩小，导致数据同步失败问题
- 修复 CloudCanal 数据订正字段名无法映射导致订正无效的问题
- 修复 Oracle -> MySQL 直接创建数据订正任务报错的问题
- 修复 DDL表、字段无法映射问题
- 修复 MySQL 为源端，表字段为特殊关键字时，Druid解析报错问题
- 修复 MySQL -> ADB MySQL 添加Where条件过滤后，增量同步数据不一致的问题
- 修复 Oracle 用户与Schema 不一致，任务全量与同步失败的问题
- 修复 Windows 系统 Docker 安装 CloudCanal 问题