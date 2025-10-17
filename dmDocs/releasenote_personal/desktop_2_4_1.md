---
id: desktop_2_4_1
title: CloudDM 2.4.1
---

- 发版时间: 2023年 12月 29日
- 版本号: v2.4.1

CloudDM StarRocks 兼容修复。

[优化]
- [优化] PostgreSql 和 GreenPlum 数据库表编辑内容描述。
- [优化] PostgreSQL 和 GreenPlum 数据库表编辑生成 SQL，关键字进行大写。

[修复]
- [修复] StarRocks 数据库版本获取错误的问题。
- [修复] StarRocks 数据库 Decimal32 等类型不支持的问题。
- [修复] SQL Server 数据库添加数据源失败的问题。
- [修复] 设计表选择列组件选中错误的问题。
- [修复] 编辑多条 SQL 在一行的时候，无法正确识别光标所在 SQL 的问题。
- [修复] 编辑器页面修改 Schema，聚焦功能不能正确跳到左边数据源树的对应 Schema 节点的问题。
- [修复] 在弹窗时，窗体后端 UI 组件没有被遮盖的问题。
- [修复] 没有新版本仍然会调用更新详情接口的问题。