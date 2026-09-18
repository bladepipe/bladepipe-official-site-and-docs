---
id: prepare_for_mongodb_bidirectional_sync
title: MongoDB 双向同步准备
description: CloudCanal 创建 MongoDB 双向同步任务前需要完成的实例、辅助 collection、权限和任务参数准备。
---

本文介绍使用 CloudCanal 创建 MongoDB 双向同步任务前需要完成的准备工作。

双向同步由两个方向相反的任务组成，因此两个 MongoDB 实例都会同时作为源端和目标端。本文中的准备操作需要在两端分别完成。

## 检查 MongoDB 部署形态

MongoDB 双向同步依赖 Change Stream 和多文档事务，两端实例都必须支持这两项能力。

| 部署形态 | 是否支持 | 说明 |
| --- | --- | --- |
| standalone | 否 | 不具备当前方案所需的 Change Stream 和事务条件 |
| 单节点 Replica Set | 是 | 支持 MongoDB 双向同步 |
| 多节点 Replica Set | 是 | 支持 MongoDB 双向同步 |
| Sharded Cluster | 需验证 | 必须通过 `mongos` 连接，上线前需要按照实际分片规则验证事务和同步性能 |
| AWS DocumentDB | 否 | 当前双向同步不支持 DocumentDB |

## 创建辅助 collection

分别连接两个 MongoDB 实例，执行：

```javascript
use cloudcanal

db.createCollection("__cc_tx_de_cycle")

db.__cc_tx_de_cycle.createIndex(
  { expireAt: 1 },
  {
    name: "__cc_expire_at",
    expireAfterSeconds: 0
  }
)
```

默认辅助 collection 的完整名称为：

```text
cloudcanal.__cc_tx_de_cycle
```

如果使用其他名称，任务参数 `deCycleCollection` 必须填写对应的完整名称，格式为 `database.collection`。

:::warning
只需要创建 collection 和 TTL 索引，不要手工插入 marker。marker 必须由 CloudCanal 在写入业务数据的同一个事务中自动生成。
:::

## 准备账号权限

双向同步账号需要具备：

- 对订阅业务 collection 的 `find`、`changeStream` 权限。
- 对目标业务 collection 的 `insert`、`update`、`delete` 权限。
- 对辅助 collection 的 `find`、`insert`、`createIndex` 权限。
- `listDatabases`、`listCollections`、`listIndexes` 等元数据查询权限。

具体授权方式参考 [MongoDB 需要的权限](./privs_for_mongo.md)。

## 检查任务参数

正向任务和反向任务都需要完成以下设置。

### 源端参数

| 参数 | 设置值 |
| --- | --- |
| `captureMode` | `CHANGE_STREAM` |
| `deCycle` | `true` |
| `deCycleCollection` | `cloudcanal.__cc_tx_de_cycle`，或者实际创建的完整名称 |
| `deCycleTransactionCacheSize` | 本地事务判断缓存数量，默认 `10000` |

### 目标端参数

| 参数 | 设置值 |
| --- | --- |
| `deCycle` | `true` |
| `deCycleCollection` | `cloudcanal.__cc_tx_de_cycle`，或者实际创建的完整名称 |
| `deCycleMarkerTtlDays` | marker 保留天数，默认 `7` |
| `enableBatchApply` | `false` |

`__cc_tx_de_cycle` 不需要添加到任务的业务 collection 映射中。开启 `deCycle` 后，CloudCanal 会根据 `deCycleCollection` 参数自动订阅它。

## 启动前检查

启动两个方向的任务前，确认：

1. 两端都已经创建辅助 collection 和 TTL 索引。
2. 两端同步账号都能读取和写入辅助 collection。
3. 两个任务的源端和目标端均已开启 `deCycle`。
4. 两个任务使用 `CHANGE_STREAM` 捕获模式。
5. `deCycleTransactionCacheSize` 大于 0；没有明确调优依据时使用默认值 `10000`。
6. 两个任务的目标端均已关闭 `enableBatchApply`。
7. `deCycleMarkerTtlDays` 大于任务允许的最大停机、积压和位点回溯时间。
8. 正向任务需要初始化历史数据时，只在正向任务开启全量初始化；反向任务不要同时执行全量初始化。

任务创建和验证流程参考 [MongoDB 双向数据同步](../../../bestPractice/mongodb_loop_data_sync.md)。
