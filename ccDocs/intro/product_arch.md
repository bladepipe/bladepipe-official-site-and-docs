---
id: product_arch
title: 产品架构
description: 本文主要介绍 CloudCanal 技术架构，包括产品架构、内核架构、容灾方案、网络方案 4 个部分
---

本文主要介绍 CloudCanal 技术架构，包括产品架构、内核架构、容灾方案、混合云网络方案 4 个部分。

## 产品架构

![cloudcanal product arch overview](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/product_arch/product_arch_over_all.png)

- **Console**
  - 集中化的管控服务，以 web 服务集群存在。
  - 承载产品化功能，包括数据源/机器/数据任务生命周期管理、容灾调度、监控告警、元数据管理等。

- **Sidecar** 
  - 部署于具体数据迁移同步机器上。
  - 承担包括获取需要运行的任务配置、启停数据任务进程、收集和上报任务状态、执行任务的健康检查等工作。

- **CloudCanal Core** 
  - 部署于具体数据迁移同步机器上。
  - 执行具体的数据迁移、同步、校验、订正任务。

## 内核架构

![cloudcanal core arch](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/product_arch/core_arch.png)

- **数据源插件**
  - 包含各个数据库、消息、数据仓库等数据源数据读写、元数据获取逻辑和对应驱动。
  - 各个插件通过 Java 类加载机制隔离，任务运行时只加载对应数据源插件。

- **核心**
  - 包含内核代码骨架、操作过滤、元数据映射、DDL 转换、自定义数据处理等部分。

- **支撑**
  - 包含元数据、任务配置、位点、监控指标，以及和管控交互的逻辑。

## 容灾方案

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/product_arch/disaster_tolerate.png)

- **管控容灾**
  - 通过集群化部署解决，有状态部分交由元数据库解决。

- **任务 1 级容灾**
  - Sidecar 进程退出或机器不正常以及网络隔离情况下，**Console** 根据租期和 **Sidecar** 链接状态，进行主动容灾调度。

- **任务 2 级容灾**
  - Sidecar 进程正常，任务进程不正常，**Sidecar** 通过健康监测保障其负责的任务按照管控指定的状态运行，保活或保死。

## 混合云网络方案

![](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/product_arch/network.png)

CloudCanal 为了适应多租户、分布式系统部署要求，采用了多种网络安全措施，确保用户数据和信息安全。

- **单向链接** 
  - Sidecar 节点反向链接 Console , Sidecar 节点**不主动暴露网络信息**。

- **HTTPS 协议**
  - Sidecar 节点和 Console 通信采用 HTTPS 协议，防止盗取并篡改信息。

- **数据不出网络**
  - 所有数据流转均发生在用户内网，数据不流出泄漏。CloudCanal 所有针对数据源的动作均发生在用户网络环境。

- **长连接 AccessKey SecurityKey 认证**
  - 采用 TCP 长连接，每一次连接经过用户独有的 AccessKey 和 SecurityKey 认证。

- **请求验证**
  - Sidecar 每一次请求都经过资源归属验证。

- **操作审计**
  - Sidecar 节点请求 Console 的操作均做审计，可追踪溯源。
