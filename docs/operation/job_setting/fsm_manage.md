---
id: fsm_manage
title: Manage FSM
description: It describes how to view, activate and inactivate a finite-state machine (FSM).
---
BladePipe controls the automatic flow of DataTasks by virtue of a finite-state machine (FSM). For example, the stage of a DataJob moves from a Full Data DataTask to an Incremental DataTask is a process of DataTask flow. This article describes how to view and manage FSMs.

## View FSMs
1. In the top navigation bar, click **Sync Settings** > **FSM** to view the list of FSMs. At the top left of the list, you can search FSMs by **State** and **DataJob ID**. 
2. Click **Details** in the Operation column to view the details of the FSM, which is generally used for troubleshooting.

## Activate/Inactivate FSMs

If you click **Stop** for a DataJob, but the state of the DataJob doesn't change to Stop and cannot be deleted, you can click **Inactivate** in the Operation column to inactivate the FSM so that you can delete the DataJob if you confirm that there is no other problem. If you need to resume the automatic flow, click **Activation** to do so.

:::warning
This function is usually used when there is an abnormality in the **automatic flow of DataTasks**. Proceed with caution, as it may affect the automatic scheduling of DataTasks.
:::