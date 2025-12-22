---
slug: /tutorials/dingtalk_sql_review
description: CloudDM 接入钉钉，支持实时通知与移动办公，满足广大企业用户的实际需求。
title: 使用 CloudDM 和钉钉流程化管理数据库变更审批
date: 2025-06-08
authors: mumu
tags:
  - tutorials
image: /img/clouddm/dmblog/tutorials/dingtalk_sql_review.png 
---

CloudDM 是一个专为团队协同工作打造的数据库数据管控平台，在管控数据库安全变更的过程中，为提高效率，CloudDM 接入钉钉，支持实时通知与移动办公，满足广大企业用户的实际需求。

本文将介绍如何使用 CloudDM 和钉钉实现高效的数据库变更审批。

<!-- truncate -->

## 接入钉钉
###  创建钉钉应用
1. 登录 [钉钉开发者后台](https://open-dev.dingtalk.com))，选择相应的组织，进入后台页面。
2. [获取开发者权限](https://open.dingtalk.com/document/isvapp/obtain-developer-permissions))，如已有权限则略过。
3. 点击 **应用开发** > **钉钉应用** > **创建应用**。
  ![](../assets/dingtalk_sql_review/1.png)
4. 填写应用的基础信息，并点击 **保存**。
  ![](../assets/dingtalk_sql_review/2.png)

### 配置应用
1. 点击 **权限管理**，批量申请以下权限：
    - 邮箱等个人信息
    - 成员信息读权限
    - 根据手机号获取成员基本信息权限
    - 通讯录部门成员读权限
    - 审批流数据管理权限
    - 工作流实例写权限
    - 工作流模板读权限
    - 工作流实例读权限
  ![](../assets/dingtalk_sql_review/3.png)
2. 点击 **凭证与基础信息信息**，复制 **AgentId**, **Client ID**, **Client Secret**。  
  ![](../assets/dingtalk_sql_review/4.png)
3. 回到 CloudDM 平台，点击 **配置** > **个人偏好**。填写参数 **dingApprovalConfigAk**, **dingApprovalConfigSk**, **dingAgentId**，并修改 **dingEnableApprovalService** 参数值为 true。  
  ![](../assets/dingtalk_sql_review/5.png)
4. 回到钉钉开放平台，点击 **事件订阅** > **已完成接入，验证连接通道**。在 **审批事件** 中，通过 [订阅设置](https://open.dingtalk.com/document/orgapp/event-subscription-overview#8dcdbb72adhxy) 只订阅对应模版的事件。  
  ![](../assets/dingtalk_sql_review/6.png)
5. 点击 **版本管理与发布** > **创建新版本**。  
  ![](../assets/dingtalk_sql_review/7.png)
6. 填写版本基础信息，应用可见范围选择 **全部员工**，并点击 **保存**。 
  ![](../assets/dingtalk_sql_review/8.png)

## 创建钉钉表单
1. 进入钉钉 OA 审批管理后台，点击 **创建新表单**。  
  ![](../assets/dingtalk_sql_review/9.png)
2. 在 **表单设计** 的步骤，添加如下控件且均不要开启必填选项：
    - 标题（单行输入框）
    - 目标数据源（单行输入框）
    - 需求描述（多行输入框）
    - 执行 SQL（多行输入框）
    - 回滚 SQL（多行输入框）
    - 预计受影响行数（数字输入框）
  ![](../assets/dingtalk_sql_review/10.png)  
3. 在 **流程设计** 的步骤，设置各节点的审批人及审批方式。只支持指定审批人或系统自动选择，不支持发起人自选。  
  ![](../assets/dingtalk_sql_review/11.png)

### 启用工单
1. 在 CloudDM 平台上方导航栏，点击 **查询设置**。
2. 在 **环境** 页签下，为对应的环境开启工单功能。
3. 在弹出的对话框中选择引擎为 **钉钉流程**，模板为刚才在钉钉创建的模版。
  ![](../assets/dingtalk_sql_review/12.png)

#### 可能遇到的问题
+ 网络异常：请检查部署 CloudDM 的服务器能否连接到外网。
  ![](../assets/dingtalk_sql_review/13.png)
+ 配置错误：请检查 **配置** -> **个人偏好** 的配置是否正确。
  ![](../assets/dingtalk_sql_review/14.png)

## 创建工单
1. 在上方导航栏点击 **工单**，提交工单。
  ![](../assets/dingtalk_sql_review/15.png)
2. 填写工单信息后，提交工单  
  ![](../assets/dingtalk_sql_review/16.png)
3. 点击右上角的 **钉钉审批**，便可直接跳转到钉钉对应的审批单进行操作。
  ![](../assets/dingtalk_sql_review/17.png)
  ![](../assets/dingtalk_sql_review/18.png)



## 钉钉审批小操作
+ 工单发起人可以点击左下方的催办进行催单。
  ![](../assets/dingtalk_sql_review/19.png)
+ 可以通过多种方式通知审批人进行审批。
  ![](../assets/dingtalk_sql_review/20.png)
+ 对于存在疑问的工单还可以快速建群讨论。
  ![](../assets/dingtalk_sql_review/21.png)



## 效果展示
通过审批

  ![](../assets/dingtalk_sql_review/22.png)

拒绝审批

  ![](../assets/dingtalk_sql_review/23.png)

