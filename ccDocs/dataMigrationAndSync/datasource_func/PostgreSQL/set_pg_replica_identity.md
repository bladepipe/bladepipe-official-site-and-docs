---
id:  set_pg_replica_identity
title: 设置 PostgreSQL 源端表复制属性
description: CloudCanal 的增量同步依赖表 replica identity 属性，修改此属性会导致短暂锁表。可以配置是否允许 CloudCanal 静默执行此操作。
---

本文介绍如何配置是否允许 CloudCanal 自动执行表初始化操作。

## 简述

PostgreSQL 作为源端的增量数据同步场景中，需要确保表 replica identity 属性为 **FULL**。修改此属性会导致短暂锁表。

CloudCanal 提供了一个源端任务参数 **autoInitReplication**，用于配置是否由 CloudCanal 自动执行表初始化操作。

当该参数的值为 **否/false** 时，CloudCanal 在初始化任务和启动任务时，不会尝试修改表属性。但为确保增量同步正常进行，CloudCanal 会检查相关表的 replica identity 属性，并仅在此属性为 **FULL** 时继续任务。

## 前置条件

CloudCanal 版本 >= 4.8.0.0

## 操作步骤

### 允许 CloudCanal 自动执行

- 对于新建任务：

    创建任务时，在 **源&目标设置** 界面，勾选源端的 **高级配置选项**，配置 **初始化表复制属性** 的值为 **是**。继续完成其余步骤并创建任务。

- 对于已存在的任务：
    1. 进入任务详情页，点击 **功能列表** > **修改任务参数**。
    2. 选择 **源数据源配置** 页签，修改 **autoInitReplication** 参数值为 true。
    3. 在右上角点击 **生效配置**。    
   
  :::info
  旧版本无此配置，升级后如果不设置，视作 **true**。
  :::
    
### 手动操作

如果配置 **初始化表复制属性** 的值为 **true**，当任务初始化或启动时，会提示 **初始化 PostgreSQL 增量复制位点** 失败，此时需要手动介入修改表属性。

1. 连接到源端数据库。
2. 对所有被勾选的源端表执行以下命令。
    ```sql
    -- 如果有多张表，则继续对其余表执行相同操作
    alter table public.admin_user replica identity full;
    ```
3. 进入任务详情页，选择 **结构迁移** 页签，点击 **查看日志** 右侧的警告图标，进入异步任务详情页。
4. 点击 **重试**，等待任务重新启动。
