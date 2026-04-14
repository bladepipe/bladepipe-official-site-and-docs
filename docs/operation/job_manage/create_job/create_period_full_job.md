---
id: create_period_full_job
title: Scheduled Full Data Migration
description: Learn how to configure a scheduled full data migration with BladePipe. Build robust ETL pipelines and automate your periodic data synchronization.
---

This topic describes how to create a scheduled Full DataJob. A periodic full data synchronization helps you maintain up-to-date targets and easily build reliable ETL pipelines.

## Create a DataJob

To create your scheduled data pipeline, follow these steps:

1. Log in to BladePipe.
2. In the navigation bar, click **DataJob** > **Create DataJob**.
3. Select the source and target DataSource, and then click **Next**.
4. For the **DataJob Type**, select **Full Data**. Keep the **Incremental** option unselected, select **Scheduled**, and set your desired execution cycle. Click **Next**.
5. Choose which tables and columns to include in your data migration task. For detailed configuration options, refer to the [Full Data & Incremental](./create_full_incre_task.md).
6. Click **Create DataJob**.

## Manage the DataJob

### View execution time
In the DataJob list, you can view the job progress and its next execution time. BladePipe starts the data integration process when the scheduled time arrives.

To manually trigger the automated data sync ahead of schedule, click **Execute Now** in the operation column. The DataJob starts within two minutes.

### View execution history
After at least one scheduled data migration completes, the **FullData History** button appears in the operation column. Click it to view the records.

### Pause and resume scheduling
To pause a recurring data transfer, click **Stop Scheduling** in the operation column. BladePipe will not run the next scheduled job. 

To resume, click **Schedule** in the operation column. The job scheduling will continue according to your configured time.

### Modify the execution cycle
To update the timing for your data replication:

1. On the DataJob details page, click **Functions** > **Configure Functions**.
2. Enter a new cron expression in the dialog box, and then click **Submit**.
3. BladePipe runs a verification task based on the original next execution time. Once the verification completes, the new cycle takes effect.     
   To apply the new cycle immediately, click **Execute Now** in the operation column. After execution, the new cron expression scheduling is active.