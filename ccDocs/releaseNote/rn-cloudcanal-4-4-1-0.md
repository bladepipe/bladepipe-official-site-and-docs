---
id: rn-cloudcanal-4-4-1-0
title: 4.4.1.0
---
## CloudCanal-4.4.1.0

发版时间:2024年10月31日 版本号: 4.4.1.0

## 新特性

- 支持 TiDB 4.x 版本结构迁移、全量同步、增量同步
- 支持 MySQL -> MySQL/TiDB RANGE 分区结构迁移，MySQL->MySQL 支持分区增减 DDL 同步
- 支持 MySQL -> MySQL/StarRocks/TiDB, PostgreSQL -> MySQL [表字段值转换表达式设置](https://www.clougence.com/cc-doc/operation/job_manage/job_op/data_transform)（Data Transformation）,当前支持 11 种常用表达式，后续不断增加
- 支持 StarRocks 全量源端从各 BE 节点并行读取数据能力（新增任务参数：scanMode、feHttpAddr、beThriftAddr、scanMaxRetries、keepAliveMin、queryTimeout、memLimit）
- 支持 修改 MongoDB 目标端写入模式，默认替换部分（UPSERT_PART）可修改为整行替换（UPSERT_ALL）(新增任务参数：writeStrategy)
- 支持 在 Oracle 和 TiDB 作为目标端时，全量写入时根据对端表字段定义生成 INSERT SQL（参数：useDeflnFullTask）
- 支持 设置子账号可拥有与主账号一样的资源权限，方便 DBA 团队使用

## 优化

- 优化 StarRocks、Redis 对端支持同步源端无主键但有唯一键的表
- 优化 PostgreSQL 源端数据同步，因 DDL 同步源端要创建 Event Trigger, 需要较大权限，所以创建任务默认不勾选 DDL 同步
- 优化 Console、Sidecar 和 任务的告警日志，子账号角色只要拥有 告警记录-告警记录查看 权限，即可查看相应的告警日志
- 优化 Docker 容器系统参数，设置最大文件数（65535）和 最大进程打开数（131072）
- 优化 添加数据源时，新增数据源按钮添加 Loading 样式
- 优化 对 Hana 源端表级位点的展示

## 问题修复

- 修复 StarRocks 对端订正任务进度卡住无法结束的问题
- 修复 源端变更主键 StarRocks 对端出现两条数据的问题
- 修复 MongoDB -> MongoDB sub-list 类型写入为字符串的问题
- 修复 StarRocks / Doris 校验任务包含字符串类型主键数据校验范围计算不正确的问题
- 修复 Oracle RAC 环境下其中一个 Thread 长时间没有归档导致漏扫数据的问题
- 修复 SQLServer、PostgreSQL、Db2 源端数据校验时 char 类型字段尾部携带用于补长的空格导致的校验不一致的问题
- 修复 CloudCanal 3.x 升级到 4.x 内部用户丢失导致的 NPE 问题
- 修复 PostgreSQL 源端删除任务时，PostgreSQL 中 publication 未清理干净的问题
- 修复 设置目标主键为唯一索引下拉框不展示设置值的问题
- 修复 License 包含未授权数据源的任务不能修改订阅的问题
- 修复 修改手机号/邮箱后日志详情显示 oldphone/oldemail 和 newphone/newemail 相同的问题
- 修复 LDAP 和 AD 用户无法登陆问题
- 修复 LDAP 和 AD 用户登陆后无法修改自己的手机号、邮箱的问题
- 修复 创建角色时，包含权限不会自动添加的问题
- 修复 安全漏洞，升级 Docker 镜像 MySQL 版本到 8.0.39，升级产品三方依赖包版本





