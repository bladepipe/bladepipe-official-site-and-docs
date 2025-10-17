---
id: self_maintain
title: 添加自建数据源
description: 本文简要介绍如何添加自建数据源到 CloudDM 中。
---

CloudDM Team 支持 **自建数据源** 和 **云托管数据源**，本文简要介绍如何添加 **自建数据源** 到 CloudDM Team 中。

## 支持的数据库

目前支持的数据库为：MySQL、MariaDB、PostgreSQL、IBM DB2（IBM i 及 z/OS）、Greenplum、OceanBase(MySQL)、PolarDB-X、PolarDB(MySQL)、TiDB、SQL Server、阿里云 AnalyticDB(MySQL)、阿里云 RDS(MySQL)、阿里云 RDS(PostgreSQL)、阿里云 PolarDB(MySQL)、阿里云 PolarDB-X、亚马逊 AWS MySQL、亚马逊 AWS PostgreSQL、微软 Azure(MySQL)、微软 Azure(PostgreSQL)。

## 操作步骤

1. 登录 CloudDM Team 控制台。
2. 点击 **数据源管理** > **新增数据源**。
3. **部署类型** 选择 **自建**，并完成以下配置。
   - 数据库类型：目前支持 19 种数据源，详细请看 **[产品功能](../../intro/product_func)**。
   - 环境：默认为 Test Environment，在添加数据源时可根据情况分配。
     - 管理员可通过 **[环境管理](../environment)** 页面管理环境。
   - 获取方式：默认为手动。
   - 网络地址：可选择 **内网** 或 **外网**，并输入连接地址。
   - 认证方式：选择相应的认证方式，并填写所需内容，如账号密码等。
   - 描述：填写便于识别的名称。
   - 物理位置：选择 **不限** 或根据实际情况选择（非强依赖属性）。
   - 额外参数：不同的数据源可设置不同的参数。鼠标放置在 ![](../../assets/operation/datasource/self_maintain/1.png) 图标即可查看参数说明。
     如需修改，点击 **修改后的参数值** 一列中的 ![](../../assets/operation/datasource/self_maintain/2.png) 图标，并输入相应参数值，点击 **确定**。
4. 点击 **新增数据源** 添加数据源。
5. 返回数据源列表中，该数据源的 **创建状态** 为 **创建完成**。

## 小贴士

DB2 数据源需要选择具体的驱动来访问您的数据库，如：
- 基于 JT400，使用 JTOpen 驱动来访问您的数据库，那么驱动需要选择 JTOpen，比如 **IBM i**。 
- 在数据源添加后，也可通过 查询设置 > 查询配置 > 修改参数配置，修改 driverVersion 参数为 'JTOpen-21.0.0'，修改驱动为 JTOpen v21.0.0。

SQL Server 数据源需要访问具体的驱动来访问您的数据库，如：
- SQL Server 2000 需要使用 jTDS 驱动来访问您的数据库。
- CloudDM 暂不支持SQL Server 添加数据源时选择实例。