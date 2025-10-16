---
id: execute_approval
title: SQL 工单
description: 本文档将介绍 CloudDM Team 的 SQL 工单。
---

作为受限的子账号可通过 CloudDM Team 的发起数据库 SQL 执行申请，当审批通过后，申请人或有权限的的人可以通过工单系统执行申请执行的 SQL。

## 发起工单

1. 登录 CloudDM Team 控制台。
2. 点击顶部 **工单** 菜单，进入工单系统。
3. 在工单页面中点击 **发起工单** 按钮进入工单创建页面。
4. 填写工单信息
  - 选择数据源、选择Schema。
  - 填写要执行的 SQL。
  - 填写标题。
  - 填写需求描述。
5. 点击 **提交** 后会自动跳转到 **工单详情页**。

:::info
如果开启了安全规范，提交的 SQL 将会进行 **[安全规范检查](../../operation/security/spec)**。
:::

## 配置方法

根据工单流程引擎不同，启用方法有所差异：

- 内置引擎：
  - 无需配置。
- 三方引擎：
  - 钉钉：[使用钉钉 SQL 审批工单](../engine/dingtalk_approval)
  - 飞书：[使用飞书 SQL 审批工单](../engine/feishu_approval)
  - 企业微信：[使用企业微信 SQL 审批工单](../engine/wechat_approval)
