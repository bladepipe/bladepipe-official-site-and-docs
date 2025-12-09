---
id: skip_ddl_error
title: 跳过 DDL 同步异常
description: 当任务因为 DDL 异常无法继续同步，且这些异常可以被略过时，可以采取跳过 DDL 异常，使得任务继续同步，不影响后续的数据写入对端。
---

## 功能说明

当任务因为 DDL 同步到对端出现异常而中断时，可以采取手动变更对端结构，并跳过 DDL 同步异常，使得任务恢复正常。

## 操作说明

1. 目标端数据库手动执行 DDL 语句。
2. 返回 CloudCanal 控制台，进入任务详情页，点击 **功能列表** > **修改任务参数**。
3. 选择 **核心任务配置** 页签，搜索 **ddlExceptionSkip**，修改参数值为 **true**。
  ![apply_exception_skip](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/skip_ddl_error/ddl_exception_skip.png)
4. 点击 **生效配置**，修改成功，任务将自动忽略 DDL 写入异常。
5. 跳过报错后，设置参数 **ddlExceptionSkip** 参数值为 **false**。
