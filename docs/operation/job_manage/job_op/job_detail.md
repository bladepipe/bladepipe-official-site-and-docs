---
id: job_detail
title: View Details
description: It tells how to check the details of a DataJob in BladePipe, including the data mapping, running status, and logs.
---
After a DataJob is created, you can view the detailed information of the DataJob in the DataJob Details page, including the DataJob configuration, DataSource, DataTask details, monitoring charts, etc.

## View DataJob Configuration Info
The left side of the DataJob Details page displays the basic DataJob information, the Source and Target DataSource information, etc.   

On the left side of the page, click **View** next to **Mapping** to view the DataJob subscription information, including the subscription object, schema mapping, and special configurations (action filtering, WHERE condition setting, etc.).

## View DataJob Running Info
The right side of the DataJob Details page displays the DataTasks, performance monitoring, DataJob logs, etc.
- DataTasks:
  - Schema Migration: you can view the progress of the DataTask and all migrated schemas.
  - Full Data: You can view the progress of the DataTask and the migration progress of each table.
  - Incremental: You can view the progress of the DataTask and the current position. Support [resetting position](./job_position.md).
  - Verification: You can view the progress of the DataTask and the verification progress of each table.
  - Correction: You can view the progress of the DataTask and the correction details.
- Performance monitoring information: The monitoring charts are displayed at the bottom right of the page. For more information, see [View Monitoring Charts](./job_monitor.md).
- Task logs: Click **Logs** under different DataTask tabs to view the logs of the DataTask. For more information, see [View DataJob Log](./job_log.md).


## DataJob O&M
In the top right corner of the DataJob Details page, you can start and stop the DataJob, modify parameters, and do many other operations. For more information, see the following documentation:

- [Manage DataJob Lifecycle](job_life_cycle_manage.md)
- [Rerun DataJob](job_replay.md)
- [Modify DataJob Parameters](job_params.md)
- [Modify Subscription](edit_job.md)
- [Modify DataJob Configuration](change_job_setting.md)
- [Configure DataJob Alert](job_alarm.md)
- [Create Similar DataJob](create_similar_job.md)
- [View DataJob Restart History](job_restart_record.md)
- [Create Verification/Correction DataTask](../create_job/create_period_verification_correction_job.md)