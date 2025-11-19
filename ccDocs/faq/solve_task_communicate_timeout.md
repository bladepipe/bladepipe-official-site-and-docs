---
id: solve_task_communicate_timeout
title: 任务日志显示通信超时
description: 迁移同步的任务使用较小规格,或者单条数据过大、参数设置不当导致任务内存 FGC 增多,从而影响任务对外通信。
---
## 现象

- 任务日志中出现通信超时相关信息,如下图:
  ![oom](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/oom_pic.png)

## 排查

- **CloudCanal控制台** > **任务详情** > **更多** (监控图表页)。
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/incre_update_velocity.png)

- **任务资源监控** > **任务JVM GC数** , 如 FullGC 数较大 (>5)，说明任务内存紧张。
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/task_fgc_dashboard.png)

## 解决

可通过 **调整任务规格** 或 **优化参数** 处理。

### 调整任务规格
- **CloudCanal控制台** > **任务详情** > **功能列表** > **参数修改**，搜索参数 **specId**，选择更大的规格。
  ![image.png](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/faq/task_spece_id.png)

### 优化任务参数
- **CloudCanal控制台** > **任务详情** > **功能列表** > **参数修改**。
- 增量阶段参数调整 **increRingBufferSize**、**increBatchSize** 参数值为原来的 50%。
- 全量阶段参数调整 **fullRingBufferSize**、**fullBatchSize** 参数值为原来的 50%。

