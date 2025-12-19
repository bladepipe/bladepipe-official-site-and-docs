---
id: approval_setting
title: 工单设置
description: 本文档主要介绍 CloudDM Team 产品如何配置工单系统。
---

本文档主要介绍 CloudDM Team 产品如何配置工单系统。

## 默认策略和限制

| 项目   | SQL 工单                                                                                        | 变更工单                                                                                          | 权限工单                                                                                          |
|------|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| 可禁用  | 是                                                                                             | 否                                                                                             | 否                                                                                             |
| 默认引擎 | 内置                                                                                            | 内置                                                                                            | 内置                                                                                            |
| 可用引擎 | 内置、[钉钉](../integrations/approval/dingtalk_approval.md)、[飞书](../integrations/approval/feishu_approval.md)、[企业微信](../integrations/approval/wechat_approval.md) | 内置、[钉钉](../integrations/approval/dingtalk_approval.md)、[飞书](../integrations/approval/feishu_approval.md)、[企业微信](../integrations/approval/wechat_approval.md) | 内置、[钉钉](../integrations/approval/dingtalk_approval.md)、[飞书](../integrations/approval/feishu_approval.md)、[企业微信](../integrations/approval/wechat_approval.md) |

### 工单设置

1. 登录 CloudDM Team 控制台。
2. 点击 **查询设置** > **环境**。
3. 在需要配置的环境上 **设置** 一栏中点击对应类型工单图标进行配置。
   - ![w20_h20](../assets/approval/approval_setting/sql-ticket.png) SQL 工单、
     ![w20_h20](../assets/approval/approval_setting/change-ticket.png) 变更工单、
     ![w20_h20](../assets/approval/approval_setting/auth-ticket.png) 权限工单
   - SQL 工单在禁用状态下图标会显示为黑色。
4. 在启用工单时会要求在确定工单引擎后选择一个具体的执行流程模版。鼠标悬停在图标上可以查看当前使用的引擎和模版。
