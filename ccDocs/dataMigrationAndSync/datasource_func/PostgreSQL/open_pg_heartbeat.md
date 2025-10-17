---
id:  open_pg_heartbeat
title: 打开 PostgreSQL 源端心跳
description: 数据同步任务增量阶段，如果源端数据长时间没有变更，页面会提示延迟增加，需要开启心跳功能，让页面正确显示延迟时间
---
:::info
本文档同样适用于 PostgreSQL 系数据源。
:::

本文介绍增量数据同步阶段，在源端无任何写入的情况下，如何开启心跳功能，让页面正确显示延迟时间。

## 简述

PostgreSQL 作为源端的数据同步场景中，如果长时间无变更，会导致页面显示延迟。

通过开启心跳功能，**定时生成新的更新事件**，从而使延迟时间显示正常。

## 前置条件

- CloudCanal 版本 >= 4.4.0.0。
- 源端数据源账号需要具有 **UPDATE** 权限。

## 操作步骤

### CloudCanal 版本 >= 4.4.0.0 且 < 4.7.2.0

1. 源端 PostgreSQL 创建心跳表并插入一条数据。
   ```sql
   CREATE TABLE public.__cc_hb_tab (
        gmt_modified date NULL
   ) TABLESPACE pg_default;

   INSERT INTO public.__cc_hb_tab (gmt_modified) VALUES (CURRENT_TIMESTAMP);
   ```
2. 添加心跳表至对应任务的复制槽，并设置表复制属性，其中 **任务ID** 可在任务列表的 **任务ID&描述** 栏查看。
    ```sql
    ALTER PUBLICATION {任务ID}_increment ADD TABLE "public"."__cc_hb_tab";
    ALTER TABLE "public"."__cc_hb_tab" REPLICA IDENTITY FULL;
    ``` 
3. 进入任务详情页，点击 **功能列表** > **修改任务参数**。
4. 选择 **源数据源配置** 页签，修改以下参数值：
     - 参数 **dbHeartbeatEnable** 设置为 true。
5. 在右上角点击 **生效配置**。

### CloudCanal 版本 >= 4.7.2.0

1. 进入任务详情页，点击 **功能列表** > **修改任务参数**。
2. 选择 **源数据源配置** 页签，修改以下参数值：
     - 参数 **dbHeartbeatEnable** 设置为 true。
     - 按需修改参数 **dbHeartbeatTable** 为心跳表的表模式与表名。

     :::info
     对于从 4.7.2.0 以前版本升级而来的任务，为确保参数 **dbHeartbeatTable** 生效，还需修改参数 **dbHeartbeatOp** 为空值。
     :::
3. 源端 PostgreSQL 创建心跳表并插入一条数据。其中 **dbHeartbeatTable** 为 **源数据源配置** 中对应配置的值。
   ```sql
   -- 替换 {dbHeartbeatTable} 为真实值，比如 "public"."__cc_hb_tab"
   CREATE TABLE {dbHeartbeatTable} (
        gmt_modified date NULL
   ) TABLESPACE pg_default;

   -- 替换 {dbHeartbeatTable} 为真实值，比如 "public"."__cc_hb_tab"
   INSERT INTO {dbHeartbeatTable} (gmt_modified) VALUES (CURRENT_TIMESTAMP);
   ```
4. 在右上角点击 **生效配置**。
