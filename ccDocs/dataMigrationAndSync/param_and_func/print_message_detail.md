---
id: print_message_detail
title: 打印消息详情
description: 用户需要排查数据同步问题时，可以启用相关参数，打印消息详情。
---

## 功能说明
排查数据问题时，有时需要查看数据详情，此时可以启用相关参数进行打印。

打印数据详情可能会大量占用磁盘空间，线上环境谨慎开启，事后请及时关闭以免造成磁盘空间浪费。

## 操作说明

1. 进入任务详情页，点击 **功能列表** > **修改参数**。
2. 选择 **目标数据源配置** 页签，搜索 **printDataInLog** 并将该参数值设置为 **true**。
  ![print_data_to_log](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/print_data_to_log/print_data_to_log.png)
1. 点击 **生效配置**，修改成功。
2. 任务重启后，任务主日志中出现字符串 [HANDLE DATA] 开头的数据。
