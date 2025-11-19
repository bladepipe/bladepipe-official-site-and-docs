---
id: performance_optimization
title: 性能调优
description: 本文介绍如何对CloudCanal任务进行性能调优。
---
本文介绍如何对 CloudCanal 任务进行性能调优。

## 现象描述
CloudCanal 任务卡顿超时，需要优化性能，提高效率。

## 问题排查及解决
1. 查看任务是否存在异常：  
   点击 **同步设置** > **异常日志**，查看最近是否有任务异常。如存在异常，可点击 **查看异常堆栈**，并解决异常。

2. 查看任务是否存在内存问题：
   1. 进入任务详情页，在页面下方监控图表区域点击 **性能** 旁的 **更多指标**。
   2. 在 **资源使用率** 页签下查看 **任务 JVM GC 数** 和 **任务 JVM GC 时间** 监控图表。如果存在 Full GC 的耗时突显或 Full GC 数量大于 2，则存在性能问题。
  
- **若存在内存问题**，可按以下步骤修改参数：
  - 全量迁移参数修改
    1. 进入任务详情页，点击 **功能列表** > [**参数修改**](../operation/job_manage/job_op/job_params.md)。
    2. 修改 ***fullRingBufferSize*** 和 ***fullBatchSize*** 为原来的 50%。
    3. 修改 ***writeParallel*** 为原来的 200%。
    4. 点击页面右上角 **生效配置**。

  - 增量同步参数修改
    1. 进入任务详情页，点击 **功能列表** > [**参数修改**](../operation/job_manage/job_op/job_params.md)。
    2. 修改 ***increRingBufferSize*** 和 ***increBatchSize*** 为原来的 50%。
    3. 修改 ***writeParallel*** 为原来 200%。
    4. 点击页面右上角 **生效配置**。

- **若不存在内存问题**，可按以下步骤尝试：   
  1. 进入任务详情页，点击 **功能列表** > [**参数修改**](../operation/job_manage/job_op/job_params.md)，修改 ***increBatchSize*** 和 ***writeParallel*** 参数提升写入效率。

  2. 若修改参数后写入效率并未提升，可能存在 **对端写入瓶颈**，可按以下步骤查看：    
   进入任务详情页，点击 **增量同步** 页签下的 **查看日志** > **apply_commit.log**，其中最后一列是写入对端耗时（毫秒）。如耗时为将近 10s，可能对端处理能力存在瓶颈。
  ![writeParallel](https://cloudcanal-blog-img.oss-cn-hangzhou.aliyuncs.com/docs/task_and_performance/10.png)

  1. 查看是否存在 **机器资源瓶颈**，确认节点 **CPU 使用率**、**CPU 负载** 等信息。如资源利用率较高，考虑升配节点。

  2. 最后可尝试升配任务规格，详情请参考 [规格调整](../dataMigrationAndSync/param_and_func/adjust_task_spec)。
