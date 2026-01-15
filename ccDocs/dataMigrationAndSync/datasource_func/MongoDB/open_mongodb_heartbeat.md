---
id:  open_mongodb_heartbeat
title: 打开 MongoDB 源端心跳
description: 数据同步任务增量阶段，如果源端数据长时间没有变更，页面会提示延迟增加，需要开启心跳功能，让页面正确显示延迟时间
---

本文介绍增量数据同步阶段，在源端无任何写入的情况下，如何开启心跳功能，让页面正确显示延迟时间。

:::info
本文也同样适用于 阿里云 MongoDB、AWS DocumentDB、MongoDB Atlas。
:::

## 简述

MongoDB 作为源端的数据同步场景中，如果长时间无变更，会导致页面显示延迟。

通过开启心跳功能，**定时生成新的更新事件**，从而使延迟时间显示正常。

## 前置条件

- CloudCanal 版本 >= 4.4.3.0
- 源端数据源账号需要具有 **UPDATE** 权限，心跳集合可通过参数 **dbHeartbeatCollection** 修改。
- 任务配置中 **增量源端模式** 为 **CHANGE_STREAM**（即确认源端 [数据源配置](../../../operation/job_manage/job_op/job_params#操作步骤) **captureMode** 参数值为 **CHANGE_STREAM**）。

## 操作步骤

1. 进入任务详情页，点击 **功能列表** > **修改参数**。
2. 选择 **源数据源配置** 页签，修改以下参数值：
    - 参数 **dbHeartbeatEnable** 设置为 true。
    - 参数 **dbHeartbeatCollection** 设置为 **test.__cc_hb_collection**（该集合可自定义）。
3. **准备源端集合**：
   1. 源端 MongoDB 创建 **test.__cc_hb_collection** 集合。
   2. 确保同步账号拥有对该集合的 **UPDATE** 权限。
4. 返回 CloudCanal 页面，在右上角点击 **生效配置**。


