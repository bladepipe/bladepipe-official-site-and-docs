---
id: rn-cloudcanal-2-3-3-0
title: 2.3.3.0
---

## CloudCanal-2.3.3.0

发版时间:2023年2月22日 版本号: 2.3.3.0

### 新链路

- 开放 OceanBase -> Kafka

### 新特性

- 支持 OceanBase 企业版
- 支持 用户操作审计日志打印
- 支持 任务级别 ExceptionSkipKeywords 配置参数，可以根据报错信息中的特定关键字选择性忽略报错语句
- 支持 任务和数据源页面按照 Id 查询
- 支持 修改数据源 Open Api 接口

### 优化

- 优化 结构迁移 Oracle 对端时，索引名字保持为原始名称
- 优化 SQL SERVER 元信息查询大量库/表/列信息
- 优化 Oracle 源端 LogMiner 日志解析逻辑
- 优化 I18N 信息
- 优化 OceanBase、MySQL、PostgreSQL、TiDB、StarRocks、Doris 添加数据源时候的选项参数
- 优化 Docker 镜像使用的 JDK 换成 OpenJDK
- 优化 针对 MySQL Rename 语句的解析
- 优化 Oracle、SQL SERVER 全量数据写入，支持更加更富的类型、以及 0 时间的处理
- 优化 OceanBase 到 SQL SERVER 结构迁移的问题

### 问题修复

- 修复 结构迁移优化对于默认值为空字符串的情况
- 修复 SQL SERVER -> PostgreSQL 结构迁移问题
- 修复 SQL SERVER -> SQL SERVER 不会自动创建 schema 的问题
- 修复 MongoDB ISODate 类型处理问题
- 修复 MongoDB -> MySQL 全量任务因为源端数据字段未对齐导致丢失正常列数据的问题
- 修复 MySQL8.0 -> MySQL、TiDB 结构迁移时间字端含有默认值的处理会增加 On Update 子句的问题
- 修复 CloudCanal 新增 MongoDB 数据源需要关闭 readonly节点，否则 CloudCanal 添加数据源时会报错的问题
- 修复 MySQL -> MySQL、TiDB 联合主键/唯一键冲突的问题
- 修复 MongoDB -> MongoDB修改订阅最后一步不展示数据的问题

