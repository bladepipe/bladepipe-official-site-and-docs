---
id: oboracle_oceanbase_sync
description: OceanBase(Oracle 租户模式) 到 OceanBase(MySQL 租户模式) 数据迁移同步,具备可视化创建、结构迁移、数据初始化、数据同步、自动化流程等能力
title: OceanBase(Oracle 租户) 到 OceanBase(MySQL 租户) 数据同步
date: 2024-12-15
authors: juantu
tags:
  - data_sync_sample
image: /img/ccBlog/data_sync_sample/oboracle_oceanbase_sync.png 
slug: /data_sync_sample/oboracle_oceanbase_sync
---

## 简述
[CloudCanal](https://www.clougence.com) 4.4.0.0 版本开始支持 OceanBase (Oracle 租户) 作为源/对端的数据迁移能力。本篇文章主要介绍如何使用 CloudCanal 构建一条 OceanBase（Oracle 租户）到 OceanBase（MySQL 租户）的数据同步链路（以下简称 ObForOracle 和 OceanBase）。

## 技术点

### 订阅增量日志
ObForOracle 增量数据变更的订阅依赖其官方提供的日志代理组件 [oblogproxy](https://github.com/oceanbase/oblogproxy)。CloudCanal 不断接收并解析 oblogproxy 推送的增量事件，最终写入对端。

## 前提条件
ObForOracle 版本为 3.0、3.1、3.2。

## 操作示例

### 步骤 1: 安装 CloudCanal

请参考 [全新安装(Docker Linux/MacOS)](https://www.clougence.com/cc-doc/productOP/docker/install_linux_macos)，下载安装 [CloudCanal 私有部署版本](https://www.clougence.com?src=cc-doc-blog-hana-mysql-sync)。

### 步骤 2: 添加数据源

1. 登录 **CloudCanal 控制台**，点击 **数据源管理** > **新增数据源**。
2. 数据库类型选择 **ObForOracle**，并填写网络地址和认证信息。
   :::info
   - 网络地址格式为 ip1:sql_port1;ip2:sql_port2。
   - 多个 Root Server 用英文分号分隔。
   - 支持填写 OBProxy 地址，格式为 proxy_ip:proxy_port。
   :::
3. 配置 **额外参数**：
   
   | 参数 | 描述 |
   | -- | -- |
   | **obLogProxyHost** | oblogproxy server 的地址，格式为 ip:port，默认端口统一为 2983。如果需要订阅增量数据，该参数不可为空。 |
   | **clusterUrl** | 可以为空。为空时订阅增量数据时会使用 root server list。不为空时订阅增量数据会优先使用 cluster url。 |
   | **rpcPortList** | 订阅增量数据时，该参数不可为空，默认端口为 2882。如果网络地址包含多个 Root Server（假设为 3 个），此处填写格式为 2882:2882:2882。 |
   | **tenant** | OceanBase Oracle 模式的租户名称，不可为空。若为空，使用 OceanBase 驱动在连接时会默认连接到 sys 租户（MySQL 模式）。 |
   | **clusterName** | OceanBase 集群名称，可以为空。用于拼接连接串（用户名@租户名#集群名）以通过 OceanBase 官方驱动连接数据库。 |   
 

### 步骤 3: 创建任务

1. 点击 **同步任务** > [**创建任务**](https://www.clougence.com/cc-doc/operation/job_manage/create_job/create_full_incre_task)。
2. 配置源和目标数据源，并分别点击 **测试连接**。
3. 选择 **数据同步** 并勾选 **全量初始化**。
4. 选择需要同步的表。
5. 选择表对应的列。

   :::info
   如果需要选择同步的列，可先行在对端创建好表结构。
   :::

6. 点击 **确认创建**。

   :::info
   任务创建过程将会进行一系列操作，点击 **同步设置** > [**异步任务**](https://www.clougence.com/cc-doc/operation/job_setting/console_job_manage)，找到任务的创建记录并点击 **详情** 即可查看。

   ObForOracle 源端的任务创建会有以下几个步骤：
    - 结构迁移
    - 分配任务执行机器
    - 创建任务状态机
    - 完成任务创建
   :::

6. 等待任务自动流转。

   :::info
   当任务创建完成，CloudCanal 会自动进行任务流转，其中的步骤包括：
    - **结构迁移**: ObForOracle 源端的表定义将会迁移到对端，如果同名表在对端已经存在，则会忽略。
    - **全量数据迁移**: 已存在的存量数据将会完整迁移到对端。
    - **增量数据同步**: 增量数据将会持续地同步到对端数据库，并且保持实时（秒级别延迟）。
   :::

## 总结
本文简单介绍了如何使用 [CloudCanal](https://www.clougence.com?src=cc-doc-blog-hana-mysql-sync) 进行 ObForOracle 到 OceanBase 数据迁移同步，打通数据流动的渠道，实现端到端的精准数据传输。
