---
id: rn-cloudcanal-4-1-1-0
title: 4.1.1.0
---
## CloudCanal-4.1.1.0

发版时间:2024年5月30日 版本号: 4.1.1.0

## 新链路

- 开放 Hana -> PostgreSQL 结构迁移、全量同步、增量同步、数据校验与订正
- 开放 OceanBase -> SelectDB / Doris 结构迁移、全量同步、增量同步、数据校验与订正、DDL 同步（建表、加列、减列、修改列、重命名表）

## 新特性

- 支持 PostgreSQL -> PostgreSQL / MySQL / StarRocks DDL 同步（ALTER TABLE ADD / MODIFY / DROP COLUMN）
- 支持 Oracle -> ClickHouse DDL 同步（ALTER TABLE ADD / MODIFY / DROP COLUMN 和 TRUNCATE TABLE）
- 支持 Oracle -> Doris/SelectDB DDL 同步（CREATE TABLE(全库同步)，DROP TABLE(全库同步)，ALTER TABLE ADD / MODIFY / DROP
  COLUMN 和 TRUNCATE TABLE）
- 支持 MySQL / Oracle -> Oracle DDL 同步（ALTER TABLE ADD / MODIFY / DROP COLUMN）
- 支持 Oracle / PostgreSQL / OceanBase / AdbForMySQL / TiDB 目标端 DDL 去重能力
- 支持 GuassDbForOpenGauss 对端 UPSERT 写入方式（参数 keyConflictStrategy 为 IGNORE / REPLACE）
- 支持 Oracle BFLOAT / BDOUBLE 类型同步
- 支持 Kafka -> ElasticSearch 修改订阅
- 支持 StarRocks 源端全量期间修改订阅
- 支持 SqlServer -> MySQL、StarRocks 设置虚拟列
- 支持 Oracle -> Doris 设置虚拟列
- 支持 目标端为 SQLServer 的链路创建任务前重建表或清空数据
- 支持 Kafka 源端 Debezium Json 格式的 Read 事件
- 支持 Oracle 修改订阅子任务复制主任务部分参数：redoFetchSize / logMiningScnStep / oraMiningSessionPauseSec
- 支持 CloudCanal 扩展 CloudDM Team
  能力，具体查看：https://www.clougence.com/cc-doc/productOP/platform/extend_clouddm_team
- 支持 操作审计记录任务的生命周期全流程
- 支持 创建任务时可修改对端待创建表的名字
- 支持 修改子账号的用户名与账号

## 优化

- 优化 多种链路 DDL 同步架构和能力，默认包含 CREATE TABLE(全库同步)，DROP TABLE(全库同步)，ALTER / TRUNCATE TABLE 4 大类
  DDL 同步
- 优化 添加 Doris、StarRocks、TiDB、Hive 数据源时，对 Host 进行格式检查以及连通性检查
- 优化 StarRocks 和 Doris 序列化异常报错信息，方便排查库表列
- 优化 结构迁移 PostgreSQL TEXT 类型映射成 StarRocks VARCHAR(1048576) (sr .ver < 2.1 则为 65533)
- 优化 结构迁移 PostgreSQL DATE 类型映射成 StarRocks DATE 类型
- 优化 子账号登录方式，更加简单和直观

## 问题修复

- 修复 MySQL -> TiDB 、ADB for MySQL DDL 语句中注释信息带有引号导致异常的问题
- 修复 TiDB 对端组合 DDL 执行异常的问题
- 修复 Hana 表级 CDC 模式下丢数据的问题
- 修复 Oracle 源端刷新 Thread 个数异常的问题
- 修复 Oracle -> Oracle 结构迁移 VARCHAR2(N CHAR) 时丢失 CHAR 的问题
- 修复 Oracle 目标端写入时 CHAR / NCHAR 包含中文补全空格导致超长的问题
- 修复 Oracle -> Oracle 结构迁移，某个列既是 PK 又是 INDEX 同步报错的问题
- 修复 双向同步 PostgreSQL / GuassDbForOpenGauss 修改订阅时，子任务未带上主任务对应防循环配置的问题
- 修复 双向同步 PostgreSQL / GuassDbForOpenGauss DML 单行写入防循环问题
- 修复 双向同步 PostgreSQL DDL 防循环问题
- 修复 PostgreSQL / GuassDbForOpenGauss 对端结构迁移将 CHAR 和 BPCHAR 默认转换为 VARCHAR 的问题（前者数据填充空格，后者去除）
- 修复 StarRocks / Doris / SelectDB 对端连续 DDL 执行报错和 DDL 后写入数据报字段不一致的问题
- 修复 StarRocks RENAME 语句库表未映射导致 DDL 跳过的问题
- 修复 高级模式过滤条件部分类型和条件表达式过滤失败的问题
- 修复 状态机页面显示记录不包含子任务的问题
- 修复 追加的数据校验任务报错的问题
- 修复 数据校验子任务自动启动的问题
- 修复 同步任务的创建人信息展示错误的问题
- 修复 子账号在有权限的前提下，获取 Sidecar 核心配置验证码出错问题
- 修复 子账号对于单独创建校验订正子任务未自动授权问题，子任务加入授权鉴权体系
- 修复 子账号资源授权操作完页面无数据或数据无更新的问题
- 修复 资源授权切换资源类型时筛选条件没有清空的问题
- 修复 目标端有大小写不一致的表名时源端没有显示对应的待创建表的问题
- 修复 异步任务详情样式展示问题
- 修复 修改订阅失败按钮依然 Loading 导致无法继续修改的问题
