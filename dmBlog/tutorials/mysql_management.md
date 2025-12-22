---
slug: /tutorials/mysql_management
description: 本文展示了如何使用可视化工具 CloudDM 个人版管理和操作 MySQL 数据库和数据表
title: 使用 CloudDM 可视化操作 MySQL
date: 2025-06-14
authors: mode
tags:
  - tutorials
image: /img/clouddm/dmblog/tutorials/mysql_management.png 
---

## CloudDM 个人版简介
CloudDM 个人版是 ClouGence 公司推出的一款一站式数据库管理工具，可以方便地访问和管理 MySQL、Oracle、PostgreSQL、阿里云 RDS、Greenplum、TiDB、Redis、StarRocks、Doris、SelectDB、SQL Server、ClickHouse、OceanBase 、PolarDB-X 、IBM Db2 等多种不同类型的数据库。通过 CloudDM 丰富的数据源支持可以避免在多个专业工具之间切换，从而提高工作效率。

它是本地化的应用程序，没有后台进程。和 DataGrip、Navicat 一样在安装完成后，只需要双击应用程序图标，便可以方便地管理位于本地计算机或远程计算机上的数据库。已支持 Windows、Linux 和 MacOS 操作系统。

<!-- truncate -->

## CloudDM 界面介绍
![](../assets/mysql_management/1.png)

## 连接 MySQL 数据库
切换到 **数据源管理**，然后点击 **新增数据源**。

![](../assets/mysql_management/2.png)

选择 MySQL 数据库，然后输入对应信息，连接数据库。

![](../assets/mysql_management/3.png)

在 **查询设置** 中，可以通过 **修改参数配置** 对连接信息进行修改。

![](../assets/mysql_management/4.png)

切回 **数据查询**，可以看到刚刚新增的数据源。

![](../assets/mysql_management/5.png)

## 管理数据库
CloudDM 支持创建和删除 Schema。

### 创建 Schema
在 Schema 层级的标签栏右键，点击 **新建 Schema。**

![](../assets/mysql_management/6.png)

在对话框中填写 Schema 名，点击 **生成 SQL 语句** 后，点击 **立即执行** 即可。

![](../assets/mysql_management/7.png)

## 管理数据库表
目前，CloudDM 支持各类数据库表的管理操作，包括创建表、删除表、修改表、清空表，同时对 MySQL 的 DDL 支持比较齐全，可以满足各类场景。

### 创建表
在表标签页右键，点击 **新建表**。

![](../assets/mysql_management/8.png)

对表相关信息进行编辑，此处可以设置表的一些基本信息、列相关信息、主键信息、索引信息。设置完成后点击保存。

![](../assets/mysql_management/9.png)

对生成的 SQL 点击 **立即执行**。

![](../assets/mysql_management/10.png)


### 修改表
在需要修改的表标签上右键，点击 **设计表**。

![](../assets/mysql_management/11.png)

中间的操作和 **新建表** 类似，修改表信息，然后点击保存，对生成的 SQL 点击 **立即执行** 即可。

![](../assets/mysql_management/12.png)


### 删除表
在需要删除的表标签上右键，点击 **删除**。

![](../assets/mysql_management/13.png)

### 清空表
顾名思义，点击该按钮，该表的数据会被清空。

![](../assets/mysql_management/14.png)

## 编辑表数据
CloudDM 支持编辑表数据，操作包括数据条件查询、插入数据、修改数据、删除数据。

### 查询数据
在 CloudDM 中，支持普通的分页查询，还支持拼接 where 条件查询以及排序条件。

![](../assets/mysql_management/15.png)

### 更新数据
在 CloudDM 中，绿色标识代表新增，红色标识代表删除，黄色标识代表修改。

![](../assets/mysql_management/16.png)


点击 **提交** 按钮，系统会生成对应的 SQL。点击 **立即执行**，即可对表单数据进行修改。

![](../assets/mysql_management/17.png)


## 创建触发器
在需要创建触发器的表上右键，点击 **新建触发器**。

![](../assets/mysql_management/18.png)

配置完成后，点击 **生成 SQL 语句**，在 SQL 生成完成后，点击 **立即执行**，即可创建触发器。

![](../assets/mysql_management/19.png)

![](../assets/mysql_management/20.png)

## 转换 DDL
在需要进行 DDL 转换的表右键 **获取 DDL 语句**。

![](../assets/mysql_management/21.png)

选择 **生成 DDL 语句**，并选择对端数据源，便可转化为对应数据源的 DDL 语句。

![](../assets/mysql_management/22.png)

## 总结
本文展示了如何管理和操作 MySQL 数据库和数据表，全程使用可视化工具 CloudDM 个人版，希望对大家有所帮助。
