---
id: prepare_for_oracle_blob_sync
title: Oracle BLOB 同步准备
description: 介绍 CloudCanal 同步 Oracle BLOB 字段前需要开启的任务参数，以及开启后的性能影响。
---

本文介绍 CloudCanal 同步 Oracle BLOB 字段前需要开启的配置，以及开启 BLOB 同步后对任务性能的影响。

## 适用场景

当 Oracle 源端表中包含 BLOB 字段，并且需要在增量同步中同步该字段内容时，需要开启本文中的配置。

Oracle BLOB 在 LogMiner 中通常不会表现为一条完整的普通 `UPDATE`，而是会拆分为定位目标行、定位目标列、分片写入等多个日志事件。CloudCanal 需要识别这些事件，并在事务提交后将多个 BLOB 片段还原为最终字段值，再写入目标端。

:::info
如果任务不需要同步 Oracle BLOB 字段，不建议开启 BLOB 同步配置。
:::

## 前置条件

1. 已完成 Oracle LogMiner 同步准备，包含归档日志、补全日志、账号权限等配置。参考 [Oracle LogMiner 同步准备](prepare_for_oracle_logminer.md)。
2. 源端表的 BLOB 字段已包含在任务映射范围内。
3. 任务运行节点有足够的本地磁盘空间和磁盘 I/O 能力，用于承载 BLOB 片段组装过程中的临时文件。

## 开启 BLOB 同步配置

Oracle BLOB 增量同步需要同时开启任务核心参数和源数据源参数。

<table>
<thead>
    <tr>
        <th>参数位置</th>
        <th>参数名</th>
        <th>配置值</th>
        <th>说明</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>任务核心配置</td>
        <td><code>useTypedField</code></td>
        <td><code>true</code></td>
        <td>开启类型化字段传递能力。BLOB 组装后的文件引用会通过类型化字段在链路中传递。</td>
    </tr>
    <tr>
        <td>源数据源配置</td>
        <td><code>oraLmLobEnable</code></td>
        <td><code>true</code></td>
        <td>开启 Oracle LogMiner BLOB 事件解析能力，使 CloudCanal 识别 BLOB 定位和写入事件。</td>
    </tr>
</tbody>
</table>

### 操作步骤

1. 进入任务详情页。
2. 点击右上角 **功能列表** > **修改参数**。
3. 在 **任务核心配置** 中，将 `useTypedField` 修改为 `true`。
4. 在 **源数据源配置** 中，将 `oraLmLobEnable` 修改为 `true`。
5. 点击页面右上角 **生效配置**，确认变更。
6. 如果页面提示需要重启任务，请按提示重启任务或等待系统自动重启后生效。

:::tip
建议在任务首次运行前完成上述配置。如果是在已有任务上开启 BLOB 同步，请确认任务重启后再继续增量同步。
:::

## 同步性能影响

开启 Oracle BLOB 同步后，CloudCanal 会额外处理 BLOB 相关日志事件，并在本地进行片段组装。相比只同步普通字段，任务性能可能受到以下影响。

### 源端日志解析开销增加

开启 `oraLmLobEnable=true` 后，CloudCanal 会从 LogMiner 结果中识别 BLOB 定位、写入等事件，并解析每个 BLOB 写入片段。

如果源端存在大量 BLOB 更新，LogMiner 返回的事件数量会增加，任务在日志拉取、SQL 解析和事件转换上的 CPU 开销也会增加。

### 长事务场景延迟可能增加

BLOB 写入依赖事务上下文。为了避免长事务跨 LogMiner 窗口时丢失 BLOB 定位信息或回滚信息，CloudCanal 会在 BLOB 同步场景下保留必要的事务窗口。

如果源端存在长时间未提交的大事务，增量解析可能需要回看更早的 SCN 区间，导致部分日志被重复扫描，任务延迟可能上升。

### 本地磁盘 I/O 和空间占用增加

BLOB 片段不会长期常驻堆内存，而是会在任务运行节点上组装为本地临时文件。这样可以降低大对象对 JVM 内存的压力，但会引入本地磁盘写入开销。

磁盘占用主要与以下因素相关：

- 未提交事务中的 BLOB 数据总量。
- 同一事务中同时更新的 BLOB 行数和列数。
- 源端 BLOB 更新频率。
- 任务延迟期间积压的 BLOB 变更量。

事务提交后，临时文件会随数据写入链路继续流转；事务回滚时，CloudCanal 会清理对应的无效临时文件。

### 目标端写入耗时可能增加

BLOB 字段通常体积较大，写入目标端时会占用更多网络带宽和目标端写入资源。如果单条记录包含较大的 BLOB 字段，或者短时间内有大量 BLOB 更新，目标端写入耗时可能增加，并进一步影响增量任务延迟。

## 使用建议

1. 仅在确实需要同步 Oracle BLOB 字段的任务中开启 `oraLmLobEnable=true`。
2. 开启前确认任务运行节点磁盘空间充足，并优先使用 I/O 性能较好的磁盘。
3. 对 BLOB 更新频率高、单个 BLOB 较大或长事务较多的业务表，建议先在测试环境评估任务延迟、磁盘使用量和目标端写入耗时。
4. 生产任务开启后，重点关注增量延迟、任务运行节点磁盘空间、磁盘 I/O、Oracle 归档日志保留时间和目标端写入负载。
5. 如果开启后延迟明显上升，可结合业务情况减少不必要的 BLOB 字段同步，或提升任务规格和运行节点磁盘能力。

