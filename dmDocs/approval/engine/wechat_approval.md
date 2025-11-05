---
id: wechat_approval
title: 使用企业微信审批
description: 本文档将介绍 CloudDM Team 的工单接入企业微信审批流。
---

CloudDM Team 开启企业微信审批步骤如下：
1. [创建并配置企业微信应用](#config_app)。
2. 使用主账号登录 CloudDM Team 产品。
3. 进入页面 **配置** > **个人偏好** > **通用参数** 选项卡。
4. 参考如下表格修改配置项。最后点击右上角 **保存** 按钮后 **确认** 保存。

```text title='(必选) 需要修改的配置'
配置项                        │ 修改后     │ 说明
─────────────────────────────┼───────────┼──────────────────────────────────────
wechatEnableApprovalService  │ true      │ 工单流程服务使用企业微信提供服务
wechatApprovalCorpId         │ xxxxx     │ 企业 ID
wechatApprovalAgentId        │ xxxxx     │ 应用 AgentId
wechatApprovalSecret         │ xxxxx     │ 应用 Secret
wechatApprovalToken          │ xxxxx     │ 消息通道 Token（在配置消息通道环节配置）
wechatApprovalEncodingAesKey │ xxxxx     │ 消息通道 EncodingAESKey（在配置消息通道环节配置）
```

```text title='(可选) 高级参数选项说明'
配置项                       │ 修改后     │ 说明
────────────────────────────┼───────────┼──────────────────────────────────────
wechatApprovalTemplateLang  │           │ 如果配置了多国语言模版，需要指定使用的默认语言。
```

## 企业微信应用参考 {#config_app}

:::info
您可以将 CloudDM Team 中 [单点登录(SSO)](../../operation/sso/sso_wechat) 和工单整合进同一个企业微信应用。CloudDM Team 支持独立或分开配置。
:::

**准备工作**
1. 登录 [企业微信后台](https://work.weixin.qq.com/)。
2. **需要准备一个域名并且部署 CloudDM Team Console 的服务器能够通过这个域名被外网访问。**

**应用基本配置**
1. 点击 **应用管理** > **应用** > **创建应用**。
   ![common](../../assets/operation/sso/sso_wechat/app-step1.png)
2. 填写应用的基础信息，涉及图标资源可以在 [资源下载](../../resource/resource_download) 中获取。应用可用范围选择组织机构的 **根部门(包含所有员工)**，然后点击 **创建应用**。
   ![common](../../assets/operation/sso/sso_wechat/app-step2.png)
3. 在 **应用详情** 中可以获取，获取 **AgentId** 和 **Secret**。
   ![common](../../assets/operation/sso/sso_wechat/app-step3.png)
4. 在 **我的企业** 页面底部可以获取 **企业 ID (CorpId)**。
   ![common](../../assets/operation/sso/sso_wechat/app-step4.png)
5. 在 **应用详情** 中找到 **企业可信 IP** 卡片，点击 **设置**，填写您部署 CloudDM Team 环境中公网出口 IP。
   ![common](../../assets/operation/sso/sso_wechat/app-step6.png)

## 表单配置参考 {#create_form}

1. 进入 [企业微信后台](https://work.weixin.qq.com/)，进入 **应用管理** > **审批应用**。
   ![common](../../assets/approval/engine/wechat_approval/1.png)
2. **首次进入** 应用需要设置应用负责人，然后点击 **模版管理** > **添加模版**，在弹出框中选择 **自定义模版**。
   ![common](../../assets/approval/engine/wechat_approval/2.png)
   ![common](../../assets/approval/engine/wechat_approval/3.png)
2. 在 **表单设计** 的步骤，按照情况添加必要的控件，在添加过程中请不要开启必填选项。表单内容请参考 **[配置企业微信表单](#config_form)**。
   ![common](../../assets/approval/engine/wechat_approval/4.png)
3. 在 **流程设计** 的步骤，设置各节点的审批人及审批方式（<font color="red">需要注意：在设置节点审批人时 CloudDM Team 不支持申请人自选</font>）。
   ![common](../../assets/approval/engine/wechat_approval/5.png)
   ![common](../../assets/approval/engine/wechat_approval/6.png)
4. 配置完成后，在页面最下方点击 **保存**。
   ![common](../../assets/approval/engine/wechat_approval/7.png)

### SQL 工单 {#config_form}

:::tip
1. 在配置表单项时需要严格按照下列要求配置，否则会造成数据错乱或者无法递交审批的情况。
   - 表单项
   - 表单顺序
2. 由于表单大小限制，表单如果内容超长会被截断，完整内容需到 CloudDM Team 控制台。
   - 单行输入框：400 长度
   - 多行输入框：4000 长度
:::

- SQL 工单的表单按照如下内容填写。
   ```text
   标题（文本）
   目标数据源（文本）
   需求描述（多行文本）
   执行 SQL（多行文本）
   回滚 SQL（多行文本）
   预计受影响行数（文本）
   ```
   ![common](../../assets/approval/engine/wechat_approval/ticket-sql.png)

### 权限工单

- 权限工单的表单按照如下内容填写。
   ```text
   标题（文本）
   需求描述（多行文本）
   申请的权限（明细，打印格式请选择：合并成一行打印）
      数据源描述（文本）
      资源路径（文本）
      生效时间（文本）
      权限列表（多行文本）
   ```
   ![common](../../assets/approval/engine/wechat_approval/ticket-auth.png)

### 变更工单

- 变更工单的表单按照如下内容填写。
   ```text
   标题（文本）
   需求描述（多行文本）
   目标数据源（文本）
   项目（文本）
   变更（文本）
   分支（文本）
   执行 SQL（多行文本）
   ```
   ![common](../../assets/approval/engine/wechat_approval/ticket-change.png)

## 配置消息通道 {#event_push}

1. 启用消息消息通道。
   ![common](../../assets/approval/engine/wechat_approval/app-step7.png)
   ![common](../../assets/approval/engine/wechat_approval/app-step8.png)
2. 接收消息服务器在配置时，需要
   - 先将 **Token**、**EncodingAESKey** 更新到 CloudDM Team 系统配置中（请参考文章开头部分）。
   - 然后在到企业微信中点击 **保存**。
3. 填写接收消息服务器 URL：（上图 1 部分）
    - 格式为：**`http://your.domain.com/callback/event?puid=\{ownerUid\}&platform=WECHAT&eventType=APPROVAL`**
    - 其中：\{ownerUid\} 需要 **主账号** 登录系统后，点击右上角头像中获取 **UID**。
4. 在 **审批** 应用中设置 **开启回调通知的模版** 和 **可调用接口的应用**。
   ![common](../../assets/approval/engine/wechat_approval/8.png)
   ![common](../../assets/approval/engine/wechat_approval/9.png)
   ![common](../../assets/approval/engine/wechat_approval/10.png)

## 使用企业微信审批 {#use}

1. 在 CloudDM Team 平台上方导航栏，点击 **查询设置**。
2. 在 **环境** 页签下，为对应的环境开启工单功能。
3. 在弹出的对话框中选择引擎为 **企业微信流程** 点击 **添加模版**，输入模版 URL 再次点击 **添加模版**。
4. 获取 “模版 URL”：
   ![common](../../assets/approval/engine/wechat_approval/11.png)
4. 模版添加成功后，选择添加的模版点击 **确定**。
