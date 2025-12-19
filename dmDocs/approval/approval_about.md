---
id: approval_about
title: 介绍
description: 本文档主要介绍 CloudDM Team 产品工单的流程是怎样的。
---

为保障系统安全，不具备目标资源相应权限的用户将无法执行直接操作。如因权限限制导致操作无法进行，您可通过提交工单的方式完成相关操作。

### 工单流程
![w820_h193](../assets/approval/approval_about/approval_cn.png)

CloudDM Team 的工单运行依托上述流程，其中工单审批可以交由外部第三方工作流系统承载（如上图）
- **绿色**流程代表工单流程发起人
- **蓝色**流程代表工单流程审批人

### 工单分类

在 CloudDM Team 中，工单分为：
- **[SQL 工单](./approval_submit#sql)**：通过工单系统递交的 SQL 工单，包括数据导出、DDL、DML 的执行。
- **[变更工单](../devops/devops_about)**：由 **CI/CD** 的 **SQL 审批** 环节产生的审批工单。
- **[权限工单](./approval_submit#permission)**：用户发起的权限申请工单。


### 工单设置

1. 登录 CloudDM Team 控制台。
2. 点击 **查询设置** > **环境**。
3. 在需要配置的环境上 **设置** 一栏中点击对应类型工单图标进行配置。
  - ![w20_h20](../assets/approval/approval_setting/sql-ticket.png) SQL 工单、
    ![w20_h20](../assets/approval/approval_setting/change-ticket.png) 变更工单、
    ![w20_h20](../assets/approval/approval_setting/auth-ticket.png) 权限工单
  - SQL 工单在禁用状态下图标会显示为黑色。
4. 在启用工单时会要求在确定工单引擎后选择一个具体的执行流程模版。鼠标悬停在图标上可以查看当前使用的引擎和模版。