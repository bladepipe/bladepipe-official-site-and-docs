---
id: solve_upgrade_console_failed
title: Console 启动出现 Console cluster uid is null 异常
description: 本文介绍 Console 启动出现 Console cluster uid is null 异常如何解决
---
本文介绍 Console 启动时出现 “Console cluster uid is null” 异常的解决方法。

## 现象描述
CloudCanal 升级到最新版本后，Console 启动失败，日志中出现如下错误：
```
[Cc Console Fix] Console node uid is null, please check console config name: console.config.node.uid
```

## 问题排查
新版本 CloudCanal Console 必须配置 console.config.node.uid 作为 Console 实例的唯一标识。

## 解决方法
1. [修改 Console 配置文件](../productOP/dailyOP/change_console_config.md)，新增 console.config.node.uid 配置项。     
   例: `console.config.node.uid=cloudcanal-console-1`
2. [重启 Console 服务](../productOP/dailyOP/operate_compose.md)。

:::info
  console.config.node.uid 配置为 Console 实例标识，可以填写任意字符串，不同的 Console 实例请勿重复使用，否则将启动失败。
:::
