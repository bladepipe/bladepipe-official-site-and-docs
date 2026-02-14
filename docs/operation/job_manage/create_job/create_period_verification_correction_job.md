---
id: create_period_verification_correction_job
title: Verification and Correction
description: Through a Verification and Correction pipeline, users easily check the data consistency and integrity.
---
BladePipe supports data verification and correction. In this process, data differences between source and target databases are located, and inconsistent and missing data is revised. BladePipe verifies data differences for two times, greatly reducing verification errors caused by latency and ensuring data accuracy.

This page describes how to create data verification and correction DataJobs, including creating a one-time DataJob, creating and managing a scheduled DataJob, creating a DataJob with custom code and creating a subtask.

## Create One-time DataJob
1. Log in to the [BladePipe Cloud](https://cloud.bladepipe.com).
2. In the top navigation bar, click **DataJob**.
3. Click **Create DataJob**.
4. Select the source and target DataSource. Click **Next Step**.
5. Configure the DataJob.
   1. Select **Verification and Correction** for DataJob Type.
   2. Select **One-time** for Verification.
   3. Select **Correction Mode**.
    - **Revise after Check**: The data will be automatically corrected after the verification is completed.
    - **NONE**: The data will not be automatically corrected after the verification is completed. If you need to correct the data, you can go to the DataJob Details page, and click **Functions** > **Create Correction DataJob**.
   4. Select whether to start the DataJob automatically. By default, the DataJob automatically starts upon the DataJob is created. You can choose not to start it for the time being.
   5. After the configuration is complete, click **Next Step**.
6. Select the tables to be verified. Only existing tables can be selected.
7. Select the columns to be verified. 
8. Click **Create DataJob** at the bottom of the page. 
9. View the DataJob progress on the DataJob list page.

## Create Scheduled DataJob
1. Log in to the [BladePipe Cloud](https://cloud.bladepipe.com).
2. In the top navigation bar, click **DataJob**.
3. Click **Create DataJob**.
4. Select the source and target DataSource. Click **Next Step**.
5. Configure the DataJob.
   1. Select **Verification and Correction** for DataJob Type.
   2. Select **Periodic** for Verification, and schedule the DataJob execution.
   3. Select **Correction Mode**.
    - **Revise after Check**: The data will be automatically corrected after the verification is completed.
    - **NONE**: The data will not be automatically corrected after the verification is completed. If you need to correct the data, you can go to the DataJob Details page, and click **Functions** > **Create Correction DataJob**.
   4. Select whether to start the DataJob automatically. By default, the DataJob automatically starts upon the DataJob is created. You can choose not to start it for the time being.
   5. After the configuration is complete, click **Next Step**.
6. Select the tables to be verified. Only existing tables can be selected.
7. Select the columns to be verified. 
8. Click **Create DataJob** at the bottom of the page. 
9. View the DataJob progress on the DataJob list page.

## Manage Scheduled DataJob
1. Manage DataJob Execution Schedule   
On the DataJob list page, you can view the DataJob progress and the next execution time. The DataJob is automatically run when the execution time arrives. To run the DataJob immediately, click **Execute Immediately** in the Operation column, and it will start in 2 minutes.
2. View the Verification History and Correction History   
After at least one Verification and Correction DataJob is run, the **Verification History** and **Correction History** buttons will appear in the Operation column on the DataJob list page. Click the buttons to view the details.
3. Pause and Resume Scheduled DataJob   
To pause the scheduled DataJob, click the **Stop Scheduling** in the Operation column on the DataJob list page, and the DataJob will not be executed as scheduled. To resume the scheduled DataJob, click **Resume Scheduling**, and it will be run as scheduled.
1. Modify DataJob Execution Schedule
  1. On the DataJob Details page, click **Functions** > **Modify DataJob Setting** in the upper-right corner.
  2. In the pop-up dialog box, enter the cron string in the filed **Scheduled Check Crontab Expr** and click **Submit**.
  3. BladePipe first runs the Verification DataJob once according to the original schedule. Then the new schedule setting takes effect. If you need it to take effect immediately, click **Execute Immediately** n the Operation column, and it will start in 2 minutes. After it is completed, the new schedule setting takes effect immediately.

## Create DataJob with Custom Code
BladePipe allows you to use custom code in Verification and Correction DataJob to meet different business needs. For more information, see [Custom Code Processing](./create_process_job.md).

## Create a Subtask
BladePipe supports adding data verification and correction subtasks to the created Full Data or Incremental DataJob. Follow the steps:

1. On the DataJob Details page, click **Functions** > **Create Check DataJob**.
2. Configure relevant information according to requirements and click **Submit**. The subtask start automatically after it is created.

## View Verification Results
On the DataJob Details page, click **Log** under **Verification** tab. There are the diff_1st.log and the diff.log. The diff_1st.log records the data verification pre-check results. The diff.log file records the data verification final results.