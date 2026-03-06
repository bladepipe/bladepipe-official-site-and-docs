---
id: perf_param
title: Optimize Performance
description: Users can do performance tuning through modifying several parameters. This page explains these parameters. 
---

## Function
BladePipe DataJob can be configured with common performance parameters to improve the performance of task execution. Adjusting the parameters to improve the performance requires several attempts according to the specific data load and experience to achieve the desired effect. This article does not specifically teach how to do performance tuning, but only shows the function of performance parameters. If you are interested in BladePipe DataJob performance tuning, see [Performance Tuning](../../faq/performance_optimization.md).

## Procedure

1. Go to the DataJob Details page. Click **Functions** > **Modify DataJob Params** in the upper-right corner.
2. Search the parameter name that you want to modify. The introduction of the parameters related to performance tuning is as follows:

| Parameter              | Description                              | Suggestion |
  |------------------------------------------| ------------------------| --- |
  | fullRingBufferSize     | Full Data ring buffer queue size         | It needs to be set to an exponential multiple of 2, and increasing it appropriately will increase throughput and performance. If the setting is too large, the task load will be too high, resulting in performance degradation, program stagnation, communication timeout and other issues. |
  | fullBatchSize          | Full Data Batch size in batch flushing   | A moderate increase can increase throughput and performance, but setting it too high will cause performance degradation, program stalls, and communication timeouts. |
  | increRingBufferSize    | Incremental buffer queue size            | It needs to be set to an exponential multiple of 2, and increasing it appropriately will increase throughput and performance. If the setting is too large, the task load will be too high, resulting in performance degradation, program stagnation, communication timeout and other issues. |
  | increBatchSize         | Incremental Batch size in batch flushing | A moderate increase can increase throughput and performance, but setting it too high will cause performance degradation, program stalls, and communication timeouts. |
  | writeParallel          | Write paralle                            | It is generally considered to be the same as the number of CPU cores. When peer writes are not the bottleneck and CPU load is low, increasing parallelism improves performance. |
  | reviseProduceBatchSize | Revised batch size                       | Revise the batch size when the task is run |

3. Modify the parameter value to the desired specification. You can refer to the Reference column for guidance.
4. Click **Save** in the upper-right corner to confirm the parameters and their new values. 
5. Click **Submit**. If the task is running, it will be restarted automatically. If it is stopped, the parameter change will take effect automatically after starting the task. 