---
id: debug_customer_code
title: 自定义代码 Debug
description: 如果你是一名 Java 开发人员，使用 CloudCanal 自定义代码时遇到问题，可以通过开启 CloudCanal 的 debug 模式来调试，任务启动后将自动等待 debug 连接。
---
Java 开发人员使用 CloudCanal 自定义代码时若遇到问题，可以开启 CloudCanal 的 debug 模式来调试。

## 操作步骤

1. 在任务详情页点击 **功能列表** > **参数修改**。
2. 在 **任务核心配置** 页签下修改 ***debugMode*** 参数值为 **true**。
3. 确认 *debugPort* 参数为 8787（默认值），一般不需要修改。
4. 点击页面右上角 **生效配置** > **确认**。如任务处于运行状态，将自动重启任务。如不处于运行状态，则需手动重启任务。任务启动后将会停止并等待远程 debug 客户端连接。
5. 使用 IDE 进行远程 debug（以 IDEA 为例），设置任务运行地址：
    - Docker 部署：18787（默认将 8787 映射到外部的 18787 端口）
    - Kubernetes 部署：32727（默认将 8787 映射到外部的 32727 端口）
    - TGZ 部署：8787
      ![Debug Code Config](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/create_process_job/debug_code_config.png)

## 注意事项
调试完毕后请重新修改参数 *debugMode* 为 false 并重启任务，否则该任务会无法正常运行。
