---
id: mongodb_loop_data_sync
description: 本文主要介绍如何使用 CloudCanal 构建 MongoDB 双向同步任务
title: MongoDB 双向数据同步
---

## 简述

MongoDB 双向同步通常用于两个 MongoDB 实例都需要承接业务写入的场景，例如同城多活、跨地域多活、系统拆分过渡和灾备切换。

双向链路由两个方向相反的同步任务组成：

```text
任务 1：MongoDB A → MongoDB B
任务 2：MongoDB B → MongoDB A
```

CloudCanal 会识别并过滤由另一条同步任务写入的数据，避免数据在两个实例之间反复同步。正常业务程序直接写入 A 或 B 的数据仍会同步到另一端。

:::info
双向同步的防循环能力用于识别同步任务自身写入的数据，不负责解决 A、B 两端业务程序同时修改同一个 `_id` 时的业务冲突。
:::

## 实现原理

CloudCanal 使用 MongoDB 事务和 Change Stream 事务标识实现防循环。

任务向目标 MongoDB 写入数据时，会在同一个事务中：

1. 先向辅助 collection 写入事务 marker。
2. 再写入业务数据。
3. 原子提交 marker 和业务数据。

Change Stream 事件中的 `lsid` 和 `txnNumber` 可以唯一标识该事务。反向任务订阅到 marker 后，会过滤具有相同事务标识的业务事件，因此这些事件不会再次写回原实例。

```text
业务写入 A
    ↓
A → B 捕获业务事件
    ↓
B 中同一事务写入 marker 和业务数据
    ↓
B → A 捕获相同 lsid + txnNumber 的事件
    ↓
识别为同步任务写入并过滤
```

marker 和业务数据使用同一个事务，因此不会出现业务数据已经提交而 marker 尚未提交的中间状态。CloudCanal 还会持久化查询 marker，进程重启或者内存缓存未命中后仍然可以判断回环事务。

marker 默认保留 7 天，过期文档由 MongoDB TTL 索引自动清理。可以通过目标端参数 `deCycleMarkerTtlDays` 调整保留天数。

## 使用限制

- 仅支持 MongoDB 到 MongoDB 双向同步，不支持 AWS DocumentDB。
- 增量捕获模式必须设置为 `CHANGE_STREAM`，不支持 `OP_LOG` 模式。
- 两端 MongoDB 都必须支持 Change Stream 和多文档事务。
- MongoDB standalone 模式不支持；单节点和多节点 Replica Set 均支持。
- MongoDB Sharded Cluster 具备 Change Stream 和分布式事务能力，但生产使用前应完成与实际分片规则一致的兼容性和性能验证，并通过 `mongos` 连接。
- 目标端参数 `enableBatchApply` 必须为 `false`。
- marker 默认保存 7 天，可通过目标端参数 `deCycleMarkerTtlDays` 调整；保留时间应大于任务允许的最大停机、积压和位点回溯时间。
- 双向防循环不处理两端业务程序并发修改同一个 `_id` 的冲突，业务系统仍需保证同一业务数据的写入归属。

## 准备 MongoDB

创建任务前，请先按照 [MongoDB 双向同步准备](../dataMigrationAndSync/datasource_func/MongoDB/prepare_for_mongodb_bidirectional_sync.md) 检查两端实例架构、账号权限和任务参数，并在两端创建防循环辅助 collection。

### 创建防循环辅助 collection

在 A、B 两个 MongoDB 实例上分别执行以下命令：

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

默认完整名称为：

```text
cloudcanal.__cc_tx_de_cycle
```

也可以使用其他数据库和 collection 名称，但必须在任务参数 `deCycleCollection` 中填写相同的完整名称，格式为 `database.collection`。

:::warning
不要手工向 `__cc_tx_de_cycle` 插入 marker。marker 必须由 CloudCanal 在写入业务数据的同一个 MongoDB 事务中自动生成，手工插入的数据不能代表真实同步事务。
:::

### 准备账号权限

双向同步中，每个 MongoDB 实例既是源端也是目标端。同步账号需要具备：

