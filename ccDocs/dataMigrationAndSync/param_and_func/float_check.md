---
id: float_check
title: 浮点数校验参数设置
description: 介绍如何设置参数，以正确校验 float/double 类型数据。
---

## 功能说明

浮点类型数据(e.g.,float/double)因其存储特性，读取后存在不准确问题(e.g.,float 数据 3.78, 读取出来后为 3.79999999)。

为了正确校验此类数据，CloudCanal 提供任务参数 **checkFloatNumScale** 人为设定精度，校验时同时规整源对端数据(固定精度四舍五入)，从而达成目的。

## 前置条件

CloudCanal 版本 >= 4.2.1.0 。

## 步骤

1. 登录 CloudCanal 控制台。
2. 点击对应校验任务 **详情** > **功能列表** > **修改任务参数**。
3. 选择 **任务核心配置** 页签。修改 **checkFloatNumScale** 参数，设置最大有效小数位（和业务相关，如保证 5 位小数有效则设置 5）。
   ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/float_check/float_check.png)
4. 点击 **生效配置**，重启任务。
