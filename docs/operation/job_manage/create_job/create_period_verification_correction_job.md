---
id: create_period_verification_correction_job
title: Verification and Correction
description: Learn how to set up a data verification and correction pipeline to effortlessly ensure data consistency and data integrity.
---

BladePipe provides a robust data verification and correction feature. It finds differences between your source and target databases. It can also fix missing or inconsistent data automatically.

BladePipe runs a second verification check. This helps reduce errors caused by latency, and ensures high data accuracy.

This page describes how to create and manage data verification and correction DataJobs. You can configure one-time DataJobs, reliable periodic verification DataJobs, custom code evaluations, or verification subtasks.

## Create a One-time DataJob

To create a one-time data correction pipeline, follow these steps:

1. Log in to BladePipe.
2. In the navigation bar, click **DataJob** > **Create DataJob**.
3. Select the source and target DataSource, and then click **Next**.
4. Configure the DataJob:
   1. For **DataJob Type**, select **Verification and Correction**.
   2. For **Verification**, select **One-time**.
   3. Choose your **Correction Mode**:
      - **Revise after Check**: BladePipe automatically corrects the data after the verification task completes.
      - **NONE**: BladePipe does not automatically correct the data. To manually trigger a correction, go to the DataJob Details page and click **Functions** > **Create Correction DataJob**.
   4. Opt to start the DataJob automatically or save it for later. By default, the DataJob starts automatically upon creation.
   5. After completing the configuration, click **Next**.
5. Select the tables to be verified. You can only select existing tables.
6. Select the columns to be verified. You can deselect the columns you do not want to check.
7. Click **Create DataJob**.
8. View the job progress in the DataJob list.

## Create a Scheduled DataJob

1. Log in to BladePipe.
2. In the navigation bar, click **DataJob** > **Create DataJob**.
3. Select the source and target DataSource, and then click **Next**.
4. Configure the DataJob:
   1. For **DataJob Type**, select **Verification and Correction**.
   2. For **Verification**, select **Scheduled**, and configure the job execution cycle.
   3. Choose your **Correction Mode**:
      - **Revise after Check**: BladePipe automatically corrects the data after the verification task completes.
      - **NONE**: BladePipe does not automatically correct the data. To manually trigger a correction, go to the DataJob Details page and click **Functions** > **Create Correction DataJob**.
   4. Opt to start the DataJob automatically or save it for later. By default, the DataJob starts automatically upon creation.
   5. After completing the configuration, click **Next**.
5. Select the tables to be verified. You can only select existing tables.
6. Select the columns to be verified. You can deselect any column you do not want to check for data accuracy.
7. Click **Create DataJob**.
8. View the job progress in the DataJob list.

## Manage a Scheduled DataJob

### Manage DataJob Execution Time
In the DataJob list, you can view the job progress and its next execution time. BladePipe automatically starts the data sync error checking when the scheduled time arrives. 

To run the verification process immediately, click **Execute Now** in the operation column. The DataJob will start within two minutes.

### View Verification and Correction History
After at least one periodic verification and correction DataJob completes, the **Verification History** and **Correction History** buttons appear in the operation column. Click these buttons to review the detailed execution records.

### Pause and Resume Schedule DataJob
To pause a scheduled DataJob, click **Stop Scheduling** in the operation column. BladePipe skips the next scheduled verification run. 

To resume the scheduled DataJob, click **Schedule**, and the job will execute according to your configured timetable.

### Modify the DataJob Execution Cycle
To update the schedule for your data verification and correction DataJob:

1. On the DataJob details page, click **Functions** > **Configure Functions**.
2. Enter a new cron expression in the dialog box, and then click **Submit**.
3. BladePipe runs a verification task based on the original next execution time. After the check completes, the new cycle takes effect.    
   To apply the new schedule immediately, click **Execute Now** in the operation column. Once finished, the new cron expression is active.

## Create a DataJob with Custom Code
BladePipe allows you to utilize custom code in your data verification and correction pipelines to tackle specialized business requirements. For more information, see the [Custom Code Processing](./create_process_job.md) guide.

## Create a Subtask
BladePipe supports appending a verification subtask to an existing Full Data or Incremental DataJob. Follow these steps:

1. On the DataJob Details page, click **Functions** > **Create Verification DataJob**.
2. Configure your requirements, and then click **Submit**. The subtask automatically starts after it is created.

## View Verification Results
On the DataJob Details page, click **Log**. You can find the `diff_1st.log` and `diff.log` files here. The `diff_1st.log` captures the pre-check results for data sync discrepancies, while the `diff.log` records the final data verification results.