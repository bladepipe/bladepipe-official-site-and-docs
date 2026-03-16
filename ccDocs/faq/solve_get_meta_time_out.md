---
id: solve_get_meta_time_out
title: 获取元信息超时
description: 本文介绍 CloudCanal 创建任务获取元信息超时的解决方法
---

## 现象描述

**创建任务**、**修改订阅**、**查看库表映射** 出现 SocketTimeoutException，日志中出现
```
远程获取数据表的元信息失败。错误信息为：invoke rcontroller method failed.Request id:6f2888ca-d16a-11ee-8b0d-81c0e706f1d8msg:SocketTimeoutException: Read timed out. target sidecar is 172.31.238.4, route name is mysql_rdbLoadColumns
```

## 问题排查
数据源表字段数量过多，Console 默认元信息获取时间默认为 60s，导致 SocketTimeoutException。

## 解决方法
修改 Console 控制台参数 **console.config.metadata.fetch.socket_timeout_ms**（默认 60 秒）。

具体操作参考：[修改 Console 控制台配置](../productOP/dailyOP/change_console_config.md)
