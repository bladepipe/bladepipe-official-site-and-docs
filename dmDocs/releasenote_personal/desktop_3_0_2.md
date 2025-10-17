---
id: desktop_3_0_2
title: CloudDM 3.0.2
---

- 发版时间: 2025年 04月 11日
- 版本号: v3.0.2

# 更新内容

## [新增]
- [新增] 支持 达梦数据库选择 Keystore 方式连接数据库。
- [新增] Oracle 到 DB2、Hana、Greenplum 的 DDL 转换。
- [新增] MySQL 到 Hana、Greenplum 的 DDL 转换。
- [新增] MySQL 带有索引的表到 StarRocks、Doris 的 DDL 转换。
- [新增] PostgreSQL 到 DB2、Hana、Greenplum 的 DDL 转换。
- [新增] StarRocks 到 TiDB 的 DDL 转换。
## [修复]
- [修复] 达梦数据库一次执行多条 COMMENT 语句报错的问题。
- [修复] Oracle 含有索引的表到 Greenplum、PostgreSQL DDL 转换的语句生成错误问题。
- [修复] MySQL 带有索引的表生成 Oracle DDL 语句时生成错误语句的问题。
- [修复] StarRocks 表中存在 bitmap 索引时生成的 MySQL DDL 语句无法执行的问题。
- [修复] 启动时有机率控制台显示没有可用 worker 的报错信息。