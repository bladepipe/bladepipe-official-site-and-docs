---
id: time_schedule_full
description: BladePipe supports schedule to perform data migration periodically.
title: Scheduled Full Data Migration
---

## Overview

This article introduces how to use [BladePipe](https://www.bladepipe.com) to schedule full data migration and set data filtering conditions.

Advantages:
- No reliance on incremental logs
- Adjustable delay time

Disadvantages:
- Unable to delete data synchronously

## Highlights

### Scheduled Full Data Migration

BladePipe schedules full migration or data verification and correction tasks, including **immediate execution**, **pause scheduling**, **resume scheduling**, **execution history** and other functions.

Below the scheduled task, the next execution time will be displayed.

**Immediate execution** will set the task to run 2 minutes after the current time.

### Data Filtering

BladePipe data filtering is performed by setting SQL expressions (MySQL dialect). The filtering operation is performed in the program by default. Some data sources can choose to bring the conditions to the source data scanning SQL and execute them in the database.

#### In-program filtering

Data filtering is performed in the program, that is, the source data is streamed and fully scanned, and then filtered in parallel in the program.

The advantages of this method are:
- Supports all types of source data sources, and the program uses the SQL engine of the MySQL dialect for data calculation.
- Resumable upload.
- As long as the SQL expression is supported, it can be filtered stably without considering the database execution plan.
- Both full migration and incremental synchronization can effectively support filtering conditions.

Disadvantages include:
- All data will be scanned out, the performance is poor, and it will affect the index hit rate of the source database.
- Incomplete SQL expression support (no support for JOIN, subquery, etc.).

#### Pushing down filter conditions

Pushing down filter conditions means putting SQL conditions into the where conditions of data scanning, filtering the data by the database itself, and BladePipe receives the filtered data.

The advantages of this method are:
- Only receiving filtered data, better performance for small result data.
- For a certain source database, filter conditions can be fully compatible, including JOIN and subquery.

Disadvantages:
- Unable to resume the transfer (task interruption means redo), and the combination of filter conditions and paging conditions is difficult to tune.
- Filter conditions need to be optimized in execution plan.
- Different source database filter conditions have different dialects.
- Only full migration data filtering is supported, and incremental synchronization filtering is difficult.

Currently, only MySQL and OceanBase source terminals support pushdown of filter conditions.

## Procedure

### Install BladePipe
Follow the instructions in [Install Worker (Docker)](../productOP/byoc/installation/install_worker_docker.md) or [Install Worker (Binary)](../productOP/byoc/installation/install_worker_binary.md) to download and install BladePipe Worker.

### Add DataSources

1. Log in to the [BladePipe Cloud](https://cloud.bladepipe.com).
2. Click **DataSource** > **Add DataSource**, and add 2 DataSources.

### Create a DataJob
1. Click **DataJob** > [**Create DataJob**](https://doc.bladepipe.com/operation/job_manage/create_job/create_full_incre_task).
2. Select the source and target DataSources, and click **Test Connection** to ensure the connection to the source and target DataSources are both successful.
   :::tip
   If the test link does not return for a long time, you can refresh the page and reselect. Database information errors or network failures may cause this phenomenon.
   :::


3. Select **Full Data** for DataJob Type. Check Scheduled Migration, where the unit is the task running time point, currently supports the following options:
  - Minutes of every hour
  - A certain time point every day
  - A certain time point every day of the week
  - A certain time point every day of the month
  - A certain time point every day of the month of the year
4. Select the default 2 GB or 1 GB for Task Specification.
   :::info
   It is not recommended to select tasks smaller than 1 GB. Batch updates or writes are more likely to cause task memory shortages and a sharp drop in performance.
   :::

5. Select the table that needs to be scheduled for data migration. You can select multiple tables at the same time.
   :::info
   It is recommended to select no more than 1,000 tables for a single task. The community version currently supports a maximum of 1,000 tables, and the commercial version is unlimited.
   :::

6. Select a specific table, click the **Operation** button, and select **Data filtering conditions**.
   - You can choose **Advanced mode** or **Normal mode**.
  :::info
  Advanced mode uses standard SQL engine technology and more comprehensively supports SQL expressions based on MySQL syntax.   
  Normal mode is a simple SQL expression with relatively weak functions. It is also a data filtering technology used by early products and will be gradually eliminated in the future.
  :::
  - For example, the table selected in this example has a `gmt_create datetime` field. The filtering expression is as follows, where 5 minutes is set as the task start deviation (to ensure data integrity).
  ```SQL
  gmt_create >= DATE_SUB(NOW(), INTERVAL 65 MINUTE)
  ```
  - If you need to set up multiple tables (with function filtering data fields), you can click **Batch Operation** > **Data Filter Condition**.

6. If the information in the above steps is correct, click Create DataJob to start running.

## FAQ

### What to do with historical data?

- After creating a scheduled task, you can choose to create a complete full task to supplement historical data.

### How to view the set filter conditions?

- **Synchronize Task** > **Task Details** > **Database Table Mapping** View, click the table and click the **where Condition** button to view.

### How to modify the set filter conditions?

- The task is in the full migration stage, **pause** the task, click **Task Details** > **Function List** > **Modify Subscription** to modify.

### How to modify the scheduled settings of the task?

- **Synchronize Task** > **Task Details** > **Function List** > **Modify Task Configuration**, you can modify the scheduled task expression.

## Summary
This article mainly introduces the use of [BladePipe](https://www.bladepipe.com) scheduled full tasks and data filtering conditions to achieve incremental data migration.