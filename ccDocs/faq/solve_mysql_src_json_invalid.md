---
id: solve_mysql_src_json_invalid
title: MySQL 源端 JSON 写入异常
description: 本文介绍MySQL源端JSON写入异常的解决方法
---

## 现象描述
MySQL 源端同步任务中断，日志中出现 
```
Caused by: com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: 
Invalid JSON text: The document root must not be followed by other values.
```

## 问题排查
JSON 字段值中特殊字符没有转义，导致 JSON 数据被截断。

## 解决方法
1. 进入任务详情页面，点击 **功能列表** > **修改参数** > **源数据源配置**，设置参数 **needJsonEscape** 为 true。
   ![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/invalid_json_src_mysql.png)
2. 点击右上角 **生效配置** 并确认。
