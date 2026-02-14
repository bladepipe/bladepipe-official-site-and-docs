---
id: alarm_conf
title: Configure Alert Methods
description: This page guides you to configure alert notification via Email and IM, so that users can be notified instantly.
---
This page describes how to configure different tools to send alert notifications.

## Prerequisites
To send DataJob alert notifications and Worker notifications in BladePipe, it is required to complete the system alert configuration in advance. The currently supported ways to send alert notifications, tools, and preparation are shown in the following table:

| Tool | Preparation |
| :-- | :-- |
| Email | See [Config the e-mail](#e-mail) |
| Slack | See [Create a Slack Bot](./create_slack_group.md)|
| Slack | See [Create a Discord Bot](./create_discord_group)|
| Webhook |See [Create a  Webhook](./create_custom_alarm) |

## Procedure

### E-mail
1. Click **Settings** > **Preference**.
2. Configure the following parameters for the mail server to send alert notifications:
   
| Parameter | Description |
| :-- | :-- |
| ***emailHost*** | SMTP server IP or domain name |
| ***emailPort*** | SMTP port |
| ***emailUserName*** | Email address |
| ***emailPwd*** | Authorization code or mailbox password |
| ***emailSmtpAuth*** | Enable SMTP authentication |
| ***emailEnableTls*** | Enable TLS for SMTP |
| ***emailRequiredTls*** | Require TLS for SMTP |
| ***emailEnableSsl*** | Enable SSL for SMTP |
| ***emailProtocol*** | Type of email protocol |
  
3. Click **Verify email server** at the bottom of the page. If you receive the verification message, it means the configuration is completed.

:::tip
The email address that receives alert notifications is the email address you filled in when registering. If you need to view or change it, please click the profile picture in the upper right corner of the page > **Account Center**.
:::

### IM
1. Click **Settings** > **Preference**.
2. Configure the following parameters for the IM tool to send alert notifications:
   
| Parameter | Description |
| :-- | :-- |
| ***alertImType*** | Set the IM tool. Currently, Slack and Discord are supported, You can also set a custom alert bot. |
| ***defaultImAlertUrl*** | Configure a webhook to send common alert notifications |
| ***criticalImAlertUrl*** | Configure a webhook to send critical alert notifications |
| ***taskAlertInhibitMin*** | Configure the alert notification interval, that is, the interval between alert notifications for the same DataJob exception or latency, or the same alert content. The unit is minutes, and the default is 5 minutes. |
| ***webHookProxyHost*** | Configure the http proxy for webhook |

3. Click **Verify IM Alarm** at the bottom of the page. If you receive the verification message, it means the configuration is completed.

:::tip
This alert configuration applies to the current user. Please configure it in time after registering a new account.
:::