---
id: obj_ddl
title: 获取/生成 DDL
description: 本文主要介绍 CloudDM Team 产品中如何获取或生成数据库对象的 DDL 语句。
---

本文主要介绍 CloudDM Team 产品中如何获取或生成 **[数据库对象](obj_browser.md#about)** 的 DDL 语句。

## 获取 DDL 语句

1. 在 **[数据库浏览器](obj_browser.md#about)** 中点开对应的实例。
2. 在具体表上 **鼠标右键** 点击 **获取DDL** 按钮。
3. 在弹窗中选择展示选中 **获取DDL语句** 单选钮。
4. 即可获得原始 DDL 语句。

目前支持该功能的数据源有 **MySQL**。

## 生成 DDL 语句

1. 在 **[数据库浏览器](obj_browser.md#about)** 中点开对应的实例。
2. 在具体表上 **鼠标右键** 点击 **获取DDL** 按钮。
3. 在弹窗中选择展示选中 **生成DDL语句** 单选钮。
4. 即可生成目标数据库的 DDL 语句。

目前支持该功能的数据源有：**MySQL**

:::info
**生成DDL语句** 功能支持生成异构数据源的 SQL 语句，例如选中 MySQL 数据源的表生成 PostgreSQL 数据库的建表语句。
:::
