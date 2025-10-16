---
id: monitor
title: Monitoring Metrics
description: During the running of the BladePipe DataJob, different monitoring indicators can be displayed based on different types of source and peer data sources
---

## Overview
When the BladePipe DataTask is running, different monitoring metrics can be displayed according to different types of source-to-target connections.
For these different monitoring metrics (if any), see the documents in **Connection > Source**.

In addition to some monitoring metrics related to source-to-target connections, all BladePipe DataTasks share some common monitoring metrics that are relevant to their running and are described in this article.

## DataJob Monitoring
  | Monitoring Metric       | Scope        | Description |
  |--------------|-----------| --------------------- | 
  | Full Data RPS (Record Per Second)  | Full Data    | Number of records processed per second in the Full Data phase. In BladePipe, a record is mainly a row in a database table. |
  | Full Target Response(ms)          | Full Data    | The latency of writing data to the peer end is the response time of writing data to the peer end. It is used to measure whether the target database has a write bottleneck |
  | Full Data Table Level RPS         | Full Data    | Monitor the number of records processed per second per table in the full phase |
  | Full Data Table Level Progress(%) | Full Data    | View the migration progress at the full phase table level |
  | Incremental Delay(ms)             | Incremental  | Incremental task Data delay between the peer end and the source end (unit: ms) |
  | Incremental RPS                   | Incremental  | Number of records processed per second in the increment phase |
  | Incremental Delay(ms)             | Incremental  | The latency of writing data to the peer end is the response time of writing data to the peer end. It is used to measure whether the peer database has a write bottleneck |
  | Wait to Apply Block Time(ns)      | Incremental  | Note The write delay of the internal queue in the increment phase needs to be checked together with other indicators. Write bottlenecks at the peer end or slow internal processing can cause delays in queue publishing |
  | Memory Buffer RPS                 | Incremental  | Number of records processed per second in the task internal cache queue |
  | Memory Buffer Block(ms)           | Incremental  | Task internal cache queue delay |
  | Memory Buffer Data Count          | Incremental  | The number of data in the task internal queue |
  | Check RPS                         | Verification | Verify the number of records processed per second |
  | Revise RPS                        | Correction   | Revised number of records processed per second |
  | CPU Usage(%)                      | Any DataTask  | CPU usage of the task process |
  | JVM Heap Detail(MB)               | Any DataTask  | The memory usage of the task process heap |
  | JVM Non-heap Detail(MB)           | Any DataTask  | The Non-heap memory usage of the task process |
  | JVM GC Count                      | Any DataTask  | The number of garbage collection of the task process and the number of GC times will affect the performance or cause the task to stall out. Therefore, it is necessary to appropriately increase the task specifications or adjust some parameters to reduce the number of objects in the memory. |
  | JVM GC Time(ms)                   | Any DataTask   | The GC process takes a long time. If the GC process takes a long time, the performance will be affected and the task will timeout. Therefore, you need to properly increase the task specifications or adjust parameters to reduce the number of objects in the memory. |

## Procedure
BladePipe DataTask performance metrics are shown in charts. For more information, see [View Monitoring Charts](../operation/job_manage/job_op/job_monitor.md)
