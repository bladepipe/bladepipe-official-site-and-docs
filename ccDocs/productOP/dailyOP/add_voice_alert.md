---
id: add_voice_alert
title: 配置语音告警
description: 介绍如何配置 CloudCanal 语音告警
---

CloudCanal 具备发送语音告警能力，该能力强依赖阿里云语音服务。

本文档即介绍如何配置阿里云语音服务实现 CloudCanal 语音告警能力。

### 开通阿里云语音服务

- [登录阿里云控制台](https://www.aliyun.com/) 。
- [新增资质](https://dyvms.console.aliyun.com/qualification/common) 。

### 添加模版
- **语音消息** > **语音通知** > [添加模版](https://dyvms.console.aliyun.com/call/notify/addt2v) 。
- CloudCanal 语音告警支持 **任务延迟** 和 **延迟恢复** 通知，示例模版如下，内容可适当变化（以增加通过概率)，但参数不能变。
  - 任务延迟通知

  ```shell
  您使用的CloudCanal实例延迟${delaySecond}秒，实例数字id:${jobId}，请及时处理
  ```
  
  - 延迟已恢复通知

  ```shell
  您使用的CloudCanal实例延迟已恢复，实例数字id:${jobId}
  ```

- 上述 2 个模版通过之后，分别获取 **模版ID** ，如 TTS_11111111 , TTS_2222222。

### 设置偏好
- 主账号登录 CloudCanal 控制台。
- **系统配置** > **CloudCanal** Tab 页 > **标签** 筛选 **CC_MOBILE_ALERT**。
- 分别配置 **taskErrorMobileTc**、**taskRecoverMobileTc**、**mobileAccessKey**、**mobileSecretKey** 参数。

### 设置任务告警

参考 [配置任务告警](../../operation/job_manage/job_op/job_alarm.md) 文档。

### Tips
- 延迟告警只在任务增量追上之后才会触发。
- 延迟恢复通知只在有延迟告警情况下，根据条件触发。