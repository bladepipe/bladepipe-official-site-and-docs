---
id: upgrade_to_rdp
title: 升级 3.x 版本到 4.x
description: 介绍如何将 CloudCanal 3.x 版本升级到 4.x 版本
---

CloudCanal 4.x 版本提供了主子账号、按资源授权鉴权、基于角色访问权限管理（RBAC）、多集群等能力，但是也存在比较大的版本改造，从 3.x 版本升级上来需要做一些升级动作。

本文档即介绍如何将 CloudCanal 3.x 版本升级到 4.x 版本。

### 创建新增元数据库

- 登录 MySQL 元数据库

  ```shell
  # e.g.,docker
  mysql -h127.0.0.1 -uroot -P25000 -p123456
  ```
  
- 创建新增元数据库，如 clougence_rdp

  ```shell
  set names utf8;
  
  create database clougence_rdp;
  ```

### 清空 console_schema_history 数据
- 登录 MySQL 元数据库

  ```shell
  # e.g.,docker
  mysql -h127.0.0.1 -uroot -P25000 -p123456
  ```
- 清空 console_schema_history 数据

  ```shell
  use cloudcanal_console;
  
  truncate table console_schema_history;
  ```

### 升级 CloudCanal 版本

- 按照部署文档升级 CloudCanal 3.x -> 4.x

### 确认账号状态

- 进入元数据库，如 cloudcanal_console, 确认是否存在多个主账号
  ```shell
  select distinct(uid) from console_user where email <> 'inner@clougence.com';
  ```

- 如果只存在1个主账号，则进行 **单主账号升级** 
  
  ```shell
  +------------------+
  | uid              |
  +------------------+
  | 6258151610403310 |
  +------------------+
  1 row in set (0.00 sec)
  ```

- 如果存在多个主账号，则进行 **多主账号升级**

  ```shell
  +------------------+
  | uid              |
  +------------------+
  | 6258151610403310 |
  | 2737757397011281 |
  +------------------+
  2 rows in set (0.00 sec)
  ```

### 单主账号升级

- 登录元数据库获取单主账号 uid, 如 6258151610403310

  ```shell
  select distinct(uid) from console_user where email <> 'inner@clougence.com';
  ```

- 登录 console 部署节点
 
  ```shell
  ssh root@xx.xx.xx.xx
  ```

- 切换到 clougence 用户

  ```shell
  su - clougence
  ```

- 进入脚本目录
  
  ```shell
  cd /home/clougence/cloudcanal/console/bin
  ```

- 停止 console

  ```shell
  ./stopConsole.sh
  ```
  
- 执行脚本，跟上主账号 uid, 如 6258151610403310
  
  ```shell
  ./startConsoleAndUpToRdpPrivateSimple.sh 6258151610403310
  ```

### 多主账号升级

- 多主账号系统，升级将提升其中一个账号为新系统主账号，其他账号降级为该主账号子账号
- 新系统主账号选择建议以 CloudCanal 机器节点添加者为主，如果存在多个，则 **机器节点核心配置修改**

  ```shell
  mysql> select distinct(uid) from worker;
  +------------------+
  | uid              |
  +------------------+
  | 6258151610403310 |
  +------------------+
  1 row in set (0.01 sec)
  ```

- 确认主账号 uid , 如 6258151610403310

- 进入脚本目录

  ```shell
  cd /home/clougence/cloudcanal/console/bin
  ```

- 停止 console

  ```shell
  ./stopConsole.sh
  ```
  
- 执行脚本，替换参数 primaryUid 值为主账号 uid

  ```shell
  ./startConsoleAndUpToRdpPrivateDeep.sh 6258151610403310
  ```

### [可选]机器节点核心配置修改

- 如果存在 CloudCanal 机器节点添加者多个的情况，需要修改非新系统主账号添加的机器节点核心配置

### TIPS

- 多主账号升级因为需要订正资源归属，升级不可逆，所以具有一定风险
