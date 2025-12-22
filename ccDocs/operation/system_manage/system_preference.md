---
id: preference
title: 设置个人偏好
description: 本文档介绍 CloudCanal 上如何设置个人偏好
---
CloudCanal 支持设置创建任务的偏好以及设置告警等高级功能。本文介绍如何设置个人偏好以及目前支持的参数分类及用途。

## 设置个人偏好
1. 点击 **配置** > **个人偏好**，进入个人偏好页面。
2. 选择需要修改的参数，点击 **修改后的参数值** 一列中的 ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/account_and_auth/4.png) 或 ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/account_and_auth/3.png) 图标，修改参数值。参数值范围可参考 **可修改范围**。
   
   :::info
   如果参数是 **待创建** 的状态，说明该参数从未进行过设置。
   :::
3. 点击页面右上角 **保存** 则修改成功。
   
   :::warning
   个人偏好下的配置将应用于主账号以及属于该主账号下的所有子账号，请谨慎修改。
   :::

## 参数分类

### 通用参数
- **COMMON**：设置系统默认语言等。
- **SECURITY**：子账号相关设置。详情请参考 [主子账号与权限](../system_manage/account_and_auth/account_and_auth.md)。
- **LDAP_CONFIG**：LDAP 身份认证相关配置。详情请参考 [OpenLDAP 身份认证](../system_manage/sso/sso_ldap.md)。
- **DINGTALK**：钉钉身份认证相关配置。详情请参考 [钉钉身份认证](../system_manage/sso/sso_dingtalk.md)。
- **FEISHU**：飞书身份认证相关配置。详情请参考 [飞书身份认证](../system_manage/sso/sso_feishu.md)。
- **WECHAT**：企业微信身份认证相关配置。详情请参考 [企业微信身份认证](../system_manage/sso/sso_wechat.md)。
- **OIDC**：OIDC 身份认证相关配置。详情请参考 [OIDC 身份认证](../system_manage/sso/sso_oidc.md)。
- **EMAIL_CONFIG**：设置发送告警的邮箱的相关配置，详情请参考 [配置告警](../../productOP/dailyOP/alarm_conf.md)。

### CloudCanal
- **CC_IM_ALERT**：即时通讯软件（IM）告警相关设置。详情请参考 [配置告警](../../productOP/dailyOP/alarm_conf.md)。
- **CC_SMS_ALERT**：短信告警相关设置。详情请参考 [配置短信告警或验证码](../../productOP/dailyOP/add_sms_alert.md)。
- **CC_MOBILE_ALERT**：语音告警相关设置。详情请参考 [配置语音告警](../../productOP/dailyOP/add_voice_alert.md)。
- **CC_FUNCTION**：创建同步任务时的偏好设置。配置后会默认覆盖到创建的任务配置中。
- **COMMON**：结构迁移属性配置等。