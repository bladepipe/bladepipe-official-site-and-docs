---
id: solve_login_empty_key_error
title: 升级 4.x 后登录提示 Empty key
description: 本文介绍 安装/升级 4.x 后登陆提示 Empty key 报错的解决方法
---

## 现象描述
登录页面出现 Empty key 异常信息，如下图:
![solve_login_empty_key_error](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/solve_login_empty_key_error_01.png)

## 问题排查
Console 控制台配置文件中未设置 **jwt.secret** (系统登录验证算法的密钥，可以是一个64位随机码)。

### 解决方法
设置 Console 控制台参数 **jwt.secret**。具体操作请参考 [修改 Console 控制台配置](../productOP/dailyOP/change_console_config.md)。
