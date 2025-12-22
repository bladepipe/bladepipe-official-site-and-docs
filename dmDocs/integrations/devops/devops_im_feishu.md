---
id: devops_im_feishu
title: 飞书消息机器人
description: 本文档主要介绍使用飞书消息机器人作为 CloudDM 的 IM 消息服务。
---

在使用数据库 CI/CD 时，CloudDM 能够对发布流、项目设置及变更进行监控，并随着这些状态的变化可以及时发送通知消息。
这使得用户能够迅速感知到项目的变动，尤其是在项目发布过程中更为重要。


使用飞书作为消息服务需要三个步骤：
1. 创建消息机器人
2. 添加飞书为 CloudDM 的消息服务
3. 在项目中配置消息订阅。

## 添加消息服务 {#create}

1. 参考飞书 [**在群组中使用机器人**](https://www.feishu.cn/hc/zh-CN/articles/360024984973-%E5%9C%A8%E7%BE%A4%E7%BB%84%E4%B8%AD%E4%BD%BF%E7%94%A8%E6%9C%BA%E5%99%A8%E4%BA%BA) 指南创建自定义机器人。
2. 在自定义机器人配置页面，查看 WebHook地址和密钥：
   ![common](../../assets/integrations/devops/devops_im_feishu/1.png)
3. 在 CloudDM 的 **IM消息服务提供者** 配置页面中新增 **飞书** 类型的提供者。
   ![common](../../assets/integrations/devops/devops_im_dingtalk/3.png)
   ![common](../../assets/integrations/devops/devops_im_feishu/4.png)


## 配置消息订阅 {#config}

1. 在服务消息添加完毕后，在 CI/CD 的项目中可以通过点击 “消息配置” 图标进行配置。
  ![common](../../assets/integrations/devops/devops_im_feishu/5.png)
- 消息配置图标状态解释：
  - 已配置，![w138_h29](../../assets/integrations/devops/devops_im_feishu/im-set1.png)
  - 未配置，![w83_h29](../../assets/integrations/devops/devops_im_dingtalk/im-set2.png)