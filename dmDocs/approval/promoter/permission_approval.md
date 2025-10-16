---
id: permission_approval
title: 权限工单
description: 本文档将介绍 CloudDM Team 的权限工单。
---

作为受限的子账号，可以通过 CloudDM Team 的权限申请功能向有权限的系统管理员、DBA 申请所需数据源的操作权限，申请和审批过程通过权限工单来实现。

## 子账号申请权限
1. 登录 CloudDM Team 控制台。
2. 点击 **配置** > **我的权限**。
3. 点击右上角 **申请权限**。
4. 选择需要哪些资源的权限(可精确到表)，点击右上角的 **提交申请**。
5. 确认申请权限无误后，点击 **提交申请**。

## 配置方法

根据工单流程引擎不同，启用方法有所差异：

- 内置引擎：
  - 无需配置。
- 三方引擎：
  - 钉钉：[使用钉钉权限审批工单](../engine/dingtalk_approval#permission)
  - 飞书：[使用飞书权限审批工单](../engine/feishu_approval#permission)
  - 企业微信：[使用企业微信权限审批工单](../engine/wechat_approval#permission)
