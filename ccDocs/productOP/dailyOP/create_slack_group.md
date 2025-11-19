---
id: create_slack_group
title: 创建 Slack 告警机器人
---
CloudCanal 通过对 Slack 频道集成 **Incoming WebHook** 应用并配置 webhook，发送告警信息到指定的 Slack 频道中。本文档简要介绍如何获得有效 webhook 以供使用。

### 安装 Slack

1. [下载Slack](https://slack.com)，并安装，如已安装则略过。
2. 注册或登录，如已登录则略过。


### 创建 Slack频道

1. 创建频道。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_slack_group/1.png)

2. 设置可见性。  
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_slack_group/2.png)


### 集成 Incoming WebHook 应用

1. 添加应用。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_slack_group/3.png)

2. 安装集成 Incoming WebHook。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_slack_group/4.png)
 
3. 添加到 Slack。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_slack_group/5.png)
  
### 获取 webhook

1. 配置 WebHook。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_slack_group/6.png)

2. 获取到 Webhook URL。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_slack_group/7.png)
  

### 创建成功

创建成功后，依照 [配置告警](./alarm_conf.md#im-告警方式) 中的步骤，在配置中填写 webhook 等信息，并验证 IM 告警。
![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_slack_group/8.png)
