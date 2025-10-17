---
id: prepare_for_google_cloud
title: Google Cloud 环境配置
description: CloudCanal 在做 Google Drive 作为源端的数据迁移同步时，需要配置 Google Cloud 环境。
---

CloudCanal 通过 Google Workspace API 访问 Google Drive 数据。本文介绍 Google Cloud 环境配置的步骤。

## 步骤 1 - 环境准备
:::info
详细步骤请参考 [Google Workspace 开发环境配置](https://developers.google.cn/workspace/guides/get-started?hl=zh-cn)。
:::

1. [创建 Google Cloud 项目](https://developers.google.cn/workspace/guides/create-project)。
2. 点击 **品牌塑造**，配置 Auth Platform。
3. [启用 Google Workspace API](https://developers.google.cn/workspace/guides/enable-apis)，需要启用以下 API：
    - `Google Drive API`
    - `Google Docs API`
    - `Google Sheet API`
4. 点击 **配置数据访问**，添加应用授权范围。需要的基本权限范围包括：
    - `https://www.googleapis.com/auth/drive.readonly`
    - `https://www.googleapis.com/auth/drive.file`
    - `https://www.googleapis.com/auth/documents.readonly`
    - `https://www.googleapis.com/auth/spreadsheets.readonly`

## 步骤 2 - 访问验证

目前 CloudCanal 仅支持了通过服务账号访问 Google Drive 数据。步骤如下：

1. 选择一个 Google Cloud 项目，[创建服务账号](https://console.cloud.google.com/iam-admin/serviceaccounts)。
2. 创建服务账号密钥，并保存为 json 文件，该文件包含了服务账号的凭据信息，认证需要用到
   <b>project_id</b>、<b>private_key_id</b>、<b>private_key</b>、<b>client_email</b>、<b>client_id</b>。
3. 在 Google Drive 中将需要同步的文件或文件夹共享给服务账号。

