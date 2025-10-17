---
id: solve_sr_dr_dst_writer_http_host
title: StarRocks/Doris/SelectDB 目标端写入报错
description: 本文介绍 StarRocks / Doris / SelectDB 目标端写入报错的解决方法
---
本文介绍 StarRocks/Doris/SelectDB 目标端写入报错的解决方法。

## 现象描述
StarRocks/Doris/SelectDB 测试连接成功，但同步任务中断，日志中出现如下错误：
```
async flush data to doris failed,try to exist task, msg:UnknownHostException: null: Name or service not known java.net.UnknownHostException: null: Name or service not known
```

```
async flush data to starrocks failed, msg:ConnectException: Connection timed out (Connection timed out)
org.apache.http.conn.HttpHostConnectException: Connect to 172.20.0.5:8040 [/172.20.0.5] failed: Connection timed out (Connection timed out)
```


## 问题排查
- 连接测试：CloudCanal 通过 JDBC 测试连接和获取元信息，默认使用 FE MySQL Server 端口（ip:9030）。
- 数据写入：CloudCanal 使用 [StreamLoad](https://docs.starrocks.io/zh/docs/sql-reference/sql-statements/data-manipulation/STREAM_LOAD/) 将数据写入 StarRocks / Doris / SelectDB，默认使用以下端口之一：
  - FE HTTP Server：ip:8030
  - BE HTTP Server：ip:8040

## 解决方法

### 方法一：新增数据源
1. 点击 **数据源管理** > **新增数据源**。
2. 数据库类型选择 **StarRocks**/**Doris**/**SelectDB**。
3. 设置 Client 地址（内网/外网），填写 ip:9030（FE MySQL Server 端口默认为 9030）。
1. 设置 **额外参数** 中 *privateHttpHost* / *publicHttpHost*（根据 Client 的内网/外网）：
   - 填写 ip:8030（FE HTTP Server 端口默认为 8030）
     :::info
     实际数据同步中，FE 可能会返回一个 BE 地址，该地址可能是内网 IP 或不可解析的 Hostname 导致同步任务报错。
     :::
   - 或填写 ip:8040（BE HTTP Server 端口默认为 8040）

### 方法二：修改已有数据源
1. 点击 **数据源管理**。
2. 选择 **StarRocks**/**Doris**/**SelectDB** 数据源，点击右侧操作栏 **更多** > **查看配置**。
3. 修改参数 *privateHttpHost* / *publicHttpHost*（根据 Client 的内网/外网）：
   - 填写 ip:8030（FE HTTP Server 端口默认为 8030）
     :::info
     实际数据同步中，FE 可能会返回一个 BE 地址，该地址可能是内网 IP 或不可解析的 Hostname 导致同步任务报错。
     :::
   - 或填写 ip:8040（BE HTTP Server 端口默认为 8040）
4. 进入任务详情页，点击 **功能列表** > [**参数修改**](../operation/job_manage/job_op/job_params.md) > **目标数据源配置**，将参数 *httpHost* 修改为上一步填写的 *privateHttpHost* / *publicHttpHost*。
