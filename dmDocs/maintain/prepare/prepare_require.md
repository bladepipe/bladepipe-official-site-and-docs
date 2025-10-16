---
id: prepare_require
title: 依赖项
description: 本文档主要介绍在 CloudDM Team 产品安装时对软件/硬件及操作系统的要求。
---

本文档主要介绍在 CloudDM Team 产品安装时对软件/硬件及操作系统的要求。

## 硬件环境

:::info
- 不同 CPU 架构的安装包在下载时提供不同下载链接，请注意分辨。
- 硬件配置跟随实际负载而变化，推荐配置中已留有少许余量。
:::

#### CPU架构

支持的 CPU 架构
- x86
- arm64v8

#### 推荐配置
- 处理器：4核
- 内存：16GB
- 硬盘：120GB


## 操作系统
:::info
- CloudDM Team 采用 Java 技术开发并使用 bash 编写启动脚本，通常大多数 Linux 操作系统都可以满足需求。
:::

已经过验证的操作系统
- CentOS/RHEL
- Ubuntu
- MacOS

## 软件环境

根据部署方式不同软件环境要求分为 **容器化部署**、**安装包部署** 两个类别。

#### 容器化部署

- 安装 docker 和 docker-compose 请参考 Docker 官方网站 **[安装手册](https://docs.docker.com/engine/install/)**。
- CloudDM Team 容器化安装脚本对 Docker 的版本要求是 `17.+`。

#### 安装包部署

- 安装 JDK，推荐使用 OpenJDK，最低版本为 `1.8+`。
- 准备一个 MySQL 要求版本 `8.0+`，用于存放 CloudDM Team 数据。

## 网络端口

部署前请确保以下端口未被占用。

#### 容器化部署

| 容器              | 端口    | 用途                      |
|-----------------|-------|-------------------------|
| clouddm-mysql   | 26000 | 元数据库 MySQL 对外映射端口       |
| clouddm-console | 8008  | Console 和 Sidecar 的通信端口 |
| clouddm-console | 8222  | Console Web控制台端口        |

#### 安装包部署

| 组件              | 端口      | 用途                                         |
|-----------------|---------|--------------------------------------------|
| clouddm-console | 8008    | Console 和 Sidecar 的通信端口                    |
| clouddm-console | 8222    | Console Web控制台端口                           |
| MySQL 数据库       | 3306    | 确保 Console 服务所在的服务器可以访问 CloudDM Team 的元数据库 |
