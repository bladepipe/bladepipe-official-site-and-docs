---
id: rn-cloudcanal-2-2-2-0
title: 2.2.2.0
---

## CloudCanal-2.2.2.0

发版时间:2022年5月6日  版本号: 2.2.2.0

### 新链路

- 支持 MongoDB (副本集) 到 MySQL 全量/增量
- 支持 MongoDB (副本集) 到 MongoDB (副本集) 全量/增量/校验

### 新功能

- 支持 MySQL 到 AdbForMySQL  全量数据校验
- 支持 MySQL 到 AdbForMySQL 有限的 DDL 同步（alter table add/drop/modify column）
- 支持 MySQL 到 StarRocks 有限的 DDL 同步（alter table add/drop column）
- 支持 MongoDB 源端自定义代码处理
- 支持 MySQL BLOB 同步 Oracle  BLOB （全量/增量）
- 支持 Oracle 对端 全量/增量 模式下 IGNORE , REPLACE , EXCEPTION 三种写入策略
- 支持新参数，可配置同步任务在一个时间窗口内失败次数超过设定值将会停止任务的执行，直到手动再次启动(`taskRetryWindowMin`,重试的窗口时间,单位分钟,`taskRetryCount` 窗口时间内任务允许最大自动重启次数)

### 优化

- 重构关系型数据库以及部分实时数仓写入逻辑，采用 激进写入+保守兜底 架构
- 重构 StarRocks 对端刷出变更策略，优化数据结构，保护内存
- 重构 Oracle 对端写入逻辑，提升写入性能
- 修改 MySQL 到 MongoDB 主键采用 ObjectId
- 支持 MongoDB 源端 ObjectId 主键
- 优化 StarRocks 对端全量数据校验性能
- 优化后端控制台数据任务列表展现，提升响应性能,改成分页，取消列表状态排序
- 优化创建任务时最后一步确认页面
- 优化参数设置页面，解决卡顿问题
- 创建任务，修改源端类型后，对面默认选择第一个

### 问题修复

- 修复 Aliyun RocketMQ tcp 协议写入 bug
- 修复创建任务，源对端测试连接之后，修改源端类型后，对端实例不清空的问题
- 修复 MySQL to Oracle 结构迁移上的一些问题
- 修复 ClickHouse 对有 comment 的表结构迁移问题
- 修复 Oracle 源端 Redo 日志解析过程对于 ROLLBACK 事件在不完整的事务中导致同步中断的问题。
- 修复创建任务选择表阶段，删选出现表格遮挡的问题