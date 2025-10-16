---
id: solve_incre_task_delay
title: 增量同步延迟高
description: 本文介绍使用CloudCanal创建同步任务后增量任务延迟的排查方法
---

## 现象

- 增量同步任务运行中，但是延迟不断增大
  ![data_task_delay](../assets/faq/data_task_delay.png)

## 排查

### 原因
- 任务因各种原因报错，无法同步数据
- 源端无任何变更，也没有心跳事件
- 对端数据源写入响应不理想或任务性能需要调优
- 源端数据拉取慢(物理距离远，被拉取多次数据，业务压力等）

### 步骤

#### 排除任务异常
- **登录CloudCanal控制台** > **监控管理** > **异常监控** , 选择**任务异常**
- 也可以进入 **任务详情** > **查看日志**，查看是否有异常日志堆栈(关键词:Exception)
  ![view_data_task_log](../assets/faq/view_data_task_log.png)

#### 排除源端无写入无心跳
- **任务详情** > **查看日志**，观察文本中 real 值
  - 如长时间为0，则源端没有增量以及心跳(参考[open_mysql_heartbeat](../dataMigrationAndSync/datasource_func/MySQL/open_mysql_heartbeat.md))
  - 如几百上千，则说明流量较大，需要进行性能调优

 ![incre_log_rel_zero](../assets/faq/incre_log_rel_zero.png)

#### 排除性能不给力
- **任务详情** > **任务资源监控** > **任务 JVM GC 数**。如果曲线观察到 FullGC 数量常常大于 2～3，表明任务内存比较紧张。
 ![incre_update_velocity](../assets/faq/incre_update_velocity.png)
 ![task_resource_monitor](../assets/faq/task_resource_monitor.png)
 ![task_fgc_dashboard](../assets/faq/task_fgc_dashboard.png)

- FGC 过多， **任务详情** > **功能列表** > **参数修改** 进行参数调整
  - 增量同步：调整 **increRingBufferSize**、**increBatchSize** 参数，将原有值调小一半，避免一批同步太多数据导致 FGC
  - 全量迁移：调整 **fullRingBufferSize**、**fullBatchSize** 参数，将原有值调小一半，避免一批迁移太多数据导致 FGC

- 另可调整任务规格参数 **specId**
 ![task_param_update](../assets/faq/task_param_update.png)
 ![task_spece_id](../assets/faq/task_spece_id.png)


