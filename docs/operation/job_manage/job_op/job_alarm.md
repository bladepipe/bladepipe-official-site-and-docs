---
id: job_alarm
title: Configure Alerts
description: It displays how to configure alert notification for pipelines.
---

BladePipe supports alert configuration for tasks, and this article describes how to configure and view alerts.

## Metrics
BladePipe supports sending alerts in the following five situations:

- **Exception Alert**：Alert notifications are sent when a task has an exception.
- **Delay Alert**：Alert notifications are sent when a task is in the incremental stage, and a latency occurs.
- **Event Alert**：Alert notifications are sent when a synchronization task encounters specific events. Currently, the main supported event is the primary/secondary switch event.
- **Verification Alert**: Alert notifications are sent when data inconsistency or data loss occurs in the verification task.
- **DDL Alert**: Alert notifications are sent when a DDL event occurs.

## Prerequisites
In order for alert capabilities to function properly, alert-related configurations need to be completed in advance. The supported methods to send alert notifications are as follows:

- **IM**: See [Configure Alert Methods](../../../productOP/byoc/maintenance/alarm_conf.md).
- **Email**: See [Configure Alert Methods](../../../productOP/byoc/maintenance/alarm_conf.md).

## Procedure
1. Go to the DataJob Details page. Click **Functions** > **Configure Alarm Setting**.
2. In the dialog box, configure the alerting method and level. By default, it shows the configuration of **Delay Alert**. Click **More** to configure more metrics.
3. If you want to stop alerts for a certain period of time, select **Close** next to **Disable Alerts by Time Period** and set the period.