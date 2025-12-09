---
id: api_write_data_sync
description: 如何让应用直接写数据到 CloudCanal Tunnel 数据源
title: 基于 API 的数据同步
---

## 简介

本文主要介绍 [CloudCanal](https://www.clougence.com?src=cc-doc-http-api-source) 如何让应用直接写数据到 CloudCanal Tunnel 数据源达到数据同步目标，包含以下特点:

- 对端数据库不开放公网端口
- 可接收大量客户端写入(http)
- 元数据可映射
- 基于 HTTPS 传输
- 具备用户名密码鉴权机制
- 不依赖消息等软件

## 技术点
![api_sync_1.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/api_sync/api_sync_1.png)

### Tunnel数据源

Tunnel 数据源本身并不是实体数据库，而是一组逻辑信息，包括

- ip(或域名)
- port
- 用户名
- 密码
- TLS 证书文件和密码
- 元数据

创建以 Tunnel 为源端的数据任务，启动后会监听配置的端口，并接收基于 HTTP 交互协议的请求。

### 元数据映射
Tunnel 数据源带有 schema（存储于CloudCanal kv配置表中), 所以针对这个数据源，我们模拟了**表结构获取和迁移的过程**，让其在任务创建和运维过程中如同一个真实存在的数据库。
一个真实的 Tunnel 数据源的元数据如下:
```sql
[
  {
    "db": "cc_virtual_db",
    "schemas": [
      {
        "schema": "cc_virtual_schema",
        "tables": [
          {
            "table": "WORKER_STATS",
            "columns": [
              {
                "name": "ID",
                "jdbcType": -5,
                "typeName": "LONG",
                "key": true
              },
              {
                "name": "GMT_CREATE",
                "jdbcType": 93,
                "typeName": "TIMESTAMP",
                "key": false
              },
              {
                "name": "AUCRDT",
                "jdbcType": 93,
                "typeName": "TIMESTAMP",
                "key": false
              }
            ]
          },
          {
            "table": "KBS_QUESTION",
            "columns": [
              {
                "name": "ID",
                "jdbcType": -5,
                "typeName": "LONG",
                "key": true
              },
              {
                "name": "CATEGORY",
                "jdbcType": 12,
                "typeName": "STRING",
                "key": false
              }
            ]
          }
        ]
      }
    ]
  }
]
```
我们可以通过结构迁移 (MySQL/SQLServer/Oracle -> Tunnel) 扩充它，或者直接通过 数据源管理->更多->查看配置-> **dbsJson** 进行修改。

## 操作示例
本示例使用 [cloudcanal-tunnel-sdk](https://gitee.com/clougence/cloudcanal-tunnel-sdk/tree/master) 写作客户端应用，对端使用本地一个 MySQL 作为数据接收端。

### 环境准备
- 社区版(docker) 先**修改 docker-compose.yml 端口映射再安装**
- 此例以 18443 端口作为 Tunnel 数据源监听端口
  ![api_sync_2.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/api_sync/api_sync_2.png)
- CloudCanal 上添加 Tunnel 数据源和目标数据源
  ![api_sync_3.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/api_sync/api_sync_3.png)

### 为目标端数据库初始化元数据

- 因无法通过 Tunnel 到对端数据库做结构迁移，所以需要事先使用 mysqldump 等工具初始化对端数据库结构
  ![api_sync_4.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/api_sync/api_sync_4.png)

### 为 Tunnel 初始化元数据

- 创建一个 MySQL -> Tunnel 结构迁移
  ![api_sync_5.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/api_sync/api_sync_5.png)
  ![api_sync_6.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/api_sync/api_sync_6.png)

### 任务创建

- 选择 Tunnel 和 目标数据库
  ![api_sync_7.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/api_sync/api_sync_7.png)

- 选择数据同步
  ![api_sync_8.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/api_sync/api_sync_8.png)

- 选择表、列、映射略
- 任务正常运行，监听端口并准备接收数据
  ![api_sync_12.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/api_sync/api_sync_12.png)

### 应用代码开发

- 依赖 [cloudcanal-tunnel-sdk](https://gitee.com/clougence/cloudcanal-tunnel-sdk/tree/master) 进行客户端代码开发
  ![api_sync_13.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/api_sync/api_sync_13.png)

- 写入数据，并观察任务监控指标([代码参考](https://gitee.com/clougence/cloudcanal-tunnel-sdk/blob/master/src/test/java/com/clougence/cloudcanal/tunnel/sdk/biz/writer/TunnelDataSyncApplyTest.java))
  ![api_sync_14.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/api_sync/api_sync_14.png)

## 总结
本文主要介绍 [CloudCanal](https://www.clougence.com?src=cc-doc-http-api-source) 如何让应用直接写入数据到 Tunnel 数据源达到业务数据汇聚，互通的目的，具备轻量、简洁、稳定等特点，具备不错的落地性。
