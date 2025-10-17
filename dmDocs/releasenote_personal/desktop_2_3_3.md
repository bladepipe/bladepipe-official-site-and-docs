---
id: desktop_2_3_3
title: CloudDM 2.3.3
---

- 发版时间: 2023年 11月 10日
- 版本号: v2.3.3

# 更新内容

## [优化]
- [优化] OceanBase、TiDB 表编辑，展示的信息更加详细准确。
- [优化] PostgreSQL、Greenplum 表编辑，展示的信息更加详细准确。
- [优化] 表编辑中，索引的 DDL 语句生成规则。
- [优化] PostgreSQL、Greenplum  数据编辑能力，支持大部分数据类型，包括数组类型，空间类型。

## [修复]
- [修复] OceanBase/TiDB 唯一索引情况下 DDL 语句生成错误的问题。
- [修复] OceanBase/TiDB/PolarDB-X 列自增设置无效的问题。
- [修复] 表删除操作后，搜索框失效的问题。
- [修复] PostgreSQL 某些版本添加数据源时无法正确识别版本的问题。