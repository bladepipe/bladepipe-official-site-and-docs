---
id: role_info_developer
title: 开发者
description: 本文将详细介绍 CloudDM Team 内置开发者的角色的具体权限点，该角色适用于大部分只关注于数据库查询和操作的用户。
---

本文将详细介绍 CloudDM Team 内置 **开发者** 的角色的具体权限点，该角色适用于大部分只关注于数据库查询和操作的用户。

## 具有的权限

| 角色权限点                                                                                  | 描述                                                                    |
|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| 查询控制台使用权限                                                                              | 具备该权限的用户或角色可以 **查看** 数据查询的页面。                                         |
| [工单查看](../roleauth/roleauth_workorder#rdp_worker_order_read)                           | 具备该权限的用户或角色可以 **查看** CloudDM Team 中创建的工单列表和详情。                        |
| [发起工单](../roleauth/roleauth_workorder#rdp_worker_order_request)                        | 具备该权限的用户或角色可以 **创建** CloudDM Team 中的工单，并支持对自己创建的工单进行 **操作**。          |
| [数据源查看](../roleauth/roleauth_query#dm_ds_read)                                         | 具备该权限的用户或角色可以 **查看** CloudDM Team 中添加的数据源列表。                          |
| [角色查看](../roleauth/roleauth_accounts#rdp_role_read)                                    | 具备该权限的用户或角色可以 **查看** CloudDM Team 中角色列表的权限。                           |
| [主账号偏好配置查看](../roleauth/roleauth_pri_settings#rdp_pri_user_kv_conf_r)                  | 具备该权限的用户或角色可以 **查看** CloudDM Team 中个人偏好的参数列表。                         |
| [主账号 AccessKey 和 SecretKey 查看](../roleauth/roleauth_pri_settings#rdp_pri_user_ak_sk_r) | 具备该权限的用户或角色可以 **查看** CloudDM Team 中个人偏好的AccessKey 和 SecretKey 查看功能。   |
| [项目/变更查看](../roleauth/roleauth_project#project_read)                                   | 具备该权限的用户或角色可以 **查看** CloudDM Team 中 **项目列表** 、**项目详情** 和 **变更详情** 页面。 |
| [变更执行](../roleauth/roleauth_project#execute)                                           | 具备该权限的用户或角色可以 **操作** 处于 **SQL 执行** 环节的变更。                             |