- 对订阅业务 collection 的 `find`、`changeStream` 权限。
- 对目标业务 collection 的 `insert`、`update`、`delete` 权限。
- 对 `cloudcanal.__cc_tx_de_cycle` 的 `find`、`insert`、`createIndex` 权限。
- 查询数据库和 collection 元数据所需的 `listDatabases`、`listCollections`、`listIndexes` 权限。

具体授权方式可参考 [MongoDB 需要的权限](../dataMigrationAndSync/datasource_func/MongoDB/privs_for_mongo.md)。

## 创建正向同步任务

正向任务通常负责历史数据初始化和 A 到 B 的持续增量同步。

1. 点击 **同步任务** > **创建任务**。
2. 源端选择 MongoDB A，目标端选择 MongoDB B。
3. 任务类型选择 **数据同步**，根据需要勾选 **全量数据初始化**。
4. 选择需要双向同步的数据库、collection 和字段。
5. 创建任务时先不要开启自动启动。
6. 进入任务详情页，点击 **功能列表** > **修改参数**。
7. 在源端数据源参数中设置：
   - `captureMode` = `CHANGE_STREAM`
   - `deCycle` = `true`
   - `deCycleCollection` = `cloudcanal.__cc_tx_de_cycle`
   - `deCycleTransactionCacheSize` = `10000`，没有明确调优依据时使用默认值
8. 在目标端数据源参数中设置：
   - `deCycle` = `true`
   - `deCycleCollection` = `cloudcanal.__cc_tx_de_cycle`
   - `deCycleMarkerTtlDays` = `7`，或者按最大恢复时间调整
   - `enableBatchApply` = `false`
9. 生效配置并启动任务，等待全量初始化完成并进入正常增量同步状态。

## 创建反向同步任务

1. 再次创建数据同步任务。
2. 源端选择 MongoDB B，目标端选择 MongoDB A。
3. 选择与正向任务相同的数据库、collection 和字段映射。
4. 不勾选 **全量数据初始化**，避免两条任务同时初始化数据。
5. 源端和目标端设置与正向任务相同的防循环参数：
   - `captureMode` = `CHANGE_STREAM`
   - 源端和目标端的 `deCycle` 均为 `true`
   - `deCycleCollection` = `cloudcanal.__cc_tx_de_cycle`
   - 源端 `deCycleTransactionCacheSize` = `10000`，没有明确调优依据时使用默认值
   - 目标端 `deCycleMarkerTtlDays` = `7`，或者按最大恢复时间调整
   - 目标端 `enableBatchApply` = `false`
6. 生效配置并启动反向任务。

:::info
`__cc_tx_de_cycle` 不需要作为普通业务 collection 添加到任务的表映射中。开启 `deCycle` 后，CloudCanal 会根据 `deCycleCollection` 参数自动订阅它。
:::

## 常见问题

### 为什么两个实例都要创建辅助 collection？

A 和 B 都会作为同步目标接收另一端的数据，也都会作为 Change Stream 源端判断回环事务，因此两端都需要各自的 `__cc_tx_de_cycle`。

### 为什么不能使用 standalone MongoDB？

当前方案需要把 marker 和业务数据放在同一个 MongoDB 事务中，并通过 Change Stream 获取事务标识。standalone MongoDB 不具备该方案所需的事务和 Change Stream 条件。

### marker collection 会持续增长吗？

marker 带有 `expireAt` 字段，并通过 TTL 索引自动删除，默认保留 7 天。可以通过目标端参数 `deCycleMarkerTtlDays` 调整，保留时间应覆盖任务允许的最大停机、积压和位点回溯时间。TTL 清理是异步执行的，实际删除时间可能略晚于 `expireAt`。

### 同一个 `_id` 在两端同时修改会怎样？

防循环只区分业务写入和同步任务写入，不决定业务冲突的最终结果。如果两个业务系统可能同时修改同一个 `_id`，应在业务层明确数据归属、按区域或租户拆分写入范围，或者增加版本校验机制。

## 总结

MongoDB 双向同步通过 Change Stream 捕获变更，并使用同一事务中的 marker 和业务写入识别同步来源。正确配置两个方向的任务、在两端创建辅助 collection，并保证两端 MongoDB 支持 Change Stream 和事务后，即可避免同步数据在两个实例之间形成循环。
