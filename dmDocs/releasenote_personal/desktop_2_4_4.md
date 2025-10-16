---
id: desktop_2_4_4
title: CloudDM 2.4.4
---

- 发版时间: 2024年 2月 5日
- 版本号: v2.4.4

CloudDM 新增更多数据库对象查看功能。

[新增]
- [新增] MySQL、Oracle、PostgreSQL、OceanBase、SQL Server 等数据库查看存储过程列表功能。
- [新增] MySQL、Oracle、PostgreSQL、OceanBase、SQL Server 等数据库查看触发器列表功能。
- [新增] MySQL、Oracle、PostgreSQL、OceanBase、SQL Server 等数据库查看函数列表功能。
- [新增] Oracle、PostgreSQL、SQL Server 等数据库查看序列列表功能。
- [新增] Oracle、SQL Server 等数据库查看同义词列表功能。
- [新增] Oracle、PostgreSQL 等数据库查看物化视图列表功能。

[优化]
- [优化] 移除 TiDB 数据库不兼容的数据库对象，详情请参照 [TiDB 官方文档 v7.5](https://docs.pingcap.com/zh/tidb/stable/mysql-compatibility)。

[修复]
- [修复] 内置用户出现多条记录而导致的报错问题。
- [修复] Oracle 数据库查看普通表时连同物化视图一起获取的问题。
- [修复] Oracle 数据库访问部分 Schema 时，由于使用权限需求过高的语句，而出现表或视图不存在报错的问题。