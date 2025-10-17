---
id: desktop_2_4_3
title: CloudDM 2.4.3
---

- 发版时间: 2024年 1月 23日
- 版本号: v2.4.3

CloudDM 新增 Redis 命令及其他问题修复。

[新增]
- [新增] 若干 Redis 命令的支持，具体包括 PING、QUIT、AUTH、TIME、SAVE、ROLE、FLUSHALL、BGREWRITEAOF 命令

[优化]
- [优化] 表结构编辑器，编辑后未提交直接关闭标签页现在会有提醒。

[修复]
- [修复] 生成 Insert 语句错误的问题。
- [修复] Doris 2.0.X 版本设计表等功能报错的问题。
- [修复] 新增标签页，丢失当前编辑器内容的问题。
- [修复] MySQL、OceanBase、TiDB 等数据库新建表功能，列默认值为函数时，识别为字符串的问题。
- [修复] MySQL、OceanBase、TiDB 等数据库设计表功能，列日期类型默认值为函数时，值显示错误的问题。