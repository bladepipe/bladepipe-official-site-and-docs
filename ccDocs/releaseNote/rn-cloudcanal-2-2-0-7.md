---
id: rn-cloudcanal-2-2-0-7
title: 2.2.0.7
---

## CloudCanal-2.2.0.7

发版时间:2022年3月4日
版本号: 2.2.0.7

### 新链路

- 支持 MySQL->OceanBase
- 支持 PostgreSQL->OceanBase
- 支持 Oracle->OceanBase

### 新功能

- 主代码CloudCanal-SDK升级到1.0.4，支持OceanBase和StarRocks对端使用自定义代码
- StarRocks的StreamLoad导入支持json模式导入，避免分隔符和内容冲突导致的写入异常
- StarRocks链路支持ZeroDate处理，支持对MySQL源端过来的0000-00-00时间做特殊处理
- StarRocks链路支持全量、增量阶段异常跳过能力
- ES链路支持debug日志

### 优化

- StarRocks支持最新的2.1版本
- 增量任务会预占用内存，支持用户自定义设置资源超卖
- 支持MySQL对端大小写敏感处理
- 优化删除任务的逻辑，等待任务停止后才进行删除

### 问题修复

- 修复MySQL源端结构迁移now()函数识别问题导致的结构迁移失败
- 修复MySQL 5.7 源端结构迁移，有多个TIMESTAMP列导致迁移失败的问题
- 修复Sidecar FD泄露问题
- 修复PostgreSQL->Greenplum结构迁移中约束降级的问题
- 修复数据校验时位点记录错误导致无法正确校验出差异的问题
- 修复物化视图模式时Oracle同步到StarRocks中update增量不同步的问题
- 修复异常跳过日志没有正确记录的问题
- 修复归档日志名称显示不正确的问题
