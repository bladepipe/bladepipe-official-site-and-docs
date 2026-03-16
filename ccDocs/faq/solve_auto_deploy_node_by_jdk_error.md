---
id: solve_auto_deploy_node_by_jdk_error
title: 自动部署/升级节点失败
description: 本文介绍自动部署/升级节点失败的解决方法
---

## 现象描述
**查看机器配置文件**、**自动部署** 页面出现 Unable to initialize due to invalid secret key 报错。   
![solve_jdk_security_fail_01.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/solve_jdk_security_fail_01.png)

## 问题排查
CloudCanal 使用的加密解密方式对 JDK 版本有要求，当前使用 JDK 版本加密解密方式有限制。

## 解决方法
更换 JDK 版本。
  ```shell
  wget -c "https://pc.clougence.com/OpenJDK8_x64_Linux_jdk8u172-b11.tar.gz"
  ```