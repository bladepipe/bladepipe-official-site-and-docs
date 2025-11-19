---
id: solve_structure_migration_error
title: 跳过结构迁移异常
description: 本文介绍如何跳过结构迁移异常
---
本文介绍如何跳过结构迁移异常。

## 现象描述
结构迁移任务出现异常标识 ![1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/console_job/1.png)，并提示:
“**存在异常的后台任务，请点击处理。**”

## 问题排查
结构迁移对于某些数据类型不支持或出现 BUG（可以在社区反馈），需要跳过当前的异常。

## 解决方法
1. 进入 [结构迁移日志](../operation/job_manage/job_op/job_log.md) 页面，找到异常的 DDL 语句。
2. 复制异常的 DDL 语句，根据实际情况修改为正确的 DDL 语句，并在目标数据库上执行修改后的 DDL 语句。
3. 回到任务列表页，点击任务名旁边的 ![1](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/console_job/1.png) 图标，然后在失败的异步任务右上角点击 **重试**。
  

