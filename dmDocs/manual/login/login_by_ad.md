---
id: login_by_ad
title: 使用 Active Directory 域用户
description: 本文档主要介绍如何使用 Active Directory 域账号登录 CloudDM Team 系统。
---

本文档主要介绍如何使用 Active Directory 域账号登录 CloudDM Team 系统。

## 操作步骤

1. 访问 CloudDM Team 系统地址，可以向您所在组织的 **运维人员** 或 **系统管理人员** 索要。
    - 通常部署后地址为：_**http://&lt;部署服务器IP&gt;:8222**_
2. 在登录页面切换登录选项卡到 **子账号登录**。
3. 在 **Windows域账号** 输入框中输入分配给您的 **域账号**。
4. 在 **密码** 输入框中输入您域账号的 **密码**。
5. 点击 **登录** 进入系统。

## 首次登录

在首次登录时 CloudDM Team 会尝试从 Active Directory 域服务器上获取 **用户名**、**手机号** 和 **邮箱** 信息。

:::info
在首次登录时会提示用户是否使用 Active Directory 域服务器中的上述三个信息来填充首次登录用户初始化表单。<br/>
表单内容可以立即修改或者未来某个时间在账户中心中修改这些信息。

- **[修改手机号](../information/info_modify_phone)**
- **[修改邮箱](../information/info_modify_email)**
:::

## 域登录名

根据 Windows 域服务的规范，使用 Active Directory 域账号认证有两种登录名格式，分别为：

- **UPN格式**：域账号@域名
- **Pre-Windows 2000 格式**：Domain\LogonName

在使用 Pre-Windows 2000 格式登录时若出现 **NetBIOS 登录名时需要 NetBIOS/IP 名称映射** 报错。
- 请联系 **系统管理员** 检查 **ldapNetBIOSRoute** 配置项。
- 具体配置方法参考手册 **[使用 Active Directory 域服务](../../operation/sso/sso_ad)**。
