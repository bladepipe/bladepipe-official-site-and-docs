---
id: performance_optimization_redis_src
title: Redis 源端性能调优
description: 本文介绍如何对 CloudCanal Redis 源端任务进行性能调优。
---
本文介绍如何对 CloudCanal Redis 源端任务进行性能调优。

## 现象描述
CloudCanal Redis 源端任务卡顿、超时、效率低下，需要优化性能，提高效率。

## 问题排查与解决
### Redis 源端从节点数量激增导致资源问题
CloudCanal Redis 增量同步的逻辑是伪装成源端 Redis 的一个从节点，通过 PSYNC 实现增量数据获取。可以检查参数 `bindSocketPort` 是否设置为 **-1**。若参数值为 **-1**，则表示每次程序重启随机绑定 Socket 端口，可能导致 Redis 源端从节点数量激增，进而导致资源紧张。   
**解决方案**：建议将 `bindSocketPort` 参数值设置为具体端口号，避免每次重启时随机绑定端口。

### Redis 源端大 Key 导致 OOM/写入协议限制问题
若 Redis 源端存在大 Key，可能会导致 OOM 或写入协议限制问题。   
**解决方案**：可将 `enableFullBatch` 参数值设置为 true，开启按批解析 List/Set/ZSet/Hash Value 的功能，将大 Key 切分成多个小片段进行同步，避免 OOM 和协议限制问题。

### 任务资源参数配置不合理导致任务性能低下
可以按下面步骤进行排查：
1. 检查 `increRingBufferSize` 参数值是否设置过大，过大可能导致内存占用过高引发程序 OOM。
2. 提高源端数据的网络读取效率，可以通过增大 `inputStreamBufferSize`、`receiveBufferSize` 和 `sendBufferSize` 来实现。
3. 提高 CloudCanal 内核数据处理能力，可以通过增大 `increBatchSize` 和 `extractorQueueSize` 来实现。
4. 提高对端写入并发度，可以通过增大 `writeParallel` 来实现。
5. 若任务的性能仍然不理想，可以考虑升级任务规格 `specId`，以获得更多的资源配置。

以下为 `specId=18`(4G 增量内存) 情况下的参数模板：
- **specId**: 18
- **increRingBufferSize**: 16
- **increBatchSize**: 8192
- **inputStreamBufferSize**: 1073741824
- **receiveBufferSize**: 1073741824
- **sendBufferSize**: 1073741824
- **extractorQueueSize**: 8192
- **writeParallel**: 128


## 附录：相关任务参数说明
### 任务核心参数
| 参数 | 说明 |
| -- | -- |
| specId | 任务规格ID，决定任务的资源配置 |
| increRingBufferSize | 增量环形缓冲区大小，决定增量数据的处理能力，对任务内存影响大  |
| increBatchSize | 从队列获取单批次事件个数大小，决定每次处理的增量数据量 |


### 源端参数
| 参数 | 说明 |
| -- | -- |
| inputStreamBufferSize | 输入流缓冲区大小，单位 byte。决定从源端读取数据时的缓冲区大小，影响数据读取效率 |
| receiveBufferSize | Redis Socket 数据接收缓冲区大小，单位 byte。当 Redis 源端数据从网络到达时，会先暂存在此缓冲区中 |
| sendBufferSize | Redis Socket 数据发送缓冲区大小，单位 byte。当数据从内存发送到网络时，会先暂存在此缓冲区中，操作系统负责将缓冲区中的数据发送到网络 |
| bindSocketPort | Redis Socket 连接绑定端口, -1 表示程序随机绑定 |
| extractorQueueSize | Redis源端指令攒批缓存大小，表示每次刷到对端的数据批量  |
| enableFullBatch | Redis 全量是否启用按批解析 List/Set/ZSet/Hash Value，默认不开启。开启后会将 List/Set/ZSet/Hash Value 按批次解析，用于解决大 Key 场景问题 |

### 对端参数
| 参数 | 说明 |
| -- | -- |
| writeParallel | 对端写入并发数，决定对端写入的并发度 |
