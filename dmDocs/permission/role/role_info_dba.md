---
id: role_info_dba
title: 数据库管理员（DBA）
description: 本文将详细介绍 CloudDM Team 内置数据库管理员（DBA）的角色的具体权限点，该角色适用于对数据源进行管理。
---

本文将详细介绍 CloudDM Team 内置 **数据库管理员（DBA）** 的角色的具体权限点，该角色适用于对数据源进行管理。

## 具有的权限

| 角色权限点                                                                                  | 描述                                                                   |
|----------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| 查询控制台使用权限                                                                              | 具备该权限的用户或角色可以 **查看** 数据查询的页面。                                        |
| [查询配置查看](../roleauth/roleauth_query#dm_ds_read)                                        | 具备该权限的用户或角色可以 **查看** CloudDM Team 中查询配置的页面和详情。                       |
| [查询配置管理](../roleauth/roleauth_query#dm_ds_manage)                                      | 具备该权限的用户或角色可以 **配置** CloudDM Team 中查询配置页面相关的设置。                      |
| [查询机器查看](../roleauth/roleauth_query#dm_worker_read)                                    | 具备该权限的用户或角色可以 **查看** CloudDM Team 用于连接数据库实现查询功能的机器列表。                |
| [查询机器管理](../roleauth/roleauth_query#dm_worker_manage)                                  | 具备该权限的用户或角色可以 **新增**、 **删除** 和 **编辑** CloudDM Team 用于连接数据库实现查询功能的机器。 |
| [安全规则/规范查看](../roleauth/roleauth_query#dm_secrules_read)                               | 具备该权限的用户或角色可以 **查看** CloudDM Team 中设置的安全规则与安全规范。                     |
| [安全规则/规范管理](../roleauth/roleauth_query#dm_secrules_manage)                             | 具备该权限的用户或角色可以 **新增**、 **删除** 和 **编辑** CloudDM Team 中设置的安全规则与安全规范。    |
| [工单查看](../roleauth/roleauth_workorder#rdp_worker_order_read)                           | 具备该权限的用户或角色可以 **查看** CloudDM Team 中创建的工单列表和详情。                       |
| [发起工单](../roleauth/roleauth_workorder#rdp_worker_order_request)                        | 具备该权限的用户或角色可以 **创建** CloudDM Team 中的工单，并支持对自己创建的工单进行 **操作**。         |
| [工单审批](../roleauth/roleauth_workorder#rdp_worker_order_approve)                        | 具备该权限的用户或角色可以 **查看**、 **审批** CloudDM Team 中的所有工单。                    |
| [数据源查看](../roleauth/roleauth_query#dm_ds_read)                                         | 具备该权限的用户或角色可以 **查看** CloudDM Team 中添加的数据源列表。                         |
| [数据源管理](../roleauth/roleauth_query#rdp_ds_manage)                                      | 具备该权限的用户或角色可以 **新增**、**删除**、**编辑** CloudDM Team 中添加的数据源。             |
| [子账号查看](../roleauth/roleauth_accounts#rdp_user_read)                                   | 具备该权限的用户或角色可以 **查看** CloudDM Team 中创建的子账号列表。                         |
| [子账号管理](../roleauth/roleauth_accounts#rdp_user_manage)                                 | 具备该权限的用户或角色可以 **新增**、**删除**、**编辑** CloudDM Team 中创建的子账号列表。           |
| [子账号查看-资源授权查看](../roleauth/roleauth_accounts#rdp_auth_read)                            | 具备该权限的用户或角色可以 **查看** CloudDM Team 中创建的子账号列表及已授的资源权限。                 |
| [子账号查看-资源授权管理](../roleauth/roleauth_accounts#rdp_auth_manage)                          | 具备该权限的用户或角色可以 **查看**、 **编辑** CloudDM Team 中子账号的资源权限。                 |
| [角色查看](../roleauth/roleauth_accounts#rdp_role_read)                                    | 具备该权限的用户或角色可以 **查看** CloudDM Team 中角色列表的权限。                          |
| [角色管理](../roleauth/roleauth_accounts#rdp_role_manage)                                  | 具备该权限的用户或角色可以 **新增**、 **编辑** 、 **删除** CloudDM Team 中角色的权限。           |
| [环境查看](../roleauth/roleauth_env#rdp_env_read)                                          | 具备该权限的用户或角色可以 **查看** CloudDM Team 中定义的环境列表和详细信息。                     |
| [环境管理](../roleauth/roleauth_env#rdp_env_manage)                                        | 具备该权限的用户或角色可以 **新增**、 **编辑** 、 **删除** CloudDM Team 中角色的权限。           |
| [操作审计查看](../roleauth/roleauth_audit#rdp_op_audit_read)                                 | 具备该权限的用户或角色可以 **查看** CloudDM Team 中记录的用户操作审计。                        |
| [主账号偏好配置查看](../roleauth/roleauth_pri_settings#rdp_pri_user_kv_conf_r)                  | 具备该权限的用户或角色可以 **查看** CloudDM Team 中个人偏好的参数列表。                        |
| [主账号配置修改](../roleauth/roleauth_pri_settings#rdp_pri_user_kv_conf_w)                    | 具备该权限的用户或角色可以 **查看** 、 **修改** CloudDM Team 中个人偏好的参数列表。               |
| [主账号 AccessKey 和 SecretKey 查看](../roleauth/roleauth_pri_settings#rdp_pri_user_ak_sk_r) | 具备该权限的用户或角色可以 **查看** CloudDM Team 中个人偏好的AccessKey 和 SecretKey 查看功能。  |
| [主账号普通配置查看](../roleauth/roleauth_pri_settings#rdp_pri_user_normal_conf_r)              | 具备该权限的用户或角色可以 **查看** CloudDM Team 中个人偏好的普通配置（验证邮箱、手机号）功能。            |
| [主账号第三方配置修改](../roleauth/roleauth_pri_settings#rdp_pri_user_third_party_conf_w)        | 具备该权限的用户或角色可以 **修改** CloudDM Team 中的第三方配置。                           |
