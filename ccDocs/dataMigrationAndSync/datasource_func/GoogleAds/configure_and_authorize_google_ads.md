---
id: configure_and_authorize_google_ads
title: 配置并授权 Google Ads 数据源
description: 本文介绍将 Google Ads 作为源端数据源时，如何配置 Google Cloud、Google Ads 账号信息，以及如何在 CloudCanal 中完成数据源授权。
---

CloudCanal 通过 **Google Ads API** 读取广告报表数据。

添加 GoogleAds 数据源前，需要准备 **Google Ads 经理账号**、**Ads Developer Token** 和 **Google Cloud OAuth 应用**。

数据源创建完成后，还需要由有权访问广告账号的 Google 用户完成 API 授权。

## 配置项说明

| 配置项                              | 所属位置 | 作用                                               |
|----------------------------------| --- |--------------------------------------------------|
| OAuth Client ID 和 OAuth Client Secret | Google Cloud 项目 | 标识发起 OAuth 授权的 Web 应用                            |
| Ads Developer Token              | Google Ads 经理账号（MCC） | 标识调用 Google Ads API 的应用，并决定可访问的账号类型和 API 配额。     |
| Login Customer ID                | Google Ads 经理账号（MCC） | Google Ads 经理账号的客户 ID。通过经理账号访问客户账号时，该参数必填。       |
| Customer IDs                     | Google Ads 经理账号（MCC）| 需要同步报表数据的 Google Ads 客户账号 ID 列表。                 |
| 授权 Google 账号                     | Google OAuth 授权页面 | 必须有权访问 Login Customer ID 对应的经理账号及其管理的 Google 账号。 |

## 步骤 1：准备 Google Ads 账号

1. 准备一个 [Google Ads 经理账号](https://developers.google.com/google-ads/api/docs/concepts/account-types)，并将需要同步数据的客户账号关联到该经理账号。
2. 确认执行 OAuth 授权的 Google 账号有权访问该经理账号及目标客户账号。
3. 记录 **经理账号客户 ID** 和 **目标客户账号 ID**，后者可多个。e.g.,`123-456-7890` 

### 获取 Ads Developer Token

1. 使用 Google Ads 经理账号登录 [API Center](https://ads.google.com/aw/apicenter)。
2. 如果尚未申请 Developer Token，请填写 API Access 表单并接受相关条款。
3. 记录 API Center 中显示的 Developer Token。
   - Developer Token 的访问级别请参考文档 [Google Ads API Developer Token](https://developers.google.com/google-ads/api/docs/api-policy/developer-token)。
   - 一个 Google Cloud 项目只能与一个 Google Ads Developer Token 关联。

## 步骤 2：配置 Google Cloud OAuth 应用

### 创建项目并启用 Google Ads API

1. 登录 [Google Cloud Console](https://console.cloud.google.com/)，创建或选择一个项目。
2. 进入 **API 和服务** > **库**，搜索并启用 **Google Ads API**。

### 配置 Google Auth Platform

1. 进入 **Google Auth Platform** > **Branding**，设置应用名称、用户支持邮箱和开发者联系邮箱。
2. 进入 **Audience**，选择应用受众：
   - 仅供同一 Google Workspace 组织使用时，可以选择 **Internal**。
   - 需要使用组织外的 Google 账号授权时，选择 **External**。
   - External 应用处于 Testing 状态时，Google 签发的 refresh token 通常会在授权 7 天后失效。用于持续同步的生产环境应完成应用发布及 Google 要求的验证流程。
3. 进入 **Data Access**，确认应用需要的授权范围：
   - `openid`
   - `email`
   - `https://www.googleapis.com/auth/adwords`

### 创建 OAuth Client

1. 进入 **Google Auth Platform** > **Clients**，点击 **Create Client**。
2. Application type 选择 **Web application**。
3. 在 **Authorized redirect URIs** 中添加 CloudCanal 的完整回调地址：
   ```text
   https://<CloudCanal Console 域名>/callback/googleads/oauth
   ```
4. 创建完成后，记录 **Client ID** 和 **Client Secret**。

## 步骤 3：新增 Google Ads 数据源

1. 登录 CloudCanal 控制台，点击 **数据源管理** > **新增数据源**。
2. 数据库类型选择 **GoogleAds**。网络地址默认使用 `googleads.googleapis.com`，无需修改。
3. 填写数据源描述，并在 **额外参数** 中完成以下配置。
   
   | 参数 | 是否必填 | 说明 |
   | --- |------| --- |
   | `loginCustomerId` | 必填   | Google Ads 经理账号客户 ID，只填写数字，不包含连字符。 |
   | `customerIds` | 必填   | 目标客户账号 ID 的 JSON 数组，例如 `["3028850329", "1234567890"]`。账号必须由 `loginCustomerId` 对应的经理账号管理。 |
   | `apiVersion` | 否    | 默认值为 `Latest`，建议保持默认。 |
   | `catalogVersion` | 否    | 内置 Google Ads Schema Catalog 版本，建议保持默认。 |
   | `dbsJson` | 否    | 内置报表 schema，建议保持默认。 |
   | `timezone` | 按需   | 用于规划报表刷新日期，默认值为 `UTC`。建议填写与广告账号报表一致的 IANA 时区，例如 `Asia/Shanghai`。 |
   | `refreshWindowDays` | 按需   | 定期重新拉取历史报表的窗口天数，默认值为 `95`。 |
   | `conversionLookbackDays` | 按需   | 转化归因回溯天数，默认值为 `90`。实际刷新窗口取该值与 `refreshWindowDays` 的较大值。 |

4. 点击 **新增数据源**。如果当前 CloudCanal 账号尚未配置 Google Ads Project 信息，页面会弹出配置窗口，填写：
   - **OAuth Client ID**：Google Cloud Web application 的 Client ID。
   - **OAuth Client Secret**：Google Cloud Web application 的 Client Secret。
   - **Ads Developer Token**：从 Google Ads 经理账号 API Center 获取的 Developer Token。
   - **OAuth Callback Site**：CloudCanal Console 的站点地址，例如 `https://console.example.com`。
5. 确认窗口中显示的完整 Authorized redirect URI 与 Google Cloud Clients 页面中的配置完全一致，然后保存并继续新增数据源。

## 步骤 4：完成 API 授权

1. 返回 **数据源管理** 列表，找到刚创建的 GoogleAds 数据源。
2. 点击操作列中的 **API 授权**，在弹窗中再次点击 **API 授权**。
3. 页面跳转到 Google 后，选择有权访问经理账号和目标客户账号的 Google 账号。
4. 查看授权范围并允许访问。授权完成后，页面会自动返回 CloudCanal 数据源列表，并显示授权成功。

## 步骤 5：验证授权

1. 创建同步任务并选择该 GoogleAds 数据源后，点击 **测试连接**。测试成功表示数据源已保存有效的 OAuth 授权信息，可以继续选择同步对象。      
  如果提示数据源尚未完成授权，请返回 **数据源管理** 列表，点击该数据源的 **API 授权**。