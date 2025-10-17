---
id: http_internet_data_sync_2
description: 介绍 CloudCanal 如何做跨互联网安全数据同步且防循环
title: 跨互联网数据同步进阶
---

## 简介

[CloudCanal](https://www.clougence.com?src=cc-doc-tunnel-sync-upgrade) 推出 [跨互联网安全数据同步](./http_base_internet_data_sync.md) 方案之后，有一些商业客户落地，效果良好，不过客户也反馈了一些改进和新需求，其中最大的一个需求即**双向同步防循环**。

近期 CloudCanal 版本支持了这个特性，整体方案进一步升级，最大特点包括:

- 两端数据库完全不开放公网端口
- 两端数据库可双向同步，无循环
- 两端数据库元数据可映射
- 具备传输安全和鉴权
- 不依赖消息等软件

## 技术点
![image.png](../assets/http_sync_2/http_sync_all_upgrade.png)

### 防循环

我们复用了 CloudCanal 处理 MySQL 双向同步防循环逻辑, 写入对端时, SQL 自动带上 /\*ccw\*/ 标记。

再打开 MySQL **binlog_rows_query_log_events** 参数, 将 binlog DML 事件顺序变成 QueryEvent(TxBegin)、TableMapEvent、RowsQueryLogEvent、WriteRowEvent(IUD)、QueryEvent(TxEnd)。

其中 **RowsQueryLogEvent** 中的 SQL 如果带有 /\*ccw\*/ ,则为循环事件, 进行过滤。从而达到防循环目的。

## 操作示例

### 数据源准备

- 使用阿里云杭州和上海 RDS for MySQL
  - **打开 binlog_rows_query_log_events 参数**,binlog 事件带上原始 SQL
  - 数据库不开公网端口
  - 数据走互联网, 采用 HTTPS 传输和用户名密码认证。

- 初始化两边数据库表结构（如需要）

### CloudCanal 准备

- 杭州环境部署 CloudCanal ，并购买 RDS for MySQL
  ![http_sync_upgrade_1](../assets/http_sync_2/http_sync_upgrade_1.png)
  ![http_sync_upgrade_2](../assets/http_sync_2/http_sync_upgrade_2.png)

- 上海环境部署 CloudCanal , 并购买 RDS for MySQL
  ![http_sync_upgrade_3](../assets/http_sync_2/http_sync_upgrade_3.png)
  ![http_sync_upgrade_4](../assets/http_sync_2/http_sync_upgrade_4.png)

- CloudCanal docker 安装包解压后 ，需 **修改 docker-compose.yml 端口映射再安装/升级**，以 18443 端口为例
  
  ![http_sync_upgrade_5](../assets/http_sync_2/http_sync_upgrade_5.png)

- 开放 ECS 安全组相关端口，以便远程连接，以 18443 端口为例
  
  ![http_sync_upgrade_6](../assets/http_sync_2/http_sync_upgrade_6.png)

### 添加 Tunnel 数据源

- 分别在 **杭州** 和 **上海** CloudCanal 配置 Tunnel 数据源
- 因为双向同步，所以两个环境需要配置各自内网的 Tunnel 数据源和对方公网 Tunnel 数据源
- 杭州数据源列表
  ![http_sync_upgrade_7](../assets/http_sync_2/http_sync_upgrade_7.png)

- 上海数据源列表  
  ![http_sync_upgrade_8](../assets/http_sync_2/http_sync_upgrade_8.png)

### 为 Tunnel 初始化元数据

- **杭州** 创建两个 MySQL -> Tunnel 结构迁移，并完成
  ![http_sync_upgrade_12](../assets/http_sync_2/http_sync_upgrade_12.png)
  ![http_sync_upgrade_13](../assets/http_sync_2/http_sync_upgrade_13.png)
  ![http_sync_upgrade_14](../assets/http_sync_2/http_sync_upgrade_14.png)

- **上海** 创建两个 MySQL -> Tunnel 结构迁移，并完成
  ![http_sync_upgrade_9](../assets/http_sync_2/http_sync_upgrade_9.png)
  ![http_sync_upgrade_10](../assets/http_sync_2/http_sync_upgrade_10.png)
  ![http_sync_upgrade_11](../assets/http_sync_2/http_sync_upgrade_11.png)

## 任务创建

- 使用 4 条同步任务进行双向同步，任务列表和能力如下

  | 任务            | 数据源  | 任务参数             |
    | -------------------- | -------|--------------------------|
  | 杭州任务 A   | 杭州 Tunnel(公网) -> 杭州 MySQL  |  |
  | 杭州任务 B   | 杭州 MySQL -> 上海 Tunnel(公网) | deCycle=true, 过滤回环事件|
  | 上海任务 C   | 上海 Tunnel(公网) -> 上海 MySQL ||
  | 上海任务 D   | 上海 MySQL -> 杭州 Tunnel(公网) | deCycle=true, 过滤回环事件|

### 杭州任务 A 创建

- 选择 Tunnel(杭州) 和 MySQL数据库(杭州)
  ![http_sync_upgrade_15](../assets/http_sync_2/http_sync_upgrade_15.png)

- 选择表、列、映射略
- 任务正常运行，监听端口并准备接收数据
  ![http_sync_upgrade_16](../assets/http_sync_2/http_sync_upgrade_16.png)

### 上海任务 C 创建

- 选择 Tunnel(上海) 和 MySQL数据库(上海)
  ![http_sync_upgrade_17](../assets/http_sync_2/http_sync_upgrade_17.png)

- 选择表、列、映射略
- 任务正常运行，监听端口并准备接收数据
  ![http_sync_upgrade_18](../assets/http_sync_2/http_sync_upgrade_18.png)

### 杭州任务 B 创建

- 选择 MySQL (杭州) 和 Tunnel 数据源(上海)
  ![http_sync_upgrade_19](../assets/http_sync_2/http_sync_upgrade_19.png)

- 选择数据同步，并 **关闭任务自动启动**
  ![http_sync_upgrade_20](../assets/http_sync_2/http_sync_upgrade_20.png)

- 选择表、列、映射略
- 任务正常创建
- 任务详情 > 更多功能 > 参数设置，目标端数据源配置，deCycle 参数设置为 true
  ![http_sync_upgrade_21](../assets/http_sync_2/http_sync_upgrade_21.png)

- 启动任务，正常运行
  ![http_sync_upgrade_22](../assets/http_sync_2/http_sync_upgrade_22.png)

### 上海任务 D 创建

- 选择 MySQL (上海) 和 Tunnel 数据源(杭州)
  ![http_sync_upgrade_23](../assets/http_sync_2/http_sync_upgrade_23.png)

- 选择数据同步，并 **关闭任务自动启动**
  ![http_sync_upgrade_24](../assets/http_sync_2/http_sync_upgrade_24.png)

- 选择表、列、映射略
- 任务正常创建
- 任务详情 > 更多功能 > 参数设置，目标端数据源配置，deCycle 参数设置为 true
  ![http_sync_upgrade_25](../assets/http_sync_2/http_sync_upgrade_25.png)

- 启动任务，正常运行
  ![http_sync_upgrade_26](../assets/http_sync_2/http_sync_upgrade_26.png)

### 功能验证

#### 杭州 MySQL 造增量数据
  
  - 使用 [CloudDM](https://www.clougence.com/clouddm-personal) 在杭州 MySQL 上造增量数据
  ![http_sync_upgrade_27](../assets/http_sync_2/http_sync_upgrade_27.png)
  
  - 杭州写入上海 Tunnel 任务 **有流量**
  ![http_sync_upgrade_28](../assets/http_sync_2/http_sync_upgrade_28.png)

  - 上海接收数据任务 **有流量**
  ![http_sync_upgrade_29](../assets/http_sync_2/http_sync_upgrade_29.png)

  - 杭州接收数据任务 **无流量**
  ![http_sync_upgrade_30](../assets/http_sync_2/http_sync_upgrade_30.png)
 
  - 上海写入杭州 Tunnel 任务 **无流量**
  ![http_sync_upgrade_31](../assets/http_sync_2/http_sync_upgrade_31.png)

#### 上海 MySQL 造增量数据

  - 使用 [CloudDM](https://www.clougence.com/clouddm-personal) 在上海 MySQL 上造增量数据
  ![http_sync_upgrade_32](../assets/http_sync_2/http_sync_upgrade_32.png)

  - 上海写入杭州 Tunnel 任务 **有流量**
  ![http_sync_upgrade_33](../assets/http_sync_2/http_sync_upgrade_33.png)

  - 杭州接收数据任务 **有流量**
  ![http_sync_upgrade_34](../assets/http_sync_2/http_sync_upgrade_34.png)

  - 杭州写入上海 Tunnel 任务 **无流量**
  ![http_sync_upgrade_35](../assets/http_sync_2/http_sync_upgrade_35.png)
 
  - 上海接收数据任务**无流量**
  ![http_sync_upgrade_36](../assets/http_sync_2/http_sync_upgrade_36.png)

- 以上两者说明防循环生效

## 总结
本文主要介绍 [CloudCanal](https://www.clougence.com?src=cc-doc-tunnel-sync-upgrade) 进行跨互联网数据双向同步，具备 **两端数据库完全不开放公网端口**,**可双向同步无循环** 等特点。
