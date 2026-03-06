---
id: console_job_manage
title: Manage ConsoleJobs
description: It tells how to check the console-related tasks in BladePipe.
---
The BladePipe console has many capabilities that are completed using asynchronous tasks which called ConsoleJob. 

ConsoleJob support the asynchronous execution of multiple sub-tasks through workflows. 

Using asynchronous tasks supports sub-task retries and makes execution of complex processes more efficient and easier to observe.

## ConsoleJob List

1. In the top navigation bar, click **Sync Settings** > **ConsoleJob**. 
2. The page displays all of the current asynchronous tasks and their status. The list can be filtered by **DataJob Type**, **DataJob Status** and **Worker Id**.
3. ConsoleJob are bound to resource IDs (usually tasks or data sources), and clicking on the resource ID can quickly locate the related resource.

## ConsoleJob Details
Click **Details** in the Operation column of the task list to open the details page. 

The detail show the steps of the asynchronous task and the status of each step.

## ConsoleJob Exception
If a sub-step (sub-task) in the ConsoleJob encounters an exception, you can view the exception stack trace and then choose to **Retry** or **Ignore And Continue**.

In general, we can confirm the cause of the exception based on the exception stack trace information and choose to retry after processing is completed to restore the ConsoleJob.

## ConsoleJob Entry in DataJob List  
If a ConsoleJob execution exception exists for a DataJob, a red triangle icon is displayed to the right of the DataJob name.  

Clicking on this icon can directly reach the details page for this ConsoleJob.