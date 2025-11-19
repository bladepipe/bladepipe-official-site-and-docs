---
id: solve_db_connect_fail
title: 数据源测试连接失败
description: CloudCanal 添加数据源或创建任务时，有时候会因为各种原因导致测试链接失败。本文介绍失败后如何排查。
---

## 现象
- 添加数据源或创建任务时，点击测试链接失败
  ![test_connection](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/test_connection_failed.png)

## 排查
### 原理
- 真正链接数据库的是 sidecar
![test_connection_desc](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/test_connection_desc.png)

### 步骤
- **CloudCanal控制台** > **监控管理** > **异常监控**。
  ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/monitor_sidcar_error.png)

- 查看堆栈，确认是否由 **host信息错误**、**账号密码错误**、**网络原因(端口白名单、防火墙等)** 导致。
- 登录 **sidecar** 节点，链接数据库，看能否连通。
