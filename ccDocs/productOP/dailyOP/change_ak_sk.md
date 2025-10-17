---
id: change_ak_sk
title: 修改 AccessKey 和 SecretKey
description: 本文档介绍 CloudCanal 默认用户的 AccessKey 和 SecretKey。 
---

CloudCanal 默认用户自带 AccessKey 和 SecretKey (用于开放 API 调用)，如需修改，可按照以下步骤进行。

## 步骤
1. 使用默认用户名密码登录 CloudCanal 控制台。
2. 进入 **配置** > **系统偏好** 页面。
3. 点击 **重置 AK/SK** 按钮。
4. 点击 **获取短信验证码** (如未修改，则为 777777) 并填写，点击 **确定** 按钮。
5. 重新登录系统，按 **配置** > **系统偏好** > **获取 AK/SK** 路径查看是否已经更新。

## FAQ

**Q: 这个 AccessKey 和 SecretKey 不修改会有什么风险呢？**     
**A**: 私有部署版默认账号密码、默认验证码、以及默认 AccessKey / SecretKey 均涉及 CloudCanal 系统数据安全问题。推荐正式环境使用时，务必进行修改。

