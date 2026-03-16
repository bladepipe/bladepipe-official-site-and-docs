---
id: solve_incre_task_delay
title: 增量同步延迟高
description: 本文介绍使用CloudCanal创建同步任务后增量任务延迟的排查方法
---

## 现象描述
增量同步任务运行中，但是延迟不断增大
  ![data_task_delay](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/data_task_delay.png)

## 问题排查
- 任务因各种原因报错，无法同步数据
- 源端无任何变更，也没有心跳事件
- 对端数据源写入响应不理想或任务性能需要调优
- 源端数据拉取慢(物理距离远，被拉取多次数据，业务压力等）

## 解决方法

### 排除任务异常
- 进入 **任务详情** 页面，点击 **查看日志**，查看是否有异常日志堆栈(关键词:Exception)。
  ![view_data_task_log](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/view_data_task_log.png)

### 排除源端无写入无心跳
- 进入 **任务详情** 页面，点击 **查看日志**，观察文本中 real 值。
  - 如长时间为0，则源端没有增量以及心跳(参考[open_mysql_heartbeat](../dataMigrationAndSync/datasource_func/MySQL/open_mysql_heartbeat.md))
  - 如几百上千，则说明流量较大，需要进行性能调优

  ![incre_log_rel_zero](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/incre_log_rel_zero.png)

### 排除性能瓶颈
- 进入 **任务详情** 页面，查看监控图表中的 **任务资源监控** > **任务 JVM GC 数**。如果曲线观察到 FullGC 数量常常大于 2～3，表明任务内存比较紧张。
 ![incre_update_velocity](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/incre_update_velocity.png)
 ![task_resource_monitor](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/task_resource_monitor.png)
 ![task_fgc_dashboard](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/task_fgc_dashboard.png)

- 如 FGC 过多，在 **任务详情** 页面点击 **功能列表** > **修改参数**，调整以下参数值：
  - 增量同步：调整 **increRingBufferSize**、**increBatchSize** 参数，将原有值调小一半，避免一批同步太多数据导致 FGC。
  - 全量迁移：调整 **fullRingBufferSize**、**fullBatchSize** 参数，将原有值调小一半，避免一批迁移太多数据导致 FGC。

- 可尝试调整任务规格参数 **specId**。
 ![task_param_update](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/task_param_update.png)
 ![task_spece_id](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/task_spece_id.png)


