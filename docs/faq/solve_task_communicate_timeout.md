---
id:  solve_task_communicate_timeout
title: DataJob Communication Timeout
description: This article describes the steps to troubleshoot communication timeout issues in data synchronization tasks when resources are limited.
---
This article describes the steps to troubleshoot communication timeout issues in data synchronization tasks when resources are limited.

## Issue
When resources are limited, data synchronization tasks may experience latency, accompanied by communication timeout errors in the logs. An example of the error message is shown below.
```
2022-11-01 09:39:06.844 [heartbeat-report-4-thd-0] ERROR rsocket - fetch rsocket async result timeout. current timeout: 10000 ms. route name:taskReceiveHeartBeat, request id:f15d010e-5985-11ed-9b1c-09d7a8ea0743
java.util.concurrent.TimeoutException: Waited 10000 milliseconds for com.google.common.util.concurrent.SettableFuture@5bc61885[status=PENDING]
	at com.google.common.util.concurrent.AbstractFuture.get(AbstractFuture.java:470)
	at com.google.common.util.concurrent.AbstractFuture$TrustedFuture.get(AbstractFuture.java:92)
	at com.clougence.cloudcanal.task.rsocket.impl.TaskRSocketServiceImpl.getAsyncResult(TaskRSocketServiceImpl.java:95)
	at com.clougence.cloudcanal.task.rsocket.impl.TaskRSocketServiceImpl.requestNonBlock(TaskRSocketServiceImpl.java:71)
	at com.clougence.cloudcanal.base.service.task.thread.AliveHeartbeatReportThread.run(AliveHeartbeatReportThread.java:61)
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
	at java.util.concurrent.FutureTask.runAndReset(FutureTask.java:308)
	at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.access$301(ScheduledThreadPoolExecutor.java:180)
	at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:294)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:748)
```

## Troubleshooting Steps
### Issue Confirmation
1. Go to the DataJob Details page. Click **More Metrics** above the monitoring chart.
2. Select **Resource** tab to view **JVM GC Count**. If the FGC count on the chart curve is not 0, it indicates that the memory resources are tight.
### Issue Cause
The data synchronization task uses a **smaller specification**, or **large single data** or **improper parameter settings** cause the task's memory FGC to increase, thereby affecting the task's external communication.

## Solutions
The issue can be resolved by **adjusting the task specification** or **optimizing the parameters**.

### Adjusting the Task Specification
1. Go to the DataJob Details page, and click **Functions** > **Modify DataJob Params** in the upper-right corner of the page.
2. Search the parameter **specId** and choose a larger specification.

### Optimizing Task Parameters
1. Go to the DataJob Details page, and click **Functions** > **Modify DataJob Params** in the upper-right corner of the page.
2. In the Incremental stage, adjust the parameters **increRingBufferSize** and **increBatchSize** to smaller values to avoid synchronizing too much data at once.
3. In the Full Data stage, adjust the parameters **fullRingBufferSize** and **fullBatchSize** to smaller values to avoid migrating too much data at once.
4. If the above steps do not solve the problem, please join the support group and provide a description of the problem, exception logs, or screenshots.


