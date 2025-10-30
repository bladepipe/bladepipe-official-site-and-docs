---
id: feishu_sql_review
description: CloudDM 接入飞书，支持实时通知与移动办公，满足广大企业用户的实际需求。
title: 使用 CloudDM 和飞书流程化管理数据库变更审批
date: 2025-04-16
authors: mumu
tags:
  - tutorials
image: /img/clouddm/dmblog/tutorials/feishu_sql_review.png 
slug: /tutorials/feishu_sql_review
---

CloudDM 是一个专为团队协同工作打造的数据库数据管控平台。在管控数据库安全变更的过程中，为提高效率，方便用户使用，CloudDM 接入了主流 OA 协同办公系统（包括钉钉、飞书、企业微信），支持实时通知与移动办公，满足广大企业用户的实际需求。


本文将介绍如何使用 CloudDM 和飞书实现高效的数据库变更审批。

## 接入飞书
###  创建飞书应用
1. 登录 [飞书开发者后台](https://open.feishu.cn/app)，选择相应的组织，进入后台页面。
2. 点击 **创建企业自建应用**，填写应用基础信息，并点击 **创建**。
![](../assets/feishu_sql_review/1.png)



### 配置飞书应用
1. 点击 **权限管理**，批量开通：
+ 审批所有权限
+ 通讯录所有权限
![](../assets/feishu_sql_review/2.png)

2. 点击 **凭证与基础信息**，复制 **App ID**、**App Secret**，为 CloudDM 配置作准备。  
![](../assets/feishu_sql_review/3.png)



### 创建审批模板
1. 进入 [飞书审批管理后台](https://www.feishu.cn/approval/admin/approvalList)，点击 **审批管理** > **创建审批**。 
   ![](../assets/feishu_sql_review/4.png)
2. 点击 **创建自定义审批**。 
   ![](../assets/feishu_sql_review/5.png)
3. 在 **表单设计** 的步骤，添加如下控件且均不要开启必填选项：
    - 标题（单行文本）
    - 目标数据源（单行文本）
    - 需求描述（多行文本）
    - 执行 SQL（多行文本）
    - 回滚 SQL（多行文本）
    - 预计受影响行数（数字文本）
   ![](../assets/feishu_sql_review/6.png)
4. 在 **流程设计** 的步骤，设置各节点的审批人及审批方式。只支持指定审批人或系统自动选择，不支持发起人自选。 
   ![](../assets/feishu_sql_review/7.png)
2. 配置完成后，右上角点击 **发布**。 
   ![](../assets/feishu_sql_review/8.png)
3. 创建完成后，回到审批管理页面，点击修改图标。 
   ![](../assets/feishu_sql_review/9.png)
4. 在页面上方的地址栏中，复制 definitionCode。 
   ![](../assets/feishu_sql_review/10.png)
5. 进入 [开发文档](https://open.feishu.cn/document/server-docs/approval-v4/event/event-interface/subscribe)，点击 **尝试一下**。 
   ![](../assets/feishu_sql_review/11.png)
6.  填入刚才复制的 definitionCode，点击 **开始调试**。 
   ![](../assets/feishu_sql_review/12.png)
7.  出现以下结果则说明订阅事件成功。 
   ![](../assets/feishu_sql_review/13.png)

### 配置 CloudDM 
1. 回到 CloudDM 平台，点击 **配置** > **个人偏好**。
2. 将 **App ID** 复制到 **feishuApprovalAppID**、**App Secret** 复制到 **feishuApprovalAppSecret**、**definitionCode** 复制到 **feishuApprovalTemplateList**（如有多个审批模版码，使用`,`分隔），并修改 **feishuEnableApprovalService** 参数值为 true。 
   ![](../assets/feishu_sql_review/14.png)
3. 回到飞书开放平台，在左侧导航栏点击 **事件与回调**。
    1. 订阅方式选择 **使用长连接接收事件**，点击 **保存**。 
    ![](../assets/feishu_sql_review/15.png)
    2. 点击 **添加事件**。添加 **审批实例状态变更** 和 **审批任务状态变更** 事件。 
    ![](../assets/feishu_sql_review/16.png)
4. 点击 **版本管理与发布** > **创建版本**。 
   ![](../assets/feishu_sql_review/17.png)
5. 填写版本基础信息，应用可用范围选择 **所有员工**，并点击 **保存**。 
   ![](../assets/feishu_sql_review/18.png)

## 创建工单
1. 在 CloudDM 平台上方导航栏，点击 **查询设置**。
2. 在 **环境** 页签下，为对应的环境开启工单功能。
3. 在弹出的对话框中选择引擎为 **飞书流程**，模板为刚才在飞书创建的模版。 
   ![](../assets/feishu_sql_review/19.png)
4. 在上方导航栏点击 **工单**，并 [提交工单](https://www.clougence.com/dm-doc/manual/workorder/workorder_promoter)。 
   ![](../assets/feishu_sql_review/20.png)
5. 提交工单后，点击右上角 **飞书审批**，即可跳转到飞书审批页面。
   ![](../assets/feishu_sql_review/21.png)

## 效果展示
通过审批

![](../assets/feishu_sql_review/22.jpeg)

拒绝审批

![](../assets/feishu_sql_review/23.jpeg)

