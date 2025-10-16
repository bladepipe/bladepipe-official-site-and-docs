---
id: set_ssh_tunnel
title: 配置 SSH 隧道访问
---
CloudCanal 支持通过 SSH 隧道方式访问数据源。本文简要介绍如何通过 CloudCanal 设置隧道访问信息。

## 支持的数据源
- **自建数据源**：MySQL、MariaDB、PostgreSQL、Greenplum、StarRocks、Doris、SelectDB(非阿里云托管)、ClickHouse、OpenGauss
- **阿里云数据源**：Aliyun RDS for MySQL/PostgreSQL、Aliyun PolarDB for PostgreSQL、Aliyun ADB for PostgreSQL
- **AWS 数据源**：AWS Aurora for MySQL/PostgreSQL、AWS RDS for MySQL/MariaDB/PostgreSQL
- **Azure 数据源**：Azure for MySQL/MariaDB/PostgreSQL

## 准备跳板机
准备一台低配（如 1 核 1 GB 内存）虚拟机，确保：
  - 该虚拟机可被 CloudCanal 迁移同步节点 SSH 访问。
  - 该虚拟机可访问目标数据库。

## 配置 SSH 隧道访问
### 添加数据源时配置
1. 登录 CloudCanal 平台，点击 **数据源管理** > **新增数据源**。
2. 填写所支持数据源的基本信息，**网络地址** 使用跳板机能访问的地址即可。
    :::warning
    添加过程中，**请不要点击测试连接**。
    :::
3. 修改额外参数：
     - **proxyMode**：修改为 **SSH**。
     - **remoteProxyIp**：修改为 CloudCanal 迁移同步节点能够访问的跳板机地址。
     - **remoteProxyPort**：修改为跳板机 SSH 登录端口，默认为 22。
     - **remoteProxyAccount**：修改为通过 SSH 登录跳板机的账号名。
     - **remoteProxyPwd**：修改为通过 SSH 登录跳板机的密码。
4. 点击 **新增数据源**。
5. 列表页找到新添加的数据源，点击 **操作** > **测试连接** 验证连通性。

### 为已添加的数据源配置
1. 在数据源列表页面，点击 **操作** 栏中的 **更多** > **修改数据源参数**。
2. 修改以下参数：
     - **proxyMode**：修改为 **SSH**。
     - **remoteProxyIp**：修改为 CloudCanal 迁移同步节点能够访问的跳板机地址。
     - **remoteProxyPort**：修改为跳板机 SSH 登录端口，默认为 22。
     - **remoteProxyAccount**：修改为通过 SSH 登录跳板机的账号名。
     - **remoteProxyPwd**：修改为通过 SSH 登录跳板机的密码。
3. 点击 **生效配置**。
4. 列表页找到修改参数的数据源，点击 **操作** > **测试连接** 验证连通性。

## 添加访问白名单
### 获取机器 IP 列表
- **私有部署** 或 **SaaS 的 BYOC 模式**
  1. 登录 CloudCanal 平台，点击 **同步设置** > **同步机器**。
  2. 选择对应集群并点击 **机器列表**。
  3. 逐个机器点击描述旁的 ![](../../assets/set_ssh_tunnel/1.png) 图标，查看 **公网信息** 获取出口 IP。

- **SaaS 的全托管模式** 
  1. 登录 CloudCanal 平台，点击 **同步设置**。
  2. 选择对应集群并点击 **机器 IP 列表**。

### 添加跳板机白名单
通过以下任意方式，在跳板机的白名单中添加 CloudCanal 机器 IP。
- 通过 ip table 限制访问机器 IP 列表。
- 公共云通过安全组限制访问 SSH 端口的机器 IP 列表。