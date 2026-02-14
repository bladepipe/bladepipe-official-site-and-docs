---
id: job_restart_record
title: View Restart History
description: BladePipe supports replaying DataJob. You can rerun a data pipeline in a click.
---
BladePipe supports viewing DataJob restart history.

## Procedure
Go to the DataJob Details page. Click **Functions** > **View Restart History**.   

The restart history includes the following information:
  - **Worker IP**: The IP address of the Worker where the DataTask is running.
  - **First Binding Time**: When a DataTask is assigned to a Worker to run, they form a binding relationship. The value of this field makes it easy for operators to understand when the DataTask was scheduled to run on this Worker.
  - **Time Elapsed Since First Binding**: The value of this field makes it easy for operators to understand how long the DataTask has been assigned to this Worker.
  - **Time Elapsed Since Last Start Time**: When a DataTask is abnormal, the process will restart automatically. This time is equivalent to the time the DataTask runs stably, and the longer the time, the more stable the DataTask runs.
  - **Cumulative Restart Times in Hours/Days/Weeks**: The number of restarts accumulated according to different time granularities. The fewer the number of times, the more stable the DataTask process runs.



