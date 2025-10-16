---
id: preference
title: 设置系统偏好
description: 本文档介绍 CloudCanal 上如何设置系统偏好
---
CloudCanal 支持设置创建任务的偏好以及设置告警等高级功能。本文介绍如何设置系统偏好以及目前支持的参数分类及用途。

## 设置系统偏好
1. 点击 **系统管理** > **系统偏好**，进入系统偏好页面。
2. 选择需要修改的参数，点击 **修改后的参数值** 一列中的 ![](../../assets/account_and_auth/4.png) 或 ![](../../assets/account_and_auth/3.png) 图标，修改参数值。参数值范围可参考 **可修改范围**。
   :::info
   如果参数是 **待创建** 的状态，说明该参数从未进行过设置。
   :::
3. 点击页面右上角 **保存** 则修改成功。
   :::warning
   系统偏好下的配置将应用于主账号以及属于该主账号下的所有子账号，请谨慎修改。
   :::

## 参数分类

- **COMMON**：账号配置，以及告警机器人相关的配置。详情请参考 [主子账号与权限](../system_manage/account_and_auth/account_and_auth.md) 以及 [配置告警](../../productOP/dailyOP/alarm_conf.md)。
- **EMAIL_CONFIG**：设置发送告警的邮箱的相关配置，详情请参考 [配置告警](../../productOP/dailyOP/alarm_conf.md)。
- **USER_PREFER**：创建同步任务时的偏好设置，配置后会默认覆盖到创建的任务配置中。
- **SYS_ALERT**：Webhook 告警相关设置。详情请参考 [配置告警](../../productOP/dailyOP/alarm_conf.md)。
