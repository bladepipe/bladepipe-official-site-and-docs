---
id: redis_datasource_add
title: 添加 Redis 数据源
description: 本文介绍针对不同的 Redis 部署形态（单节点、Sentinel、分片集群），如何将其添加为数据源。
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

CloudCanal 支持的 Redis 部署形态包括 **单节点**、**分片集群**、**Sentinel**。本文主要介绍针对不同的 Redis 部署形态，如何将其添加为数据源。

## 步骤
1. 点击 **数据源管理** > **新增数据源**。
2. 数据库类型选择 **Redis**。
3. 根据 Redis 部署形态，填写相应的信息。
<Tabs groupId="redismode">
  <TabItem value="single_node" label="单节点" default>
   - **网络地址**：Redis 节点的 IP 和端口，如 `120.55.36.205:8001`。
   - **认证方式**：可选择 **无账号有密码**、**账号密码**、**无**，并填写相关账号/密码。
   - **CA 证书**：如启用 TLS 加密连接，则需将 **额外参数** 中 ***useTLS*** 参数值修改为 true，并上传 CA 证书。
  </TabItem>
  <TabItem value="cluster" label="分片集群">
   - **网络地址**：Redis 集群所有节点或所有 master 节点的 IP 和端口，**以英文逗号分隔**，如 `120.55.36.205:8001,120.55.36.205:8002,120.55.36.205:8003,120.55.36.205:8004`。
   - **认证方式**：可选择 **无账号有密码**、**账号密码**、**无**，并填写相关账号/密码。
   - **CA 证书**：如启用 TLS 加密连接，则需将 **额外参数** 中 ***useTLS*** 参数值修改为 true，并上传 CA 证书。
  </TabItem>
  <TabItem value="sentinel" label="Sentinel">
   - **网络地址**：Redis 节点的 IP 和端口，如 `120.55.36.205:8001`。
   - **认证方式**：可选择 **无账号有密码**、**账号密码**、**无**，并填写相关账号/密码。
   - **CA 证书**：如启用 TLS 加密连接，则需将 **额外参数** 中 ***useTLS*** 参数值修改为 true，并上传 CA 证书。 
   - **额外参数**：
     - *isSentinel*：参数值修改为 true (打开切换开关)，代表当前为 Redis Sentinel 集群。
     - *sentinelUser*：参数值填写用于连接 Sentinel 的用户名。
     - *sentinelPassword*：参数值填写用于连接 Sentinel 的密码。
     - *sentinelMasterName*：参数值填写 Redis Sentinel 配置中指定的 Master Name。
  </TabItem>
</Tabs>

