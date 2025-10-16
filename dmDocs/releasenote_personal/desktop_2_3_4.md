---
id: desktop_2_3_4
title: CloudDM 2.3.4
---

- 发版时间: 2023年 11月 24日
- 版本号: v2.3.4

# 更新内容

## [优化]
- [优化] 安装包体积，减少约 25%～30%；优化后安装包仅 300MB+。
- [优化] 完善 IBM DB2 单表数据编辑功能针对 BLOB、BINARY、XML 类型数据的兼容。
- [优化] 完善 OceanBase 单表数据编辑功能针对 BINARY、VARBINARY、BLOB、TINYBLOB、LONGBLOB、MEDIUMBLOB 类型数据的兼容。
- [优化] 完善 Oracle 单表数据编辑功能针对 RAW、BFILE 类型数据的兼容。
- [优化] 完善 SQL SERVER 单表数据编辑功能针对 TIMESTAMP、HIERARCHYID、GEOMETRY、GEOGRAPHY 类型数据的兼容。
- [优化] 完善 StarRocks 单表数据编辑功能针对 BINARY、VARBINARY、BOOLEAN、ARRAY、JSON 类型数据的兼容。
- [优化] 完善 TiDB 单表数据编辑功能针对 BINARY、VARBINARY、BLOB、TINYBLOB、MEDIUMBLOB、LONGBLOB 类型数据的兼容。
- [优化] 完善 达梦 单表数据编辑功能针对 IMAGE、BINARY、VARBINARY、INTERVAL 类型数据的兼容。
- [优化] 完善 ClickHouse 单表数据编辑功能针对 Nothing、INTERVAL、Enum、Nested、Tuple、Array、Map、LowCardinality、Nullable、Point、Polygon、MultiPolygon、Ring 类型数据的兼容。
- [优化] 完善 MySQL 单表数据编辑功能针对 BINARY、VARBINARY、TINYBLOB、BLOB、MEDIUMBLOB、LONGBLOB 类型数据的兼容。

## [修复]
- [修复] 添加 SQL SERVER 数据源时出现 The server selected protocol version TLS10 is notaccepted by client preferences [TLS13,TLS12] 的问题。
- [修复] 表数据编辑器在处理十六进制数据时校验时前缀为 0x 字符错误的问题。
- [修复] 在 Linux 版本中当窗口大小拖动时窗口布局没有自动调整的问题。
- [修复] 更改数据源密码后，数据源管理报错失效的问题。
- [修复] Oracle 表结构设计编辑器，在不设置主键时报空指针的问题。
- [修复] Oracle 给无主键的表新增主键时，名称重复的问题。
- [修复] Oracle 新增 NVARCHAR2 等字符类型时，没有设置默认长度。