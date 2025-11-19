---
id: create_feishu_group
title: 创建飞书告警机器人
---

## 下载飞书
1. [下载飞书](https://www.feishu.cn/download) 并安装，如已安装则略过。
2. 注册或登录，如已登录则略过。
## 创建飞书群
在飞书首页点击 `➕`，并创建群组，群模式选择 "对话"。
![feishu_group_1.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_feishu_group/feishu_group_1.png)

## 创建机器人
在群聊中依次点击 `···` > **设置** > **群机器人** > **添加机器人**，选择自定义机器人并添加。
![create robot](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_feishu_group/feishu_group_2.gif)

## 获取机器人 webhook
在添加机器人的页面选择刚创建的机器人，复制 webhook 地址。
![feishu_group_3.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_feishu_group/feishu_group_3.png)

## 创建成功
创建成功后，依照 [配置告警](./alarm_conf.md#im-告警方式) 中的步骤，在配置中填写 webhook 等信息，并验证 IM 告警。
![feishu_group_4.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_feishu_group/feishu_group_4.png)