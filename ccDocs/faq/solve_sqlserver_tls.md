---
id: solve_sqlserver_tls
title: SQL Server 出现 TLS10 报错
description: 本文介绍使用 CloudCanal 添加数据源或创建同步任务后 出现 TLS 错误的解决方法
---
本文介绍添加数据源或创建同步任务后，出现 TLS 错误的解决方法。

## 现象描述
新增数据源或创建任务后任务启动时出现 TLS 错误。
![data_task_delay](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/solve_sqlserver_tls.png)

## 问题排查
- Microsoft SQL Server 驱动默认启用 SSL 加密通信。
- 较早期部署的 Microsoft SQL Server 数据库不支持 TLS 1.2 算法。
- 由于 TLS 1.0/1.1 存在多个漏洞，已经被标记为不安全，因此 JDK 默认禁用了它们，导致报错。

## 解决方法

### 方法一
1. 进入 cloudcanal-sidecar，cloudcanal-console 容器（tgz 部署则进入对应的物理机）。
2. 编辑文件 $JAVA_HOME/jre/lib/security/java.security (find / -name "java.security")。
3. 修改 `jdk.tls.disabledAlgorithms=` 后面的值，删除 TLSv1, TLSv1.1 和 3DES_EDE_CBC。
4. 重启 Console / Sidecar 进程。

### 方法二

使用 SQL Server 2017 及以上版本。

### 方法三

安装 <a href="https://learn.microsoft.com/zh-CN/troubleshoot/sql/database-engine/connect/tls-1-2-support-microsoft-sql-server">微软 SQL Server TLS 1.2 安全更新补丁</a>。
