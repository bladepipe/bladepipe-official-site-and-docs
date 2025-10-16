---
id: console_editor
title: 编辑器
description: 本文主要介绍如何使用 CloudDM Team 产品中的 SQL 编辑器。
---

本文主要介绍如何使用 CloudDM Team 产品提供的编辑器强大能力来编辑 SQL 语句。

## 格式化

使用 CloudDM Team 产品的 SQL 格式化能力需要如下步骤：

1. 进入 **数据查询** 页面。
2. 在 **查询编辑器** 中输入 SQL 语句，例如：
    ```sql92
    SELECT e1.name AS employee_name, e1.salary, e2.name AS manager_name, e2.salary
    FROM employee e1, employee e2
    WHERE e1.manager_id = e2.id
    AND e1.salary > e2.salary;
    ```
3. **选中** 要格式化的 SQL，如上述 SQL 语句。
4. 在 **查询编辑器** 上方点击 **格式化** 按钮对SQL语句进行格式化，得到如下代码：
    ```sql
    SELECT
      e1.name AS employee_name,
      e1.salary,
      e2.name AS manager_name,
      e2.salary
    FROM
      employee e1,
      employee e2
    WHERE
      e1.manager_id = e2.id
      AND e1.salary > e2.salary;
    ```

## 输入提示

CloudDM Team 产品的编辑器针对用户键盘输入会在适当的时进行代码编写提示，例如如下提示方式：

1. 匹配用户的输入并提示用户接下来备选的 SQL 语句关键字。
2. 在 from 语句后提示用户接下来想要查询的表名称。
3. 在 where 语句后提示用户可以输入的列名称及可能会用到的 SQL 函数。

## 表结构提示

在 **编辑器** 中通过鼠标悬停快速查看表结构信息。

1. 将鼠标悬停在 CloudDM Team 编辑器中 SQL 语句的表名上。
2. 悬停大约 1 秒后会触发表结构提示动作。
3. 编辑器会以表格形式提示表的列及列的类型。
