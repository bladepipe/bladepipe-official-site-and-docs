---
id: desktop_2_4_2
title: CloudDM 2.4.2
---

- 发版时间: 2024年 1月 11日
- 版本号: v2.4.2

CloudDM StarRocks 和 Redis 兼容修复

[新增]
- [新增] Redis DBSIZE 命令。

[优化]
- [优化] StarRocks 数据库表结构编辑器组件布局。
- [优化] Redis KEYS 命令执行，速度更快。

[修复]
- [修复] StarRocks 数据库主键模型表数据编辑时无法修改数据的问题。
- [修复] StarRocks 数据库表结构编辑器 Order By 失效的问题。
- [修复] StarRocks 数据库列默认值失效的问题。
- [修复] StarRocks 数据库列 bitmap 类型无法识别的问题。
- [修复] StarRocks 数据库列信息点击报错的问题。
- [修复] Doris 数据库表编辑语句生成错误问题。
- [修复] ClickHouse 数据库重命名语句未指定 Schema 的问题。
- [修复] 针对同一个表的表结构编辑操作，出现多个重复窗口的问题。
- [修复] 在一些情况下打开的SQL查询页面, 会出现初始事务状态设置错误的问题。