---
id: job_life_cycle_manage
title: Manage Lifecycle
---
This page describes the management of DataJob lifecycle, including start/stop DataJob, delete DataJob and other operations.

## Start and Stop DataJob
To start, stop or restart a DataJob, follow the steps below:
- Operate individually: Click the corresponding buttons in the **Operation** column on the DataJob list page, or click the buttons in the upper-right corner of the DataJob Details page. 
- Operate in batches:
  1. Click **Batch Operation** in the upper-right corner of the DataJob list page.
  2. A tick box will appear in front of the DataJob in the list. Select the DataJobs you want to process. 
  3. After selecting the DataJobs, the operations (that can be performed for all the selected DataJobs) appear at the bottom of the page. Select the operation accordingly.
  
:::info
When the DataJob status does not meet the conditions, the operation buttons are greyed out.
:::

## Delete DataJob
To delete a DataJob, click **Delete** in the **Operation** column on the DataJob list page, or click **Functions** > **Delete** on the DataJob Details page, and enter **DELETE_JOB** in the dialog box. Click **Submit** to delete the DataJob.
:::info
DataJobs are only allowed to be deleted when they are stopped.
:::

## Rerun DataJob
For more information, see [Replay DataJob](job_replay.md).


## Mount and Unmount DataJob
By default, BladePipe consider the preoccupation of memory by DataJobs when determining whether there is enough memory left in the Worker during pre-check.

If there is insufficient memory and some DataJobs do not need to run currently, you can **Unmount** the stopped DataJobs that are in the Incremental DataTask. 

After the DataJob is unmounted, the memory preoccupation of the DataJob is no longer calculated when determining whether the remaining memory meets the requirements during pre-check when creating a DataJob. To run the DataJob, click **Mount**.

## Schedule DataJob
Scheduled DataJobs, including scheduled verification DataJobs and Full Data DataJobs, can be run as scheduled automatically. 

The DataJob list page shows the next execution time of the scheduled DataJob. If you need to execute the DataJob immediately, click **Execute Immediately** in the Operation column, and it will start in 2 minutes.

To pause the scheduled DataJob, click the **Stop Scheduling** in the Operation column on the DataJob list page, and the DataJob will not be executed as scheduled. To resume the scheduled DataJob, click **Resume Scheduling**, and it will be run as scheduled.