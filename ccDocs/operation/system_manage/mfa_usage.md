---
id: mfa_usage
title: 使用 MFA 
description: 本文档介绍 CloudCanal 的 MFA 功能
---
## 2FA 简介

2FA (双因素认证，Two-Factor Authentication) 是 MFA(多因素认证，Multi-Factor Authentication) 的一种具体实现。

2FA 通常可以基于时间的一次性密码算法（TOTP, Time-based One-time Password Algorithm）完成认证，在一定时间误差范围之内，用户设备计算的值和服务器计算的值一致，则认为验证通过。

该算法不需要联网，也不需要在计算当前值时进行客户端服务器端交互，所以比短信更加安全（短信有被拦截风险）。

## 适用范围

CloudCanal 2FA 主要应用在 **私有部署版本** 的 **用户登录** 阶段。在输入用户名密码或验证码正确之后，如已开启 MFA ，则还需要输入 **Authenticator** 应用生成的 code 进行第二阶段认证。

当前同时支持 **主子账号** 单独设置，认证应用支持 **Microsoft Authenticator** 或 **Google Authenticator** 。

## 开启 MFA

1. 登录 CloudCanal 控制台。
2. 点击 **配置** > **个人资料** > **安全**。
3. 点击 **开启** 按钮，使用 **Authenticator** 软件扫描二维码，应用中出现 **CloudCanal** 项。
4. 填写最新的 6 位数 code 并确定，开启成功。

## 使用 MFA

1. 进入 CloudCanal 控制台并 **填写用户名、密码**，点击确定。
2. 查看 **Authenticator** 软件，输入 CloudCanal 项 6 位数 code，验证成功则登录成功。
    :::info
    第 2 步有 120 秒超时限制，如超时，请回到登录页重新输入用户名、密码。
    :::

## 关闭 MFA

1. 登录 CloudCanal 控制台。
2. 点击 **配置** > **个人资料** > **安全**。
3. 输入 CloudCanal 项 6 位数 code，验证成功则关闭当前账号 MFA。
4. 删除 Authenticator 软件中 **对应项**。

## 重置 MFA

1. 登录 CloudCanal 控制台。
2. 点击 **配置** > **个人资料** > **安全** 。
3. 点击 **重置** 按钮，使用 Authenticator 软件扫描二维码，应用提示 CloudCanal 名字重复，可换成另外的名字添加。
   :::info
   若名字重复，**先不要删除 Authenticator 旧有项**。如先删除，重置页面跳出，将无法重置 code，此时也未关闭 MFA，只能通过订正账号元数据修正。
   :::
4. 填写最新的 6 位数 code 并确定，重置成功。
5. 删除 Authenticator 软件中 **旧有项**。 

## FAQ

**Q:** 如果我开启了MFA，但是 **手机丢了/换了**、**Authenticator 应用 CloudCanal 项删除了** 或者 **Authenticator 应用删除了** 怎么办？

**A:** 如果 CloudCanal 处于登录状态，可以通过上述 **重置 MFA** 操作重新初始化 MFA。如果未登录 CloudCanal，则需要登录 CloudCanal 元数据库 clougence_rdp，修改 rdp_user 表相应用户记录 use_mfa 字段为 0，并删除 rdp_user_mfa 表中相应用户的记录。