---
id: job_monitor
title: View Monitoring Charts
---

This article introduces commonly used methods of task monitoring.

## DataJob Status
The DataJob list displays the progress and status , which health can be monitored in three ways:

- **Status**: Running tasks will show either "Normal" or "Abnormal" status. If "Abnormal" is displayed, the task currently has an exception that requires troubleshooting the root cause.
- **Progress**: Running tasks will show their current progress, with automatic transitions between stages. If progress remains unchanged, progresses slowly, or a stage immediately turns red, the task has an exception requiring root cause identification.
- **Latency**: Increasing latency can indicate two possibilities. First, the source endpoint has no data changes and heartbeats are not enabled, causing latency to grow but the task remaining normal. The solution is to enable source endpoint heartbeats or use BladePipe's heartbeat functionality. Second, the task has an actual exception preventing data from writing properly to the destination, requiring troubleshooting of the task exception cause.

## Task Monitor Chart
BladePipe will collect task-related information in real time and report it to display task running information in the form of monitoring charts. Please refer to the official documentation for a description of the general performance indicators **[Monitoring Metrics](../../../dataMigrationAndSync/monitor.md)**.
1. Go to the DataJob Details page. Different monitoring information is displayed for each stage of the task at the bottom of the page.
2. To view more monitoring information, click **More Metrics** next to **Performance** to access a more detailed task monitoring page.   
The monitoring chart can display relevant monitoring information over time. Dragging a certain area can zoom in on that time period to view more detailed information.


