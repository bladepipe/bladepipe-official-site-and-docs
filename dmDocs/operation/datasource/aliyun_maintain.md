---
id: aliyun_maintain
title: 添加阿里云数据源
description: 本文简要介绍如何添加阿里云数据源到 CloudDM Team 中。
---

CloudDM Team 支持 **自建数据源** 和 **云托管数据源**，本文简要介绍如何添加 **阿里云数据源** 到 CloudDM Team 中。

## 支持的数据库

目前支持的数据库为：RDS for MySQL

## 操作步骤

### 准备阿里云子账号
参考 [阿里云 RAM 访问控制](https://help.aliyun.com/product/28625.html?spm=5176.2020520153.help.dexternal.3820336anMrJ7b)
文档，创建一个供 CloudDM Team 访问和操作阿里云数据库的子账号，并生成对应的 AccessKey ID (AK) 和 AccessKey Secret (SK)。一般而言，CloudDM Team 添加阿里云数据源需要子账号具备的基本权限包括：
- 通过阿里云 OpenAPI 获取数据源列表。
- 通过阿里云 OpenAPI 添加数据源白名单权限。

### 配置阿里云 OpenAPI 调用使用的 AccessKey ID 和 AccessKey Secret

1. 点击 **系统设置** > **第三方配置**。
2. 输入有数据源 OpenAPI 调用权限的 AccessKey ID 和 AccessKey Secret。
3. 点击 **授权访问**，配置成功。
   - 若原本已授权过，则将覆盖原来的配置，更新成当前的配置。
4. 如果用户不希望 CloudDM Team 保存 AccessKey ID 和 AccessKey Secret，可在添加完数据源以后再次打开该窗口，点击 **解除访问权限** 来避免 CloudDM Team 存储该授权信息。

### 新增数据源
1. 点击 **数据源管理** > **新增数据源**。
2. **部署类型** 选择 **阿里云**，并完成以下配置。
   - 数据库类型：选择希望添加的数据源类型
   - 地区：根据实际情况选择（非强依赖属性）。
   - 环境：默认为 Test Environment，在添加数据源时可根据情况分配。
     - 管理员可通过 **[环境管理](../environment)** 页面管理环境。
   - 获取方式：AccessKey，如之前并未在 **第三方配置** 中配置 AccessKey ID 和 AccessKey Secret 将显示对话框要求输入相应信息。
3. 下方列表会展示子账号有权限查看的数据源列表。
4. 勾选左侧需要添加的数据源，点击 ![](../../assets/operation/datasource/aliyun/1.png) 图标，将数据源添加到右侧，确认无误后点击 **下一步**。
5. 选择 **数据库认证方式**，并输入账号、密码等信息。
6. 在 **阿里云 AccessKey ID / AccessKey Secret** 一列输入相应信息。
7. 点击 **新增数据源**，添加数据源。
8. 返回数据源列表中，该数据源的 **创建状态** 显示为 **创建完成**。
