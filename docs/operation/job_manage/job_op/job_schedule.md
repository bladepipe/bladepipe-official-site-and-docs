---
id: job_schedule
title: Schedule DataJobs
---

BladePipe supports high availability for DataJob and enables automatic and manual DataJob scheduling.

## What's the schedule

In BladePipe, each DataJob consist of one or several DataTasks, each DataTask must be assigned to a specific Worker to be executed. 

Once assigned, a "binding" is established between the DataTask and the Worker.

However, the binding relationship between DataTask and Workers is not always fixed. 

It may change in the following scenarios:

- Users manually trigger DataTask scheduling to migrate DataTask to other Workers for execution.
- When a Worker fails to function properly, BladePipe automatically identifies the issue and schedules the DataTask to be executed on other healthy Workers.

## View The Bindings

### Procedure
1. Go to the DataJob Details page.   
2. Click the **HOST** next to the icon ![](../../../assets/job_manage/job_schedule1.png) in the upper-right corner to jump directly to the Worker list page to view all DataTasks bound to this Worker.

## Manual Scheduling
Users may consider manually scheduling DataTask in the following scenarios to ensure healthier DataTask execution in the cluster:

- **High Worker load**: When a Worker in the cluster is overloaded due to excessive DataTask execution, it may affect the performance of migration and synchronization. In this case, users can manually schedule DataTask to be executed on other Workers with lower loads.
- **Balancing DataTask load among Workers**: During operations and maintenance, users may notice that some DataTask consume more resources than others, or that some Workers have fewer DataTask assigned to them. In these situations, manual scheduling can be used to balance the DataTask load and improve the overall efficiency of the cluster.

### Procedure
1. On the right side of the Worker list page, select the target DataTask and click **Reschedule**.
2. In the pop-up window, select other available and healthy Workers in the cluster. Click **Submit**.
3. DataTask runs on the target worker.
    :::info
    Task scheduling is only allowed between Workers within the same cluster.
    :::
